import type { AdmitRatesFile } from '../lib/admit-rates'

/**
 * First-year admit counts for the US universities (content 6), fall 2025, read 2026-10-09 and
 * 2026-10-10. From each Common Data Set 2025-2026, item C1 (total first-time, first-year
 * applicants and admits, and the in-state / out-of-state / international breakdown where the
 * university fills it in), except Harvard, which publishes no Common Data Set: its counts are the
 * Office of Institutional Research and Analytics' Fact Book (Class of 2029, which entered in fall
 * 2025). The same figures are in each program's "How competitive" paragraph; update both at each
 * refresh.
 *
 * Dry run: npx tsx scripts/programs/set-admit-rates.ts scripts/programs/2027/admit-rates-us.ts
 */
const rates: AdmitRatesFile = {
  checkedOn: '2026-10-10',
  universities: [
    {
      university: 'Georgia Institute of Technology',
      year: 2025,
      firstYear: { applied: 66881, admitted: 8921 },
      international: { applied: 9758, admitted: 716 },
      source: 'https://irp.gatech.edu/sites/default/files/CDS/CDS_2025-2026_FINAL_R4_03JUN2026.pdf'
    },
    {
      university: 'Massachusetts Institute of Technology',
      year: 2025,
      firstYear: { applied: 29281, admitted: 1334 },
      source: 'https://ir.mit.edu/projects/2025-26-common-data-set/'
    },
    {
      university: 'Harvard University',
      year: 2025,
      firstYear: { applied: 47893, admitted: 2003 },
      source: 'https://oira.harvard.edu/factbook/fact-book-admissions/'
    },
    {
      university: 'Stanford University',
      year: 2025,
      firstYear: { applied: 60646, admitted: 2302 },
      source: 'https://irds.stanford.edu/data-findings/cds'
    },
    {
      university: 'University of California, Berkeley',
      year: 2025,
      firstYear: { applied: 126864, admitted: 14524 },
      source: 'https://opa.berkeley.edu/campus-data/common-data-set'
    },
    {
      university: 'University of California, Los Angeles',
      year: 2025,
      firstYear: { applied: 145086, admitted: 13659 },
      source: 'https://apb.ucla.edu/campus-statistics/common-data-set-undergraduate-profile'
    },
    {
      university: 'University of Michigan',
      year: 2025,
      firstYear: { applied: 109112, admitted: 17915 },
      source: 'https://obp.umich.edu/wp-content/uploads/pubdata/cds/cds_2025-26_umaa.pdf'
    },
    {
      university: 'Purdue University',
      year: 2025,
      firstYear: { applied: 87220, admitted: 37881 },
      international: { applied: 16327, admitted: 3672 },
      source: 'https://www.purdue.edu/idata/wp-content/uploads/2026/04/CDS-2025-2026.xlsx'
    },
    {
      university: 'New York University',
      year: 2025,
      firstYear: { applied: 114125, admitted: 10340 },
      source:
        'https://www.nyu.edu/content/dam/nyu/institutionalResearch/documents/cds-2025-2026/CDS%202025-2026%20FINAL%20(no%20G).pdf'
    },
    {
      university: 'Boston University',
      year: 2025,
      firstYear: { applied: 76776, admitted: 9853 },
      international: { applied: 15794, admitted: 2521 },
      source: 'https://www.bu.edu/asir/files/2026/07/CDS-2025-2026-updated.pdf'
    },
    {
      university: 'Northeastern University',
      year: 2025,
      firstYear: { applied: 105256, admitted: 5920 },
      international: { applied: 18754, admitted: 735 },
      source: 'https://uds.northeastern.edu/facts/common-data-set/'
    },
    {
      university: 'Arizona State University',
      year: 2025,
      firstYear: { applied: 69617, admitted: 61533 },
      international: { applied: 8906, admitted: 8009 },
      source:
        'https://uoia.asu.edu/sites/g/files/litvpz1436/files/2026-06/CDS%202025-26%20-%20ASU%20Campus%20Immersion.pdf'
    }
  ]
}

export default rates
