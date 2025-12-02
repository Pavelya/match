import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // IB Courses (sample - add more as needed)
  const ibCourses = await Promise.all([
    // Group 1: Studies in language and literature
    prisma.iBCourse.create({ data: { name: 'English A: Literature', code: 'ENG-LIT', group: 1 } }),
    prisma.iBCourse.create({
      data: { name: 'English A: Language & Literature', code: 'ENG-LL', group: 1 }
    }),

    // Group 2: Language acquisition
    prisma.iBCourse.create({ data: { name: 'Spanish B', code: 'SPA-B', group: 2 } }),
    prisma.iBCourse.create({ data: { name: 'French B', code: 'FRA-B', group: 2 } }),

    // Group 3: Individuals and societies
    prisma.iBCourse.create({ data: { name: 'Economics', code: 'ECON', group: 3 } }),
    prisma.iBCourse.create({ data: { name: 'Business Management', code: 'BUS-MGMT', group: 3 } }),
    prisma.iBCourse.create({ data: { name: 'Psychology', code: 'PSYCH', group: 3 } }),
    prisma.iBCourse.create({ data: { name: 'History', code: 'HIST', group: 3 } }),

    // Group 4: Sciences
    prisma.iBCourse.create({ data: { name: 'Biology', code: 'BIO', group: 4 } }),
    prisma.iBCourse.create({ data: { name: 'Chemistry', code: 'CHEM', group: 4 } }),
    prisma.iBCourse.create({ data: { name: 'Physics', code: 'PHYS', group: 4 } }),
    prisma.iBCourse.create({ data: { name: 'Computer Science', code: 'CS', group: 4 } }),

    // Group 5: Mathematics
    prisma.iBCourse.create({
      data: { name: 'Mathematics: Analysis and Approaches', code: 'MATH-AA', group: 5 }
    }),
    prisma.iBCourse.create({
      data: { name: 'Mathematics: Applications and Interpretation', code: 'MATH-AI', group: 5 }
    }),

    // Group 6: The arts
    prisma.iBCourse.create({ data: { name: 'Visual Arts', code: 'VISUAL-ARTS', group: 6 } }),
    prisma.iBCourse.create({ data: { name: 'Music', code: 'MUSIC', group: 6 } })
  ])

  // Countries (sample)
  const countries = await Promise.all([
    prisma.country.create({ data: { name: 'United States', code: 'US', flagEmoji: '🇺🇸' } }),
    prisma.country.create({ data: { name: 'United Kingdom', code: 'GB', flagEmoji: '🇬🇧' } }),
    prisma.country.create({ data: { name: 'Canada', code: 'CA', flagEmoji: '🇨🇦' } }),
    prisma.country.create({ data: { name: 'Australia', code: 'AU', flagEmoji: '🇦🇺' } }),
    prisma.country.create({ data: { name: 'Germany', code: 'DE', flagEmoji: '🇩🇪' } }),
    prisma.country.create({ data: { name: 'France', code: 'FR', flagEmoji: '🇫🇷' } }),
    prisma.country.create({ data: { name: 'Netherlands', code: 'NL', flagEmoji: '🇳🇱' } }),
    prisma.country.create({ data: { name: 'Switzerland', code: 'CH', flagEmoji: '🇨🇭' } }),
    prisma.country.create({ data: { name: 'Spain', code: 'ES', flagEmoji: '🇪🇸' } }),
    prisma.country.create({ data: { name: 'Italy', code: 'IT', flagEmoji: '🇮🇹' } })
  ])

  // Fields of Study
  const fields = await Promise.all([
    prisma.fieldOfStudy.create({ data: { name: 'Computer Science', iconName: 'computer' } }),
    prisma.fieldOfStudy.create({ data: { name: 'Engineering', iconName: 'engineering' } }),
    prisma.fieldOfStudy.create({ data: { name: 'Business Administration', iconName: 'business' } }),
    prisma.fieldOfStudy.create({ data: { name: 'Medicine', iconName: 'medical' } }),
    prisma.fieldOfStudy.create({ data: { name: 'Law', iconName: 'law' } }),
    prisma.fieldOfStudy.create({ data: { name: 'Economics', iconName: 'economics' } }),
    prisma.fieldOfStudy.create({ data: { name: 'Psychology', iconName: 'psychology' } }),
    prisma.fieldOfStudy.create({ data: { name: 'Architecture', iconName: 'architecture' } }),
    prisma.fieldOfStudy.create({ data: { name: 'Biology', iconName: 'biology' } }),
    prisma.fieldOfStudy.create({ data: { name: 'Mathematics', iconName: 'math' } })
  ])

  console.log('✅ Seed data created successfully!')
  console.log(`- ${ibCourses.length} IB courses`)
  console.log(`- ${countries.length} countries`)
  console.log(`- ${fields.length} fields of study`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
