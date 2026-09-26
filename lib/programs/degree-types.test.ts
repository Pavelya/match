import { describe, expect, it } from 'vitest'
import {
  DEGREE_TYPES,
  DEGREE_TYPE_VARIANTS,
  canonicalDegreeType,
  degreeLevel,
  isDegreeType
} from './degree-types'

// Every AcademicProgram.degreeType value in production on 26 September 2026 (156 spellings,
// 1,282 programs). Phase 4 normalises them; until then each must map to a canonical type.
const STORED_2026_09_26 = [
  'Bachelor of Science',
  'Bachelor',
  'Bachelor of Arts',
  'Bachelor of Engineering',
  'Bachelor of Science (B.Sc.)',
  'Bachelor of Applied Science',
  'BA',
  'Bachelor of Arts (B.A.)',
  'Master',
  'BSc',
  'MEng',
  'Bachelor of Business Administration',
  'MA (Hons)',
  'Bachelor of Commerce',
  'Bachelor of Education',
  'BSc (Hons)',
  'Bachelor of Arts (Hons)',
  'MSci',
  'Bachelor of Engineering (Honours)',
  'Bachelor of Science (BSc)',
  'Bachelor of Science (Honors)',
  'Combined Bachelor',
  'Bachelor of Environmental Studies',
  'Bachelor of Laws',
  'Bachelor of Mathematics',
  'Bachelor of Music',
  'LLB (Hons)',
  'Bachelor of Arts (Honors)',
  'Bachelor of Arts in Engineering / Master in Engineering',
  'Bachelor of Engineering Honours',
  'Bachelor of Fine Arts',
  'BEng (Hons)',
  'Bachelor of Accountancy',
  'Bachelor of Arts (BA)',
  'Bachelor of Arts and Sciences',
  'Bachelor of Computing (Honours)',
  'Bachelor of Nursing',
  "Bachelor's Degree",
  'MEng (Hons)',
  'BA (Hons)',
  'Bachelor of Arts in Economics',
  'Bachelor of Communication Studies',
  'Bachelor of Design in Architecture',
  'Bachelor of Kinesiology',
  'Bachelor of Medicine and Bachelor of Surgery',
  'Bachelor of Science in Nursing',
  'Bachelor of Social Work',
  'Combined Bachelor and Master',
  'Master of Engineering',
  'Bachelor + Doctor of Medicine',
  'Bachelor of Business Studies',
  'Bachelor of Computer Science',
  'Bachelor of Design',
  'Bachelor of Economics',
  'Bachelor of Engineering (B.Eng.)',
  'Bachelor of Health Sciences (BHSc)',
  'Bachelor of Management and Organizational Studies (BMOS)',
  'Bachelor of Medicine',
  'Bachelor of Oral Health',
  'Bachelor of Science (Honours)',
  'Bachelor of Science in Engineering',
  'BEng',
  'Master of Pharmacy',
  'MMath',
  'BA & BEd (Double Degree)',
  'BA & BEng (Double Degree)',
  'BA & LLB (Double Degree)',
  'Bachelor (Honours) + Master',
  'Bachelor + Doctor of Dental Medicine',
  'Bachelor + Doctor of Veterinary Medicine',
  'Bachelor in Acting',
  'Bachelor in Business Studies',
  'Bachelor of Accounting and Financial Management',
  'Bachelor of Advanced Computing',
  'Bachelor of Agricultural Science',
  'Bachelor of Agriculture',
  'Bachelor of Animal and Veterinary Bioscience',
  'Bachelor of Applied Computing',
  'Bachelor of Architectural Science',
  'Bachelor of Arts (Dual Degree)',
  'Bachelor of Arts (Education)',
  'Bachelor of Arts (Honours)',
  'Bachelor of Arts / Bachelor of Science',
  'Bachelor of Arts and Science',
  'Bachelor of Arts in Criminology',
  'Bachelor of Arts in Engineering',
  'Bachelor of Arts in Social Sciences',
  'Bachelor of Biomedical Sciences',
  'Bachelor of Biomedicine',
  'Bachelor of Biomedicine and Health',
  'Bachelor of Business',
  'Bachelor of Business Administration (Accountancy)',
  'Bachelor of Business and Law',
  'Bachelor of Business Studies / Bachelor of Arts',
  'Bachelor of Chinese Medicine',
  'Bachelor of Civil Law',
  'Bachelor of Commerce (Bilingual)',
  'Bachelor of Computer Science / Bachelor of Business Administration',
  'Bachelor of Computing and Financial Management',
  'Bachelor of Dental Science',
  'Bachelor of Dental Surgery',
  'Bachelor of Education (B.Ed.)',
  'Bachelor of Engineering Science (BESc)',
  'Bachelor of Finance',
  'Bachelor of Global Business and Digital Arts',
  'Bachelor of International Studies',
  'Bachelor of Landscape Architecture',
  'Bachelor of Law (BLaw)',
  'Bachelor of Management',
  'Bachelor of Mathematical Sciences',
  'Bachelor of Mathematics / Bachelor of Business Administration',
  'Bachelor of Media and Communications',
  'Bachelor of Medical Sciences (BMSc)',
  'Bachelor of Medicine (BMed)',
  'Bachelor of Medicine, Bachelor of Surgery, Bachelor of Obstetrics',
  'Bachelor of Music / Bachelor of Arts',
  'Bachelor of Music Education',
  'Bachelor of Pharmacy',
  'Bachelor of Politics, Philosophy, and Economics',
  'Bachelor of Project Management',
  'Bachelor of Psychology',
  'Bachelor of Science (Foods and Nutrition)',
  'Bachelor of Science (Maritime Studies)',
  'Bachelor of Science (Stock Science and Management)',
  'Bachelor of Science in Architecture',
  'Bachelor of Science in Kinesiology',
  'Bachelor of Science in Midwifery',
  'Bachelor of Science in Nursing (BScN)',
  'Bachelor of Science in Physiotherapy',
  'Bachelor of Social Science',
  'Bachelor of Social Sciences',
  'Bachelor of Theology (BTh)',
  'BBA(Law) & LLB (Double Degree)',
  'BEd & BSc (Double Degree)',
  'BEng (Hons) / MEng (Hons)',
  'BEng + MScEng (Integrated Bachelor+Master)',
  'BFA',
  'BM BCh',
  'BN',
  'BSocSc & LLB (Double Degree)',
  'BVM&S',
  'Combined Bachelor (Honours)',
  'Dual Degree',
  'Master of Chemistry',
  'Master of Veterinary Medicine',
  'MBBS/BSc',
  'MBChB',
  'MBiochem',
  'MBiol',
  'MChem',
  'MEarthSci',
  'MInf',
  'MMathCompSci',
  'MMathPhil',
  'MPhys',
  'MPhysPhil'
]

describe('degree types', () => {
  it('maps every value stored on 26 September 2026 to a canonical type', () => {
    expect(STORED_2026_09_26).toHaveLength(156)
    const unmapped = STORED_2026_09_26.filter((v) => canonicalDegreeType(v) === null)
    expect(unmapped).toEqual([])
  })

  it('lists each canonical type once, ignoring case', () => {
    const lower = DEGREE_TYPES.map((t) => t.toLowerCase())
    expect(new Set(lower).size).toBe(lower.length)
  })

  it('keeps variants apart from canonical types', () => {
    for (const [variant, type] of Object.entries(DEGREE_TYPE_VARIANTS)) {
      expect(isDegreeType(variant)).toBe(false)
      expect(isDegreeType(type)).toBe(true)
    }
  })

  it('merges spellings of one award and keeps real award names', () => {
    for (const v of ['BSc', 'Bachelor of Science (B.Sc.)', 'BSc (Hons)', ' bachelor of science ']) {
      expect(canonicalDegreeType(v)).toBe('Bachelor of Science')
    }
    expect(canonicalDegreeType('MEng (Hons)')).toBe('Master of Engineering')
    expect(canonicalDegreeType('LLB (Hons)')).toBe('Bachelor of Laws')
    expect(canonicalDegreeType('MBChB')).toBe('Bachelor of Medicine and Bachelor of Surgery')
    expect(canonicalDegreeType('Bachelor of Kinesiology')).toBe('Bachelor of Kinesiology')
    expect(canonicalDegreeType('Doctor of Philosophy')).toBeNull()
  })

  it('counts a Scottish MA as a bachelor’s and an MEng as a master’s', () => {
    expect(degreeLevel('MA (Hons)')).toBe('bachelor')
    expect(degreeLevel('MEng')).toBe('master')
    expect(degreeLevel('BA & LLB (Double Degree)')).toBe('combined')
    expect(degreeLevel('Certificate')).toBeNull()
  })
})
