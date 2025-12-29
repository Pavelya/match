/**
 * Bulk Upload Form Component
 *
 * Client component for uploading multiple programs via CSV.
 * Features:
 * - University selector dropdown
 * - CSV file upload with drag-and-drop
 * - Client-side validation with preview table
 * - Import progress and results display
 *
 * Uses the CSV parser from lib/bulk-upload for validation.
 */

'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import {
  Upload,
  Building2,
  FileText,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Loader2,
  ChevronDown,
  Download,
  AlertTriangle,
  Info
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  parseCSV,
  buildValidationContext,
  formatErrors,
  getValidPrograms,
  type ParseResult
} from '@/lib/bulk-upload'

// =============================================================================
// TYPES
// =============================================================================

interface University {
  id: string
  name: string
  country: {
    flagEmoji: string
    name: string
  }
}

interface FieldOfStudy {
  id: string
  name: string
}

interface IBCourse {
  id: string
  name: string
  code: string
  group: number
}

interface BulkUploadFormProps {
  universities: University[]
  fieldsOfStudy: FieldOfStudy[]
  ibCourses: IBCourse[]
}

interface UploadResult {
  success: number
  failed: number
  duplicates: number
  results: Array<{
    name: string
    status: 'created' | 'error' | 'duplicate'
    programId?: string
    error?: string
  }>
  algoliaSync: {
    success: number
    failed: number
  }
}

type UploadState = 'idle' | 'validating' | 'preview' | 'uploading' | 'complete' | 'error'

// =============================================================================
// COMPONENT
// =============================================================================

export function BulkUploadForm({ universities, fieldsOfStudy, ibCourses }: BulkUploadFormProps) {
  // State
  const [universityId, setUniversityId] = useState('')
  const [uploadState, setUploadState] = useState<UploadState>('idle')
  const [parseResult, setParseResult] = useState<ParseResult | null>(null)
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Build validation context from reference data
  const validationContext = buildValidationContext(fieldsOfStudy, ibCourses)

  // Selected university display
  const selectedUniversity = universities.find((u) => u.id === universityId)

  // ==========================================================================
  // FILE HANDLING
  // ==========================================================================

  const handleFile = useCallback(
    async (file: File) => {
      if (!universityId) {
        setError('Please select a university first')
        return
      }

      if (!file.name.endsWith('.csv')) {
        setError('Please upload a CSV file')
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB')
        return
      }

      setError(null)
      setUploadState('validating')

      try {
        const content = await file.text()
        const result = parseCSV(content, validationContext)

        setParseResult(result)
        setUploadState('preview')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to parse CSV file')
        setUploadState('error')
      }
    },
    [universityId, validationContext]
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = () => {
    setDragActive(false)
  }

  // ==========================================================================
  // UPLOAD
  // ==========================================================================

  const handleUpload = async () => {
    if (!parseResult || !parseResult.isValid || !universityId) return

    setUploadState('uploading')
    setError(null)

    try {
      const validPrograms = getValidPrograms(parseResult)

      const response = await fetch('/api/admin/programs/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          universityId,
          programs: validPrograms
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Upload failed')
      }

      const result: UploadResult = await response.json()
      setUploadResult(result)
      setUploadState('complete')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      setUploadState('error')
    }
  }

  // ==========================================================================
  // RESET
  // ==========================================================================

  const handleReset = () => {
    setUploadState('idle')
    setParseResult(null)
    setUploadResult(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // ==========================================================================
  // TEMPLATE DOWNLOAD
  // ==========================================================================

  const downloadTemplate = () => {
    const headers = [
      'name',
      'description',
      'field_of_study',
      'degree_type',
      'duration',
      'min_ib_points',
      'program_url',
      'course_requirements'
    ]

    const exampleRow = [
      'Computer Science',
      'A comprehensive program in software engineering and algorithms.',
      fieldsOfStudy[0]?.name || 'Engineering & Technology',
      'Bachelor',
      '3 years',
      '36',
      'https://university.edu/cs',
      '(MATH-AA:HL:5|MATH-AI:HL:6)'
    ]

    const csv = [headers.join(','), exampleRow.map((v) => `"${v}"`).join(',')].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'bulk-upload-template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <div className="space-y-8">
      {/* Error Banner */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive flex items-center gap-2">
          <AlertCircle className="h-5 w-5 shrink-0" />
          {error}
        </div>
      )}

      {/* Step 1: Select University */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Step 1: Select University
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            All programs in the CSV will be added to this university.
          </p>
        </div>

        <div className="relative max-w-md">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <select
            value={universityId}
            onChange={(e) => {
              setUniversityId(e.target.value)
              handleReset()
            }}
            disabled={uploadState === 'uploading'}
            className="w-full pl-10 pr-10 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none"
          >
            <option value="">Select a university...</option>
            {universities.map((uni) => (
              <option key={uni.id} value={uni.id}>
                {uni.country.flagEmoji} {uni.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Step 2: Upload CSV */}
      {universityId && (uploadState === 'idle' || uploadState === 'error') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Step 2: Upload CSV File
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Upload a CSV file with program data. Maximum 500 programs per upload.
              </p>
            </div>
            <button
              onClick={downloadTemplate}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium border rounded-lg hover:bg-muted transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Template
            </button>
          </div>

          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              'border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors',
              dragActive
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-primary/50'
            )}
          >
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-foreground font-medium">
              {dragActive ? 'Drop file here...' : 'Drag & drop your CSV file here'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">or click to browse</p>
            <p className="text-xs text-muted-foreground mt-4">CSV files only, max 5MB</p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileInput}
            className="hidden"
          />

          {/* Reference Info */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Valid Field of Study names:</p>
                <p className="mt-1">{fieldsOfStudy.map((f) => f.name).join(', ')}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Valid IB Course codes:</p>
                <p className="mt-1">{ibCourses.map((c) => c.code).join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Validating State */}
      {uploadState === 'validating' && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-muted-foreground">Validating CSV file...</span>
        </div>
      )}

      {/* Preview State */}
      {uploadState === 'preview' && parseResult && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Step 3: Review & Import
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Review the parsed data below.{' '}
              {parseResult.isValid ? 'All rows are valid.' : 'Fix errors and re-upload.'}
            </p>
          </div>

          {/* Summary */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">{parseResult.validRows} valid</span>
            </div>
            {parseResult.invalidRows > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg">
                <XCircle className="h-5 w-5" />
                <span className="font-medium">{parseResult.invalidRows} invalid</span>
              </div>
            )}
          </div>

          {/* Validation Errors */}
          {!parseResult.isValid && (
            <div className="border border-destructive/50 rounded-lg p-4 bg-destructive/5">
              <div className="flex items-center gap-2 text-destructive font-medium mb-3">
                <AlertTriangle className="h-5 w-5" />
                Validation Errors (file cannot be imported)
              </div>
              <ul className="space-y-1 text-sm text-destructive">
                {formatErrors(parseResult)
                  .slice(0, 20)
                  .map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                {formatErrors(parseResult).length > 20 && (
                  <li className="text-muted-foreground">
                    ...and {formatErrors(parseResult).length - 20} more errors
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Preview Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Row</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Field</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Degree
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      IB Points
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {parseResult.rows.slice(0, 50).map((row) => (
                    <tr key={row.rowNumber} className={cn(!row.isValid && 'bg-destructive/5')}>
                      <td className="px-4 py-3 text-muted-foreground">{row.rowNumber}</td>
                      <td className="px-4 py-3">
                        {row.isValid ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium">{row.data.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.data.fieldOfStudy}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.data.degreeType}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {row.data.minIBPoints || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {parseResult.rows.length > 50 && (
              <div className="px-4 py-2 bg-muted/50 border-t text-sm text-muted-foreground">
                Showing first 50 of {parseResult.rows.length} rows
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!parseResult.isValid}
              className={cn(
                'flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg transition-colors',
                parseResult.isValid
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              )}
            >
              <Upload className="h-4 w-4" />
              Import {parseResult.validRows} Programs
            </button>
          </div>
        </div>
      )}

      {/* Uploading State */}
      {uploadState === 'uploading' && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-foreground font-medium">Importing programs...</p>
          <p className="text-sm text-muted-foreground">This may take a moment</p>
        </div>
      )}

      {/* Complete State */}
      {uploadState === 'complete' && uploadResult && (
        <div className="space-y-6">
          <div className="text-center py-8">
            <CheckCircle2 className="h-16 w-16 mx-auto text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-foreground">Import Complete!</h3>
            <p className="text-muted-foreground mt-1">
              Successfully imported {uploadResult.success} programs to {selectedUniversity?.name}
            </p>
          </div>

          {/* Results Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-700">{uploadResult.success}</div>
              <div className="text-sm text-green-600">Created</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-700">{uploadResult.duplicates}</div>
              <div className="text-sm text-yellow-600">Duplicates Skipped</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-700">{uploadResult.failed}</div>
              <div className="text-sm text-red-600">Failed</div>
            </div>
          </div>

          {/* Algolia Sync Status */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Algolia Search:</span>{' '}
              {uploadResult.algoliaSync.success} programs indexed successfully
              {uploadResult.algoliaSync.failed > 0 && `, ${uploadResult.algoliaSync.failed} failed`}
            </p>
          </div>

          {/* Error Details */}
          {(uploadResult.duplicates > 0 || uploadResult.failed > 0) && (
            <div className="border rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-muted/50 border-b font-medium text-sm">
                Skipped/Failed Programs
              </div>
              <div className="divide-y max-h-60 overflow-y-auto">
                {uploadResult.results
                  .filter((r) => r.status !== 'created')
                  .map((result, i) => (
                    <div key={i} className="px-4 py-2 flex items-center justify-between text-sm">
                      <span className="font-medium">{result.name}</span>
                      <span
                        className={cn(
                          result.status === 'duplicate' ? 'text-yellow-600' : 'text-red-600'
                        )}
                      >
                        {result.status === 'duplicate' ? 'Duplicate' : result.error}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 text-sm font-medium border rounded-lg hover:bg-muted transition-colors"
            >
              Upload More
            </button>
            <Link
              href={`/admin/programs?university=${universityId}`}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              View Programs
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
