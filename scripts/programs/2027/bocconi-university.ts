import type { RefreshFile } from '../lib/refresh'

/**
 * Bocconi University: requirements for 2027 entry.
 *
 * Exported from the database on 2026-09-27 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts bocconi-university
 */
const refresh: RefreshFile = {
  university: 'Bocconi University',
  entryYear: 2027,
  checkedOn: '2026-09-27',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cml3s05ig0001jy045k2onvi7',
      status: 'current',
      name: 'Bachelor in Global Law (BGL)',
      description:
        'Developments in the markets and the evolution of society as a whole have engendered a demand for experts equipped with highly interdisciplinary competence, who are capable of working in public and private organizations of global calibre.\n\nThe Bachelor in Global Law, taught in English, is intended to provide the knowledge and skills that are essential to carry out innovative advisory roles increasingly sought for in the international context of institutions, companies, and other organizations.\n\nIn particular, the program seeks to:\n\nProvide the theoretical and practical instruments of law that enable graduates to carry out an advisory role in the international environment and in the context of different national systems\nTransmit a highly interdisciplinary knowledge of law, which combines notions of business management, finance, and economics, as well as training in the use of digital technology\nPursue an in-depth study of the global dimension of legal issues, in particular as regards:\nThe functioning of institutions and businesses\nThe protection of individual rights in the social and economic context\nCompliance with legal requirements of both for- and non-profit organizations\nUse teaching methods based on active participation and experiential learning, including group work, legal clinics, and moot court competitions\nDevelop behavioral and linguistic skills that are essential to operate effectively in an international professional setting, thanks, among other things, to internships and seminars of critical thinking, negotiation, advocacy, legal writing, and public speaking.\nThe aim is therefore to train young paralegals, consultants and other legal practitioners who are interested in an international career in public and private organizations.\n\nGraduates will be able to enter the job market at a junior level in legal consultancy roles, which can encompass various positions, including those in regulatory positions and paralegal roles (for example, working as data protection officers, professional support lawyers, government consultants) or continue their studies at graduate level in law, economics, or international relations (for example by doing a JD, MA, MSc, LLM).',
      field: 'Law',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.unibocconi.it/en/programs/law/bachelor-global-law',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.unibocconi.it/en/applying-bocconi/bachelor-and-law-programs/application-and-admissions/admissions',
        'https://www.unibocconi.it/en/applying-bocconi/bachelor-and-law-programs/application-and-admissions/secondary-school-diplomas',
        'https://www.unibocconi.it/en/programs/law/bachelor-global-law'
      ],
      notes:
        'Content 3.4: Bocconi restructured its bachelor\'s range for 2027-28; this program keeps its name and page. Law School, degree class L-14, one class of 80 places, 3 years; the Bocconi online test - Law or the LSAT are also accepted. Degree left as "Bachelor" (Bachelor in Global Law, not an LLB). Admission for 2027-28 (Early session September 2026, Winter session November 2026 to January 2027) is decided on a selection test (Bocconi online test, SAT or ACT; 55%) and the GPA of the third-last and second-last school years (45%); the IB result is not scored. The only IB figure Bocconi publishes is the enrollment condition: a full IB Diploma by the May session with at least 24 points, 12 of them at HL, and the core passed, so 24 is stored (was 38). Checked, no specific subjects required. English at B2 for enrollment (a certificate, Bocconi\'s test or native-speaker status).'
    },
    // Stored: not checked for any intake.
    {
      id: 'cml3sjjd6000hjy04h10k5jhx',
      status: 'current',
      name: 'Economics',
      description:
        'The BSc in Economics is a program focused on economics with a solid quantitative foundation and a rich interdisciplinary nature. It prepares students to understand economic and social phenomena using mathematical models and statistical techniques, combining statistics, mathematics, machine learning, econometrics and micro- and macroeconomics. From the second semester of the second year students choose one of two tracks: Economic Sciences, or Economic and Data Sciences. The program is offered entirely in English.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.unibocconi.it/en/programs/bachelor-science/economics',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.unibocconi.it/en/applying-bocconi/bachelor-and-law-programs/application-and-admissions/admissions',
        'https://www.unibocconi.it/en/applying-bocconi/bachelor-and-law-programs/application-and-admissions/secondary-school-diplomas',
        'https://www.unibocconi.it/en/programs/bachelor-science/economics'
      ],
      notes:
        "Content 3.4: renamed. Bocconi restructured its bachelor's range for 2027-28 and the old Economic and Social Sciences (BESS) URL redirects here; the 2027-28 admissions page lists Economics and no longer lists Economic and Social Sciences (BESS). Same degree class (L-33), one class of 115 places. Admission for 2027-28 (Early session September 2026, Winter session November 2026 to January 2027) is decided on a selection test (Bocconi online test, SAT or ACT; 55%) and the GPA of the third-last and second-last school years (45%); the IB result is not scored. The only IB figure Bocconi publishes is the enrollment condition: a full IB Diploma by the May session with at least 24 points, 12 of them at HL, and the core passed, so 24 is stored (was 30). Checked, no specific subjects required. English at B2 for enrollment (a certificate, Bocconi's test or native-speaker status)."
    },
    // Stored: not checked for any intake.
    {
      id: 'cml3shwby000fjy04g0qrw791',
      status: 'current',
      name: 'Management for the Arts and Cultures',
      description:
        'The BSc in Management for the Arts and Cultures combines a strong foundation in management and economics with a solid grounding in the arts and humanities. Students learn to engage with artistic, cultural and creative practices, interpret their institutional, economic and legal frameworks, and design, govern and evaluate cultural and creative projects and organizations, across museums, heritage and art markets, performing arts, publishing, music, film and media, fashion and design. The program is taught in English and emphasizes project-based learning.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.unibocconi.it/en/programs/bachelor-science/management-arts-and-cultures',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.unibocconi.it/en/applying-bocconi/bachelor-and-law-programs/application-and-admissions/admissions',
        'https://www.unibocconi.it/en/applying-bocconi/bachelor-and-law-programs/application-and-admissions/secondary-school-diplomas',
        'https://www.unibocconi.it/en/programs/bachelor-science/management-arts-and-cultures'
      ],
      notes:
        'Content 3.4: renamed. Bocconi restructured its bachelor\'s range for 2027-28 and the old Economics and Management for Arts, Culture and Communication (CLEACC) URL redirects here; the 2027-28 admissions page lists Management for the Arts and Cultures and no longer lists Economics and Management for Arts, Culture and Communication (CLEACC). Degree class L-18, two classes (230 places). The stored duration "3" becomes "3 years". Admission for 2027-28 (Early session September 2026, Winter session November 2026 to January 2027) is decided on a selection test (Bocconi online test, SAT or ACT; 55%) and the GPA of the third-last and second-last school years (45%); the IB result is not scored. The only IB figure Bocconi publishes is the enrollment condition: a full IB Diploma by the May session with at least 24 points, 12 of them at HL, and the core passed, so 24 is stored (was 30). Checked, no specific subjects required. English at B2 for enrollment (a certificate, Bocconi\'s test or native-speaker status).'
    },
    // Stored: not checked for any intake.
    {
      id: 'cml3sgdmg000djy04bexygz78',
      status: 'current',
      name: 'Management and Computer Science',
      description:
        'The BSc in Management and Computer Science develops mathematical, statistical and computational skills to train managers able to leverage the strategic role of data analysis. Students learn to acquire, organize, analyze and interpret data in support of economic, managerial and financial decision-making in any sector, covering mathematical and statistical structures, machine learning, computing, legal frameworks and economic thinking. The program is offered entirely in English.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.unibocconi.it/en/programs/bachelor-science/management-and-computer-science',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.unibocconi.it/en/applying-bocconi/bachelor-and-law-programs/application-and-admissions/admissions',
        'https://www.unibocconi.it/en/applying-bocconi/bachelor-and-law-programs/application-and-admissions/secondary-school-diplomas',
        'https://www.unibocconi.it/en/programs/bachelor-science/management-and-computer-science'
      ],
      notes:
        "Content 3.4: renamed. Bocconi restructured its bachelor's range for 2027-28 and the old Economics, Management and Computer Science (BEMACS) URL redirects here; the 2027-28 admissions page lists Management and Computer Science and no longer lists Economics, Management and Computer Science (BEMACS). Degree class L-33, two classes (230 places); the page keeps the BemacsTalks series. Admission for 2027-28 (Early session September 2026, Winter session November 2026 to January 2027) is decided on a selection test (Bocconi online test, SAT or ACT; 55%) and the GPA of the third-last and second-last school years (45%); the IB result is not scored. The only IB figure Bocconi publishes is the enrollment condition: a full IB Diploma by the May session with at least 24 points, 12 of them at HL, and the core passed, so 24 is stored (was 30). Checked, no specific subjects required. English at B2 for enrollment (a certificate, Bocconi's test or native-speaker status)."
    },
    // Stored: not checked for any intake.
    {
      id: 'cml3se41z000bjy04vfian6sr',
      status: 'current',
      name: 'Finance',
      description:
        'The BSc in Finance enables students to understand how the financial system works, with a focus on capital markets, financial intermediaries, contracts and financial instruments. It provides a solid education grounded in rigorous quantitative tools and an analytical, data-driven approach to financial decisions and risks, preparing students to work in constantly evolving domestic and international financial environments. The program is offered entirely in English.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.unibocconi.it/en/programs/bachelor-science/finance',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.unibocconi.it/en/applying-bocconi/bachelor-and-law-programs/application-and-admissions/admissions',
        'https://www.unibocconi.it/en/applying-bocconi/bachelor-and-law-programs/application-and-admissions/secondary-school-diplomas',
        'https://www.unibocconi.it/en/programs/bachelor-science/finance'
      ],
      notes:
        "Content 3.4: renamed. Bocconi restructured its bachelor's range for 2027-28 and the old International Economics and Finance (BIEF) URL redirects here; the 2027-28 admissions page lists Finance and no longer lists International Economics and Finance (BIEF). Degree class L-33, four classes (460 places). Admission for 2027-28 (Early session September 2026, Winter session November 2026 to January 2027) is decided on a selection test (Bocconi online test, SAT or ACT; 55%) and the GPA of the third-last and second-last school years (45%); the IB result is not scored. The only IB figure Bocconi publishes is the enrollment condition: a full IB Diploma by the May session with at least 24 points, 12 of them at HL, and the core passed, so 24 is stored (was 30). Checked, no specific subjects required. English at B2 for enrollment (a certificate, Bocconi's test or native-speaker status)."
    },
    // Stored: not checked for any intake.
    {
      id: 'cml3safv40007jy04vbr5m5jq',
      status: 'current',
      name: 'Management',
      description:
        'The BSc in Management provides students with the tools to understand what resources an organization needs to carry out a project and how those resources should be planned, organized and managed. It examines how companies operate across business functions such as logistics, marketing and finance, in different types of organizations and in national and international economic contexts, and develops an integrated view of the firm. The program is taught in English.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.unibocconi.it/en/programs/bachelor-science/management',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.unibocconi.it/en/applying-bocconi/bachelor-and-law-programs/application-and-admissions/admissions',
        'https://www.unibocconi.it/en/applying-bocconi/bachelor-and-law-programs/application-and-admissions/secondary-school-diplomas',
        'https://www.unibocconi.it/en/programs/bachelor-science/management'
      ],
      notes:
        "Content 3.4: renamed. Bocconi restructured its bachelor's range for 2027-28 and the old International Economics and Management (BIEM) URL redirects here; the 2027-28 admissions page lists Management and no longer lists International Economics and Management (BIEM). Degree class L-18, six English classes (690 places). Admission for 2027-28 (Early session September 2026, Winter session November 2026 to January 2027) is decided on a selection test (Bocconi online test, SAT or ACT; 55%) and the GPA of the third-last and second-last school years (45%); the IB result is not scored. The only IB figure Bocconi publishes is the enrollment condition: a full IB Diploma by the May session with at least 24 points, 12 of them at HL, and the core passed, so 24 is stored (was 30). Checked, no specific subjects required. English at B2 for enrollment (a certificate, Bocconi's test or native-speaker status)."
    },
    // Stored: not checked for any intake.
    {
      id: 'cml3sc5vp0009jy04g2llkkeq',
      status: 'current',
      name: 'International Politics and Government (IPG)',
      description:
        'This BSc is the first undergraduate program offered by Bocconi in the field of political science, with a small multicultural class group of selected, highly motivated students, taught by a dedicated international faculty.\n\nYou will learn how to interpret the evolution of social, economic and political systems in an international perspective, understand the mechanisms of decision-making and management within national and international institutions, develop skills needed for designing, implementing and evaluating public policies, and understand and manage interactions between private actors and the public sector.\n\nYou will acquire a toolbox of soft and hard skills through active learning from a wide array of subjects: politics, economics, management, law, history and quantitative methods. Great emphasis is placed on three moments of policy-making: designing public policies which are both economically efficient and politically sustainable; implementing public policies with an effective approach; and evaluating public policies using modern quantitative and qualitative techniques.\n\nGraduates of the program will be prepared to work at national and international public institutions, as well as nongovernmental organizations (NGOs). They will also have the knowledge and skills needed to work in the private sector, both in consultancy, lobbying and public affairs firms, and in the management of companies, especially those operating in regulated sectors and in multinational settings characterized by significant geopolitical risks.\n\nThe program aims to educate future national and international policy-makers, active players in international organizations and regulatory authorities, and managers in international private firms dealing with growing non-market environments.\n\nThe BSc offers two tracks, each of which exposes participants to different international learning environments:\n\nStudents in the Politics and Policy Making track take part in a compulsory exchange, studying abroad at a partner university for one semester, and have the option of doing a curricular internship.\nData, Society and Organisations is a double degree offered with HEC Paris. This track is designed for applicants with a strong interest in quantitative methods and data science. It also offers the option of doing a curricular internship.\nApplicants to the dual program with HEC Paris are required to complete a specific application.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.unibocconi.it/en/programs/bachelor-science/international-politics-and-government',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.unibocconi.it/en/applying-bocconi/bachelor-and-law-programs/application-and-admissions/admissions',
        'https://www.unibocconi.it/en/applying-bocconi/bachelor-and-law-programs/application-and-admissions/secondary-school-diplomas',
        'https://www.unibocconi.it/en/programs/bachelor-science/international-politics-and-government'
      ],
      notes:
        "Content 3.4: Bocconi restructured its bachelor's range for 2027-28; this program keeps its name and page. Degree class L-36, one class of 115 places, 3 years; a separate double degree with HEC has its own selection. Admission for 2027-28 (Early session September 2026, Winter session November 2026 to January 2027) is decided on a selection test (Bocconi online test, SAT or ACT; 55%) and the GPA of the third-last and second-last school years (45%); the IB result is not scored. The only IB figure Bocconi publishes is the enrollment condition: a full IB Diploma by the May session with at least 24 points, 12 of them at HL, and the core passed, so 24 is stored (was 30). Checked, no specific subjects required. English at B2 for enrollment (a certificate, Bocconi's test or native-speaker status)."
    },
    // Stored: not checked for any intake.
    {
      id: 'cml3s90bb0005jy049igi8csk',
      status: 'current',
      name: 'Mathematical and Computing Sciences for Artificial Intelligence (BAI)',
      description:
        'This unique program stands at the intersection of major scientific disciplines: mathematics, computer science, physics, and economics. All of them are crucial for analyzing natural sciences, biomedical and social phenomena and, in particular, to develop the Artificial Intelligence (AI)  tools that model the complex realities stored in the vast datasets available today.\n\nBright, math-oriented students who want to acquire a deep and well-rounded understanding of the instruments required to tackle the current open questions in science, medicine, technology and society, and who grasp the growing impact of AI, will see in this program a great opportunity. Through this multidisciplinary path, they will have the chance to step into the elite ranks of scholars and professionals who will guide the development of future knowledge and its real-world applications, in AI and elsewhere. They will learn to nurture the emergence of new knowledge and to value new points of view.\n\nDemand for skillsets that combine elements of STEM subjects (Science, Technology, Engineering, Mathematics) is very strong and growing. This BSc focuses on critical and methodological abilities from those same areas that will remain valid even as new technologies succeed one another, so graduates can confidently expect long and rewarding careers.\n\nThe study plan aims to provide a rigorous theoretical preparation, in terms of contents and methods, in different areas of mathematics and computer science and in the modelling techniques of science, technology and economics. Students receive methodological training in data driven AI (machine learning, computational statistics) and, at the same time, master the main mathematical, computational and modelling methods for the solution of quantitative problems and for making progress in the AI field itself.\n\nIn addition, soft skills such as effective communication and ability to work in a team are developed, enabling graduates to integrate and collaborate effectively in academic and professional contexts.\n\nThe BSc in Mathematical and Computing Sciences for Artificial Intelligence will open students’ minds and empower them with the best preparation to thrive and excel in the new digital era.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.unibocconi.it/en/programs/bachelor-science/mathematical-and-computing-sciences-artificial-intelligence',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.unibocconi.it/en/applying-bocconi/bachelor-and-law-programs/application-and-admissions/admissions',
        'https://www.unibocconi.it/en/applying-bocconi/bachelor-and-law-programs/application-and-admissions/secondary-school-diplomas',
        'https://www.unibocconi.it/en/programs/bachelor-science/mathematical-and-computing-sciences-artificial-intelligence'
      ],
      notes:
        "Content 3.4: Bocconi restructured its bachelor's range for 2027-28; this program keeps its name and page. Degree class L-35, one class of 115 places, 3 years. Admission for 2027-28 (Early session September 2026, Winter session November 2026 to January 2027) is decided on a selection test (Bocconi online test, SAT or ACT; 55%) and the GPA of the third-last and second-last school years (45%); the IB result is not scored. The only IB figure Bocconi publishes is the enrollment condition: a full IB Diploma by the May session with at least 24 points, 12 of them at HL, and the core passed, so 24 is stored (was 38). Checked, no specific subjects required. English at B2 for enrollment (a certificate, Bocconi's test or native-speaker status)."
    },
    // Stored: not checked for any intake.
    {
      id: 'cml3s76hy0003jy04hybs0gek',
      status: 'current',
      name: 'World Bachelor in Business (WBB)',
      description:
        'Three World-Class Universities, Three Continents, Three Degrees: One Unparalleled Experience\n\nIt is a unique 4-year program, developed with two prestigious partner universities: USC University of Southern California’s Marshall School of Business in Los Angeles and HKUST the Hong Kong University of Science and Technology. In a select class of about 50 participants coming from all over the world, you will study at a different location and university each year, spanning three continents: the ﬁrst year is in Los Angeles, the second in Hong Kong, the third in Milan and the fourth at your choice of one of these schools.\n\nThe program represents an exciting study and life experience that requires strong motivation, cultural openness and high ﬂexibility to adapt to new environments and situations. Selected students learn from internationally renowned teachers and scholars, exploring diverse cultures and pushing themselves to new limits. It’s is the first undergraduate partnership of its kind, designed to engage intellectually curious students in a business curriculum that connects leading edge teaching methods with cultural immersion and real-world experiences. English is the common language of the WBB, and students become versed in the language of business in Asia, Europe and North America during extracurricular activities and internships arranged in each country. This is a new approach to education that will prepare a new generation of leaders for the opportunities of an interconnected world.\n\nThe curriculum is rigorous and provides a solid foundation in business and economics. It also encourages a well-rounded education, requiring liberal arts courses with an emphasis on writing, science and humanities.\n\nThe ﬁrst three years are composed of required courses that focus on a variety of topics according to the country of study and the special strengths of each school. In the first year, WBB students delve into the heart of Los Angeles to explore the emerging relationships between technology and entertainment. In the second year they meet with financial leaders in the high rises of Hong Kong to discuss the global banking industry. In Milan, in the third year they consolidate their economic and management knowledge as they study the complexities of integrating the many countries of the European Union. Business and legal courses with regional emphasis will help students acquire an in-depth understanding of the nuances of doing business in different global environments.\n\nAt the end of the program, students will earn 3 recognized Bachelor degrees, one from each school.\n\nWBB graduates are particularly attractive candidates for jobs in international businesses and organizations of all types, due to their ability to understand global settings, cultures, economies and societies.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: 'https://www.unibocconi.it/en/programs/bachelor-science/world-bachelor-business',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.unibocconi.it/en/applying-bocconi/bachelor-and-law-programs/application-and-admissions/admissions',
        'https://www.unibocconi.it/en/applying-bocconi/bachelor-and-law-programs/application-and-admissions/secondary-school-diplomas',
        'https://www.unibocconi.it/en/programs/bachelor-science/world-bachelor-business'
      ],
      notes:
        'Content 3.4: Bocconi restructured its bachelor\'s range for 2027-28; this program keeps its name and page. With USC Marshall and HKUST: 45 places, four years (Bocconi: "only the World Bachelor in Business ... is a four-year program"; the stored 3 years was wrong). WBB has its own selection procedure and timeline, so the test-and-GPA rule below may not apply to it; the diploma condition does. Degree left as "Bachelor": it awards three degrees. Admission for 2027-28 (Early session September 2026, Winter session November 2026 to January 2027) is decided on a selection test (Bocconi online test, SAT or ACT; 55%) and the GPA of the third-last and second-last school years (45%); the IB result is not scored. The only IB figure Bocconi publishes is the enrollment condition: a full IB Diploma by the May session with at least 24 points, 12 of them at HL, and the core passed, so 24 is stored (was 30). Checked, no specific subjects required. English at B2 for enrollment (a certificate, Bocconi\'s test or native-speaker status).'
    }
  ]
}

export default refresh
