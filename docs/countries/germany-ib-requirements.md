# Germany IB Requirements for Program Seeding

> **Purpose**: Technical reference for AI-assisted program seeding for German universities.

---

## 1. KMK Base Requirements (ALL German Programs)

**Every IB student applying to any German university must meet these requirements:**

| Requirement | Condition |
|-------------|-----------|
| **Total Points** | ≥ 24 |
| **Total Subjects** | 6 examination subjects |
| **HL Subjects** | ≥ 3 at Higher Level |
| **Minimum Grade** | 4 in each subject |

### Mandatory Subject Groups

| Group | Requirement | Course Codes |
|-------|-------------|--------------|
| **Group 1** | Language A | `ENG-LIT` OR `ENG-LL` |
| **Group 2** | German B (MANDATORY) | `GER-B` |
| **Group 3** | Social Science (MUST HAVE) | `ECON` OR `BUS-MGMT` OR `PSYCH` OR `HIST` OR `GEOG` OR `PHIL` OR `GLOB-POL` OR `ANTHRO` |
| **Group 4** | Natural Science (MUST HAVE) | `BIO` OR `CHEM` OR `PHYS` |
| **Group 5** | Mathematics | `MATH-AA` OR `MATH-AI` |

### HL Subject Rule

At least ONE of the 3 HL subjects MUST be:
- Language (`ENG-LIT`, `ENG-LL`, `GER-B` at HL), **OR**
- Mathematics (`MATH-AA` or `MATH-AI` at HL), **OR**
- Natural Science (`BIO`, `CHEM`, `PHYS` at HL)

### Math Level Access Rule

| Math Level | Access |
|------------|--------|
| **HL** | All programs including STEM |
| **SL** | Non-STEM only |

---

## 2. Grade Conversion

### Formula
```
German Grade = 1 + 3 × (42 - IB Points) / 18
```

### Conversion Table

| IB Points | German Grade |
|-----------|-------------|
| 42 | 1.0 |
| 40 | 1.3 |
| 39 | 1.5 |
| 37 | 1.8 |
| 36 | 2.0 |
| 34 | 2.3 |
| 33 | 2.5 |
| 30 | 3.0 |
| 24 | 4.0 |

---

## 3. AI Seeding Rules

1. **Use field-specific templates** from section 4 (they include all requirements)
2. **German B is MANDATORY** for all programs
3. **NC grade specified** → Convert using table to set `minIBPoints`
4. **No NC specified** → Use field-specific recommended `minIBPoints`

---

## 4. Requirement Templates by Field of Study

### 5.1 Business & Economics

```typescript
{
  field: 'Business & Economics',
  minIBPoints: 36,
  requirements: [
    { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5 },
    { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 },
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
    { courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'], level: 'HL', grade: 5, critical: true }
  ]
}
```

---

### 5.2 Engineering

```typescript
{
  field: 'Engineering',
  minIBPoints: 38,
  requirements: [
    { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
    { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
    { courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'], level: 'SL', grade: 4 },
    { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
    { courses: ['PHYS'], level: 'HL', grade: 5, critical: true }
  ]
}
```

---

### 5.3 Medicine & Health

```typescript
{
  field: 'Medicine & Health',
  minIBPoints: 42,
  requirements: [
    { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5 },
    { courses: ['GER-B'], level: 'HL', grade: 6, critical: true },
    { courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'], level: 'SL', grade: 4 },
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
    { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
    { courses: ['CHEM'], level: 'HL', grade: 6, critical: true }
  ]
}
```

---

### 5.4 Computer Science

```typescript
{
  field: 'Computer Science',
  minIBPoints: 38,
  requirements: [
    { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
    { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
    { courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'], level: 'SL', grade: 4 },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 },
    { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }
  ]
}
```

---

### 5.5 Law

```typescript
{
  field: 'Law',
  minIBPoints: 36,
  requirements: [
    { courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 5, critical: true },
    { courses: ['GER-B'], level: 'HL', grade: 6, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 },
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
    { courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'], level: 'HL', grade: 5, critical: true }
  ]
}
```

---

### 5.6 Arts & Humanities

```typescript
{
  field: 'Arts & Humanities',
  minIBPoints: 34,
  requirements: [
    { courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 5, critical: true },
    { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 },
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
    { courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'], level: 'SL', grade: 5 }
  ]
}
```

---

### 5.7 Natural Sciences

```typescript
{
  field: 'Natural Sciences',
  minIBPoints: 36,
  requirements: [
    { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
    { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
    { courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'], level: 'SL', grade: 4 },
    { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true }
  ]
}
```

---

### 5.8 Social Sciences

```typescript
{
  field: 'Social Sciences',
  minIBPoints: 34,
  requirements: [
    { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5 },
    { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 },
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
    { courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'], level: 'HL', grade: 5, critical: true }
  ]
}
```

---

### 5.9 Architecture

```typescript
{
  field: 'Architecture',
  minIBPoints: 38,
  requirements: [
    { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
    { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
    { courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'], level: 'SL', grade: 4 },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 },
    { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
    { courses: ['VISUAL-ARTS'], level: 'SL', grade: 5 }
  ]
}
```

---

### 5.10 Environmental Studies

```typescript
{
  field: 'Environmental Studies',
  minIBPoints: 38,
  requirements: [
    { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
    { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
    { courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'], level: 'SL', grade: 4 },
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
    { courses: ['BIO', 'CHEM', 'PHYS', 'ESS'], level: 'HL', grade: 5, critical: true },
    { courses: ['GEOG'], level: 'SL', grade: 5 }
  ]
}
```

---

### 5.11 Education

```typescript
{
  field: 'Education',
  minIBPoints: 36,
  requirements: [
    { courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 5, critical: true },
    { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 },
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
    { courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'], level: 'SL', grade: 5 }
  ]
}
```

---

### 5.12 Media

```typescript
{
  field: 'Media',
  minIBPoints: 36,
  requirements: [
    { courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 5, critical: true },
    { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 },
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
    { courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'], level: 'SL', grade: 4 },
    { courses: ['FILM', 'VISUAL-ARTS'], level: 'SL', grade: 5 }
  ]
}
```

---

## 6. Course Code Reference

### Group 1: Language A
| Course | Code |
|--------|------|
| English A: Literature | `ENG-LIT` |
| English A: Language & Literature | `ENG-LL` |

### Group 2: Language B
| Course | Code |
|--------|------|
| German B | `GER-B` |

### Group 3: Individuals and Societies
| Course | Code |
|--------|------|
| Economics | `ECON` |
| Business Management | `BUS-MGMT` |
| Psychology | `PSYCH` |
| History | `HIST` |
| Geography | `GEOG` |
| Philosophy | `PHIL` |
| Global Politics | `GLOB-POL` |
| Social and Cultural Anthropology | `ANTHRO` |

### Group 4: Sciences
| Course | Code |
|--------|------|
| Biology | `BIO` |
| Chemistry | `CHEM` |
| Physics | `PHYS` |
| Computer Science | `CS` |
| Environmental Systems and Societies | `ESS` |

### Group 5: Mathematics
| Course | Code |
|--------|------|
| Mathematics: Analysis and Approaches | `MATH-AA` |
| Mathematics: Applications and Interpretation | `MATH-AI` |

### Group 6: The Arts
| Course | Code |
|--------|------|
| Visual Arts | `VISUAL-ARTS` |
| Music | `MUSIC` |
| Theatre | `THEATRE` |
| Film | `FILM` |
