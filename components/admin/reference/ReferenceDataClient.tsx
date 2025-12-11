'use client'

import { useState, useEffect } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  BookOpen,
  Globe,
  GraduationCap,
  X,
  Loader2,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { IB_SUBJECT_GROUPS } from '@/lib/constants/ib-groups'
import { FieldIcon, AVAILABLE_FIELD_ICONS } from '@/lib/icons'

// Types
interface FieldOfStudy {
  id: string
  name: string
  iconName: string | null
  description: string | null
  _count: { programs: number; interestedStudents: number }
}

interface Country {
  id: string
  name: string
  code: string
  flagEmoji: string
  _count: { universities: number; schools: number; interestedStudents: number }
}

interface IBCourse {
  id: string
  name: string
  code: string
  group: number
  _count: { studentCourses: number; programRequirements: number }
}

type Tab = 'fields' | 'countries' | 'courses'

export function ReferenceDataClient() {
  const [activeTab, setActiveTab] = useState<Tab>('fields')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Data states
  const [fields, setFields] = useState<FieldOfStudy[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [courses, setCourses] = useState<IBCourse[]>([])

  // Modal states
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<FieldOfStudy | Country | IBCourse | null>(null)
  const [saving, setSaving] = useState(false)
  const [modalError, setModalError] = useState<string | null>(null)

  // Delete confirmation
  const [deletingItem, setDeletingItem] = useState<{ id: string; name: string } | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    iconName: '',
    description: '',
    code: '',
    group: 1
  })

  // Fetch data based on active tab
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  async function fetchData() {
    setLoading(true)
    setError(null)

    try {
      let url = ''
      switch (activeTab) {
        case 'fields':
          url = '/api/admin/reference/fields'
          break
        case 'countries':
          url = '/api/admin/reference/countries'
          break
        case 'courses':
          url = '/api/admin/reference/courses'
          break
      }

      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch data')

      const data = await res.json()

      switch (activeTab) {
        case 'fields':
          setFields(data)
          break
        case 'countries':
          setCountries(data)
          break
        case 'courses':
          setCourses(data)
          break
      }
    } catch {
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  function openCreateModal() {
    setEditingItem(null)
    setFormData({ name: '', iconName: '', description: '', code: '', group: 1 })
    setModalError(null)
    setShowModal(true)
  }

  function openEditModal(item: FieldOfStudy | Country | IBCourse) {
    setEditingItem(item)
    setFormData({
      name: item.name,
      iconName: 'iconName' in item ? item.iconName || '' : '',
      description: 'description' in item ? item.description || '' : '',
      code: 'code' in item ? item.code : '',
      group: 'group' in item ? item.group : 1
    })
    setModalError(null)
    setShowModal(true)
  }

  async function handleSave() {
    setSaving(true)
    setModalError(null)

    try {
      let url = ''
      let body: Record<string, unknown> = {}

      switch (activeTab) {
        case 'fields':
          url = editingItem
            ? `/api/admin/reference/fields/${editingItem.id}`
            : '/api/admin/reference/fields'
          body = {
            name: formData.name,
            iconName: formData.iconName || null,
            description: formData.description || null
          }
          break
        case 'countries':
          url = editingItem
            ? `/api/admin/reference/countries/${editingItem.id}`
            : '/api/admin/reference/countries'
          body = {
            name: formData.name,
            code: formData.code
          }
          break
        case 'courses':
          url = editingItem
            ? `/api/admin/reference/courses/${editingItem.id}`
            : '/api/admin/reference/courses'
          body = {
            name: formData.name,
            code: formData.code,
            group: formData.group
          }
          break
      }

      const res = await fetch(url, {
        method: editingItem ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to save')
      }

      setShowModal(false)
      fetchData()
    } catch (err) {
      setModalError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deletingItem) return

    setSaving(true)
    setDeleteError(null)

    try {
      let url = ''
      switch (activeTab) {
        case 'fields':
          url = `/api/admin/reference/fields/${deletingItem.id}`
          break
        case 'countries':
          url = `/api/admin/reference/countries/${deletingItem.id}`
          break
        case 'courses':
          url = `/api/admin/reference/courses/${deletingItem.id}`
          break
      }

      const res = await fetch(url, { method: 'DELETE' })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to delete')
      }

      setDeletingItem(null)
      fetchData()
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete')
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { id: 'fields' as Tab, label: 'Fields of Study', icon: BookOpen, count: fields.length },
    { id: 'countries' as Tab, label: 'Countries', icon: Globe, count: countries.length },
    { id: 'courses' as Tab, label: 'IB Courses', icon: GraduationCap, count: courses.length }
  ]

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors',
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-muted">{tab.count}</span>
            </button>
          )
        })}
      </div>

      {/* Action Bar */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">
          {activeTab === 'fields' && 'Manage fields of study for program categorization.'}
          {activeTab === 'countries' && 'Manage countries for location preferences.'}
          {activeTab === 'courses' && 'Manage IB curriculum courses.'}
        </p>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add {activeTab === 'fields' ? 'Field' : activeTab === 'countries' ? 'Country' : 'Course'}
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Data Tables */}
      {!loading && !error && (
        <div className="rounded-lg border bg-card overflow-hidden">
          {activeTab === 'fields' && (
            <FieldsTable
              fields={fields}
              onEdit={openEditModal}
              onDelete={(f) => setDeletingItem({ id: f.id, name: f.name })}
            />
          )}
          {activeTab === 'countries' && (
            <CountriesTable
              countries={countries}
              onEdit={openEditModal}
              onDelete={(c) => setDeletingItem({ id: c.id, name: c.name })}
            />
          )}
          {activeTab === 'courses' && (
            <CoursesTable
              courses={courses}
              onEdit={openEditModal}
              onDelete={(c) => setDeletingItem({ id: c.id, name: c.name })}
            />
          )}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <Modal
          title={editingItem ? 'Edit' : 'Add New'}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          saving={saving}
          error={modalError}
        >
          {activeTab === 'fields' && (
            <>
              <FormField label="Name" required>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., Engineering"
                />
              </FormField>
              <FormField label="Icon (optional)">
                <div className="flex gap-3 items-center">
                  {/* Icon preview */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                    {formData.iconName ? (
                      (() => {
                        const selectedIcon = AVAILABLE_FIELD_ICONS.find(
                          (i) => i.key === formData.iconName
                        )
                        if (selectedIcon) {
                          const IconComp = selectedIcon.icon
                          return <IconComp className="h-5 w-5 text-primary" />
                        }
                        return <BookOpen className="h-5 w-5 text-muted-foreground" />
                      })()
                    ) : (
                      <FieldIcon
                        fieldName={formData.name || ''}
                        className="h-5 w-5 text-muted-foreground"
                      />
                    )}
                  </div>
                  {/* Icon selector */}
                  <select
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    className="flex-1 px-3 py-2 border rounded-lg"
                  >
                    <option value="">Auto (based on name)</option>
                    {AVAILABLE_FIELD_ICONS.map((iconOption) => (
                      <option key={iconOption.key} value={iconOption.key}>
                        {iconOption.label}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Leave as &quot;Auto&quot; to use the default icon based on field name.
                </p>
              </FormField>
              <FormField label="Description">
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., Engineering, Technology, Design"
                />
              </FormField>
            </>
          )}
          {activeTab === 'countries' && (
            <>
              <FormField label="Name" required>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., United States"
                />
              </FormField>
              <FormField label="ISO Code (2 letters)" required>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., US"
                  maxLength={2}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Flag emoji will be generated automatically from the code.
                </p>
              </FormField>
            </>
          )}
          {activeTab === 'courses' && (
            <>
              <FormField label="Name" required>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., Biology"
                />
              </FormField>
              <FormField label="Course Code" required>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., BIO"
                />
              </FormField>
              <FormField label="IB Group (1-6)" required>
                <select
                  value={formData.group}
                  onChange={(e) => setFormData({ ...formData, group: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {IB_SUBJECT_GROUPS.map((g) => (
                    <option key={g.id} value={g.id}>
                      Group {g.id}: {g.name}
                    </option>
                  ))}
                </select>
              </FormField>
            </>
          )}
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deletingItem && (
        <Modal
          title="Delete Confirmation"
          onClose={() => {
            setDeletingItem(null)
            setDeleteError(null)
          }}
          onSave={handleDelete}
          saving={saving}
          error={deleteError}
          saveLabel="Delete"
          destructive
        >
          <p className="text-foreground">
            Are you sure you want to delete <strong>{deletingItem.name}</strong>?
          </p>
          <p className="text-sm text-muted-foreground mt-2">This action cannot be undone.</p>
        </Modal>
      )}
    </div>
  )
}

// Sub-components

function FieldsTable({
  fields,
  onEdit,
  onDelete
}: {
  fields: FieldOfStudy[]
  onEdit: (f: FieldOfStudy) => void
  onDelete: (f: FieldOfStudy) => void
}) {
  if (fields.length === 0) {
    return <EmptyState message="No fields of study yet." />
  }

  return (
    <table className="w-full">
      <thead className="bg-muted/50">
        <tr>
          <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Icon</th>
          <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Name</th>
          <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
            Description
          </th>
          <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Usage</th>
          <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {fields.map((field) => (
          <tr key={field.id} className="hover:bg-muted/30">
            <td className="px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <FieldIcon
                  fieldName={field.name}
                  iconKey={field.iconName}
                  className="h-5 w-5 text-muted-foreground"
                />
              </div>
            </td>
            <td className="px-4 py-3 font-medium">{field.name}</td>
            <td className="px-4 py-3 text-sm text-muted-foreground">{field.description || '—'}</td>
            <td className="px-4 py-3 text-sm text-muted-foreground">
              {field._count.programs} programs, {field._count.interestedStudents} students
            </td>
            <td className="px-4 py-3 text-right">
              <ActionButtons onEdit={() => onEdit(field)} onDelete={() => onDelete(field)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function CountriesTable({
  countries,
  onEdit,
  onDelete
}: {
  countries: Country[]
  onEdit: (c: Country) => void
  onDelete: (c: Country) => void
}) {
  if (countries.length === 0) {
    return <EmptyState message="No countries yet." />
  }

  return (
    <table className="w-full">
      <thead className="bg-muted/50">
        <tr>
          <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Flag</th>
          <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Name</th>
          <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Code</th>
          <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Usage</th>
          <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {countries.map((country) => (
          <tr key={country.id} className="hover:bg-muted/30">
            <td className="px-4 py-3 text-xl">{country.flagEmoji}</td>
            <td className="px-4 py-3 font-medium">{country.name}</td>
            <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{country.code}</td>
            <td className="px-4 py-3 text-sm text-muted-foreground">
              {country._count.universities} unis, {country._count.schools} schools,{' '}
              {country._count.interestedStudents} students
            </td>
            <td className="px-4 py-3 text-right">
              <ActionButtons onEdit={() => onEdit(country)} onDelete={() => onDelete(country)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function CoursesTable({
  courses,
  onEdit,
  onDelete
}: {
  courses: IBCourse[]
  onEdit: (c: IBCourse) => void
  onDelete: (c: IBCourse) => void
}) {
  if (courses.length === 0) {
    return <EmptyState message="No IB courses yet." />
  }

  const getGroupName = (group: number) => {
    const g = IB_SUBJECT_GROUPS.find((sg) => sg.id === group)
    return g ? g.shortName : `Group ${group}`
  }

  return (
    <table className="w-full">
      <thead className="bg-muted/50">
        <tr>
          <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Code</th>
          <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Name</th>
          <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Group</th>
          <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Usage</th>
          <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {courses.map((course) => (
          <tr key={course.id} className="hover:bg-muted/30">
            <td className="px-4 py-3 font-mono text-sm font-medium">{course.code}</td>
            <td className="px-4 py-3 font-medium">{course.name}</td>
            <td className="px-4 py-3 text-sm text-muted-foreground">
              {getGroupName(course.group)}
            </td>
            <td className="px-4 py-3 text-sm text-muted-foreground">
              {course._count.studentCourses} students, {course._count.programRequirements} programs
            </td>
            <td className="px-4 py-3 text-right">
              <ActionButtons onEdit={() => onEdit(course)} onDelete={() => onDelete(course)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function ActionButtons({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={onEdit}
        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
        title="Edit"
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        onClick={onDelete}
        className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-12 text-center text-muted-foreground">
      <p>{message}</p>
    </div>
  )
}

function Modal({
  title,
  onClose,
  onSave,
  saving,
  error,
  saveLabel = 'Save',
  destructive = false,
  children
}: {
  title: string
  onClose: () => void
  onSave: () => void
  saving: boolean
  error: string | null
  saveLabel?: string
  destructive?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-xl shadow-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">{children}</div>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2',
              destructive
                ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                : 'bg-primary text-primary-foreground hover:bg-primary/90',
              saving && 'opacity-50 cursor-not-allowed'
            )}
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {saveLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

function FormField({
  label,
  required,
  children
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </label>
      {children}
    </div>
  )
}
