# Daily Drill: DSA Core Sliding-Window Reps

Date: 2026-05-23
Purpose: keep the drill surface focused on DSA implementation reps after the repair file is complete
Use order:

1. Complete `../Repairs/2026-05-23-dsa-repair-contracts-complexity-and-window.md` first.
2. Then run this daily drill file in order.

## Session shape

- Main priority: DSA sliding-window reps and explanation discipline
- Total target: 55 to 65 minutes

## Rules

- No notes during recall sections.
- State contract and likely pattern before code.
- If a block exposes a real miss, log it in that subject's mistakes log after the block.
- Repair work belongs in the repair file, not here.

## Block 1: DSA Pattern Lock

Time cap: 10 minutes

Answer from memory in 1 to 3 sentences each.

1. When does fixed-size sliding window fit?
2. When does variable-size sliding window fit?
3. What is the brute-force bottleneck for max sum of `k` consecutive values?
4. Why does sliding window avoid repeated recomputation?
5. What edge case breaks a max-sum implementation that starts `max` at `0`?

## Block 2: DSA Challenge Reps

Time cap: 35 minutes

Complete these in order.

1. `Challenges/Patterns/03-sliding-window/09-max-consecutive-sum.js`
2. `Challenges/Patterns/03-sliding-window/12-max-3-day-average.js`

Before coding each one, write:

- input
- output
- failure return
- edge cases
- likely pattern
- brute-force time complexity
- improved time complexity target

After coding each one, write:

- final time complexity
- final space complexity
- one sentence on why the window update is valid

## Block 3: DSA Stretch Rep

Time cap: 20 minutes

Choose one based on energy.

- `Challenges/Patterns/03-sliding-window/10-longest-substring-k-distinct.js`
- `Challenges/Patterns/03-sliding-window/11-min-subarray-length.js`

If you freeze on the implementation, stop and write:

1. whether the window is fixed or variable
2. what causes the window to expand
3. what causes the window to shrink
4. what state must be tracked

## Block 4: End-of-Session Evidence

Write these before you stop.

1. Strongest block today
2. Weakest block today
3. One DSA repair that actually held under pressure
4. Which DSA concept still felt unstable
5. Which DSA topic needs the first rep tomorrow

## Mentor Grade

Do not self-report this section.

- DSA contract discipline
- DSA sliding-window implementation quality
- DSA pattern-fit explanation quality
