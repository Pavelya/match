/**
 * The questions Explore answers (rebranding 2.3, board "D4.7 Explore"). The page's FAQPage
 * structured data has said them to search engines since the January 2026 SEO work; the new
 * design also shows them, collapsed, at the end of the page, because structured data must
 * describe what the page shows (Definition of done 12). One copy for both, words unchanged.
 * Two answers are out of date ("match probability", "over 1000 university programs"); rewording
 * them is its own pull request.
 */

export const EXPLORE_QUESTIONS: readonly { question: string; answer: string }[] = [
  {
    question: 'How do I search for IB programs?',
    answer:
      'Use the search bar to find programs by name, or use the filters to browse by IB points (24-45), country, and field of study. You can filter by specific IB point requirements to find programs that match your predicted score.'
  },
  {
    question: 'Can I filter programs by IB points?',
    answer:
      'Yes, you can filter programs by IB points ranging from 24 to 45. This helps you find programs that match your predicted or achieved IB score. Programs are displayed with their minimum IB points requirement.'
  },
  {
    question: 'What countries are available in the search?',
    answer:
      'The search includes programs from universities worldwide, including the UK, USA, Canada, Australia, Singapore, Netherlands, Germany, and many more countries. Use the country filter to browse programs by location.'
  },
  {
    question: 'What fields of study can I search for?',
    answer:
      'You can search across all major fields of study including Computer Science, Engineering, Medicine, Business, Arts, Sciences, Social Sciences, and more. Use the field filter to find programs in your area of interest.'
  },
  {
    question: 'How do I know if I meet the IB requirements?',
    answer:
      'Each program card shows the minimum IB points required. Click on a program to see detailed IB requirements including specific course requirements (HL/SL subjects and minimum grades). You can also create a profile to see your match probability.'
  },
  {
    question: 'Can I search for programs with specific IB course requirements?',
    answer:
      'Yes, each program page shows detailed IB course requirements including which subjects are required at HL or SL level and the minimum grades needed. You can browse programs and compare their specific IB course requirements.'
  },
  {
    question: 'How many programs are in the database?',
    answer:
      'The database includes over 1000 university programs from top institutions worldwide. All programs accept the IB Diploma and display IB-specific admission requirements including points and course requirements.'
  },
  {
    question: 'How do I apply to programs I find?',
    answer:
      'Each program card includes a link to the official university program page where you can find detailed application information and apply directly. The program pages also show contact information for university admissions offices.'
  }
]
