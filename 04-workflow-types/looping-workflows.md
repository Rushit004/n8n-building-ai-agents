# Looping Workflows

## 🎯 Objective
Linear, parallel, and conditional workflows all assume you're mostly dealing with a single item at a time — but real data often arrives as a list: 50 rows in a spreadsheet, 100 leads in a CRM export, a folder of files. This doc covers how n8n processes multiple items, what "looping" actually means on the canvas, and how to control batch size and iteration explicitly with the Loop Over Items node.

## 📚 Concepts Covered
- Implicit looping: how n8n handles arrays of items by default
- The Loop Over Items (Split in Batches) node
- Batch size and why it matters
- Loop termination — the `done` vs `loop` outputs
- Common pitfalls with data accumulation across iterations

## 🧠 Concept Explanations

### Implicit Looping
**Definition:** By default, when a node outputs multiple items, every node downstream of it automatically runs once per item — n8n loops over the item list for you without any explicit loop node required.
**Why it matters:** This is why most n8n workflows don't need a visible "loop" at all — if a node returns 20 rows, the next node just runs 20 times, once per row, without you writing any iteration logic.
**Simple explanation:** n8n doesn't ask "should I repeat this?" — if there are multiple items, it repeats automatically, as if that were the default behavior of every node.
**Practical example:** A Google Sheets "Read Rows" node returning 30 rows, followed by a "Send Email" node — the email node fires 30 times, once per row, with no extra configuration.

### The Loop Over Items Node
**Definition:** Loop Over Items (formerly called "Split in Batches") is an explicit node used when you need finer control over iteration — specifically, when you want to process items in fixed-size batches rather than all at once, or need a controlled loop structure with a clear start and end.
**Why it matters:** Implicit looping runs every item through the rest of the workflow independently and in parallel-ish fashion; explicit batching is needed when an API has rate limits, when you need to process items in smaller groups, or when logic needs to track progress across iterations.
**Simple explanation:** It's the difference between "let everything run at once, per item" and "hand me items a few at a time, and tell me when to stop."
**Practical example:** Processing 200 leads in batches of 10, so an API with a rate limit doesn't receive 200 simultaneous requests.

### Batch Size
**Definition:** The batch size setting on the Loop Over Items node determines how many items are released together on each iteration of the loop.
**Why it matters:** Choosing the right batch size balances speed against constraints like API rate limits, memory, or downstream systems that can't handle too much volume at once.
**Simple explanation:** It's how many items get handed off per "lap" of the loop, instead of handing off all of them or just one at a time.
**Practical example:** Setting batch size to 5 when calling an API that only accepts 5 records per request, instead of making 200 separate one-record calls.

### Loop Termination — `done` vs `loop`
**Definition:** The Loop Over Items node has two outputs: `loop`, which feeds the current batch into the rest of the workflow, and `done`, which fires once after all batches have been processed.
**Why it matters:** Understanding which output to connect to what is critical — connecting a final "send summary" step to `loop` instead of `done` would run that step once per batch instead of once at the very end.
**Simple explanation:** `loop` is "keep going, here's the next batch"; `done` is "that was the last one, move on."
**Practical example:** A "send summary email" node connected to `done`, so it fires exactly once after every batch of leads has been processed, not once per batch.

### Common Pitfalls With Data Accumulation
**Definition:** Because each pass through a loop can behave like its own mini-execution, data generated inside the loop doesn't automatically accumulate into one combined list unless it's explicitly collected (e.g. via a node that aggregates results across iterations).
**Why it matters:** It's easy to assume that by the time a loop finishes, all the individual results are sitting together in one place — in practice, you often need an explicit aggregation step to combine what each iteration produced.
**Simple explanation:** Each lap of the loop can forget what the previous lap did, unless something is specifically built to remember and combine it.
**Practical example:** Needing an Aggregate node after a loop that generates one AI summary per batch, in order to combine all those summaries into a single final report instead of ending up with several disconnected outputs.

## 📌 Key Points
- n8n loops implicitly by default — a node with multiple output items causes downstream nodes to run once per item automatically
- The Loop Over Items node is for explicit, controlled batching — not required for simple "run once per item" cases
- Batch size controls how many items are released per iteration, useful for respecting rate limits or grouping logic
- `loop` output feeds the next batch back into the workflow; `done` output fires once, after all batches finish
- Data doesn't automatically accumulate across loop iterations — combining results usually needs an explicit aggregation step

## 🌍 Real-World Applications
- Calling a rate-limited third-party API a few records at a time instead of all at once
- Processing a large CSV or spreadsheet export in manageable chunks
- Sending personalized messages to a list of contacts, one batch at a time, with a final "all done" summary step
- Enriching a large dataset row-by-row while avoiding memory or timeout issues on very large inputs

## 🔗 Related Topics
- **Previous:** [Conditional Workflows](./conditional-workflows.md)
- **Next:** Error handling and retries

## ✅ Summary
Most n8n workflows loop implicitly — if a node outputs multiple items, everything downstream simply runs once per item without any special setup. The Loop Over Items node exists for cases needing explicit control: processing items in fixed-size batches, respecting rate limits, or managing a clear loop structure with a `loop` output for "keep going" and