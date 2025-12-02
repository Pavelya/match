# IB Match – University Program Matching Algorithm (Revised)

This algorithm computes a **compatibility score** (0 to 1) between a student’s IB profile and a university program. A higher score means a better fit. The score is based on three factors:

- **Academic Match (G_M):** How well the student’s IB points and subjects meet the program’s requirements.
- **Location Match (L_M):** Whether the program’s country is among the student’s preferred locations.
- **Field Match (F_M):** Whether the program’s field of study is among the student’s preferred fields.

These combine into an overall score:

$M = w_G \times G_M + w_L \times L_M + w_F \times F_M.$

By default, $w_G=0.6$, $w_L=0.3$, $w_F=0.1$ (emphasizing academics). If a student has **no location preference**, we set $w_L=0$ and redistribute (e.g. $w_G=0.7, w_F=0.3$). All weights sum to 1. (These can be tuned or adjusted via user-selected modes, see “Mode-Specific Weighting” below.)

Each component $G_M, L_M, F_M$ ranges from 0 (no match) to 1 (full match). The final score $M$ is then adjusted by caps and penalties (see _Special Adjustments_ below) to ensure fairness in edge cases.

## Field Match (F_M)

This measures how the program’s field aligns with the student’s interests:

- **Exact Match:** If the program’s field is one of the student’s preferred fields, $F_M = 1.0$.
- **No Preferences:** If the student listed _no_ field preferences, we use $F_M = 0.5$ for all programs (treating all fields as moderately acceptable rather than giving full credit).
- **Mismatch:** If the student _has_ preferred fields and the program’s field is **not** among them, $F_M = 0.0$.

This way, matching a listed field yields full credit, being open-minded yields a neutral score (0.5), and an unpreferred field yields no field credit.

## Location Match (L_M)

This reflects the student’s country preferences:

- **Preferred Country or No Preference:** If the program’s country is on the student’s list _or_ the student specified no location preferences, we set $L_M = 1.0$. (If no preferences were given, **all** locations count as acceptable.)
- **Not Preferred:** If the student has location preferences and the program’s country is not on the list, $L_M = 0.0$.

In practice, if the student has no location preferences, we also set $w_L=0$ (since every program would get $L_M=1$, we remove location from the weighted score to avoid inflating results).

## Academic Match (G_M)

**Academic Match** measures how the student’s IB performance fits the program’s requirements (both total IB points and specific subjects). We handle two cases:

- **Programs with Subject Requirements:** These have required subjects (with levels and minimum grades) _and_ often an overall IB points cutoff.
- **Points-Only Programs:** These specify only a total IB points cutoff, with no particular subjects required.

### Programs with Subject Requirements

1. **Subject Requirements Score:** For each required subject (or each OR-group of subjects), compute a _subject score_ (0 to 1) that reflects how well the student satisfies it (see next section, “Subject Requirement Matching”). Let **subjectsMatchScore** be the average of these scores across all required subjects/groups. This is between 0 (meets none) and 1 (meets all fully).

2. **IB Points Requirement:** Check the student’s total IB points vs. the program’s required points.
   - If the student meets or exceeds the required points, we set $G_M = \text{subjectsMatchScore}$. (They get full credit for subjects, capped at 1.0.)
   - If the student is below the required points, we **scale down** the subjectsMatchScore by a penalty factor to reflect the shortfall. For example, a mild shortfall might use $k=0.8$ (keeping 80% of the subject score), while a larger gap might use $k=0.5$. In general, the further below the cutoff the student is, the smaller the factor. This ensures failing to meet the overall points is penalized. (See “Points Shortfall Penalties” below for details.)

In formula terms, one approach is:

$$
G_M =
\begin{cases}
\text{subjectsMatchScore}, & \text{if studentPoints ≥ requiredPoints},\\
\text{subjectsMatchScore} \times k, & \text{if studentPoints < requiredPoints},
\end{cases}
$$

where $0<k<1$ decreases as the deficit grows.

_Example:_ If a program requires 40 points and the student has 37, we consider this a near-miss and might use $k\approx 0.8$ (keeping 80% of the subjectsMatchScore). If the student had only 35 points, we might use $k\approx 0.5$. (This can be tuned; an alternative is to set $G_M = \max(0.3, \text{subjectsMatchScore} \times \frac{\text{studentPoints}}{\text{requiredPoints}})$ and also cap $G_M$ at 0.90 if points are unmet, which yields a smooth, monotonic scaling down from 1 toward a floor.)

### Programs with Only IB Points Requirement

If there are **no subject requirements**, then $G_M$ depends solely on the total points:

- If studentPoints ≥ requiredPoints, set $G_M = 1.0$.
- If studentPoints < requiredPoints, compute a proportional score for how close they are. For instance, let $d = \text{requiredPoints} - \text{studentPoints}$. A simple approach is
  $\text{raw} = 1 - \frac{d}{\text{requiredPoints}},$
  and then
  $G_M = \max(0.3,\;\min(\text{raw},\;0.90))$
  (flooring at 0.30 and capping at 0.90). This ensures a smooth drop-off.
  _Example:_ Required 40 points, student 37: raw = 0.925, cap to 0.90. Student 36: raw = 0.90, so $G_M=0.90$. Student 35: raw = 0.875, $G_M=0.875$. Student 32: raw = 0.80. No student shortfall ever yields $G_M>0.90$, and we never drop below 0.30.

This method avoids the earlier issue where being 4 points short could score higher than 3 points short. All deficits decrease $G_M$ as expected. (The exact cap/floor values can be adjusted by policy.)

## Subject Requirement Matching

When programs require specific IB subjects, we compute each required subject’s score and then average:

- **Full Credit (1.0):** If the student **took that subject at the required level or higher** and earned at least the minimum grade, the subjectScore is 1.0.
- **Partial Credit (between 0 and 1):** If the student took the required subject but **did not meet the grade or level requirement**, assign a partial score $P_S$ that reflects how far off they were.
- **No Credit (0.0):** If the student did not take the subject at all (no equivalent subject in their profile), subjectScore = 0.

We average all subject or group scores to get **subjectsMatchScore**:
$\text{subjectsMatchScore} = \frac{\sum (\text{subjectScores or group scores})}{\text{number of required subjects/groups}}.$

### Grade Shortfall (Same Level)

If the student took the subject at the required level but with a lower grade than required, we give proportional partial credit:

- Compute a base proportion: for required grade $R$ and student grade $S$ (both on the 1–7 scale), one simple measure is
  $\text{base} = 1 - \frac{R - S}{R - 1},$
  (This yields 0 if $S=1$ and 1 if $S=R$.)
- Then adjust slightly to avoid over-crediting. For instance, multiply by 0.9 and enforce a minimum of 0.25.
- **Critical vs Non-Critical:** If the subject is marked _critical_ for the program and the student is only 1 point below ($R - S = 1$), we override and give a generous 0.85. If it’s non-critical and one point below, we might give about 0.80 (slightly above the 0.75 base). Larger gaps use the proportional score.
- **Example:** Program requires Biology HL 6.
  - Student has Biology HL 5 (one below). If Biology is critical: give 0.85. If non-critical: give \~0.75–0.80.
  - Student has Biology HL 4 (two below). Base = 1 – (2/5) = 0.60; scale 0.6×0.9 = 0.54 (floored at 0.25), so \~0.54 credit.

In short: one-point short gets high partial credit (especially if critical), larger shortfalls get proportionally less (but at least 0.25).

### Level Mismatch (HL vs SL)

- **HL required but student took SL:** The student has background but at lower rigor. We treat this as a level mismatch partial: convert the scenario to an equivalent grade shortfall with extra penalty. For example, one could treat a top SL grade (7) as roughly HL 5, and then give that proportionally, then multiply by \~0.8. Concretely:
  - If student has SL 7 for an HL 6 requirement, we might assign \~0.80 (reflecting strong knowledge but not HL).
  - If student has SL 4 for HL 6, that translates to both a level gap and a large grade gap: likely only the minimum credit (\~0.25).
  - **In practice:** We scale the proportional score down (e.g. multiply by 0.8) and impose a maximum below 1.0.

- **SL required but student took HL:** This is usually fine, since HL covers SL. If the HL grade ≥ SL requirement, score = 1.0. If it’s below the SL requirement (rare case), treat it like a grade shortfall.
  - _Example:_ Requirement is Math SL 5, student has Math HL 4. Then the student is one point short _relative to the SL 5_. We compute partial as if one grade short, perhaps giving \~0.75–0.80.

### OR-Group Requirements

Some requirements allow alternatives, e.g. “Physics **OR** Chemistry”. For each OR-group:

1. **Full Match (1.0):** If the student fully satisfies _any one option_ (correct level and grade), the group is fulfilled (score 1.0).
2. **Partial Match:** If no option is fully met, but the student took one or more listed subjects with shortfall, we take the **highest partial score** among those options. This credits the option they came closest to fulfilling.
3. **No Match (0):** If the student took none of the listed subjects, the group scores 0.

Each OR-group counts as one requirement. For example: “Math HL 6 **OR** Math SL 7”. If the student has Math SL 6, then:

- The SL option (require SL 7) is partial (one short, maybe \~0.75), and the HL option is unmet. We take the partial 0.75 for the group.

## Special Adjustments and Penalties

To enforce fairness, we apply caps and penalties after computing the raw weighted score. These ensure unmet requirements significantly limit the score, and that location/field preferences still matter.

### Program Type

Programs are classified as:

- **Full Requirements:** Has both IB points and specific subject requirements.
- **Points-Only:** Only an IB points cutoff, no subject requirements.
- **Subjects-Only:** Only subject requirements, no points cutoff.

The above rules handle each case: Points-only programs use the points-only formula for $G_M$; subjects-only programs use subjectsMatchScore (with no scaling since no points to miss).

### Critical Subjects

For subjects deemed **critical** (e.g. required Math, Physics, Chemistry, or language prerequisites):

- **Missing Critical Subject:** If the student _did not take_ a required critical subject at all, this is severe. We cap the final match score at \~0.45. (A missing critical gap means the program can’t be a strong fit no matter what.)
- **Critical Near-Miss (1 point below or SL instead of HL):** Allow a higher cap (around 0.75–0.80). This acknowledges the student is very close in a key area.
- **Critical Large Miss:** If more than one grade point below, or if the student took SL when HL was required (treated as a big deficit), cap the final score around 0.60.

For **non-critical** required subjects:

- **Missing Non-Critical Subject:** Cap final score around 0.70 (reflecting a notable but less severe deficiency).

These caps apply after computing the weighted score. For example, if a student missing a critical subject otherwise scored 0.70, we would reduce it to at most 0.45.

### Points Shortfall Penalties

If a student fails the IB points requirement:

- **Points-Only Programs:** Cap the final score at 0.90. (The student can never reach 100% match if they don’t meet the points cutoff.)
- **Full Requirements Programs:** We already scaled $G_M$ down by a factor. Additionally, we enforce a final cap of 0.90 if points are unmet.

In practice, this means no student who misses the points cutoff can appear as a perfect match.

### Multiple Missing/Low Requirements

If the student has **multiple subject requirements** unfulfilled or partially met, we apply a combined penalty:

Let

- $N_\text{missing}$ = number of required subjects (or groups) not taken at all,
- $N_\text{low}$ = number taken but with grade below or level mismatch (partial),
- $N_\text{total}$ = total required subjects/groups.

Compute a **penalty factor**:
$\text{penaltyFactor} = \frac{N_\text{missing}}{N_\text{total}} + 0.5\times\frac{N_\text{low}}{N_\text{total}}.$
Then an **adjustment factor**:
$\text{adjustmentFactor} = 1 - 0.4 \times \text{penaltyFactor}.$
We multiply the weighted score by this factor. This lowers the score by up to 40% for many unmet requirements.

_Example:_ 4 requirements, with 1 missing and 1 low grade:

- $N_\text{missing}=1$, $N_\text{low}=1$, $N_\text{total}=4$.
- penaltyFactor = 0.25 + 0.5×0.25 = 0.375.
- adjustmentFactor = 1 – 0.4×0.375 = 0.85.
  So the final score ≤ 85% of the base score. If the base was 0.95, it becomes at most 0.8075.

We also respect the earlier caps (critical/non-critical, points) after this adjustment.

### Non-Academic Score Floor

To ensure that location and field preferences still influence the score even if academics are weak, we impose a minimum non-academic contribution. We calculate:

- $\text{minLocationContribution} = w_L \times L_M \times 0.8$.
- $\text{minFieldContribution} = w_F \times F_M \times 0.8$.
- $\text{minNonAcademic} = \text{minLocationContribution} + \text{minFieldContribution}.$

Then we ensure:
$\text{finalScore} \ge \text{minNonAcademic}.$
This means that even if $G_M$ were zero (very poor academics), a strong location/field match ensures some baseline. For example, with $w_L=0.3$, $L_M=1$ and $w_F=0.1$, $F_M=1$, the floor is $0.3×1×0.8 + 0.1×1×0.8 = 0.32$. Thus the final score cannot go below 0.32 in that scenario. This keeps a program “on the radar” if it fits the student’s preferences well.

### Capping Unmet Requirements

After all adjustments, we prevent any program with unmet requirements from reaching a near-perfect score:

- If **any** academic requirement (points or subjects) is not fully met and the computed score exceeds 0.90, we cap it at **0.90**.
- If a **critical** requirement is unmet (missing or partial), we cap it at **0.80**.

This is a final safeguard to ensure that a partially qualified student cannot appear as a 100% match.

### Minimum Score Guarantees

To avoid completely hiding potentially relevant programs, we apply small floors in edge cases:

- If a program has subject requirements and the student _meets the total points_ but ended up with $G_M=0$ (due to no subjects matching), we assign $G_M=0.20$. This means a student with strong IB scores still gets minimal academic credit even without the exact subjects.
- If after all penalties the student _meets the IB points requirement_ and yet the final score is below 0.15, we raise the final score to 0.15. This ensures that a program for which the student has the needed points will still appear with at least a modest match (acknowledging they could be considered, though not a strong fit).

These minimums keep the output practical: students who have the main academic eligibility will always see the program with at least a low but non-zero match.

## Mode-Specific Weighting

The platform may allow different weight configurations (modes) to reflect student priorities, without changing the core logic:

- **Academic-Focused Mode (e.g. $w_G=0.8,w_L=0.1,w_F=0.1$):** Prioritizes meeting requirements. Here, penalties have greater effect on the final score, so missing a requirement drops the score further.
- **Location-Focused Mode (e.g. $w_G=0.4,w_L=0.5,w_F=0.1$):** Emphasizes location. A preferred-location program may score relatively high even if academics are weak, though academic caps still apply on the academic portion.
- **Balanced Mode (default $0.6,0.3,0.1$):** Treats academics as primary with location and field secondary.

In all modes, the same rules on partial credit, caps, and floors apply; only the weight proportions change.

## Examples and Edge Cases

- **Near-Miss on Points:** Program requires 40 points. Student has 38 (2-point short). Using proportional scaling with a 0.90 cap, raw = 0.95 → capped to 0.90, so $G_M≈0.90$. Student with 36 (4 short) gets raw = 0.90 (no cap needed), i.e. $G_M=0.90$ as well. Both are below full credit, distinguishing from the case of meeting or exceeding.

- **Near-Miss on Grade:** Program requires Math HL 7. Student has Math HL 6. If Math is critical, we give 0.85 for that subject (instead of 1.0). If not critical, we might give \~0.80. This keeps the match high but visibly below perfect.

- **Level Mismatch (SL vs HL):** Program requires Chemistry HL 6. Student has Chemistry SL 7 (the highest SL score). We recognize substantial knowledge but not at HL depth: we might assign \~0.80. If student had SL 4, we would drop to near the minimum (around 0.25).

- **OR-Group Example:** Requirement “Physics HL 5 **OR** Chemistry HL 5.” Student has Physics HL 4 and Chemistry HL 6. Physics is one below (partial \~0.8), Chemistry fully meets (score 1.0). The group is satisfied at 1.0 (since Chemistry option is met). If instead student had Physics HL 4 and no Chemistry, we would give the higher partial (0.8) for the group.

- **Missing Critical Subject:** Program requires Math HL (critical). Student did not take Math at all. No matter how good other scores are, final match is capped ≤0.45.

- **Multiple Issues:** Program has 4 requirements. Student misses 1 subject and has 1 with low grade. Base match might be high (say 0.95), but penaltyFactor = 0.375 gives adjustment 0.85, so final ≤0.8075 (subject to any caps).

- **Strong Location/Field:** Student loves Germany (only preference) and Engineering. Program in Germany, Engineering department, but student is below the subject cutoff. Suppose raw academic=0.2, $L_M=1, F_M=1$, weights 0.6/0.3/0.1. Non-academic floor = 0.3×1×0.8 + 0.1×1×0.8 = 0.32, so final = 0.32 (instead of 0.2). This keeps it on the list at \~32%.

This algorithm thus balances **fairness** (penalizing clear deficiencies) with **generosity to near-misses** (giving substantial but not full credit to almost-eligible students). It aligns with IB Match’s goal to highlight programs that closely fit a student’s profile while clearly distinguishing fully eligible matches from partial ones.
