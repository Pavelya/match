/**
 * Document Editor Client Component
 *
 * Full-featured editor for legal documents with:
 * - Tabs for Draft, Published, History
 * - Markdown editor with live preview
 * - Version management
 * - Publish workflow
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Save,
  Send,
  Eye,
  History,
  FileEdit,
  Plus,
  RotateCcw,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LegalDocumentType, DocumentStatus } from '@prisma/client'
import { DOCUMENT_TYPE_LABELS } from '@/lib/legal-documents/types'
import { PublishConfirmModal } from './PublishConfirmModal'
import { MarkdownHelpButton } from './MarkdownHelpButton'

interface Version {
  id: string
  title: string
  content: string
  versionNumber: number
  versionLabel: string
  status: DocumentStatus
  effectiveDate: string | null
  changeNotes: string | null
  createdAt: string
  updatedAt: string
  publishedAt: string | null
  createdBy: { id: string; name: string | null; email: string }
  publishedBy: { id: string; name: string | null; email: string } | null
}

interface Document {
  id: string | null
  type: LegalDocumentType
  typeLabel: string
  publishedVersionId: string | null
  versions: Version[]
}

interface DocumentEditorClientProps {
  documentType: LegalDocumentType
  slug: string
}

type Tab = 'editor' | 'preview' | 'history'

export function DocumentEditorClient({ documentType, slug }: DocumentEditorClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isNewMode = searchParams.get('new') === 'true'

  const [document, setDocument] = useState<Document | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('editor')

  // Editor state
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [versionLabel, setVersionLabel] = useState('')
  const [changeNotes, setChangeNotes] = useState('')

  // Current editing version
  const [editingVersionId, setEditingVersionId] = useState<string | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Action states
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [saveMessage, setSaveMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const typeLabel = DOCUMENT_TYPE_LABELS[documentType]

  // Fetch document data
  const fetchDocument = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/legal-documents/${slug}`)
      if (!response.ok) throw new Error('Failed to fetch document')
      const data = await response.json()
      setDocument(data.document)

      // Auto-load draft or published version into editor
      const draft = data.document.versions.find((v: Version) => v.status === 'DRAFT')
      const published = data.document.versions.find(
        (v: Version) => v.id === data.document.publishedVersionId
      )

      if (draft) {
        setTitle(draft.title)
        setContent(draft.content)
        setVersionLabel(draft.versionLabel)
        setChangeNotes(draft.changeNotes || '')
        setEditingVersionId(draft.id)
      } else if (published && !isNewMode) {
        // Load published for reference but don't set editingVersionId
        setTitle(published.title)
        setContent(published.content)
        setVersionLabel('')
        setChangeNotes('')
      } else if (isNewMode || data.document.versions.length === 0) {
        // New document mode
        setTitle(typeLabel)
        setContent(`# ${typeLabel}\n\nEnter your content here...`)
        setVersionLabel(new Date().toISOString().split('T')[0])
        setChangeNotes('Initial version')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [slug, isNewMode, typeLabel])

  useEffect(() => {
    fetchDocument()
  }, [fetchDocument])

  // Track unsaved changes
  useEffect(() => {
    if (!document) return
    const draft = document.versions.find((v) => v.status === 'DRAFT')
    if (draft) {
      const hasChanges =
        title !== draft.title ||
        content !== draft.content ||
        versionLabel !== draft.versionLabel ||
        changeNotes !== (draft.changeNotes || '')
      setHasUnsavedChanges(hasChanges)
    } else {
      setHasUnsavedChanges(title.length > 0 && content.length > 0)
    }
  }, [document, title, content, versionLabel, changeNotes])

  // Save draft
  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setSaveMessage({ type: 'error', text: 'Title and content are required' })
      return
    }

    setIsSaving(true)
    setSaveMessage(null)

    try {
      if (editingVersionId) {
        // Update existing draft
        const response = await fetch(
          `/api/admin/legal-documents/${slug}/versions/${editingVersionId}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, versionLabel, changeNotes })
          }
        )
        if (!response.ok) throw new Error('Failed to save')
        setSaveMessage({ type: 'success', text: 'Draft saved' })
      } else {
        // Create new version
        const response = await fetch(`/api/admin/legal-documents/${slug}/versions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content, versionLabel, changeNotes })
        })
        if (!response.ok) throw new Error('Failed to create version')
        const data = await response.json()
        setEditingVersionId(data.version.id)
        setSaveMessage({ type: 'success', text: 'Draft created' })
      }
      await fetchDocument()
      setHasUnsavedChanges(false)
    } catch (err) {
      setSaveMessage({ type: 'error', text: err instanceof Error ? err.message : 'Save failed' })
    } finally {
      setIsSaving(false)
      setTimeout(() => setSaveMessage(null), 3000)
    }
  }

  // Publish version
  const handlePublish = async (effectiveDate: Date) => {
    if (!editingVersionId) {
      setSaveMessage({ type: 'error', text: 'Save draft first before publishing' })
      return
    }

    if (hasUnsavedChanges) {
      await handleSave()
    }

    setIsPublishing(true)
    setSaveMessage(null)

    try {
      const response = await fetch(
        `/api/admin/legal-documents/${slug}/versions/${editingVersionId}/publish`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ effectiveDate: effectiveDate.toISOString() })
        }
      )
      if (!response.ok) throw new Error('Failed to publish')
      setSaveMessage({ type: 'success', text: 'Published successfully!' })
      setEditingVersionId(null)
      setShowPublishModal(false)
      await fetchDocument()
    } catch (err) {
      setSaveMessage({ type: 'error', text: err instanceof Error ? err.message : 'Publish failed' })
    } finally {
      setIsPublishing(false)
    }
  }

  // Create new draft from version (revert)
  const handleRevert = async (versionId: string) => {
    try {
      const response = await fetch(
        `/api/admin/legal-documents/${slug}/versions/${versionId}/revert`,
        { method: 'POST' }
      )
      if (!response.ok) throw new Error('Failed to revert')
      const data = await response.json()
      setEditingVersionId(data.version.id)
      setTitle(data.version.title)
      setContent(data.version.content)
      setVersionLabel(data.version.versionLabel)
      setChangeNotes(data.version.changeNotes || '')
      setActiveTab('editor')
      await fetchDocument()
      setSaveMessage({ type: 'success', text: 'Draft created from version' })
    } catch (err) {
      setSaveMessage({ type: 'error', text: err instanceof Error ? err.message : 'Revert failed' })
    }
  }

  // Create new draft
  const handleNewDraft = () => {
    const published = document?.versions.find((v) => v.id === document?.publishedVersionId)
    if (published) {
      setTitle(published.title)
      setContent(published.content)
    } else {
      setTitle(typeLabel)
      setContent(`# ${typeLabel}\n\nEnter your content here...`)
    }
    setVersionLabel(new Date().toISOString().split('T')[0])
    setChangeNotes('')
    setEditingVersionId(null)
    setActiveTab('editor')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
        <p className="text-red-700">{error}</p>
      </div>
    )
  }

  const currentDraft = document?.versions.find((v) => v.status === 'DRAFT')
  const publishedVersion = document?.versions.find((v) => v.id === document?.publishedVersionId)

  return (
    <div className="space-y-6">
      {/* Status Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {publishedVersion && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
              <CheckCircle className="h-4 w-4" />
              Published v{publishedVersion.versionNumber}
            </span>
          )}
          {currentDraft && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-700">
              <FileEdit className="h-4 w-4" />
              Draft v{currentDraft.versionNumber}
            </span>
          )}
          {hasUnsavedChanges && (
            <span className="text-sm text-muted-foreground">• Unsaved changes</span>
          )}
        </div>

        {saveMessage && (
          <span
            className={cn(
              'text-sm font-medium',
              saveMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
            )}
          >
            {saveMessage.text}
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex gap-6">
          {[
            { id: 'editor' as Tab, label: 'Editor', icon: FileEdit },
            { id: 'preview' as Tab, label: 'Preview', icon: Eye },
            { id: 'history' as Tab, label: 'Version History', icon: History }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 py-3 text-sm font-medium border-b-2 -mb-px transition-colors',
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'editor' && (
        <div className="space-y-6">
          {/* Metadata Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Document title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Version Label</label>
              <input
                type="text"
                value={versionLabel}
                onChange={(e) => setVersionLabel(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., 2025-12-26 or v2.1"
              />
            </div>
          </div>

          {/* Content Editor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Content (Markdown)</label>
              <MarkdownHelpButton />
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-96 px-4 py-3 rounded-lg border bg-background font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y"
              placeholder="Enter markdown content..."
            />
          </div>

          {/* Change Notes */}
          <div>
            <label className="block text-sm font-medium mb-2">Change Notes</label>
            <textarea
              value={changeNotes}
              onChange={(e) => setChangeNotes(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-y"
              placeholder="Describe what changed in this version..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="outline" onClick={() => router.push('/admin/legal-content')}>
              Cancel
            </Button>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Draft
              </Button>
              <Button
                onClick={() => setShowPublishModal(true)}
                disabled={isPublishing || !editingVersionId}
              >
                <Send className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'preview' && (
        <div className="rounded-xl border bg-card p-8">
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <h1>{title || 'Untitled'}</h1>
            <div className="whitespace-pre-wrap">{content || 'No content yet...'}</div>
          </article>
          <p className="text-sm text-muted-foreground mt-6 pt-4 border-t">
            Note: This is a simple preview. The actual page will render Markdown formatting.
          </p>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">All Versions</h3>
            {!currentDraft && publishedVersion && (
              <Button variant="outline" size="sm" onClick={handleNewDraft}>
                <Plus className="h-4 w-4 mr-2" />
                New Draft
              </Button>
            )}
          </div>

          {document?.versions.length === 0 ? (
            <div className="rounded-xl border bg-muted/50 p-8 text-center">
              <History className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No versions yet</p>
              <Button className="mt-4" onClick={handleNewDraft}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Version
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {document?.versions.map((version) => (
                <div
                  key={version.id}
                  className={cn(
                    'rounded-lg border p-4',
                    version.id === document.publishedVersionId
                      ? 'bg-green-50 border-green-200'
                      : version.status === 'DRAFT'
                        ? 'bg-amber-50 border-amber-200'
                        : 'bg-card'
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          v{version.versionNumber} — {version.versionLabel}
                        </span>
                        {version.id === document.publishedVersionId && (
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                            Current
                          </span>
                        )}
                        {version.status === 'DRAFT' && (
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-700">
                            Draft
                          </span>
                        )}
                        {version.status === 'ARCHIVED' && (
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                            Archived
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {version.changeNotes || 'No change notes'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Created {new Date(version.createdAt).toLocaleString()} by{' '}
                        {version.createdBy.name || version.createdBy.email}
                        {version.publishedAt &&
                          ` • Published ${new Date(version.publishedAt).toLocaleString()}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {version.status !== 'DRAFT' && !currentDraft && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRevert(version.id)}
                        >
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Revert
                        </Button>
                      )}
                      {version.status === 'DRAFT' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setTitle(version.title)
                            setContent(version.content)
                            setVersionLabel(version.versionLabel)
                            setChangeNotes(version.changeNotes || '')
                            setEditingVersionId(version.id)
                            setActiveTab('editor')
                          }}
                        >
                          <FileEdit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Publish Confirmation Modal */}
      <PublishConfirmModal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        onConfirm={handlePublish}
        documentTitle={title}
        versionNumber={currentDraft?.versionNumber || 1}
        versionLabel={versionLabel}
        isPublishing={isPublishing}
      />
    </div>
  )
}
