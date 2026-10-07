import { describe, expect, it } from 'vitest'
import { creditParts, splitImageCredit } from './image-credit'

// Last lines as stored on 7 October 2026.
const SYDNEY =
  'Image attribution: By Jason Tong - Own work, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=32208955'
const AARHUS =
  'Image: By RhinoMind - Own work, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=62658549'
const UCL =
  'By Tagishsimon (talk) (Uploads) - Photo by and copyright Tagishsimon - 2 May 2004, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=27536607'
const HKUST =
  'Image: By Hkust pao - Example: http://www.ust.hk/eng/images/about/pdf/hkust_corporate_booklet.pdf, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=22824258'

describe('splitImageCredit', () => {
  it('takes a labelled credit off the last line, label and all', () => {
    expect(
      splitImageCredit(`Founded in 1850.\n\nPrograms across medicine, law and arts.\n\n${SYDNEY}`)
    ).toEqual({
      description: 'Founded in 1850.\n\nPrograms across medicine, law and arts.',
      credit:
        'By Jason Tong - Own work, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=32208955'
    })
    expect(splitImageCredit(`Apply by 15 March.\n\n${AARHUS}`)?.credit).toBe(
      'By RhinoMind - Own work, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=62658549'
    )
  })

  it('takes an unlabelled Wikimedia credit, and one after a single line break', () => {
    expect(splitImageCredit(`150 countries. \n\n${UCL}`)).toEqual({
      description: '150 countries.',
      credit: UCL
    })
    expect(splitImageCredit(`More than 24,000 students.\n${AARHUS}`)?.description).toBe(
      'More than 24,000 students.'
    )
  })

  it('leaves a description that does not end with a credit', () => {
    expect(splitImageCredit('A university. By the sea.')).toBeNull()
    expect(splitImageCredit(`${AARHUS}\n\nThe last line is the description.`)).toBeNull()
    expect(
      splitImageCredit('Founded in 1850.\n\nBy 2030 it plans to double its intake.')
    ).toBeNull()
  })

  it('refuses to leave an empty description', () => {
    expect(splitImageCredit(SYDNEY)).toBeNull()
    expect(splitImageCredit(`\n\n${SYDNEY}`)).toBeNull()
  })
})

describe('creditParts', () => {
  it('links each address under its host, and keeps the text around it', () => {
    expect(creditParts(UCL)).toEqual([
      {
        text: 'By Tagishsimon (talk) (Uploads) - Photo by and copyright Tagishsimon - 2 May 2004, CC BY-SA 3.0, '
      },
      {
        url: 'https://commons.wikimedia.org/w/index.php?curid=27536607',
        label: 'commons.wikimedia.org'
      }
    ])
  })

  it('stops an address at the comma after it', () => {
    expect(creditParts(HKUST.replace(/^Image: /, ''))).toEqual([
      { text: 'By Hkust pao - Example: ' },
      {
        url: 'http://www.ust.hk/eng/images/about/pdf/hkust_corporate_booklet.pdf',
        label: 'ust.hk'
      },
      { text: ', CC BY-SA 3.0, ' },
      {
        url: 'https://commons.wikimedia.org/w/index.php?curid=22824258',
        label: 'commons.wikimedia.org'
      }
    ])
  })

  it('is plain text when there is no address', () => {
    expect(creditParts('Photo: University of Groningen')).toEqual([
      { text: 'Photo: University of Groningen' }
    ])
  })
})
