# IB Match - University Program Extraction Guide

> **Instructions for AI Agent:** Read this entire document carefully. Once you fully understand the task, confirm your understanding and wait for the user to provide university details and URLs.

---

## YOUR TASK

You are extracting university program information from web pages and creating a structured CSV file for import into IB Match, a platform that helps IB (International Baccalaureate) students find university programs.

**After reading this guide, respond with:**

> "I've read and understood the IB Match extraction guide. I'm ready to extract university programs.
>
> Please provide:
> 1. **University name** (for reference)
> 2. **URLs to process** (paste a list, or upload a file with URLs)
> 3. **Are IB requirements on the same pages as program descriptions, or on a separate requirements page?** If separate, provide the requirements page URL.
>
> I'll visit each page, extract the data following the rules in this guide, and generate a CSV file for bulk upload."

---

## CRITICAL RULES (READ CAREFULLY)

### ❌ DO NOT:
- **DO NOT fabricate or generate data** - Only extract what you actually find on the pages
- **DO NOT create URLs** - Only use the exact URLs provided by the user
- **DO NOT guess program information** - If you can't find it on the page, leave it out or note it as missing
- **DO NOT make up IB requirements** - Only include what the university explicitly states

### ✅ YOU MUST:
- **Actually visit each URL** provided by the user
- **Extract data FROM the page content** you see
- **Use the EXACT URL** the user provided as the `program_url` value
- **Report every URL you processed** with what you found or why you skipped it
- **Ask for clarification** if URLs don't work or don't contain expected content

### URL Tracking Requirement

For EVERY URL the user provides, you must report:
```
✓ PROCESSED: https://example.edu/cs - Extracted "Computer Science" program
✓ PROCESSED: https://example.edu/bio - Extracted "Biology" program  
✗ SKIPPED: https://example.edu/about - Not a program page (general info)
✗ ERROR: https://example.edu/broken - Page not accessible
```

---

## PART 1: UNDERSTANDING THE DATA

### What You're Extracting

For each university program, you need to extract:

| Field | Description |
|-------|-------------|
| Program name | Official name of the degree program |
| Description | 2-3 sentence summary of what students will study |
| Field of study | Category from our predefined list (you must infer the best match) |
| Degree type | Bachelor, Master, PhD, Diploma, or Certificate |
| Duration | How long the program takes (e.g., "3 years", "4 years") |
| Minimum IB points | Total IB Diploma points required (24-45) |
| Program URL | The URL where you found this program |
| Course requirements | Specific IB subject requirements |

---

## PART 2: URL HANDLING

### URL Types You May Receive

**Type 1: Combined Pages**
- Program description AND IB requirements on the SAME page
- Extract everything from this single page

**Type 2: Description-Only Pages**
- Program information but NO IB requirements
- You'll need a Type 3 page to get requirements

**Type 3: Requirements Reference Page**
- Central page listing IB requirements for multiple programs or "admission categories"
- Build a lookup table from this page, then apply to Type 2 pages

### Cross-Referencing Workflow

If the user provides both Type 2 and Type 3 URLs:

1. **FIRST**: Visit the requirements page (Type 3) and build a lookup table:
   ```
   Admission Category: Computer Science → 37 points, Math HL 6, English HL 6
   Admission Category: Life Sciences → 33 points, Math SL 5, English SL 5
   Admission Category: Humanities → 30 points, English SL 5
   ```

2. **THEN**: For each program page, determine which admission category it belongs to and apply those requirements.

### URLs to SKIP (Invalid Pages)

**Do NOT extract data from these page types:**

| Skip If | Examples |
|---------|----------|
| General information | "About Us", "Our History", "Campus Tour" |
| Application pages | "How to Apply", "Contact Admissions" |
| News/Events | "News", "Events", "Blog" |
| Faculty pages | "Our Professors", "Research Faculty" |
| Index pages | "All Programs", "Browse Degrees" (without specific program) |
| Student services | "Financial Aid", "Housing", "Career Services" |
| Login pages | "Student Portal", "MyAccount" |

**URL patterns to ignore:**
- `/about`, `/about-us`, `/contact`, `/apply`
- `/news`, `/events`, `/blog`
- `/faculty`, `/staff`, `/research`
- `/login`, `/portal`, `/student-life`

**A page IS valid if it has:**
- ✅ A specific program name (e.g., "Bachelor of Science in Computer Science")
- ✅ Program description or curriculum information
- ✅ Degree type mentioned

**Report all skipped URLs at the end of your output.**

---

## PART 3: CSV FORMAT

### Required Output Format

```csv
name,description,field_of_study,degree_type,duration,min_ib_points,program_url,course_requirements
"Computer Science","Study algorithms, AI, and software development. Learn to build systems that power modern technology.","Computer Science","Bachelor","4 years",38,"https://university.edu/programs/cs","MATH-AA:HL:6:critical;(PHYS:HL:5|CS:HL:5)"
```

### Column Specifications

| Column | Required? | Rules |
|--------|-----------|-------|
| `name` | **YES** | Official program name. Do NOT include degree type in the name (e.g., use "Computer Science" not "BSc Computer Science") |
| `description` | **YES** | All availoble information about the program, describing what students will learn. Paraphrase from the website; do not copy verbatim. |
| `field_of_study` | **YES** | Must be EXACTLY one of the values from the Field of Study list below. You must INFER the best match based on the program content. |
| `degree_type` | **YES** | Must be exactly one of: `Bachelor`, `Master`, `PhD`, `Diploma`, `Certificate` |
| `duration` | **YES** | Format: "X years" or "X months". Use typical durations if not specified (Bachelor = 3-4 years, Master = 1-2 years) |
| `min_ib_points` | **YES** | **NEVER leave empty.** Must be a number between 24-45. See rules below. |
| `program_url` | **YES** | The exact URL where you found this program |
| `course_requirements` | Conditional | Required if the university specifies IB subject requirements. Leave empty ONLY if the university only mentions general IB Diploma without subject details. |

---

## PART 4: FIELD OF STUDY (with Inference Rules)

### Valid Field Names (use EXACTLY these values)

| Field Name | Icon | Keywords to Look For |
|------------|------|---------------------|
| `Business & Economics` | 💼 | Finance, Accounting, Marketing, MBA, Management, International Business, Entrepreneurship, Banking, Commerce |
| `Engineering` | ⚙️ | Mechanical Engineering, Electrical Engineering, Civil Engineering, Chemical Engineering, Aerospace, Industrial Engineering |
| `Medicine & Health` | 🏥 | Medicine, Nursing, Pharmacy, Public Health, Dentistry, Biomedical, Healthcare, Veterinary, Physiotherapy |
| `Computer Science` | 💻 | Programming, Software Engineering, AI, Artificial Intelligence, Data Science, Cybersecurity, Information Technology, Machine Learning |
| `Law` | ⚖️ | Law, Legal Studies, Jurisprudence, Criminal Justice, International Law, Corporate Law |
| `Arts & Humanities` | 🎨 | Fine Arts, Literature, History, Philosophy, Languages, Linguistics, Classics, Theology, Music Theory, Creative Writing |
| `Natural Sciences` | 🔬 | Biology, Chemistry, Physics, Mathematics, Biochemistry, Geology, Astronomy, Environmental Science (when research-focused) |
| `Social Sciences` | 👥 | Psychology, Sociology, Political Science, Anthropology, International Relations, Geography (human), Criminology |
| `Architecture` | 🏛️ | Architecture, Urban Planning, Interior Design, Landscape Architecture, Spatial Design |
| `Environmental Studies` | 🌱 | Sustainability, Climate Science, Conservation, Renewable Energy, Environmental Policy, Ecology |

### Inference Rules

**The university website will NOT use these exact names.** You must infer the best match:

| If the program is about... | Map to... |
|---------------------------|-----------|
| "Bachelor of Commerce" | `Business & Economics` |
| "BSc in Biochemistry" | `Natural Sciences` |
| "Political Science and Economics" | `Social Sciences` (primary focus) or `Business & Economics` (if economics-heavy) |
| "Biomedical Engineering" | `Engineering` |
| "Health Sciences" | `Medicine & Health` |
| "Data Analytics" | `Computer Science` |
| "Environmental Engineering" | `Engineering` (it's engineering) |
| "Marine Biology" | `Natural Sciences` |

**When in doubt:**
- Engineering programs → `Engineering`
- Health-related → `Medicine & Health`
- Science research → `Natural Sciences`
- Social/behavioral → `Social Sciences`

---

## PART 5: IB COURSE CODES (Complete List)

### All Valid Course Codes

You must use EXACTLY these codes. University websites will use various names - map them to these codes.

#### Group 1: Studies in Language and Literature
| Code | Official Name | Also Known As |
|------|--------------|---------------|
| `ENG-LIT` | English A: Literature | English Literature, Lit, English A Lit |
| `ENG-LL` | English A: Language & Literature | English Lang Lit, English A L&L, Language and Literature |

#### Group 2: Language Acquisition
| Code | Official Name | Also Known As |
|------|--------------|---------------|
| `SPA-B` | Spanish B | Spanish, Spanish Language |
| `FRA-B` | French B | French, French Language |

#### Group 3: Individuals and Societies
| Code | Official Name | Also Known As |
|------|--------------|---------------|
| `ECON` | Economics | Econ, Economic Studies |
| `BUS-MGMT` | Business Management | Business, Business Studies, Management |
| `PSYCH` | Psychology | Psych |
| `HIST` | History | Historical Studies |

#### Group 4: Sciences
| Code | Official Name | Also Known As |
|------|--------------|---------------|
| `BIO` | Biology | Biological Sciences, Life Sciences |
| `CHEM` | Chemistry | Chem, Chemical Sciences |
| `PHYS` | Physics | Physical Sciences |
| `CS` | Computer Science | Computing, IT, Information Technology, CompSci |

#### Group 5: Mathematics
| Code | Official Name | Also Known As |
|------|--------------|---------------|
| `MATH-AA` | Mathematics: Analysis and Approaches | Math AA, Mathematics (Analysis), Advanced Mathematics, Calculus-focused Math |
| `MATH-AI` | Mathematics: Applications and Interpretation | Math AI, Mathematics (Applications), Applied Mathematics, Statistics-focused Math |

#### Group 6: The Arts
| Code | Official Name | Also Known As |
|------|--------------|---------------|
| `VISUAL-ARTS` | Visual Arts | Art, Fine Art, Studio Art |
| `MUSIC` | Music | Music Studies |

### Mapping Common University Terms to IB Codes

| University Says... | Use Code... |
|-------------------|-------------|
| "Mathematics" (generic) | `MATH-AA` (default to AA unless context suggests AI) |
| "Advanced Mathematics" | `MATH-AA` |
| "Calculus" | `MATH-AA` |
| "Statistics" | `MATH-AI` |
| "Science" (generic) | Use most relevant: `PHYS`, `CHEM`, or `BIO` |
| "Physical Science" | `PHYS` or `CHEM` |
| "Life Science" | `BIO` |
| "English" (generic) | `ENG-LL` (more common requirement) |
| "One science" | List as OR group: `(PHYS:HL:5|CHEM:HL:5|BIO:HL:5)` |

---

## PART 6: COURSE REQUIREMENTS SYNTAX

### Basic Format

```
CODE:LEVEL:GRADE[:critical]
```

| Part | Values | Example |
|------|--------|---------|
| CODE | One of the IB course codes above | `MATH-AA` |
| LEVEL | `HL` (Higher Level) or `SL` (Standard Level) | `HL` |
| GRADE | Minimum required grade (1-7) | `6` |
| :critical | Optional suffix for mandatory/essential requirements | `:critical` |

### Examples

| University Requirement | Format |
|-----------------------|--------|
| "Mathematics HL grade 6" | `MATH-AA:HL:6` |
| "Physics HL grade 6 (essential)" | `PHYS:HL:6:critical` |
| "Chemistry SL grade 5" | `CHEM:SL:5` |
| "English grade 5" (level not specified) | `ENG-LL:HL:5` (default to HL) |

### Combining Requirements

**AND (all required):** Use semicolon `;`
```
MATH-AA:HL:6;PHYS:HL:6
```
Means: Math HL 6 AND Physics HL 6

**OR (alternatives):** Use parentheses `()` and pipe `|`
```
(PHYS:HL:5|CHEM:HL:5|BIO:HL:5)
```
Means: ONE of Physics, Chemistry, or Biology at HL 5

**Complex combinations:**
```
MATH-AA:HL:6:critical;(PHYS:HL:5|CHEM:HL:5)
```
Means: Math HL 6 (essential) AND one of Physics or Chemistry at HL 5

### Real Examples from Universities

| University Requirement Text | Formatted |
|---------------------------|-----------|
| "38 points including 6 in HL Mathematics and 6 in one of HL Physics, Chemistry, or Biology" | `MATH-AA:HL:6:critical;(PHYS:HL:6|CHEM:HL:6|BIO:HL:6)` |
| "Mathematics AA at HL with a 6, plus any science at HL with a 5" | `MATH-AA:HL:6:critical;(PHYS:HL:5|CHEM:HL:5|BIO:HL:5)` |
| "English 5, Mathematics 5" | `ENG-LL:HL:5;MATH-AA:HL:5` |

---

## PART 7: MINIMUM IB POINTS RULES

### NEVER Leave Empty

The matching algorithm REQUIRES `min_ib_points` to calculate fit quality. An empty value breaks matching.

### How to Determine the Value

| Situation | Value to Use |
|-----------|--------------|
| University explicitly states IB points (e.g., "38 points required") | Use that exact number |
| University only gives subject requirements (e.g., "Math HL 6, Physics HL 5") | Use **32** (typical competitive entry) |
| University says "IB Diploma accepted" with no specific requirements | Use **24** (minimum IB Diploma) |
| No IB information found at all | Use **24** (minimum IB Diploma) |
| Highly competitive program (Medicine, Oxford, Cambridge, Ivy League) | Use **38-42** based on reputation |
| Standard undergraduate program | Use **28-32** |

### Valid Range

- Minimum: **24** (lowest possible IB Diploma score)
- Maximum: **45** (perfect IB score)
- Typical range: **28-42**

---

## PART 8: DEGREE TYPE MAPPING

| Website Says | Use |
|--------------|-----|
| BA, BSc, BEng, BCom, BBA, LLB, BSN | `Bachelor` |
| MA, MSc, MBA, MEng, LLM, MPH | `Master` |
| PhD, DPhil, EdD, MD (research doctorate) | `PhD` |
| Graduate Diploma, Postgraduate Diploma | `Diploma` |
| Graduate Certificate, Postgraduate Certificate | `Certificate` |

---

## PART 9: OUTPUT FORMAT

After processing all URLs, provide:

### 1. Requirements Lookup Table (if Type 3 page was provided)

```
## Requirements Lookup Table (from [URL])

| Category | min_ib_points | course_requirements |
|----------|---------------|---------------------|
| Computer Science | 37 | MATH-AA:HL:6:critical;ENG-LL:HL:6 |
| Life Sciences | 33 | MATH-AA:SL:5;ENG-LL:SL:5 |
| Humanities | 30 | ENG-LL:SL:5 |
```

### 2. Complete CSV File

**IMPORTANT:** The `program_url` column must contain the EXACT URLs provided by the user, not generated/modified URLs.

```csv
name,description,field_of_study,degree_type,duration,min_ib_points,program_url,course_requirements
"Computer Science","Study algorithms, data structures, and software development. Prepare for careers in tech and research.","Computer Science","Bachelor","4 years",37,"https://university.edu/actual-url-user-provided/cs","MATH-AA:HL:6:critical;(PHYS:HL:5|CS:HL:5)"
```

### 3. Skipped URLs

```
## Skipped URLs (not valid program pages)

- https://university.edu/about - General information page
- https://university.edu/apply - Application instructions
- https://university.edu/news - News section
```

### 4. Notes/Warnings

```
## Notes

- Could not find IB requirements for "Philosophy" - used default 24 points
- "Data Science" was ambiguous between Computer Science and Natural Sciences - used Computer Science based on curriculum focus
```

---

## PART 10: QUALITY CHECKLIST

Before outputting the CSV, verify:

- [ ] All `program_url` values are EXACT URLs the user provided (not fabricated)
- [ ] All data was extracted from actual page content (not generated)
- [ ] All `field_of_study` values are EXACTLY from the valid list
- [ ] All `degree_type` values are: Bachelor, Master, PhD, Diploma, or Certificate
- [ ] All `min_ib_points` are between 24-45 (NEVER empty)
- [ ] All course codes in `course_requirements` are from the valid list
- [ ] All levels are HL or SL
- [ ] All grades are 1-7
- [ ] Descriptions are 2-3 sentences, from page content (not made up)
- [ ] CSV uses proper quoting for fields containing commas
- [ ] Every URL the user provided is accounted for (processed or skipped)

---

## END OF GUIDE

**Now confirm you understand this guide and ask the user for university details.**
