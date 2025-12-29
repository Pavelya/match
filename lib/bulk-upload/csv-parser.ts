/**
 * CSV Parser Utility for Bulk Program Upload
 *
 * Provides parsing and validation for bulk program CSV files.
 * Features:
 * - CSV parsing with proper handling of quoted fields
 * - Course requirements notation parser (AND/OR groups)
 * - Strict validation against reference data (fields, courses)
 * - Detailed error reporting with row/field context
 *
 * @module lib/bulk-upload/csv-parser
 */

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * Reference data needed for validation
 */
export interface ValidationContext {
  /** Map of field name (lowercase) → field ID */
  fieldMap: Map<string, string>
  /** Map of course code (uppercase) → course ID */
  courseMap: Map<string, string>
  /** List of valid degree types */
  validDegreeTypes: string[]
}

/**
 * Parsed course requirement from notation
 */
export interface ParsedRequirement {
  ibCourseId: string
  requiredLevel: 'HL' | 'SL'
  minGrade: number
  isCritical: boolean
  orGroupId: string | null
}

/**
 * Raw parsed program data from CSV row
 */
export interface RawProgramData {
  rowNumber: number
  name: string
  description: string
  fieldOfStudy: string
  degreeType: string
  duration: string
  minIBPoints: string
  programUrl: string
  courseRequirements: string
}

/**
 * Validated program data ready for database insertion
 */
export interface ValidatedProgram {
  name: string
  description: string
  fieldOfStudyId: string
  degreeType: string
  duration: string
  minIBPoints: number | null
  programUrl: string | null
  courseRequirements: ParsedRequirement[]
}

/**
 * Validation error for a specific field
 */
export interface FieldError {
  field: string
  message: string
  value: string
}

/**
 * Validation result for a single row
 */
export interface RowValidationResult {
  rowNumber: number
  isValid: boolean
  errors: FieldError[]
  data: RawProgramData
  validated?: ValidatedProgram
}

/**
 * Complete parse result for CSV file
 */
export interface ParseResult {
  isValid: boolean
  totalRows: number
  validRows: number
  invalidRows: number
  rows: RowValidationResult[]
  headerErrors: string[]
}

// =============================================================================
// CONSTANTS
// =============================================================================

const REQUIRED_HEADERS = ['name', 'description', 'field_of_study', 'degree_type', 'duration']

const OPTIONAL_HEADERS = ['min_ib_points', 'program_url', 'course_requirements']

const ALL_HEADERS = [...REQUIRED_HEADERS, ...OPTIONAL_HEADERS]

const DEFAULT_DEGREE_TYPES = ['Bachelor', 'Master', 'PhD', 'Diploma', 'Certificate']

const MIN_IB_POINTS = 24
const MAX_IB_POINTS = 45
const MIN_GRADE = 1
const MAX_GRADE = 7

// =============================================================================
// CSV PARSING
// =============================================================================

/**
 * Parse CSV content into rows
 * Handles quoted fields with commas and newlines properly
 */
function parseCSVContent(content: string): { headers: string[]; rows: string[][] } {
  const lines: string[][] = []
  let currentLine: string[] = []
  let currentField = ''
  let inQuotes = false

  for (let i = 0; i < content.length; i++) {
    const char = content[i]
    const nextChar = content[i + 1]

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        // Escaped quote
        currentField += '"'
        i++ // Skip next quote
      } else if (char === '"') {
        // End of quoted field
        inQuotes = false
      } else {
        currentField += char
      }
    } else {
      if (char === '"') {
        // Start of quoted field
        inQuotes = true
      } else if (char === ',') {
        // Field separator
        currentLine.push(currentField.trim())
        currentField = ''
      } else if (char === '\n' || (char === '\r' && nextChar === '\n')) {
        // End of line
        currentLine.push(currentField.trim())
        if (currentLine.some((f) => f.length > 0)) {
          lines.push(currentLine)
        }
        currentLine = []
        currentField = ''
        if (char === '\r') i++ // Skip \n in \r\n
      } else if (char !== '\r') {
        currentField += char
      }
    }
  }

  // Handle last field/line
  if (currentField || currentLine.length > 0) {
    currentLine.push(currentField.trim())
    if (currentLine.some((f) => f.length > 0)) {
      lines.push(currentLine)
    }
  }

  if (lines.length === 0) {
    return { headers: [], rows: [] }
  }

  const headers = lines[0].map((h) => h.toLowerCase().trim())
  const rows = lines.slice(1)

  return { headers, rows }
}

/**
 * Map row array to object using headers
 */
function rowToObject(headers: string[], row: string[]): Record<string, string> {
  const obj: Record<string, string> = {}
  headers.forEach((header, index) => {
    obj[header] = row[index] || ''
  })
  return obj
}

// =============================================================================
// REQUIREMENTS NOTATION PARSER
// =============================================================================

/**
 * Parse a single requirement token: CODE:LEVEL:GRADE[:critical]
 */
function parseRequirementToken(
  token: string,
  courseMap: Map<string, string>,
  orGroupId: string | null
): { requirement: ParsedRequirement | null; error: string | null } {
  const parts = token.split(':').map((p) => p.trim())

  if (parts.length < 3) {
    return {
      requirement: null,
      error: `Invalid format "${token}". Expected CODE:LEVEL:GRADE[:critical]`
    }
  }

  const [code, level, gradeStr, criticalFlag] = parts

  // Validate course code
  const courseCode = code.toUpperCase()
  const courseId = courseMap.get(courseCode)
  if (!courseId) {
    // Find similar codes for suggestion
    const allCodes = Array.from(courseMap.keys())
    const similar = allCodes.filter(
      (c) => c.includes(courseCode) || courseCode.includes(c.substring(0, 3))
    )
    const suggestion = similar.length > 0 ? ` Did you mean: ${similar.slice(0, 3).join(', ')}?` : ''
    return {
      requirement: null,
      error: `Course code "${code}" not found.${suggestion}`
    }
  }

  // Validate level
  const normalizedLevel = level.toUpperCase()
  if (normalizedLevel !== 'HL' && normalizedLevel !== 'SL') {
    return {
      requirement: null,
      error: `Invalid level "${level}". Must be HL or SL.`
    }
  }

  // Validate grade
  const grade = parseInt(gradeStr, 10)
  if (isNaN(grade) || grade < MIN_GRADE || grade > MAX_GRADE) {
    return {
      requirement: null,
      error: `Invalid grade "${gradeStr}". Must be ${MIN_GRADE}-${MAX_GRADE}.`
    }
  }

  // Check critical flag
  const isCritical = criticalFlag?.toLowerCase() === 'critical'

  return {
    requirement: {
      ibCourseId: courseId,
      requiredLevel: normalizedLevel as 'HL' | 'SL',
      minGrade: grade,
      isCritical,
      orGroupId
    },
    error: null
  }
}

/**
 * Parse course requirements notation string
 *
 * Format: REQUIREMENT[;REQUIREMENT...]
 * Where REQUIREMENT is either:
 * - CODE:LEVEL:GRADE[:critical] (standalone AND requirement)
 * - (CODE:LEVEL:GRADE|CODE:LEVEL:GRADE|...) (OR group)
 *
 * @example "MATH-AA:HL:5;PHYS:HL:5:critical" → Two AND requirements
 * @example "(MATH-AA:HL:5|MATH-AI:HL:6)" → One OR group
 * @example "(MATH-AA:HL:5|MATH-AI:HL:6);PHYS:HL:5" → OR group AND standalone
 */
export function parseRequirements(
  notation: string,
  courseMap: Map<string, string>
): { requirements: ParsedRequirement[]; errors: string[] } {
  if (!notation || notation.trim() === '') {
    return { requirements: [], errors: [] }
  }

  const requirements: ParsedRequirement[] = []
  const errors: string[] = []

  // Split by semicolons but respect parentheses
  const segments: string[] = []
  let current = ''
  let parenDepth = 0

  for (const char of notation) {
    if (char === '(') parenDepth++
    if (char === ')') parenDepth--
    if (char === ';' && parenDepth === 0) {
      if (current.trim()) segments.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  if (current.trim()) segments.push(current.trim())

  for (const segment of segments) {
    if (segment.startsWith('(') && segment.endsWith(')')) {
      // OR group
      const inner = segment.slice(1, -1)
      const alternatives = inner.split('|').map((a) => a.trim())
      const orGroupId = crypto.randomUUID()

      for (const alt of alternatives) {
        const result = parseRequirementToken(alt, courseMap, orGroupId)
        if (result.error) {
          errors.push(result.error)
        } else if (result.requirement) {
          requirements.push(result.requirement)
        }
      }
    } else {
      // Standalone requirement
      const result = parseRequirementToken(segment, courseMap, null)
      if (result.error) {
        errors.push(result.error)
      } else if (result.requirement) {
        requirements.push(result.requirement)
      }
    }
  }

  return { requirements, errors }
}

// =============================================================================
// FIELD VALIDATION
// =============================================================================

/**
 * Validate a field of study name against the database
 * Returns the field ID if valid, null otherwise
 */
function validateFieldOfStudy(
  name: string,
  fieldMap: Map<string, string>
): { id: string | null; error: string | null } {
  if (!name || name.trim() === '') {
    return { id: null, error: 'Field of study is required' }
  }

  const normalized = name.toLowerCase().trim()
  const fieldId = fieldMap.get(normalized)

  if (!fieldId) {
    const validFields = Array.from(fieldMap.keys())
      .map((f) =>
        f
          .split(' ')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ')
      )
      .slice(0, 5)
    return {
      id: null,
      error: `Field "${name}" not found. Valid values include: ${validFields.join(', ')}...`
    }
  }

  return { id: fieldId, error: null }
}

/**
 * Validate degree type
 */
function validateDegreeType(
  value: string,
  validTypes: string[]
): { normalized: string | null; error: string | null } {
  if (!value || value.trim() === '') {
    return { normalized: null, error: 'Degree type is required' }
  }

  const normalized = value.trim()
  const matched = validTypes.find((t) => t.toLowerCase() === normalized.toLowerCase())

  if (!matched) {
    return {
      normalized: null,
      error: `Invalid degree type "${value}". Valid values: ${validTypes.join(', ')}`
    }
  }

  return { normalized: matched, error: null }
}

/**
 * Validate IB points
 */
function validateIBPoints(value: string): { points: number | null; error: string | null } {
  if (!value || value.trim() === '') {
    return { points: null, error: null } // Optional field
  }

  const points = parseInt(value.trim(), 10)

  if (isNaN(points)) {
    return { points: null, error: `Invalid IB points "${value}". Must be a number.` }
  }

  if (points < MIN_IB_POINTS || points > MAX_IB_POINTS) {
    return {
      points: null,
      error: `IB points "${value}" out of range. Must be ${MIN_IB_POINTS}-${MAX_IB_POINTS}.`
    }
  }

  return { points, error: null }
}

/**
 * Validate URL format
 */
function validateURL(value: string): { url: string | null; error: string | null } {
  if (!value || value.trim() === '') {
    return { url: null, error: null } // Optional field
  }

  const trimmed = value.trim()

  try {
    new URL(trimmed)
    return { url: trimmed, error: null }
  } catch {
    return { url: null, error: `Invalid URL format: "${value}"` }
  }
}

// =============================================================================
// ROW VALIDATION
// =============================================================================

/**
 * Validate a single row of program data
 */
function validateRow(raw: RawProgramData, context: ValidationContext): RowValidationResult {
  const errors: FieldError[] = []
  let validated: ValidatedProgram | undefined

  // Validate required text fields
  if (!raw.name || raw.name.trim() === '') {
    errors.push({ field: 'name', message: 'Program name is required', value: raw.name })
  }

  if (!raw.description || raw.description.trim() === '') {
    errors.push({
      field: 'description',
      message: 'Description is required',
      value: raw.description
    })
  }

  if (!raw.duration || raw.duration.trim() === '') {
    errors.push({ field: 'duration', message: 'Duration is required', value: raw.duration })
  }

  // Validate field of study
  const fieldResult = validateFieldOfStudy(raw.fieldOfStudy, context.fieldMap)
  if (fieldResult.error) {
    errors.push({ field: 'field_of_study', message: fieldResult.error, value: raw.fieldOfStudy })
  }

  // Validate degree type
  const degreeResult = validateDegreeType(raw.degreeType, context.validDegreeTypes)
  if (degreeResult.error) {
    errors.push({ field: 'degree_type', message: degreeResult.error, value: raw.degreeType })
  }

  // Validate IB points
  const pointsResult = validateIBPoints(raw.minIBPoints)
  if (pointsResult.error) {
    errors.push({ field: 'min_ib_points', message: pointsResult.error, value: raw.minIBPoints })
  }

  // Validate URL
  const urlResult = validateURL(raw.programUrl)
  if (urlResult.error) {
    errors.push({ field: 'program_url', message: urlResult.error, value: raw.programUrl })
  }

  // Validate course requirements
  const reqResult = parseRequirements(raw.courseRequirements, context.courseMap)
  for (const error of reqResult.errors) {
    errors.push({ field: 'course_requirements', message: error, value: raw.courseRequirements })
  }

  const isValid = errors.length === 0

  if (isValid) {
    validated = {
      name: raw.name.trim(),
      description: raw.description.trim(),
      fieldOfStudyId: fieldResult.id!,
      degreeType: degreeResult.normalized!,
      duration: raw.duration.trim(),
      minIBPoints: pointsResult.points,
      programUrl: urlResult.url,
      courseRequirements: reqResult.requirements
    }
  }

  return {
    rowNumber: raw.rowNumber,
    isValid,
    errors,
    data: raw,
    validated
  }
}

// =============================================================================
// MAIN PARSE FUNCTION
// =============================================================================

/**
 * Parse and validate a CSV file for bulk program upload
 *
 * @param content - Raw CSV file content as string
 * @param context - Validation context with reference data maps
 * @returns Complete parse result with validation status for each row
 */
export function parseCSV(content: string, context: ValidationContext): ParseResult {
  const headerErrors: string[] = []

  // Parse CSV
  const { headers, rows } = parseCSVContent(content)

  if (headers.length === 0) {
    return {
      isValid: false,
      totalRows: 0,
      validRows: 0,
      invalidRows: 0,
      rows: [],
      headerErrors: ['CSV file is empty or has no valid headers']
    }
  }

  // Validate headers
  for (const required of REQUIRED_HEADERS) {
    if (!headers.includes(required)) {
      headerErrors.push(`Missing required column: ${required}`)
    }
  }

  // Check for unknown headers
  for (const header of headers) {
    if (!ALL_HEADERS.includes(header)) {
      headerErrors.push(`Unknown column: ${header}`)
    }
  }

  if (headerErrors.length > 0) {
    return {
      isValid: false,
      totalRows: 0,
      validRows: 0,
      invalidRows: 0,
      rows: [],
      headerErrors
    }
  }

  // Parse and validate each row
  const validatedRows: RowValidationResult[] = []

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const obj = rowToObject(headers, row)

    const raw: RawProgramData = {
      rowNumber: i + 2, // +2 because: 1-indexed + header row
      name: obj['name'] || '',
      description: obj['description'] || '',
      fieldOfStudy: obj['field_of_study'] || '',
      degreeType: obj['degree_type'] || '',
      duration: obj['duration'] || '',
      minIBPoints: obj['min_ib_points'] || '',
      programUrl: obj['program_url'] || '',
      courseRequirements: obj['course_requirements'] || ''
    }

    const result = validateRow(raw, context)
    validatedRows.push(result)
  }

  const validRows = validatedRows.filter((r) => r.isValid).length
  const invalidRows = validatedRows.filter((r) => !r.isValid).length

  return {
    isValid: invalidRows === 0,
    totalRows: validatedRows.length,
    validRows,
    invalidRows,
    rows: validatedRows,
    headerErrors: []
  }
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Build validation context from database reference data
 */
export function buildValidationContext(
  fields: Array<{ id: string; name: string }>,
  courses: Array<{ id: string; code: string }>,
  degreeTypes?: string[]
): ValidationContext {
  const fieldMap = new Map<string, string>()
  for (const field of fields) {
    fieldMap.set(field.name.toLowerCase(), field.id)
  }

  const courseMap = new Map<string, string>()
  for (const course of courses) {
    courseMap.set(course.code.toUpperCase(), course.id)
  }

  return {
    fieldMap,
    courseMap,
    validDegreeTypes: degreeTypes || DEFAULT_DEGREE_TYPES
  }
}

/**
 * Get all valid programs from a parse result
 */
export function getValidPrograms(result: ParseResult): ValidatedProgram[] {
  return result.rows.filter((r) => r.isValid && r.validated).map((r) => r.validated!)
}

/**
 * Format errors for display
 */
export function formatErrors(result: ParseResult): string[] {
  const messages: string[] = []

  if (result.headerErrors.length > 0) {
    messages.push(...result.headerErrors.map((e) => `Header error: ${e}`))
  }

  for (const row of result.rows) {
    if (!row.isValid) {
      for (const error of row.errors) {
        messages.push(`Row ${row.rowNumber}, ${error.field}: ${error.message}`)
      }
    }
  }

  return messages
}
