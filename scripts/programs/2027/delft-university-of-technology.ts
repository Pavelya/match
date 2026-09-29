import type { RefreshFile } from '../lib/refresh'

/**
 * Delft University of Technology: requirements for 2027 entry.
 *
 * Exported from the database on 2026-09-29 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts delft-university-of-technology
 */
const refresh: RefreshFile = {
  university: 'Delft University of Technology',
  entryYear: 2027,
  checkedOn: '2026-09-29',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk3r0yl200017mjicxlh3nv1',
      status: 'current',
      name: 'Aerospace Engineering',
      description:
        "How do you design an aircraft that can fly on hydrogen? How do you get a wind turbine to work on a floating platform at sea? Is there an easy solution for space debris? When you choose the bachelor's programme Aerospace Engineering, you will be prepared to shape the future of sustainable aerospace. You will gain the essential knowledge needed to understand aerospace engineering, giving you a strong starting point to learn how to design systems, connect different parts of engineering, and work together with students from around the world. With these vital skills you can create and optimize satellites, helicopters, aircraft, and wind turbines, all in a world where sustainability is at the forefront of attention.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.tudelft.nl/en/onderwijs/opleidingen/bachelors/ae/bsc-aerospace-engineering',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.tudelft.nl/en/education/admission-and-application/bsc-international-diploma/admission-requirements/specific-diploma-requirements',
        'https://www.tudelft.nl/en/education/admission-and-application/bsc-international-diploma/admission-requirements',
        'https://www.tudelft.nl/en/onderwijs/opleidingen/bachelors/ae/bsc-aerospace-engineering/from-application-to-enrolment/admission-requirements',
        'https://www.tudelft.nl/en/onderwijs/opleidingen/bachelors/ae/bsc-aerospace-engineering'
      ],
      notes:
        'Content 4.6: BSc Aerospace Engineering (English stream), a numerus clausus programme with a selection procedure and a 15 January deadline. IB requirement: "Mathematics: AA HL + Physics HL". The programme page gives the 15 January 2027 deadline, but its admission page still gives the "2026–2027 academic year" capacity (440). TU Delft\'s requirements for the International Baccalaureate (Diploma Programme): "TU Delft only accepts the Mathematics course \'Analysis & Approaches HL\'"; the IB Career-related Programme is not accepted. No grades are named, so 4 is stored; every required subject is critical (the stored rows had the sciences not critical). TU Delft publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Neither the IB requirements page nor the international dates page names an intake, so checked for 2026 (rule 2). Stored before: Maths AA HL 4 (critical); Physics HL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk3r0yx100077mjicwgmvj0t',
      status: 'current',
      name: 'Computer Science and Engineering',
      description:
        'Self-driving cars, smartphone navigation, personalised offers based on your surfing behaviour and robots used in healthcare. During the Computer Science and Engineering degree programme you will learn how to develop software and process data for the intelligent systems of today and the future. Computer Science is an enabling technique that is used in many sectors, which means that the applications are endless. You will learn to analyse and model problems, reason about them, and write algorithms to come to a solution. At least once a year, you will work on a project in a team with fellow students, for example to build an application that helps to find study buddies.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.tudelft.nl/en/onderwijs/opleidingen/bachelors/computer-science-and-engineering/bachelor-of-computer-science-and-engineering',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://www.tudelft.nl/en/education/admission-and-application/bsc-international-diploma/admission-requirements/specific-diploma-requirements',
        'https://www.tudelft.nl/en/education/admission-and-application/bsc-international-diploma/admission-requirements',
        'https://www.tudelft.nl/en/onderwijs/opleidingen/bachelors/computer-science-and-engineering/bachelor-of-computer-science-and-engineering/from-application-to-enrollment/admission-requirements',
        'https://www.tudelft.nl/en/onderwijs/opleidingen/bachelors/computer-science-and-engineering/bachelor-of-computer-science-and-engineering'
      ],
      notes:
        'Content 4.6: BSc Computer Science and Engineering (English stream), a numerus fixus programme filled through matching and selection. IB requirement: "Mathematics: AA HL"; the stored Maths AA HL 4 (critical) already matched. TU Delft\'s requirements for the International Baccalaureate (Diploma Programme): "TU Delft only accepts the Mathematics course \'Analysis & Approaches HL\'"; the IB Career-related Programme is not accepted. No grades are named, so 4 is stored; every required subject is critical (the stored rows had the sciences not critical). TU Delft publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Neither the IB requirements page nor the international dates page names an intake, so checked for 2026 (rule 2).'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk3r0z6k000b7mjinmun5usb',
      status: 'current',
      name: 'Earth, Climate and Technology',
      description:
        "Are you looking for a degree that combines knowledge of the Earth with engineering? Do you want to develop solutions for challenges related to climate change, the energy transition, and the availability of scarce resources? Then Earth, Climate and Technology is the programme for you! In this English-taught bachelor's programme, you will apply your technical knowledge to the part of the Earth that closely interacts with our environment, from the atmosphere to a few kilometres deep into the Earth's crust. You'll learn how to study climate change using models and satellite data, and how to address its impacts on the planet. You will delve into technical solutions for the energy transition, such as geothermal energy and CO2 storage. Additionally, you'll explore sustainable ways to extract the natural resources needed for solar panels, wind turbines, and the batteries of electric cars.",
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.tudelft.nl/en/onderwijs/opleidingen/bachelors/ect/bsc-earth-climate-and-technology',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.tudelft.nl/en/education/admission-and-application/bsc-international-diploma/admission-requirements/specific-diploma-requirements',
        'https://www.tudelft.nl/en/education/admission-and-application/bsc-international-diploma/admission-requirements',
        'https://www.tudelft.nl/en/onderwijs/opleidingen/bachelors/ect/bsc-earth-climate-and-technology/from-application-to-enrollment/admission-requirements',
        'https://www.tudelft.nl/en/onderwijs/opleidingen/bachelors/ect/bsc-earth-climate-and-technology'
      ],
      notes:
        'Content 4.6: BSc Earth, Climate and Technology (previously Applied Earth Sciences; English stream), no numerus fixus. IB requirement: "Mathematics: AA HL + Physics HL + Chemistry: SL". TU Delft\'s requirements for the International Baccalaureate (Diploma Programme): "TU Delft only accepts the Mathematics course \'Analysis & Approaches HL\'"; the IB Career-related Programme is not accepted. No grades are named, so 4 is stored; every required subject is critical (the stored rows had the sciences not critical). TU Delft publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Neither the IB requirements page nor the international dates page names an intake, so checked for 2026 (rule 2). Stored before: Maths AA HL 4 (critical); Physics HL 4; Chemistry SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk3r0zje000j7mji0xy4y04g',
      status: 'current',
      name: 'Nanobiology',
      description:
        'Nanobiology is a joint degree programme offered by TU Delft and Erasmus University Rotterdam (Erasmus MC) that explores life at the molecular level. This unique programme combines physics, mathematics, chemistry, and biology to study living systems at the nanoscale. You will learn to apply cutting-edge techniques from physics and engineering to understand biological processes at the molecular level. The programme prepares you for careers in biotechnology, pharmaceutical research, medical technology, and academic research. With access to world-class facilities at both universities, you will gain hands-on experience with advanced research techniques used to study life at its most fundamental level.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.tudelft.nl/en/education/programmes/bachelors/nb/bsc-nanobiology',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO'], level: 'HL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.tudelft.nl/en/education/admission-and-application/bsc-international-diploma/admission-requirements/specific-diploma-requirements',
        'https://www.tudelft.nl/en/education/admission-and-application/bsc-international-diploma/admission-requirements',
        'https://www.tudelft.nl/en/education/programmes/bachelors/nb/bsc-nanobiology/from-application-to-enrolment/admission-requirements',
        'https://www.tudelft.nl/en/education/programmes/bachelors/nb/bsc-nanobiology'
      ],
      notes:
        'Content 4.6: BSc Nanobiology (English stream), taught with Erasmus University (Erasmus MC); no numerus clausus, mandatory matching. IB requirement: "Mathematics: AA HL + Physics HL + Biology HL + Chemistry SL". TU Delft\'s requirements for the International Baccalaureate (Diploma Programme): "TU Delft only accepts the Mathematics course \'Analysis & Approaches HL\'"; the IB Career-related Programme is not accepted. No grades are named, so 4 is stored; every required subject is critical (the stored rows had the sciences not critical). TU Delft publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Neither the IB requirements page nor the international dates page names an intake, so checked for 2026 (rule 2). Stored before: Maths AA HL 4 (critical); Biology HL 4; Physics HL 4; Chemistry SL 4.'
    }
  ]
}

export default refresh
