import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding IB courses...')
  const ibCourses = [
    // Group 1: Studies in language and literature
    { name: 'English A: Literature', code: 'ENG-LIT', group: 1 },
    { name: 'English A: Language & Literature', code: 'ENG-LL', group: 1 },

    // Group 2: Language acquisition
    { name: 'Spanish B', code: 'SPA-B', group: 2 },
    { name: 'French B', code: 'FRA-B', group: 2 },

    // Group 3: Individuals and societies
    { name: 'Economics', code: 'ECON', group: 3 },
    { name: 'Business Management', code: 'BUS-MGMT', group: 3 },
    { name: 'Psychology', code: 'PSYCH', group: 3 },
    { name: 'History', code: 'HIST', group: 3 },

    // Group 4: Sciences
    { name: 'Biology', code: 'BIO', group: 4 },
    { name: 'Chemistry', code: 'CHEM', group: 4 },
    { name: 'Physics', code: 'PHYS', group: 4 },
    { name: 'Computer Science', code: 'CS', group: 4 },

    // Group 5: Mathematics
    { name: 'Mathematics: Analysis and Approaches', code: 'MATH-AA', group: 5 },
    { name: 'Mathematics: Applications and Interpretation', code: 'MATH-AI', group: 5 },

    // Group 6: The arts
    { name: 'Visual Arts', code: 'VISUAL-ARTS', group: 6 },
    { name: 'Music', code: 'MUSIC', group: 6 }
  ]

  for (const course of ibCourses) {
    await prisma.iBCourse.upsert({
      where: { code: course.code },
      update: course,
      create: course
    })
  }

  console.log('Seeding countries...')
  const countries = [
    { name: 'United States', code: 'US', flagEmoji: '🇺🇸' },
    { name: 'United Kingdom', code: 'GB', flagEmoji: '🇬🇧' },
    { name: 'Canada', code: 'CA', flagEmoji: '🇨🇦' },
    { name: 'Australia', code: 'AU', flagEmoji: '🇦🇺' },
    { name: 'Germany', code: 'DE', flagEmoji: '🇩🇪' },
    { name: 'France', code: 'FR', flagEmoji: '🇫🇷' },
    { name: 'Netherlands', code: 'NL', flagEmoji: '🇳🇱' },
    { name: 'Switzerland', code: 'CH', flagEmoji: '🇨🇭' },
    { name: 'Singapore', code: 'SG', flagEmoji: '🇸🇬' },
    { name: 'Japan', code: 'JP', flagEmoji: '🇯🇵' }
  ]

  for (const country of countries) {
    await prisma.country.upsert({
      where: { code: country.code },
      update: country,
      create: country
    })
  }

  console.log('Seeding fields of study...')
  const fieldsOfStudy = [
    { name: 'Business & Economics', iconName: '💼' },
    { name: 'Engineering', iconName: '⚙️' },
    { name: 'Medicine & Health', iconName: '🏥' },
    { name: 'Computer Science', iconName: '💻' },
    { name: 'Law', iconName: '⚖️' },
    { name: 'Arts & Humanities', iconName: '🎨' },
    { name: 'Natural Sciences', iconName: '🔬' },
    { name: 'Social Sciences', iconName: '👥' },
    { name: 'Architecture', iconName: '🏛️' },
    { name: 'Environmental Studies', iconName: '🌱' }
  ]

  for (const field of fieldsOfStudy) {
    await prisma.fieldOfStudy.upsert({
      where: { name: field.name },
      update: field,
      create: field
    })
  }

  console.log('✅ Seed data created successfully!')

  console.log(`- ${ibCourses.length} IB courses`)

  console.log(`- ${countries.length} countries`)

  console.log(`- ${fieldsOfStudy.length} fields of study`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
