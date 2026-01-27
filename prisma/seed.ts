import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding IB courses...')
  const ibCourses = [
    // Group 1: Studies in language and literature (Language A)
    { name: 'English A: Literature', code: 'ENG-LIT', group: 1 },
    { name: 'English A: Language & Literature', code: 'ENG-LL', group: 1 },
    { name: 'German A: Literature', code: 'GER-LIT', group: 1 },
    { name: 'German A: Language & Literature', code: 'GER-LL', group: 1 },
    { name: 'French A: Literature', code: 'FRA-LIT', group: 1 },
    { name: 'French A: Language & Literature', code: 'FRA-LL', group: 1 },
    { name: 'Spanish A: Literature', code: 'SPA-LIT', group: 1 },
    { name: 'Spanish A: Language & Literature', code: 'SPA-LL', group: 1 },

    // Group 2: Language acquisition (Language B and ab initio)
    { name: 'German B', code: 'GER-B', group: 2 },
    { name: 'Spanish B', code: 'SPA-B', group: 2 },
    { name: 'French B', code: 'FRA-B', group: 2 },
    { name: 'Italian B', code: 'ITA-B', group: 2 },
    { name: 'Portuguese B', code: 'POR-B', group: 2 },
    { name: 'Mandarin B', code: 'MAN-B', group: 2 },
    { name: 'Japanese B', code: 'JPN-B', group: 2 },
    { name: 'Arabic B', code: 'ARA-B', group: 2 },
    { name: 'Dutch B', code: 'DUT-B', group: 2 },
    { name: 'Russian B', code: 'RUS-B', group: 2 },
    { name: 'Korean B', code: 'KOR-B', group: 2 },
    { name: 'Hindi B', code: 'HIN-B', group: 2 },
    { name: 'Latin', code: 'LAT', group: 2 },
    { name: 'Classical Greek', code: 'GRK', group: 2 },

    // Group 3: Individuals and societies
    { name: 'Economics', code: 'ECON', group: 3 },
    { name: 'Business Management', code: 'BUS-MGMT', group: 3 },
    { name: 'Psychology', code: 'PSYCH', group: 3 },
    { name: 'History', code: 'HIST', group: 3 },
    { name: 'Geography', code: 'GEOG', group: 3 },
    { name: 'Philosophy', code: 'PHIL', group: 3 },
    { name: 'Global Politics', code: 'GLOB-POL', group: 3 },
    { name: 'Social and Cultural Anthropology', code: 'ANTHRO', group: 3 },
    { name: 'World Religions', code: 'WORLD-REL', group: 3 },

    // Group 4: Sciences
    { name: 'Biology', code: 'BIO', group: 4 },
    { name: 'Chemistry', code: 'CHEM', group: 4 },
    { name: 'Physics', code: 'PHYS', group: 4 },
    { name: 'Computer Science', code: 'CS', group: 4 },
    { name: 'Environmental Systems and Societies', code: 'ESS', group: 4 },
    { name: 'Design Technology', code: 'DES-TECH', group: 4 },
    { name: 'Sports, Exercise and Health Science', code: 'SEHS', group: 4 },

    // Group 5: Mathematics
    { name: 'Mathematics: Analysis and Approaches', code: 'MATH-AA', group: 5 },
    { name: 'Mathematics: Applications and Interpretation', code: 'MATH-AI', group: 5 },

    // Group 6: The Arts
    { name: 'Visual Arts', code: 'VISUAL-ARTS', group: 6 },
    { name: 'Music', code: 'MUSIC', group: 6 },
    { name: 'Theatre', code: 'THEATRE', group: 6 },
    { name: 'Film', code: 'FILM', group: 6 },
    { name: 'Dance', code: 'DANCE', group: 6 }
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
  const fields = [
    {
      name: 'Business & Economics',
      iconName: '💼',
      description: 'Finance, Marketing, International Business, Entrepreneurship'
    },
    {
      name: 'Engineering',
      iconName: '⚙️',
      description: 'Mechanical, Electrical, Computer Science, Civil Engineering'
    },
    {
      name: 'Medicine & Health',
      iconName: '🏥',
      description: 'Medicine, Nursing, Pharmacy, Public Health, Dentistry'
    },
    {
      name: 'Computer Science',
      iconName: '💻',
      description: 'Programming, AI, Data Science, Cybersecurity'
    },
    {
      name: 'Law',
      iconName: '⚖️',
      description: 'International Law, Corporate Law, Criminal Justice'
    },
    {
      name: 'Arts & Humanities',
      iconName: '🎨',
      description: 'Fine Arts, Literature, History, Philosophy, Languages'
    },
    {
      name: 'Natural Sciences',
      iconName: '🔬',
      description: 'Biology, Chemistry, Physics, Mathematics, Environmental Science'
    },
    {
      name: 'Social Sciences',
      iconName: '👥',
      description: 'Psychology, Sociology, Political Science, Economics'
    },
    {
      name: 'Architecture',
      iconName: '🏛️',
      description: 'Architecture, Urban Planning, Interior Design, Landscape'
    },
    {
      name: 'Environmental Studies',
      iconName: '🌱',
      description: 'Sustainability, Climate Science, Conservation, Renewable Energy'
    },
    {
      name: 'Education',
      iconName: '📚',
      description: 'Teaching, Educational Psychology'
    },
    {
      name: 'Media',
      iconName: '📺',
      description: 'Journalism, Digital Media, Film Production'
    }
  ]

  for (const field of fields) {
    await prisma.fieldOfStudy.upsert({
      where: { name: field.name },
      update: { iconName: field.iconName, description: field.description },
      create: field
    })
  }

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
