/**
 * Programs that set no IB minimum (content 6, owner, 10 October 2026).
 *
 * `minIBPoints` null means the university publishes no IB minimum and admits holistically, as US
 * universities do: never "not researched". Matching already treats it as no points requirement;
 * every page that shows points says so instead of leaving the line out.
 */

/** Where the points would go: "38 IB Points" or this. */
export const NO_IB_MINIMUM = 'No IB minimum'

/** The card chip and the requirements tile. */
export const NO_IB_MINIMUM_NOTE = 'No IB minimum · holistic admission'
