# DSA Current Learning Plan

Purpose: turn NeetCode intake, local rebuild work, and graded misses into the next DSA-specific actions.

## Current evidence

- Hard baseline result: strongest DSA surface is Big-O basics and frequency-counter familiarity.
- Hard baseline result: weakest DSA surfaces are multiple pointers, sliding window, recursion vs iteration, stack, queue, and traversal-model recall.
- Challenge evidence: `sameCharacters` reached a correct brute-force and frequency-counter solution after iteration, but implementation discipline and pattern explanation both weakened under pressure.
- Process update: NeetCode is now the primary intake surface for DSA lessons and curated problem progression.
- Process update: this workspace is now the retention surface for cold rebuilds, drills, mistakes tracking, repair reps, and interview-style explanation.
- Process update: near-term interview funnel now likely includes an aptitude or entry-level technical screen, so array/searching reasoning, edge-case handling, and lookup-structure explanation need explicit rotation, but only after first-pass learning on each new surface.

## Current priority order

1. Pattern-selection recall before coding
2. Multiple pointers vs sliding window distinction
3. Lookup-structure reasoning and brute-force vs optimized comparison
4. Core data-structure recall: stack, queue, traversal thinking
5. Implementation discipline under pressure
6. Aptitude-screen overlay: arrays, simple search, edge cases, and lookup-structure reasoning

## Current block goals

- Convert each NeetCode lesson or solved problem into one local ownership artifact.
- Name the likely pattern before implementation on every DSA rep.
- Rebuild multiple pointers and sliding window until they can be explained without notes.
- Keep frequency counter in rotation so earlier wins do not decay.
- Add short learn-then-rep blocks for linear scan, duplicate detection, and edge-case naming before drilling anything newer.
- Log every hesitation or miss immediately in the DSA mistakes log.

## Today-first order

- Start with one short NeetCode learning or challenge block on the exact concept being trained.
- Then do a local rebuild or contract-recall rep without notes.
- Run one short screen-oriented drill block before broader DSA exercises.
- Study only the exact misses exposed by the rebuild or drill.
- Move to TypeScript and React only after the DSA recall and rep block is complete.

## Local artifact rule

Each new DSA study block should leave at least one of these behind in this workspace:

- a cold rebuild in `Challenges/`
- a short concept rep in `Exercises/`
- a timed recall set in `Drills/`
- a targeted fix in `Repairs/`
- a mistakes-log update in `Planning/dsa-mistakes-log.md`

## Advancement gate

Do not widen into newer DSA topics if any of these are still weak:

- confusing multiple pointers with sliding window
- failing to explain why an object or map improves repeated lookups
- freezing on stack, queue, or recursion definitions
- writing code before stating input, output, edge cases, and likely pattern
