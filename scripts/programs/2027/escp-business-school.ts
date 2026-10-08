import type { RefreshFile } from '../lib/refresh'

/**
 * ESCP Business School: its Bachelor in Management (BSc), added for content task 5.3 (France) and created, with the university, on 8 October 2026.
 * The owner chose, on 8 October 2026, a few leading private schools alongside the public
 * institutions. Students move campus each year; the first year can be in Paris, so the programme
 * is stored with ESCP's own city and no campus city (data conventions, content 8.2).
 *
 * Dry run: npx tsx scripts/programs/refresh.ts escp-business-school
 */

const BSC = 'https://escp.eu/programmes/bachelor-in-management-BSc'

const refresh: RefreshFile = {
  university: 'ESCP Business School',
  entryYear: 2027,
  checkedOn: '2026-10-08',
  programs: [
    {
      id: 'cmuzj2ppg001q6x7mluwc393c',
      status: 'current',
      name: 'Management',
      description:
        "ESCP's Bachelor in Management (BSc) is a three-year programme taught in English in which students live and study in three European countries, one a year. The first year is in Paris, Berlin, London or Turin; the second in Berlin, Madrid, Paris or Turin; the third, chosen with the specialisation, in Berlin, London, Madrid, Paris or Turin. It gives a broad grounding in management, economics and law, with mathematics, accounting and statistics, and students learn the languages of their campuses. Graduates can receive up to two further degrees issued by the UK and German authorities, and a third year in Paris can be done as an apprenticeship.\n\nApplicants apply on ESCP's own platform, on a rolling basis, or through Parcoursup, UCAS or the Common App, with transcripts for the last three years and a personal statement in English. Those selected have an online interview with at least two people, including faculty members, and admitted students are offered a campus sequence for the first two years. An English test (IELTS 6.5) is required unless exempt; French is needed only for courses in Paris in the second or third year.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl: BSC,
      requirements: [],
      checkedFor: 2027,
      sources: [BSC],
      notes:
        'Content 5.3: new. "APPLICATIONS FOR THE 2027 INTAKE ARE OPEN!" and fees "for students enrolling in the three-year programme starting in September 2027", so stamped 2027. IB rule: the programme page names no diploma or score; selection on transcripts for the last three years, school-leaving results, a personal statement and an online interview. No minimum score, so 24, the Diploma. Checked, none required: the current page names no subject. ESCP\'s older FAQ PDF (escp.eu/sites/default/files/PDF/Programmes/Bachelor-in-Management-BSc/Bachelor-BSc-ESCP-Europe_FAQ.pdf, written for the IB syllabus before 2021: it names Maths Studies, and the French bac\'s ES, L and S streams) gave a target of 37 IB points with Maths SL 6 or HL 5; it is not used, as nothing shows it still applies. Campuses: year 1 Berlin, London, Paris or Turin (all in English); year 2 Berlin, Madrid, Paris or Turin (Paris in English and French, B1 French); year 3 Berlin, London, Madrid, Paris or Turin (Paris C1 French for French-taught courses). French-baccalaureate applicants who want Paris in year 1 must use Parcoursup. English: IELTS 6.5, TOEFL iBT 4.5 or CAE 180. Fees for September 2027: tuition €17,900 a year for European passport holders and €23,900 for others, plus €2,900 additional fees; deposit €3,500; application fee €80. Contact for Paris: bachelorparis@escp.eu. No "How competitive" paragraph: no admission figures are published. Field: Management is Business & Economics (8.1).'
    }
  ]
}

export default refresh
