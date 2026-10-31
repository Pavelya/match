# IB Match – University Program Matching Algorithm (Version XI)

**Version:** XI (11.0)  
**Supersedes:** Version X as the baseline  
**Date:** 30 October 2026  
**Status:** Master (owner, 30 October 2026). Describes production, written from the code on `main`; no
score changed to issue it.  
**Updated:** 30 October 2026, MAINT 5.40: the points window lost its lower end, so more programs are
scored and no score moved. Still XI: the order in `MAINT_tasks.md` gives XI.1 to the first change to a
score, MAINT 5.43.

---

## Why this version exists

Version X was written in December 2025 as a specification, and most of it never reached the score.
Its modules were built and tested, but `calculateMatch` (`lib/matching/scorer.ts`) still runs Version
IX's core, and no commit has ever put fit quality or the unified penalties in that path. What did go
live from X is the candidate filter and three labels attached after scoring. Since then the code has
gained rules neither document has: courses of their own (MAINT 5.18), the three-part status (rebranding
2.1), the order of a list, and the Explore fit.

So XI states what runs. It proposes nothing. A change to the algorithm is a task in `MAINT_tasks.md`,
and that task updates this document and `CHANGELOG.md` in the same pull request.

Master means this is the reference for what runs, and what any change must update. It does not mean every
rule is right: see [Known problems](#known-problems). The work left, in order, is the table at the top of
"Start here" in `docs/tasks/MAINT_tasks.md`.

### Version X against production

| Topic                                 | Version X says                                       | What runs                                                                       |
| ------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------- |
| Points met                            | Fit quality curve; over-qualified scores 0.80 to 1.00 | Full credit at any margin: 36 against a minimum of 24, 34 or 36 all score 1.000 |
| G_M with subjects                     | 0.70 × subjects + 0.30 × fit quality                 | The subjects' average, reduced only when points are short                       |
| Grade above the requirement           | Bonus up to +0.05                                    | No bonus; a met requirement scores 1.0                                          |
| Selectivity boost                     | Up to +0.05 added to the score                       | Worked out, reported, never added                                               |
| Penalties                             | One unified calculation                              | Version IX's caps, multiple-requirements penalty and floors                     |
| No country preference                 | Weights 0.75 and 0.25                                | Weights 0.857 and 0.143                                                         |
| Open to all fields                    | F_M 0.70                                             | F_M 0.5: the matcher reads an empty list, never the open-to-all setting         |
| Open to all locations, or no list     | L_M 0.85 or 0.60                                     | L_M 1.0, with its weight 0                                                      |
| Preferences must be explicit          | Validation error                                     | `preference-validator.ts` is not called                                         |
| Category and confidence               | Part of the result students see                      | Worked out, cached, and read by no screen; the status replaced them             |
| Modes                                 | Three in use                                         | Only `BALANCED` is ever passed                                                  |

---

## The pipeline

```
1. Student          grades, total, fields, countries (read fresh)
2. Candidates       the programs worth scoring (section "Candidates")
3. Score            M = w_G × G_M + w_L × L_M + w_F × F_M, then caps and floors
4. Labels           category, confidence, fit quality (attached, unused)
5. Cache            Redis, 30 minutes
6. Status           meets, close or gap, from the requirements alone
7. Order            status group, then best fit
```

The score orders cards inside a status and appears in "Why this match". It does not decide the status,
and it is not a chance of admission.

---

## Candidates

`getCachedMatchesV10` calls `calculateOptimizedMatches` with `pointsMargin: 10`. With more than 50
programs, `filterWithFallback` narrows the catalogue before anything is scored. It tries each tier in
turn and stops at the first with at least 10 programs (`MINIMUM_CANDIDATES`).

| Tier | Fields  | Countries | Points                  |
| ---- | ------- | --------- | ----------------------- |
| 1    | theirs  | theirs    | up to 10 over the total |
| 2    | theirs  | theirs    | up to 20 over           |
| 3    | theirs  | any       | up to 20 over           |
| 4    | any     | theirs    | up to 20 over           |
| 5    | any     | any       | up to 30 over           |
| 6    | any     | any       | none                    |

An empty list of fields or countries filters nothing. Tiers 3 and 4 run only when the student has a
list to drop. From tier 3 up the list reaches past the student's preferences, and the page says so
(`isWidened`, `WIDENED_SUMMARY`).

**The points window** (`filterByPointsRange`, `lib/matching/program-index.ts`) has a top and no lower
end, in every tier (MAINT 5.40). It works in 5-point buckets, each rounded down, and keeps every bucket
from 0 up to the one holding the total plus the margin. A program with no minimum is in bucket 0, so it
is always kept. So:

| Total | Tier 1 keeps minimums up to |
| ----- | --------------------------- |
| 28    | 39                          |
| 30    | 44                          |
| 36    | 49                          |
| 38    | 49                          |
| 40    | 54                          |

So every program in the student's fields and countries that they meet is scored, and "Meets all
requirements" holds the same programs as Explore with those filters and "Only ones I qualify for" on
(`lib/explore/fit.test.ts`). A program far under the total is not hidden: it sits lower in its group
(see [Order](#order)).

The top of the window is a cost measure, not a rule about programs being out of reach: a minimum more
than 10 over is a gap either way, and leaving it out keeps the list and its cost down. Nothing in the
algorithm treats a low minimum as a worse fit. A low minimum is often the 24 diploma pass mark, not a
sign that a program is easy to enter.

---

## The score

$$M = w_G \times G_M + w_L \times L_M + w_F \times F_M$$

**Weights.** `BALANCED`: $w_G=0.6$, $w_L=0.3$, $w_F=0.1$. With no countries chosen, $w_L=0$ and the
others are divided by their sum: $w_G=0.857$, $w_F=0.143$. `ACADEMIC_FOCUSED` (0.8, 0.1, 0.1) and
`LOCATION_FOCUSED` (0.4, 0.5, 0.1) exist in `types.ts` but nothing passes them.

### Field Match (F_M)

| Case                                        | F_M |
| ------------------------------------------- | --- |
| The program's field is one of theirs        | 1.0 |
| They have no fields listed                  | 0.5 |
| They have fields and this is not one of them | 0.0 |

### Location Match (L_M)

| Case                                           | L_M |
| ---------------------------------------------- | --- |
| The program's country is one of theirs         | 1.0 |
| They have no countries listed                  | 1.0 |
| They have countries and this is not one of them | 0.0 |

### Academic Match (G_M)

`transformProgram` gives each program a type from its data.

| Type                | Data                     | G_M                                                                   |
| ------------------- | ------------------------ | --------------------------------------------------------------------- |
| `FULL_REQUIREMENTS` | a minimum and subjects   | The subjects' average; when points are short, multiplied by a factor  |
| `POINTS_ONLY`       | a minimum, no subjects   | 1.0 when met; otherwise $\max(0.3, \min(1 - d/m, 0.9))$               |
| `SUBJECTS_ONLY`     | subjects, or neither     | The subjects' average; 1.0 with no subjects at all                    |

Here $d$ is the points short and $m$ the minimum. The factor is 0.8 for 1 to 3 points short and
$\max(0.5, 1 - d/m)$ beyond that. A minimum of 0 counts as none. Being over the minimum changes
nothing.

### One subject requirement

| Student has                                    | Score                                                 |
| ---------------------------------------------- | ----------------------------------------------------- |
| Not taken                                      | 0.0                                                   |
| Level met or higher, grade met                 | 1.0                                                   |
| Level met or higher, 1 grade short             | 0.85 if critical, 0.78 if not                         |
| Level met or higher, $g$ grades short, $r$ required | $\max(0.25,\ 0.9 \times (1 - g/(r-1)))$          |
| SL 7 for HL 6 or lower                         | 0.80                                                  |
| SL 6 for HL 5 or lower                         | 0.80                                                  |
| Other SL for HL, grade − 2 still meets it      | 0.75                                                  |
| Other SL for HL                                | $\max(0.25,\ 0.7 \times$ the shortfall score of the gap$)$, never using the critical 0.85 |

An **either/or group** takes its best option's score. The score of a met requirement never exceeds 1.0.

### Courses of their own (MAINT 5.18)

Requirements marked `ownCourse` must each be met by a different course; unmarked ones may share. With
two or more marked in a program, `assignOwnCourses` tries every assignment and keeps the one that meets
the most, then scores highest, then meets the most demanding, then keeps each on the course it would use
alone. A marked requirement left without a course is not met and names the course used elsewhere
(`courseUsedElsewhere`). 65 programs have the flag.

### Caps and floors

`applyPenaltiesAndCaps` (`lib/matching/penalties.ts`), in this order:

1. **Choose the cap.** The first that applies: a critical subject not taken, 0.45; another subject not
   taken, 0.70; a critical subject partly met at 0.75 or above, 0.80. Then, if nothing lower is set,
   points short or any requirement not fully met, 0.90.
2. **Multiple requirements.** With two or more requirements, multiply by $1 - 0.4p$, where
   $p = \text{missing}/\text{total} + 0.5 \times \text{partial}/\text{total}$.
3. **Non-academic floor.** Raise the score to at least $0.8 \times (w_L L_M + w_F F_M)$.
4. **Apply the cap.** It wins over the floor.
5. **Minimum.** If points are met and the score is under 0.15, 0.15.

---

## Status

`deriveMatchStatus` (`lib/matching/match-status.ts`) judges the requirements alone. Field, country and
the score play no part; they add notes to the card.

| Check   | Met          | Close                      | Gap                         |
| ------- | ------------ | -------------------------- | --------------------------- |
| Points  | at the minimum or above | 1 to 3 short    | 4 or more short             |
| Subject | fully met    | 1 grade short              | 2 or more grades short, SL where HL is needed, or not taken |

An either/or that accepts the course at the student's own level is judged at that level, as a grade
short, not as a level gap.

| Status                         | Rule                                        |
| ------------------------------ | ------------------------------------------- |
| `meets`: Meets all requirements | No gap and nothing close                   |
| `close`: Within reach           | No gap, and at most one subject close      |
| `gap`: Missing a requirement    | Anything else                              |

---

## Order

**Matches** groups by status, then, in Best fit (`compareBestFit`): score, the minimum closest to the
student's total, no minimum last, then university and program A–Z. Many programs tie at 100%, so the
second key does most of the work. This is the only place a program far under the total lands lower: it
is closer to the bottom of its group, at the same score.

**Explore** Best fit (`compareExploreBestFit`, MAINT 5.27): their countries and fields, their countries,
their fields, the rest; then status; then the same closeness; then A–Z.

---

## Labels attached after scoring

`enhanceMatchResult` adds these to each cached result. None changes `overallScore`, and no screen reads
them: today's route passes them to a page that ignores them, and the new route drops them.

- **Category** (`categorization.ts`): SAFETY, MATCH, REACH, UNLIKELY, by score and points margin. The
  status replaced it in the UI (owner, 7 October 2026).
- **Confidence** (`confidence.ts`): subtracts from 1.0 per factor, with high at 0.85 and medium at
  0.65. `gradesAreFinal` is always passed as true and `requirementsVerified` is never passed, so it
  says little.
- **Fit quality and selectivity** (`fit-quality.ts`, `selectivity.ts`): the Version X curve and boost,
  reported only.

They take about 470 bytes of each cached result. `unified-penalties.ts` and `preference-validator.ts`
are exported and not called. What becomes of all of these is MAINT 5.41.

---

## Where each path runs

| Path                                | Function               | Candidates          | Key or read                        |
| ----------------------------------- | ---------------------- | ------------------- | ---------------------------------- |
| Matches, both designs               | `getCachedMatchesV10`  | The tiers above     | `matchesV10:…`, 30 minutes         |
| Coordinator pages                   | `getCachedMatchesV10`  | The same list       | The same key, shared with Matches  |
| Explore                             | `programFit`           | The search records  | No Redis and no database for programs |

`MATCHING_V10_FULL` chooses the first two rows' filter and labels. Off, it scores every program; production
has it on. Today's Matches page shows the first 50 by score (`MAX_MATCHES_RETURNED`); the new page shows
every match and groups them first. Coordinators read the new page's order (`rankedResults`): the first 3 on
the student page, the first 10 on the matches page. A student without subjects has no list on any of them.
A save calls `invalidateStudentCache`, so a change to a profile shows at once: the next load computes the
list again, and nothing computes it ahead of that load.

---

## Cost

Every result is stored whole in Upstash and sent to the page with no cap, so the candidate count is what
a Matches load costs. Measured 30 October 2026 on 163 profiles with grades and 1,676 programs: 74
results at the median, 133 on average, 789 at most (68, 121 and 666 before MAINT 5.40). A result is about 2 KB stored, 3 KB in the older
figures, and a card about 1.4 KB in the response. The catalogue itself is the 3 MB `programs:all:v3`,
kept in memory per server instance for five minutes (MAINT 5.19).

---

## Worked examples

Run through the production scorer on 30 October 2026 with `BALANCED`, not computed by hand.

| Student                              | Program                                | Score | Why                                                       |
| ------------------------------------ | -------------------------------------- | ----- | --------------------------------------------------------- |
| 44, Maths HL 7, Physics HL 7         | 42, Maths HL 6, Physics HL 6, own field and country | 1.00 | Everything met                         |
| 44, same                             | 28, no subjects, own field and country | 1.00  | Over the minimum costs nothing                            |
| 36                                   | 24, no subjects, own field and country | 1.00  | The same at any margin                                    |
| 38, Maths HL 5                       | 40, Maths HL 6 critical, own field and country | 0.80 | G_M 0.85 × 0.8 = 0.68; raw 0.808; capped at 0.80  |
| 40, Maths HL 6, no countries listed  | 38, no subjects, own field             | 1.00  | Weights 0.857 and 0.143                                   |
| 42, no Physics                       | 40, Physics HL 5 critical, own field and country | 0.40 | G_M 0; raw 0.40, already under the 0.45 cap     |

---

## Known problems

Found by running the production scorer on pairs that should differ, 30 October 2026. The status is right in
all of them, and on the new Matches page it sets the groups, so students are not misled about which group a
program is in. They affect the fit number, the order inside a group, today's page and the coordinator
pages. MAINT 5.43 takes them up.

| Problem                                                                                  | Evidence                                                                    | Next           |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | -------------- |
| More points short can score higher: the factor is 0.8 up to 3 short, then $1 - d/m$      | Minimum 40, subjects met: 1 to 3 short 0.88, 4 to 6 short 0.90, 8 short 0.88 | Fix            |
| Being open lowers the number: no fields gives F_M 0.5 with its weight kept               | A perfect match reads 95% with no fields, 93% with no fields or countries   | Fix            |
| "Meets" can mean no bar: no minimum and no subjects scores 1.0 for anyone | 301 programs, 280 in the US, and 174 more at 24 with no subjects, so up to 475 of 1,676; a student on 24 and on 45 both get 1.00 | Owner decision |
| Field counts for a third of country                                                      | Wrong field at home 0.90; right field elsewhere 0.70                        | Owner decision |

Not a problem: being over the minimum costs nothing. The minimum is a poor measure of how hard a program
is, and the order already puts the closest first.

---

## Appendix: constants

```
# Candidates (optimized-matcher.ts, program-index.ts)
MINIMUM_CANDIDATES = 10
pointsMargin = 10, then 20, then 30, over the total; no lower end
bucket size = 5
index used above 50 programs

# Weights (types.ts)
BALANCED = 0.6 / 0.3 / 0.1

# Preferences (field-matcher.ts, location-matcher.ts)
no fields listed = 0.5
no countries listed = 1.0, with w_L = 0

# Academic (academic-matcher.ts)
points-only floor 0.30, ceiling 0.90
near miss = 1 to 3 points, factor 0.8
larger shortfall factor floor = 0.5

# Subjects (subject-matcher.ts)
one grade short = 0.85 critical, 0.78 otherwise
shortfall scale 0.9, level scale 0.7, minimum 0.25
SL for HL = 0.80 or 0.75

# Caps and floors (penalties.ts)
critical missing 0.45, other missing 0.70, critical near miss 0.80, unmet 0.90
multiple requirements = 1 - 0.4p, from two requirements
non-academic floor multiplier 0.8
minimum when points are met 0.15

# Status (match-status.ts)
CLOSE_POINTS = 3

# Cache (cache.ts)
CACHE_TTL = 1800 seconds
MAX_MATCHES_RETURNED = 50, today's page only
```

---

## Changing this algorithm

1. A task in `MAINT_tasks.md` says what changes and why.
2. `scripts/score-fingerprint.ts` before and after, with `cmp`. A change that must move no score leaves
   it byte-identical; any other change explains every difference.
3. This document and `CHANGELOG.md` change in the same pull request. A change to scores or to which
   programs are scored takes a new minor version here; a new major version is for a new method.
4. The matching tests pass: `npm test`. `lib/matching/worked-examples.test.ts` holds this document's
   worked examples to the code (from MAINT 5.40).

---

_Document End_
