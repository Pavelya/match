# University of Edinburgh - Programs to Seed

**University:** University of Edinburgh
**Country:** United Kingdom (GB)

This file contains structured program data extracted from official University of Edinburgh pages, ready for bulk seeding.

---

## Program 1: MBChB Medicine (6-year programme)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/354-mbchb-medicine-6-year-programme |
| **Name** | MBChB Medicine (6-year programme) |
| **Degree Type** | MBChB |
| **Duration** | 6 years |
| **Field of Study** | Medicine & Health |

### Description (Exact from site)
> Our six-year Bachelor of Medicine and Surgery (MBChB) degree equips you with the knowledge, understanding and skills you need to become a Foundation Year 1 doctor.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 38 |
| **HL Grades Required** | 6, 6, 6 |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| Chemistry | HL | 6 | Yes | AND (mandatory) |
| Biology OR Mathematics OR Physics | HL | 6 | No | OR group (one required) |
| Any other subject | HL | 6 | No | AND (third HL) |

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| Mathematics (AA or AI) | SL | 6 | Yes | AND | Both Analysis and Approaches OR Applications and Interpretation accepted |
| English | SL | 5 | No | AND | English ab initio not accepted |
| Biology | SL | 6 | No | CONDITIONAL | Required only if Biology not taken at HL |

### Additional Notes
- All examination grades must be obtained at the **first attempt** of each subject
- Resits are generally not considered except in very exceptional circumstances
- UCAT test required
- Interview required
- Ranked 5th for medicine in the UK (Complete University Guide 2025)

### Seed Data Format
```typescript
{
  name: 'MBChB Medicine (6-year programme)',
  description: 'Our six-year Bachelor of Medicine and Surgery (MBChB) degree equips you with the knowledge, understanding and skills you need to become a Foundation Year 1 doctor.',
  field: 'Medicine & Health',
  degree: 'MBChB',
  duration: '6 years',
  minIBPoints: 38,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/354-mbchb-medicine-6-year-programme',
  requirements: [
    // HL Requirements
    { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },  // Chemistry mandatory
    { courses: ['BIO', 'MATH-AA', 'PHYS'], level: 'HL', grade: 6 },  // OR group: one of Bio/Math/Physics
    // SL Requirements  
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 6, critical: true },  // Math at SL (either AA or AI)
    { courses: ['BIO'], level: 'SL', grade: 6 }  // Biology at SL if not at HL
  ]
}
```

---

## Program 2: Veterinary Medicine (5-year programme)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/356-veterinary-medicine-5-year-programme |
| **Name** | Veterinary Medicine (5-year programme) |
| **Degree Type** | BVM&S |
| **Duration** | 5 years |
| **Field of Study** | Medicine & Health |

### Description (Exact from site)
> This five-year Bachelor of Veterinary Medicine and Surgery (BVM&S) programme will prepare you for many aspects of the veterinary profession.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 38 |
| **HL Grades Required** | 6, 6, 6 |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| Chemistry | HL | 6 | Yes | AND (mandatory) |
| Biology | HL | 6 | Yes | AND (mandatory) |
| Any other subject | HL | 6 | No | AND (third HL) |

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |

### Additional Notes
- All examination grades must be obtained at the **first attempt** of each subject
- Resits are generally not considered except in very exceptional circumstances
- Interview required
- Work Experience Summary (WES) form required
- Ranked **1st in UK** for veterinary science (Guardian League Tables 2025)
- Ranked **2nd in UK and 5th in the world** for veterinary science (QS World Rankings 2025)

### Seed Data Format
```typescript
{
  name: 'Veterinary Medicine (5-year programme)',
  description: 'This five-year Bachelor of Veterinary Medicine and Surgery (BVM&S) programme will prepare you for many aspects of the veterinary profession.',
  field: 'Medicine & Health',
  degree: 'BVM&S',
  duration: '5 years',
  minIBPoints: 38,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/356-veterinary-medicine-5-year-programme',
  requirements: [
    // HL Requirements - Both Chemistry AND Biology mandatory
    { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
    { courses: ['BIO'], level: 'HL', grade: 6, critical: true }
    // No specific SL requirements beyond English at 5 (handled by general IB English requirement)
  ]
}
```

---

## Program 3: Biomedical Sciences BSc (Hons)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/383-biomedical-sciences |
| **Name** | Biomedical Sciences BSc (Hons) |
| **Degree Type** | BSc (Hons) |
| **Duration** | 4 years |
| **Field of Study** | Medicine & Health |

### Description (Exact from site)
> The aim of biomedical science is to understand the function of the human body. In both health and disease, it looks at the following levels: molecular, cellular, organ, system.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 34 |
| **HL Grades Required** | 6, 5, 5 |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| Biology | HL | 5 or 6 | Yes | AND (with Chemistry) |
| Chemistry | HL | 5 or 6 | Yes | AND (with Biology) |
| Any other subject | HL | 5 | No | AND (third HL) |

**Note:** Biology AND Chemistry both required at HL. One must be at grade 6, the other at grade 5 (flexible which is which). Mathematics or Physics is recommended but not required.

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |
| Mathematics (AA or AI) | SL | 5 | No | AND | Either Analysis and Approaches OR Applications and Interpretation |

### Additional Notes
- Study abroad available in Year 3
- No placement
- Apply to only one Biomedical Sciences degree (can switch between specialisms later)

### Seed Data Format
```typescript
{
  name: 'Biomedical Sciences BSc (Hons)',
  description: 'The aim of biomedical science is to understand the function of the human body. In both health and disease, it looks at the following levels: molecular, cellular, organ, system.',
  field: 'Medicine & Health',
  degree: 'BSc (Hons)',
  duration: '4 years',
  minIBPoints: 34,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/383-biomedical-sciences',
  requirements: [
    // HL Requirements - Biology AND Chemistry (one at 6, one at 5)
    { courses: ['BIO'], level: 'HL', grade: 5, critical: true },
    { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
    // SL Requirements
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 }
  ]
}
```

---

## Program 4: Nursing Studies BN

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/113-nursing-studies |
| **Name** | Nursing Studies BN |
| **Degree Type** | BN (Bachelor of Nursing) |
| **Duration** | 4 years |
| **Field of Study** | Medicine & Health |

### Description (Exact from site)
> The Bachelor of Nursing (BN) with honours programme reflects global, UK and Scottish perspectives of healthcare. This highly regarded programme allows you to work closely with academic staff who are engaged in international nursing leadership, research and practice.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 34 |
| **HL Grades Required** | 6, 5, 5 |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| Any subject | HL | 6 | No | No specific subjects required |
| Any subject | HL | 5 | No | No specific subjects required |
| Any subject | HL | 5 | No | No specific subjects required |

**Note:** No specific HL subjects required - HLs can be in any subject.

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |
| Mathematics | SL | 4 | No | AND | Any Mathematics type accepted |

### Additional Notes
- Interview required
- Prior experience working with people is advisable
- Fitness to practise requirements apply
- Ranked **1st in General Nursing** in the UK (Guardian 2026)
- Ranked **1st in Nursing** in the UK (Times 2026)
- Study abroad available in Year 3
- Mandatory clinical placements throughout
- NMC (Nursing and Midwifery Council) accredited

### Seed Data Format
```typescript
{
  name: 'Nursing Studies BN',
  description: 'The Bachelor of Nursing (BN) with honours programme reflects global, UK and Scottish perspectives of healthcare. This highly regarded programme allows you to work closely with academic staff who are engaged in international nursing leadership, research and practice.',
  field: 'Medicine & Health',
  degree: 'BN',
  duration: '4 years',
  minIBPoints: 34,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/113-nursing-studies',
  requirements: [
    // No specific HL requirements
    // SL Requirements - only Math at 4 (lower than typical)
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 }
  ]
}
```

---

## Program 5: Neuroscience BSc (Hons)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/2-neuroscience |
| **Name** | Neuroscience BSc (Hons) |
| **Degree Type** | BSc (Hons) |
| **Duration** | 4 years |
| **Field of Study** | Medicine & Health |

### Description (Exact from site)
> Neuroscience is the study of the nervous system, how the brain works, and how cells interact to control behaviour. Research in neuroscience tries to better understand the structure of the nervous system, exploring how it works, develops, malfunctions, and can be manipulated.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 34 |
| **HL Grades Required** | 6, 5, 5 |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| Biology | HL | 5 or 6 | Yes | AND (with Chemistry) |
| Chemistry | HL | 5 or 6 | Yes | AND (with Biology) |
| Any other subject | HL | 5 | No | AND (third HL) |

**Note:** Biology AND Chemistry both required at HL. One must be at grade 6, the other at grade 5 (flexible which is which). Mathematics or Physics is recommended but not required.

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |
| Mathematics (AA or AI) | SL | 5 | No | AND | Either Analysis and Approaches OR Applications and Interpretation |

### Additional Notes
- Study abroad available in Year 3
- No placement
- Part of Biomedical Sciences suite (can switch between specialisms in later years)
- Apply to only one Biomedical Sciences degree

### Seed Data Format
```typescript
{
  name: 'Neuroscience BSc (Hons)',
  description: 'Neuroscience is the study of the nervous system, how the brain works, and how cells interact to control behaviour. Research in neuroscience tries to better understand the structure of the nervous system, exploring how it works, develops, malfunctions, and can be manipulated.',
  field: 'Medicine & Health',
  degree: 'BSc (Hons)',
  duration: '4 years',
  minIBPoints: 34,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/2-neuroscience',
  requirements: [
    // HL Requirements - Biology AND Chemistry (one at 6, one at 5)
    { courses: ['BIO'], level: 'HL', grade: 5, critical: true },
    { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
    // SL Requirements
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 }
  ]
}
```

---

## Program 6: Pharmacology BSc (Hons)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/3-pharmacology |
| **Name** | Pharmacology BSc (Hons) |
| **Degree Type** | BSc (Hons) |
| **Duration** | 4 years |
| **Field of Study** | Medicine & Health |

### Description (Exact from site)
> Pharmacology is the study of how drugs can affect the body - whether to treat disorders or change bodily functions. It brings together the study of physiology, biochemistry, and molecular biology, combining the three disciplines to encourage new insights.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 34 |
| **HL Grades Required** | 6, 5, 5 |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| Biology | HL | 5 or 6 | Yes | AND (with Chemistry) |
| Chemistry | HL | 5 or 6 | Yes | AND (with Biology) |
| Any other subject | HL | 5 | No | AND (third HL) |

**Note:** Biology AND Chemistry both required at HL. One must be at grade 6, the other at grade 5 (flexible which is which). Mathematics or Physics is recommended but not required.

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |
| Mathematics (AA or AI) | SL | 5 | No | AND | Either Analysis and Approaches OR Applications and Interpretation |

### Additional Notes
- Study abroad available in Year 3
- No placement
- Part of Biomedical Sciences suite (can switch between specialisms in later years)
- Apply to only one Biomedical Sciences degree

### Seed Data Format
```typescript
{
  name: 'Pharmacology BSc (Hons)',
  description: 'Pharmacology is the study of how drugs can affect the body - whether to treat disorders or change bodily functions. It brings together the study of physiology, biochemistry, and molecular biology, combining the three disciplines to encourage new insights.',
  field: 'Medicine & Health',
  degree: 'BSc (Hons)',
  duration: '4 years',
  minIBPoints: 34,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/3-pharmacology',
  requirements: [
    // HL Requirements - Biology AND Chemistry (one at 6, one at 5)
    { courses: ['BIO'], level: 'HL', grade: 5, critical: true },
    { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
    // SL Requirements
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 }
  ]
}
```

---

## Program 7: Anatomy and Development BSc (Hons)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/656-anatomy-and-development |
| **Name** | Anatomy and Development BSc (Hons) |
| **Degree Type** | BSc (Hons) |
| **Duration** | 4 years |
| **Field of Study** | Medicine & Health |

### Description (Exact from site)
> The fields of anatomy and developmental biology are closely linked. Knowledge of anatomy is vital in many areas of biology and medicine, including developmental biology. Similarly, developmental biology tells us much about how normal anatomy is formed and maintained.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 34 |
| **HL Grades Required** | 6, 5, 5 |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| Biology | HL | 5 or 6 | Yes | AND (with Chemistry) |
| Chemistry | HL | 5 or 6 | Yes | AND (with Biology) |
| Any other subject | HL | 5 | No | AND (third HL) |

**Note:** Biology AND Chemistry both required at HL. One must be at grade 6, the other at grade 5 (flexible which is which). Mathematics or Physics is recommended but not required.

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |
| Mathematics (AA or AI) | SL | 5 | No | AND | Either Analysis and Approaches OR Applications and Interpretation |

### Additional Notes
- Study abroad available in Year 3
- No placement
- Part of Biomedical Sciences suite (can switch between specialisms in later years)
- Apply to only one Biomedical Sciences degree

### Seed Data Format
```typescript
{
  name: 'Anatomy and Development BSc (Hons)',
  description: 'The fields of anatomy and developmental biology are closely linked. Knowledge of anatomy is vital in many areas of biology and medicine, including developmental biology. Similarly, developmental biology tells us much about how normal anatomy is formed and maintained.',
  field: 'Medicine & Health',
  degree: 'BSc (Hons)',
  duration: '4 years',
  minIBPoints: 34,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/656-anatomy-and-development',
  requirements: [
    // HL Requirements - Biology AND Chemistry (one at 6, one at 5)
    { courses: ['BIO'], level: 'HL', grade: 5, critical: true },
    { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
    // SL Requirements
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 }
  ]
}
```

---

## Program 8: Infectious Diseases BSc (Hons)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/437-infectious-diseases |
| **Name** | Infectious Diseases BSc (Hons) |
| **Degree Type** | BSc (Hons) |
| **Duration** | 4 years |
| **Field of Study** | Medicine & Health |

### Description (Exact from site)
> Infectious diseases shape our world, representing hugely complex global challenges not only to healthcare, but also economically and societally.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 34 |
| **HL Grades Required** | 6, 5, 5 |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| Biology | HL | 5 or 6 | Yes | AND (with Chemistry) |
| Chemistry | HL | 5 or 6 | Yes | AND (with Biology) |
| Any other subject | HL | 5 | No | AND (third HL) |

**Note:** Biology AND Chemistry both required at HL. One must be at grade 6, the other at grade 5 (flexible which is which). Mathematics or Physics is recommended but not required.

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |
| Mathematics (AA or AI) | SL | 5 | No | AND | Either Analysis and Approaches OR Applications and Interpretation |

### Additional Notes
- Study abroad available in Year 3
- No placement
- Part of Biomedical Sciences suite (can switch between specialisms in later years)
- Apply to only one Biomedical Sciences degree

### Seed Data Format
```typescript
{
  name: 'Infectious Diseases BSc (Hons)',
  description: 'Infectious diseases shape our world, representing hugely complex global challenges not only to healthcare, but also economically and societally.',
  field: 'Medicine & Health',
  degree: 'BSc (Hons)',
  duration: '4 years',
  minIBPoints: 34,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/437-infectious-diseases',
  requirements: [
    // HL Requirements - Biology AND Chemistry (one at 6, one at 5)
    { courses: ['BIO'], level: 'HL', grade: 5, critical: true },
    { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
    // SL Requirements
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 }
  ]
}
```

---

## Program 9: Reproductive Biology BSc (Hons)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/384-reproductive-biology |
| **Name** | Reproductive Biology BSc (Hons) |
| **Degree Type** | BSc (Hons) |
| **Duration** | 4 years |
| **Field of Study** | Medicine & Health |

### Description (Exact from site)
> Reproductive biology aims to understand the scientific principles that govern reproduction in humans and other mammals.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 34 |
| **HL Grades Required** | 6, 5, 5 |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| Biology | HL | 5 or 6 | Yes | AND (with Chemistry) |
| Chemistry | HL | 5 or 6 | Yes | AND (with Biology) |
| Any other subject | HL | 5 | No | AND (third HL) |

**Note:** Biology AND Chemistry both required at HL. One must be at grade 6, the other at grade 5 (flexible which is which). Mathematics or Physics is recommended but not required.

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |
| Mathematics (AA or AI) | SL | 5 | No | AND | Either Analysis and Approaches OR Applications and Interpretation |

### Additional Notes
- Study abroad available in Year 3
- No placement
- Part of Biomedical Sciences suite (can switch between specialisms in later years)
- Apply to only one Biomedical Sciences degree

### Seed Data Format
```typescript
{
  name: 'Reproductive Biology BSc (Hons)',
  description: 'Reproductive biology aims to understand the scientific principles that govern reproduction in humans and other mammals.',
  field: 'Medicine & Health',
  degree: 'BSc (Hons)',
  duration: '4 years',
  minIBPoints: 34,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/384-reproductive-biology',
  requirements: [
    // HL Requirements - Biology AND Chemistry (one at 6, one at 5)
    { courses: ['BIO'], level: 'HL', grade: 5, critical: true },
    { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
    // SL Requirements
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 }
  ]
}
```

---

## Program 10: Accounting and Finance MA (Hons)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/464-accounting-and-finance |
| **Name** | Accounting and Finance MA (Hons) |
| **Degree Type** | MA (Hons) |
| **Duration** | 4 years |
| **Field of Study** | Business & Economics |

### Description (Exact from site)
> This programme combines the study of accounting and finance to prepare you for the social, political, environmental and cultural challenges facing contemporary businesses, governments and not-for-profit organisations.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 37 (range: 37-42) |
| **HL Grades Required** | 6, 6, 6 (range: 666 to 766) |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| Any subject | HL | 6 | No | No specific subjects required |
| Any subject | HL | 6 | No | No specific subjects required |
| Any subject | HL | 6 | No | No specific subjects required |

**Note:** No specific HL subjects required - HLs can be in any subject. Competitive program with grade range.

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |
| Mathematics | SL | 5 | No | AND | Any Mathematics type accepted |

### Additional Notes
- Study abroad available in Year 3
- No placement
- Double accreditation: **AACSB** and **EQUIS**
- Professional accounting accreditations: ICAS, ICAEW, ACCA, CIPFA, AIA, CIMA
- Exemptions available for professional accounting examinations

### Seed Data Format
```typescript
{
  name: 'Accounting and Finance MA (Hons)',
  description: 'This programme combines the study of accounting and finance to prepare you for the social, political, environmental and cultural challenges facing contemporary businesses, governments and not-for-profit organisations.',
  field: 'Business & Economics',
  degree: 'MA (Hons)',
  duration: '4 years',
  minIBPoints: 37,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/464-accounting-and-finance',
  requirements: [
    // No specific HL requirements
    // SL Requirements
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 }
  ]
}
```

---

## Program 11: Accounting and Business MA (Hons)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/189-accounting-and-business |
| **Name** | Accounting and Business MA (Hons) |
| **Degree Type** | MA (Hons) |
| **Duration** | 4 years |
| **Field of Study** | Business & Economics |

### Description (Exact from site)
> This programme combines the study of accounting and business to prepare you for the social, political, environmental and cultural challenges facing contemporary businesses, governments and not-for-profit organisations.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 37 (range: 37-42) |
| **HL Grades Required** | 6, 6, 6 (range: 666 to 766) |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| Any subject | HL | 6 | No | No specific subjects required |
| Any subject | HL | 6 | No | No specific subjects required |
| Any subject | HL | 6 | No | No specific subjects required |

**Note:** No specific HL subjects required - HLs can be in any subject. Competitive program with grade range.

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |
| Mathematics | SL | 5 | No | AND | Any Mathematics type accepted |

### Additional Notes
- Study abroad available in Year 3
- No placement
- Double accreditation: **AACSB** and **EQUIS**
- Professional accounting accreditations: ICAS, ICAEW, ACCA, CIPFA, AIA, CIMA
- Exemptions available for professional accounting examinations

### Seed Data Format
```typescript
{
  name: 'Accounting and Business MA (Hons)',
  description: 'This programme combines the study of accounting and business to prepare you for the social, political, environmental and cultural challenges facing contemporary businesses, governments and not-for-profit organisations.',
  field: 'Business & Economics',
  degree: 'MA (Hons)',
  duration: '4 years',
  minIBPoints: 37,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/189-accounting-and-business',
  requirements: [
    // No specific HL requirements
    // SL Requirements
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 }
  ]
}
```

---

## Program 12: Business and Economics MA (Hons)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/186-business-and-economics |
| **Name** | Business and Economics MA (Hons) |
| **Degree Type** | MA (Hons) |
| **Duration** | 4 years |
| **Field of Study** | Business & Economics |

### Description (Exact from site)
> The MA Business and Economics combines the relative academic rigour of mainstream economics with the more practical and vocational perspective of business.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 37 (range: 37-42) |
| **HL Grades Required** | 6, 6, 6 (range: 666 to 766) |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| Mathematics | HL | 5 | Yes | AND (required for Economics) |
| Any subject | HL | 6 | No | Any other subject |
| Any subject | HL | 6 | No | Any other subject |

**Note:** Mathematics HL at 5 is required. If Math is not taken at HL, then Math SL at 6 is required instead.

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |
| Mathematics | SL | 6 | No | AND | Only if not taking Math at HL |

### Additional Notes
- Study abroad available in Year 3
- No placement
- Joint degree combining Economics academic rigour with Business practical perspective
- Double accreditation: **AACSB** and **EQUIS**

### Seed Data Format
```typescript
{
  name: 'Business and Economics MA (Hons)',
  description: 'The MA Business and Economics combines the relative academic rigour of mainstream economics with the more practical and vocational perspective of business.',
  field: 'Business & Economics',
  degree: 'MA (Hons)',
  duration: '4 years',
  minIBPoints: 37,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/186-business-and-economics',
  requirements: [
    // HL Requirements - Math required
    { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }
    // Note: If not taking Math HL, Math SL at 6 is required
  ]
}
```

---

## Program 13: Economics MA (Hons)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/122-economics |
| **Name** | Economics MA (Hons) |
| **Degree Type** | MA (Hons) |
| **Duration** | 4 years |
| **Field of Study** | Business & Economics |

### Description (Exact from site)
> This programme gives you the opportunity to examine the economic incentives that shape and reconcile the important decisions made by individuals, businesses, governments and societies.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 37 (range: 37-43) |
| **HL Grades Required** | 6, 6, 6 (range: 666 to 766) |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| Mathematics | HL | 5 | Yes | AND (required) |
| Any subject | HL | 6 | No | Any other subject |
| Any subject | HL | 6 | No | Any other subject |

**Note:** Mathematics HL at 5 is required. If Math is not taken at HL, then Math SL at 6 is required instead.

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |
| Mathematics | SL | 6 | No | AND | Only if not taking Math at HL |

### Additional Notes
- Ranked in **UK's top 10** for economics (QS World University Rankings 2025)
- Study abroad available (USA, Europe)
- No placement
- Base for the Scottish Graduate Programme in Economics

### Seed Data Format
```typescript
{
  name: 'Economics MA (Hons)',
  description: 'This programme gives you the opportunity to examine the economic incentives that shape and reconcile the important decisions made by individuals, businesses, governments and societies.',
  field: 'Business & Economics',
  degree: 'MA (Hons)',
  duration: '4 years',
  minIBPoints: 37,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/122-economics',
  requirements: [
    // HL Requirements - Math required
    { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }
    // Note: If not taking Math HL, Math SL at 6 is required
  ]
}
```

---

## Program 14: Economics and Politics MA (Hons)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/135-economics-and-politics |
| **Name** | Economics and Politics MA (Hons) |
| **Degree Type** | MA (Hons) |
| **Duration** | 4 years |
| **Field of Study** | Business & Economics |

### Description (Exact from site)
> This popular joint programme combines two core social science disciplines.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 37 (range: 37-43) |
| **HL Grades Required** | 6, 6, 6 (range: 666 to 766) |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| Mathematics | HL | 5 | Yes | AND (required for Economics) |
| Any subject | HL | 6 | No | Any other subject |
| Any subject | HL | 6 | No | Any other subject |

**Note:** Mathematics HL at 5 is required. If Math is not taken at HL, then Math SL at 6 is required instead.

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |
| Mathematics | SL | 6 | No | AND | Only if not taking Math at HL |

### Additional Notes
- Ranked **UK's top 10** for Economics (QS 2025)
- Ranked **UK's top 10** for Politics (QS 2025)
- Study abroad available (USA, Europe)
- No placement
- Home to Scottish Parliament - ideal location for Politics study
- Joint program exploring tensions between economic and political analysis

### Seed Data Format
```typescript
{
  name: 'Economics and Politics MA (Hons)',
  description: 'This popular joint programme combines two core social science disciplines.',
  field: 'Business & Economics',
  degree: 'MA (Hons)',
  duration: '4 years',
  minIBPoints: 37,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/135-economics-and-politics',
  requirements: [
    // HL Requirements - Math required for Economics component
    { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }
    // Note: If not taking Math HL, Math SL at 6 is required
  ]
}
```

---

## Program 15: Business with Marketing MA (Hons)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/607-business-with-marketing |
| **Name** | Business with Marketing MA (Hons) |
| **Degree Type** | MA (Hons) |
| **Duration** | 4 years |
| **Field of Study** | Business & Economics |

### Description (Exact from site)
> Combine the study of business with marketing to prepare for the social, political, environmental and cultural challenges facing contemporary businesses, governments and not-for-profit organisations.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 37 (range: 37-42) |
| **HL Grades Required** | 6, 6, 6 (range: 666 to 766) |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| Any subject | HL | 6 | No | No specific subjects required |
| Any subject | HL | 6 | No | No specific subjects required |
| Any subject | HL | 6 | No | No specific subjects required |

**Note:** No specific HL subjects required - HLs can be in any subject.

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |
| Mathematics | SL | 5 | No | AND | Any Mathematics type accepted |

### Additional Notes
- Study abroad available in Year 3
- **Placement available** (unique among Business programs!)
- Double accreditation: **AACSB** and **EQUIS**
- **CIM (Chartered Institute of Marketing)** accredited - offers exemptions on CIM qualifications
- Marketing specialization within broader business program

### Seed Data Format
```typescript
{
  name: 'Business with Marketing MA (Hons)',
  description: 'Combine the study of business with marketing to prepare for the social, political, environmental and cultural challenges facing contemporary businesses, governments and not-for-profit organisations.',
  field: 'Business & Economics',
  degree: 'MA (Hons)',
  duration: '4 years',
  minIBPoints: 37,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/607-business-with-marketing',
  requirements: [
    // No specific HL requirements
    // SL Requirements
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 }
  ]
}
```

---

## Program 16: International Business MA (Hons)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/183-international-business |
| **Name** | International Business MA (Hons) |
| **Degree Type** | MA (Hons) |
| **Duration** | 4 years |
| **Field of Study** | Business & Economics |

### Description (Exact from site)
> This degree prepares you for the social, political, environmental and cultural challenges facing contemporary businesses, governments and not-for-profit organisations.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 37 (range: 37-42) |
| **HL Grades Required** | 6, 6, 6 (range: 666 to 766) |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| Any subject | HL | 6 | No | No specific subjects required |
| Any subject | HL | 6 | No | No specific subjects required |
| Any subject | HL | 6 | No | No specific subjects required |

**Note:** No specific HL subjects required - HLs can be in any subject.

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |
| Mathematics | SL | 5 | No | AND | Any Mathematics type accepted |

### Additional Notes
- **Study abroad MANDATORY** in Year 3 ⭐ (unique - most programs have it optional)
- No placement
- Double accreditation: **AACSB** and **EQUIS**
- Partner universities in Australia, New Zealand, Canada, China, Japan, Europe, USA
- Specialise in international business from Year 2

### Seed Data Format
```typescript
{
  name: 'International Business MA (Hons)',
  description: 'This degree prepares you for the social, political, environmental and cultural challenges facing contemporary businesses, governments and not-for-profit organisations.',
  field: 'Business & Economics',
  degree: 'MA (Hons)',
  duration: '4 years',
  minIBPoints: 37,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/183-international-business',
  requirements: [
    // No specific HL requirements
    // SL Requirements
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 }
  ]
}
```

---

## Program 17: Finance and Business MA (Hons)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/603-finance-and-business |
| **Name** | Finance and Business MA (Hons) |
| **Degree Type** | MA (Hons) |
| **Duration** | 4 years |
| **Field of Study** | Business & Economics |

### Description (Exact from site)
> This degree combines the study of finance and business to prepare for the social, political, environmental and cultural challenges facing contemporary businesses, governments and not-for-profit organisations.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 37 (range: 37-42) |
| **HL Grades Required** | 6, 6, 6 (range: 666 to 766) |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| Any subject | HL | 6 | No | No specific subjects required |
| Any subject | HL | 6 | No | No specific subjects required |
| Any subject | HL | 6 | No | No specific subjects required |

**Note:** No specific HL subjects required - HLs can be in any subject.

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |
| Mathematics | SL | 5 | No | AND | Any Mathematics type accepted |

### Additional Notes
- Study abroad available in Year 3 (optional)
- No placement
- Double accreditation: **AACSB** and **EQUIS**
- Strong platform for careers within or outside the commercial world

### Seed Data Format
```typescript
{
  name: 'Finance and Business MA (Hons)',
  description: 'This degree combines the study of finance and business to prepare for the social, political, environmental and cultural challenges facing contemporary businesses, governments and not-for-profit organisations.',
  field: 'Business & Economics',
  degree: 'MA (Hons)',
  duration: '4 years',
  minIBPoints: 37,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/603-finance-and-business',
  requirements: [
    // No specific HL requirements
    // SL Requirements
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 }
  ]
}
```

---

## Program 18: Economics with Finance MA (Hons)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/469-economics-with-finance |
| **Name** | Economics with Finance MA (Hons) |
| **Degree Type** | MA (Hons) |
| **Duration** | 4 years |
| **Field of Study** | Business & Economics |

### Description (Exact from site)
> There are obvious crossovers between economics and finance. In addition to covering the core of the economics programme, we will introduce you to the basic principles of finance before moving onto more advanced topics such as: investments, securities, corporate finance.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 37 (range: 37-43) |
| **HL Grades Required** | 6, 6, 6 (range: 666 to 766) |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| Mathematics | HL | 5 | Yes | AND (required) |
| Any subject | HL | 6 | No | Any other subject |
| Any subject | HL | 6 | No | Any other subject |

**Note:** Mathematics HL at 5 is required. If Math is not taken at HL, then Math SL at 6 is required instead.

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |
| Mathematics | SL | 6 | No | AND | Only if not taking Math at HL |

### Additional Notes
- Ranked **UK's top 10** for Economics (QS World University Rankings 2025)
- Study abroad available (USA, Europe)
- No placement
- Double accreditation: **AACSB** and **EQUIS**
- Covers investments, securities, and corporate finance

### Seed Data Format
```typescript
{
  name: 'Economics with Finance MA (Hons)',
  description: 'There are obvious crossovers between economics and finance. In addition to covering the core of the economics programme, we will introduce you to the basic principles of finance before moving onto more advanced topics such as: investments, securities, corporate finance.',
  field: 'Business & Economics',
  degree: 'MA (Hons)',
  duration: '4 years',
  minIBPoints: 37,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/469-economics-with-finance',
  requirements: [
    // HL Requirements - Math required
    { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }
    // Note: If not taking Math HL, Math SL at 6 is required
  ]
}
```

---

## Program 19: Economics and Mathematics MA (Hons)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/133-economics-and-mathematics |
| **Name** | Economics and Mathematics MA (Hons) |
| **Degree Type** | MA (Hons) |
| **Duration** | 4 years |
| **Field of Study** | Business & Economics |

### Description (Exact from site)
> This combined programme complements the basic grounding in mathematical techniques provided within Economics, with a more thorough and rigorous development of mathematical principles.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 37 (range: 37-43) |
| **HL Grades Required** | 6, 6, 6 (range: 666 to 766) |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| **Mathematics AA ONLY** | HL | **6** | Yes | AND (required) |
| Any subject | HL | 6 | No | Any other subject |
| Any subject | HL | 6 | No | Any other subject |

⚠️ **IMPORTANT RESTRICTIONS:**
- **ONLY Math Analysis and Approaches (AA) accepted** - Math AI NOT accepted!
- Math HL at grade **6** (higher than other Economics programs which need 5)
- Math qualifications must be no more than **2 years old** at entry

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |

### Additional Notes
- **Triple ranking:**
  - UK's top 10 for Economics (QS 2025)
  - **5th UK** for Mathematics and Statistics (THE 2024)
  - **5th UK** for Mathematics (QS 2025)
- Study abroad available (USA, Europe)
- No placement
- Teaching split across **two campuses** (Central Area + King's Buildings)
- Joint degree with School of Mathematics

### Seed Data Format
```typescript
{
  name: 'Economics and Mathematics MA (Hons)',
  description: 'This combined programme complements the basic grounding in mathematical techniques provided within Economics, with a more thorough and rigorous development of mathematical principles.',
  field: 'Business & Economics',
  degree: 'MA (Hons)',
  duration: '4 years',
  minIBPoints: 37,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/133-economics-and-mathematics',
  requirements: [
    // HL Requirements - Math AA ONLY at grade 6 (stricter than other Econ programs!)
    { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true }
    // Note: ONLY Math Analysis & Approaches accepted, NOT Math AI!
  ]
}
```

---

## Program 20: Cognitive Science (Humanities) MA (Hons)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/479-cognitive-science-humanities |
| **Name** | Cognitive Science (Humanities) MA (Hons) |
| **Degree Type** | MA (Hons) |
| **Duration** | 4 years |
| **Field of Study** | Social Sciences |

### Description (Exact from site)
> Cognitive science is the interdisciplinary attempt to understand the human mind. It focuses on abilities such as reasoning, perception, memory, awareness, emotion, attention, judgement, motor control, and language use.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 34 |
| **HL Grades Required** | 6, 5, 5 |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| Biology/Human Biology | HL | 5 | No | **OR** |
| Chemistry | HL | 5 | No | **OR** |
| Computer Science | HL | 5 | No | **OR** |
| Geography | HL | 5 | No | **OR** |
| Mathematics | HL | 5 | No | **OR** |
| Physics | HL | 5 | No | **OR** |
| Psychology | HL | 5 | No | **OR** |

**Note:** Only ONE of the above subjects is required at HL grade 5. Other HLs can be in any subject.

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |
| Mathematics | SL | 6 | No | AND | Only if not taking Math at HL |

### Additional Notes
- University of Edinburgh helped create the field of cognitive science
- **Only university in Scotland** to offer Cognitive Science at undergraduate level
- One of the **largest centres in Europe** for study of human cognition
- Study abroad available in Year 3
- No placement
- Interdisciplinary: linguistics, philosophy, psychology, computer science

### Seed Data Format
```typescript
{
  name: 'Cognitive Science (Humanities) MA (Hons)',
  description: 'Cognitive science is the interdisciplinary attempt to understand the human mind. It focuses on abilities such as reasoning, perception, memory, awareness, emotion, attention, judgement, motor control, and language use.',
  field: 'Social Sciences',
  degree: 'MA (Hons)',
  duration: '4 years',
  minIBPoints: 34,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/479-cognitive-science-humanities',
  requirements: [
    // HL Requirements - ONE of these subjects at grade 5 (OR group)
    { courses: ['BIOL'], level: 'HL', grade: 5, orGroupId: 'cog-sci-hl' },
    { courses: ['CHEM'], level: 'HL', grade: 5, orGroupId: 'cog-sci-hl' },
    { courses: ['COMP-SCI'], level: 'HL', grade: 5, orGroupId: 'cog-sci-hl' },
    { courses: ['GEOG'], level: 'HL', grade: 5, orGroupId: 'cog-sci-hl' },
    { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, orGroupId: 'cog-sci-hl' },
    { courses: ['PHYS'], level: 'HL', grade: 5, orGroupId: 'cog-sci-hl' },
    { courses: ['PSYCH'], level: 'HL', grade: 5, orGroupId: 'cog-sci-hl' },
    // Note: If not taking Math HL, Math SL at 6 is required
  ]
}
```

---

## Program 21: Informatics MInf (5-year undergraduate Masters)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/430-informatics-5-year-undergraduate-masters-programme |
| **Name** | Informatics MInf |
| **Degree Type** | MInf (Integrated Masters) |
| **Duration** | 5 years |
| **Field of Study** | Computer Science & IT |

### Description (Exact from site)
> Our flagship MInf degree is an integrated programme that earns you a Masters level qualification over five years. You will gain a range of experience across all areas of informatics and be able to study your chosen specialist area in-depth at Masters level.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 34 (range: 34-43) |
| **HL Grades Required** | 6, 6, 5 (range: 665 to 777) |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| **Mathematics AA ONLY** | HL | **6** | Yes | AND (required) |
| Any subject | HL | 6 | No | Any other subject |
| Any subject | HL | 5 | No | Any other subject |

⚠️ **IMPORTANT RESTRICTIONS:**
- **ONLY Math Analysis and Approaches (AA) accepted** - Math AI NOT accepted!
- Math HL at grade **6** required
- Math qualifications must be no more than **2 years old** at entry
- No prior programming experience needed

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |

### Additional Notes
- **Flagship** integrated Masters program
- Ranked **23rd in the world** and **4th in the UK** for Computer Science (QS 2025)
- **Largest Informatics department in Europe**
- Study abroad available in Year 3 (including USA, Canada, Europe, Singapore, Australia)
- No placement
- Years 1-3 cover CS, AI, cognitive science foundations
- Years 4-5 include specialization and Masters-level courses
- Apply to only ONE Computer Science degree

### Seed Data Format
```typescript
{
  name: 'Informatics MInf',
  description: 'Our flagship MInf degree is an integrated programme that earns you a Masters level qualification over five years. You will gain a range of experience across all areas of informatics and be able to study your chosen specialist area in-depth at Masters level.',
  field: 'Computer Science & IT',
  degree: 'MInf',
  duration: '5 years',
  minIBPoints: 34,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/430-informatics-5-year-undergraduate-masters-programme',
  requirements: [
    // HL Requirements - Math AA ONLY at grade 6
    { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true }
    // Note: ONLY Math Analysis & Approaches accepted, NOT Math AI!
  ]
}
```

---

## Program 22: Software Engineering BEng (Hons)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/59-software-engineering |
| **Name** | Software Engineering BEng (Hons) |
| **Degree Type** | BEng (Hons) |
| **Duration** | 4 years |
| **Field of Study** | Computer Science & IT |

### Description (Exact from site)
> The study of software engineering will allow you to write good software and give you the necessary engineering skills to meet system requirements, including: reliability, maintainability, usability, cost-effectiveness.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 34 (range: 34-43) |
| **HL Grades Required** | 6, 6, 5 (range: 665 to 777) |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| **Mathematics AA ONLY** | HL | **6** | Yes | AND (required) |
| Any subject | HL | 6 | No | Any other subject |
| Any subject | HL | 5 | No | Any other subject |

⚠️ **IMPORTANT RESTRICTIONS:**
- **ONLY Math Analysis and Approaches (AA) accepted** - Math AI NOT accepted!
- Math HL at grade **6** required
- Math qualifications must be no more than **2 years old** at entry
- No prior programming experience needed

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |

### Additional Notes
- Ranked **23rd in the world** and **4th in the UK** for Computer Science (QS 2025)
- **Largest Informatics department in Europe**
- Study abroad available in Year 3
- No placement
- Focus on practical software engineering skills: reliability, maintainability, usability
- Apply to only ONE Computer Science degree
- Can switch between Informatics programs after Year 1

### Seed Data Format
```typescript
{
  name: 'Software Engineering BEng (Hons)',
  description: 'The study of software engineering will allow you to write good software and give you the necessary engineering skills to meet system requirements, including: reliability, maintainability, usability, cost-effectiveness.',
  field: 'Computer Science & IT',
  degree: 'BEng (Hons)',
  duration: '4 years',
  minIBPoints: 34,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/59-software-engineering',
  requirements: [
    // HL Requirements - Math AA ONLY at grade 6
    { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true }
    // Note: ONLY Math Analysis & Approaches accepted, NOT Math AI!
  ]
}
```

---

## Program 23: Computer Science and Mathematics BSc (Hons)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/64-computer-science-and-mathematics |
| **Name** | Computer Science and Mathematics BSc (Hons) |
| **Degree Type** | BSc (Hons) |
| **Duration** | 4 years |
| **Field of Study** | Computer Science & IT |

### Description (Exact from site)
> Mathematics forms the foundation of computer science. With the increasing scale of computing systems, and growing volumes of data, we are developing and using more sophisticated mathematical techniques every day.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 34 (range: 34-43) |
| **HL Grades Required** | 7, 5, 5 (range: 755 to 777) |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| **Mathematics AA ONLY** | HL | **7** ⚠️ | Yes | AND (required) |
| Any subject | HL | 5 | No | Any other subject |
| Any subject | HL | 5 | No | Any other subject |

⚠️ **MOST DEMANDING MATH REQUIREMENT!**
- **ONLY Math Analysis and Approaches (AA) accepted** - Math AI NOT accepted!
- Math HL at grade **7** required (higher than all other CS/Econ programs!)
- Math qualifications must be no more than **2 years old** at entry

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |

### Additional Notes
- **Triple ranking:**
  - 20th in the world and **4th in the UK** for Computer Science (QS 2024)
  - **5th in the UK** for Mathematics and Statistics (THE 2024)
  - **5th in the UK** for Mathematics (QS 2024)
- **Largest Informatics department in Europe**
- Study abroad available in Year 3
- No placement
- Joint degree between School of Informatics and School of Mathematics
- Teaching split across Central Campus and King's Buildings
- Apply to only ONE Computer Science degree

### Seed Data Format
```typescript
{
  name: 'Computer Science and Mathematics BSc (Hons)',
  description: 'Mathematics forms the foundation of computer science. With the increasing scale of computing systems, and growing volumes of data, we are developing and using more sophisticated mathematical techniques every day.',
  field: 'Computer Science & IT',
  degree: 'BSc (Hons)',
  duration: '4 years',
  minIBPoints: 34,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/64-computer-science-and-mathematics',
  requirements: [
    // HL Requirements - Math AA ONLY at grade 7 (HIGHEST requirement!)
    { courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }
    // Note: ONLY Math Analysis & Approaches accepted, NOT Math AI!
  ]
}
```

---

## Program 24: Philosophy and Psychology MA (Hons)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/319-philosophy-and-psychology |
| **Name** | Philosophy and Psychology MA (Hons) |
| **Degree Type** | MA (Hons) |
| **Duration** | 4 years |
| **Field of Study** | Social Sciences |

### Description (Exact from site)
> Philosophy gives you the skills to think about great philosophical questions in a clear and systematic way. Psychology is an experimental and observational science that studies how we perceive, think and learn about the world around us.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 34 (range: 34-36) |
| **HL Grades Required** | 6, 5, 5 |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| Biology/Human Biology | HL | 5 | No | **OR** |
| Chemistry | HL | 5 | No | **OR** |
| Computer Science | HL | 5 | No | **OR** |
| Geography | HL | 5 | No | **OR** |
| Mathematics | HL | 5 | No | **OR** |
| Physics | HL | 5 | No | **OR** |
| Psychology | HL | 5 | No | **OR** |

**Note:** Only ONE of the above subjects is required at HL grade 5. Other HLs can be in any subject.

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |
| Mathematics | SL | 6 | No | AND | Only if not taking Math at HL |

### Additional Notes
- **UK's top 5** and **22nd in the world** for Philosophy (QS 2025)
- **World's top 30** for Psychology (QS 2025)
- **BPS (British Psychological Society) accreditation** available
- Philosophy taught at Edinburgh since 1583
- Centre of the Scottish Enlightenment
- Study abroad available in Year 3
- No placement

### Seed Data Format
```typescript
{
  name: 'Philosophy and Psychology MA (Hons)',
  description: 'Philosophy gives you the skills to think about great philosophical questions in a clear and systematic way. Psychology is an experimental and observational science that studies how we perceive, think and learn about the world around us.',
  field: 'Social Sciences',
  degree: 'MA (Hons)',
  duration: '4 years',
  minIBPoints: 34,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/319-philosophy-and-psychology',
  requirements: [
    // HL Requirements - ONE of these subjects at grade 5 (OR group)
    { courses: ['BIOL'], level: 'HL', grade: 5, orGroupId: 'phil-psych-hl' },
    { courses: ['CHEM'], level: 'HL', grade: 5, orGroupId: 'phil-psych-hl' },
    { courses: ['COMP-SCI'], level: 'HL', grade: 5, orGroupId: 'phil-psych-hl' },
    { courses: ['GEOG'], level: 'HL', grade: 5, orGroupId: 'phil-psych-hl' },
    { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, orGroupId: 'phil-psych-hl' },
    { courses: ['PHYS'], level: 'HL', grade: 5, orGroupId: 'phil-psych-hl' },
    { courses: ['PSYCH'], level: 'HL', grade: 5, orGroupId: 'phil-psych-hl' },
    // Note: If not taking Math HL, Math SL at 6 is required
  ]
}
```

---

## Program 25: Landscape Architecture MA (Hons)

### Basic Info
| Field | Value |
|-------|-------|
| **URL** | https://study.ed.ac.uk/programmes/undergraduate/674-landscape-architecture |
| **Name** | Landscape Architecture MA (Hons) |
| **Degree Type** | MA (Hons) - Integrated Masters |
| **Duration** | 5 years |
| **Field of Study** | Arts & Humanities |

### Description (Exact from site)
> Throughout MA Landscape Architecture you will develop an understanding of materials and technology, alongside cultural and ecological processes, enabling you to design sustainable environments fit for the locations they inhabit.

### IB Entry Requirements

| Requirement | Value |
|-------------|-------|
| **Minimum IB Points** | 34 |
| **HL Grades Required** | 6, 5, 5 |

### Subject Requirements

#### Higher Level (HL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic |
|---------|-------|-----------|----------|-------|
| Any subject | HL | 6 | No | No specific subjects required |
| Any subject | HL | 5 | No | No specific subjects required |
| Any subject | HL | 5 | No | No specific subjects required |

**Note:** No specific HL subjects required - HLs can be in any subject.

#### Standard Level (SL) - Required Subjects

| Subject | Level | Min Grade | Critical | Logic | Notes |
|---------|-------|-----------|----------|-------|-------|
| English | SL | 5 | No | AND | English ab initio not accepted |
| Biology/Chemistry/CS/Geography/Math/Physics | SL | **4** | No | **OR** | One science/math at grade 4 |

#### Additional Portfolio Requirement
⚠️ **Evidence of artistic ability is normally required** at either HL or SL, for example:
- Visual Arts
- Design Technology

### Additional Notes
- **5-year integrated Masters** - undergraduate fees throughout
- **1st in Scotland** for Architecture & Built Environment (QS 2025)
- **UK's top 10** for Architecture & Built Environment (QS 2025)
- **Landscape Institute accredited** - pathway to chartered membership
- **100% employability** in highly skilled jobs (HESA 2022)
- Study abroad available in Year 3
- **Work placement in Year 4** (often paid)
- Focus on climate change, biodiversity, sustainable cities

### Seed Data Format
```typescript
{
  name: 'Landscape Architecture MA (Hons)',
  description: 'Throughout MA Landscape Architecture you will develop an understanding of materials and technology, alongside cultural and ecological processes, enabling you to design sustainable environments fit for the locations they inhabit.',
  field: 'Arts & Humanities',
  degree: 'MA (Hons)',
  duration: '5 years',
  minIBPoints: 34,
  programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/674-landscape-architecture',
  requirements: [
    // No specific HL requirements
    // SL Requirements - One science/math at grade 4 (lower than usual!)
    { courses: ['BIOL', 'CHEM', 'COMP-SCI', 'GEOG', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'SL', grade: 4, orGroupId: 'landscape-sl' }
    // Note: Evidence of artistic ability normally required (Visual Arts or Design Technology)
  ]
}
```

---

*Add more programs below...*
