/**
 * Legal Document Service
 *
 * Business logic for managing legal document versions.
 * Handles CRUD operations, versioning, and publishing.
 */

import { prisma } from '@/lib/prisma'
import { LegalDocumentType, Prisma } from '@prisma/client'
import {
  LegalDocumentSummary,
  LegalDocumentDetail,
  LegalDocumentVersionDetail,
  CreateVersionInput,
  UpdateVersionInput
} from './types'

/**
 * Get all legal documents with their current status
 */
export async function getAllDocuments(): Promise<LegalDocumentSummary[]> {
  // Get all document types
  const documentTypes = Object.values(LegalDocumentType)

  const documents = await prisma.legalDocument.findMany({
    include: {
      publishedVersion: {
        select: {
          id: true,
          title: true,
          versionNumber: true,
          versionLabel: true,
          effectiveDate: true,
          publishedAt: true
        }
      },
      versions: {
        where: { status: 'DRAFT' },
        orderBy: { versionNumber: 'desc' },
        take: 1,
        select: {
          id: true,
          title: true,
          versionNumber: true,
          status: true,
          updatedAt: true
        }
      },
      _count: {
        select: { versions: true }
      }
    }
  })

  // Create a map for quick lookup
  const docMap = new Map(documents.map((d) => [d.type, d]))

  // Return all document types, creating placeholders for missing ones
  return documentTypes.map((type) => {
    const doc = docMap.get(type)
    if (doc) {
      return {
        id: doc.id,
        type: doc.type,
        publishedVersion: doc.publishedVersion,
        latestDraft: doc.versions[0] || null,
        totalVersions: doc._count.versions
      }
    }
    // Return placeholder for documents that don't exist yet
    return {
      id: '',
      type,
      publishedVersion: null,
      latestDraft: null,
      totalVersions: 0
    }
  })
}

/**
 * Get a single document with all its versions
 */
export async function getDocument(type: LegalDocumentType): Promise<LegalDocumentDetail | null> {
  const document = await prisma.legalDocument.findUnique({
    where: { type },
    include: {
      versions: {
        orderBy: { versionNumber: 'desc' },
        include: {
          createdBy: {
            select: { id: true, name: true, email: true }
          },
          publishedBy: {
            select: { id: true, name: true, email: true }
          }
        }
      }
    }
  })

  if (!document) {
    return null
  }

  return {
    id: document.id,
    type: document.type,
    publishedVersionId: document.publishedVersionId,
    versions: document.versions as LegalDocumentVersionDetail[],
    createdAt: document.createdAt,
    updatedAt: document.updatedAt
  }
}

/**
 * Get a specific version by ID
 */
export async function getVersion(versionId: string): Promise<LegalDocumentVersionDetail | null> {
  const version = await prisma.legalDocumentVersion.findUnique({
    where: { id: versionId },
    include: {
      createdBy: {
        select: { id: true, name: true, email: true }
      },
      publishedBy: {
        select: { id: true, name: true, email: true }
      }
    }
  })

  return version as LegalDocumentVersionDetail | null
}

/**
 * Create a new version of a document
 */
export async function createVersion(
  type: LegalDocumentType,
  input: CreateVersionInput,
  userId: string
): Promise<LegalDocumentVersionDetail> {
  // Find or create the document
  const document = await prisma.legalDocument.findUnique({
    where: { type },
    include: {
      versions: {
        orderBy: { versionNumber: 'desc' },
        take: 1,
        select: { versionNumber: true }
      }
    }
  })

  const nextVersionNumber = document ? (document.versions[0]?.versionNumber || 0) + 1 : 1

  // Generate version label if not provided
  const versionLabel = input.versionLabel || new Date().toISOString().split('T')[0] // YYYY-MM-DD

  if (!document) {
    // Create document and first version in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const newDoc = await tx.legalDocument.create({
        data: { type }
      })

      const version = await tx.legalDocumentVersion.create({
        data: {
          documentId: newDoc.id,
          title: input.title,
          content: input.content,
          versionNumber: 1,
          versionLabel,
          changeNotes: input.changeNotes,
          createdById: userId,
          status: 'DRAFT'
        },
        include: {
          createdBy: { select: { id: true, name: true, email: true } },
          publishedBy: { select: { id: true, name: true, email: true } }
        }
      })

      return version
    })

    return result as LegalDocumentVersionDetail
  }

  // Create new version for existing document
  const version = await prisma.legalDocumentVersion.create({
    data: {
      documentId: document.id,
      title: input.title,
      content: input.content,
      versionNumber: nextVersionNumber,
      versionLabel,
      changeNotes: input.changeNotes,
      createdById: userId,
      status: 'DRAFT'
    },
    include: {
      createdBy: { select: { id: true, name: true, email: true } },
      publishedBy: { select: { id: true, name: true, email: true } }
    }
  })

  return version as LegalDocumentVersionDetail
}

/**
 * Update a draft version
 */
export async function updateVersion(
  versionId: string,
  input: UpdateVersionInput
): Promise<LegalDocumentVersionDetail> {
  // Verify version exists and is a draft
  const existing = await prisma.legalDocumentVersion.findUnique({
    where: { id: versionId },
    select: { status: true }
  })

  if (!existing) {
    throw new Error('Version not found')
  }

  if (existing.status !== 'DRAFT') {
    throw new Error('Only draft versions can be edited')
  }

  const updateData: Prisma.LegalDocumentVersionUpdateInput = {}

  if (input.title !== undefined) updateData.title = input.title
  if (input.content !== undefined) updateData.content = input.content
  if (input.versionLabel !== undefined) updateData.versionLabel = input.versionLabel
  if (input.changeNotes !== undefined) updateData.changeNotes = input.changeNotes

  const version = await prisma.legalDocumentVersion.update({
    where: { id: versionId },
    data: updateData,
    include: {
      createdBy: { select: { id: true, name: true, email: true } },
      publishedBy: { select: { id: true, name: true, email: true } }
    }
  })

  return version as LegalDocumentVersionDetail
}

/**
 * Publish a version
 */
export async function publishVersion(
  versionId: string,
  userId: string,
  effectiveDate?: Date
): Promise<LegalDocumentVersionDetail> {
  // Get version with document
  const version = await prisma.legalDocumentVersion.findUnique({
    where: { id: versionId },
    include: { document: true }
  })

  if (!version) {
    throw new Error('Version not found')
  }

  if (version.status === 'PUBLISHED') {
    throw new Error('Version is already published')
  }

  // Update version and document in a transaction
  const result = await prisma.$transaction(async (tx) => {
    // Archive previous published version if exists
    if (version.document.publishedVersionId) {
      await tx.legalDocumentVersion.update({
        where: { id: version.document.publishedVersionId },
        data: { status: 'ARCHIVED' }
      })
    }

    // Update this version to published
    const publishedVersion = await tx.legalDocumentVersion.update({
      where: { id: versionId },
      data: {
        status: 'PUBLISHED',
        publishedById: userId,
        publishedAt: new Date(),
        effectiveDate: effectiveDate || new Date()
      },
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
        publishedBy: { select: { id: true, name: true, email: true } }
      }
    })

    // Update document to point to new published version
    await tx.legalDocument.update({
      where: { id: version.documentId },
      data: { publishedVersionId: versionId }
    })

    return publishedVersion
  })

  return result as LegalDocumentVersionDetail
}

/**
 * Create a new draft from an existing version (for revert/copy)
 */
export async function createDraftFromVersion(
  versionId: string,
  userId: string
): Promise<LegalDocumentVersionDetail> {
  const sourceVersion = await prisma.legalDocumentVersion.findUnique({
    where: { id: versionId },
    include: {
      document: {
        include: {
          versions: {
            orderBy: { versionNumber: 'desc' },
            take: 1,
            select: { versionNumber: true }
          }
        }
      }
    }
  })

  if (!sourceVersion) {
    throw new Error('Version not found')
  }

  const nextVersionNumber = (sourceVersion.document.versions[0]?.versionNumber || 0) + 1

  const newVersion = await prisma.legalDocumentVersion.create({
    data: {
      documentId: sourceVersion.documentId,
      title: sourceVersion.title,
      content: sourceVersion.content,
      versionNumber: nextVersionNumber,
      versionLabel: new Date().toISOString().split('T')[0],
      changeNotes: `Reverted from version ${sourceVersion.versionNumber}`,
      createdById: userId,
      status: 'DRAFT'
    },
    include: {
      createdBy: { select: { id: true, name: true, email: true } },
      publishedBy: { select: { id: true, name: true, email: true } }
    }
  })

  return newVersion as LegalDocumentVersionDetail
}

/**
 * Delete a draft version (only drafts can be deleted)
 */
export async function deleteVersion(versionId: string): Promise<void> {
  const version = await prisma.legalDocumentVersion.findUnique({
    where: { id: versionId },
    select: { status: true }
  })

  if (!version) {
    throw new Error('Version not found')
  }

  if (version.status !== 'DRAFT') {
    throw new Error('Only draft versions can be deleted')
  }

  await prisma.legalDocumentVersion.delete({
    where: { id: versionId }
  })
}

/**
 * Get published document for public display
 */
export interface PublishedDocument {
  type: LegalDocumentType
  id: string
  title: string
  content: string
  versionNumber: number
  versionLabel: string
  effectiveDate: Date | null
  publishedAt: Date | null
}

export async function getPublishedDocument(
  type: LegalDocumentType
): Promise<PublishedDocument | null> {
  const document = await prisma.legalDocument.findUnique({
    where: { type },
    include: {
      publishedVersion: {
        select: {
          id: true,
          title: true,
          content: true,
          versionNumber: true,
          versionLabel: true,
          effectiveDate: true,
          publishedAt: true
        }
      }
    }
  })

  if (!document || !document.publishedVersion) {
    return null
  }

  return {
    type,
    ...document.publishedVersion
  }
}

/**
 * Get current version label for a document type (for consent tracking)
 */
export async function getCurrentVersionLabel(type: LegalDocumentType): Promise<string | null> {
  const document = await prisma.legalDocument.findUnique({
    where: { type },
    include: {
      publishedVersion: {
        select: { versionLabel: true }
      }
    }
  })

  return document?.publishedVersion?.versionLabel || null
}
