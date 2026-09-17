# Linear Workflows

## 🎯 Objective
Before layering in branches, merges, and conditionals, it's worth understanding the simplest possible shape a workflow can take: a straight line. This doc covers what makes a workflow "linear," how data moves from node to node along that single path, and why even a simple linear chain can lose data it needs later.

## 📚 Concepts Covered
- What a linear workflow is
- Sequential node execution
- How data (items) pass from node to node
- Why linear workflows still need cross-node referencing

## 🧠 Concept Explanations

### Linear Workflow
**Definition:** A linear workflow is one where every node has exactly one input and one output, forming a single unbranching path from the trigger to the final action — no splits, no parallel branches, no merges.
**Why it matters:** It's the easiest workflow shape to reason about, since there's only ever one path data can take, and it's usually the first workflow pattern you build before introducing branching logic.
**Simple explanation:** Picture a single conveyor belt, not a factory floor with multiple lines feeding into one another — one item, one path, start to finish.
**Practical example:** Form submission → generate content with an LLM → send an email, with no other paths in between.

### Sequential Node Execution
**Definition:** In a linear workflow, nodes execute strictly one after another, each waiting for the previous node to finish before it runs.
**Why it matters:** This predictable order makes debugging simpler — if something's wrong, you can inspect the output of each node in sequence to find exactly where the data broke.
**Simple explanation:** Each node is a checkpoint; nothing downstream runs until the checkpoint before it clears.
**Practical example:** The Gmail node in a linear chain can't fire until the LLM node before it has finished generating its output.

### How Data Passes From Node to Node
**Definition:** Each node receives the item(s) output by the node directly before it, and by default, a node's own output **replaces** what it received — it doesn't automatically carry forward every field from earlier nodes.
**Why it matters:** It's a common misconception that all original data "survives" all the way through a workflow. In reality, once a node like an LLM Chain runs, its output (e.g. a single `text` field) becomes the new current item — the original input fields are gone from `$json` unless the node was explicitly configured to keep them.
**Simple explanation:** Each station on the assembly line hands off what *it* made, not everything it was ever handed.
**Practical example:** A form trigger outputs `{ email, topic }`. After an LLM Chain node processes it, the current item becomes `{ text: "<generated content>" }` — `email` and `topic` are no longer directly accessible via `$json`.

### Why Linear Workflows Still Need Cross-Node Referencing
**Definition:** Because a node's output overwrites the current item, a linear workflow can still "lose" data partway through — even though there's only one path, later nodes can't assume everything from earlier steps is still sitting in `$json`.
**Why it matters:** This is why referencing an earlier node by name (see [expressions-and-variables.md](./expressions-and-variables.md)) matters even in the simplest workflows, not just in complex branching ones.
**Simple explanation:** A straight line doesn't guarantee nothing gets left behind along the way.
**Practical example:** An email node needing the original submitted topic for its subject line, after an LLM node in between has already replaced `$json` with generated text, has to reach back explicitly to the trigger node's output.

## 📌 Key Points
- Linear = one input, one output, per node — a single unbranching path
- Nodes execute strictly in order, each waiting on the one before it
- A node's output replaces the current item by default — it doesn't automatically merge with prior data
- Even a linear chain can lose access to earlier fields once a node downstream overwrites `$json`
- Cross-node referencing (`$('NodeName')`) is what recovers data that's no longer in the current item

## 🌍 Real-World Applications
- A single-path pipeline: form submission → AI processing → email/notification delivery
- Any "one thing triggers one chain of steps" automation with no conditional routing
- The simplest possible test case for understanding item data flow before tackling Merge, Switch, or If nodes

## 🔗 Related Topics
- **Previous:** n8n interface overview and types of nodes
- **Next:** [Using Expressions and Variables](./expressions-and-variables.md)

## ✅ Summary
A linear workflow is the simplest shape n8n can express — one node feeding the next in a single unbranching line, executing strictly in sequence. But "linear" doesn't mean "nothing gets lost": since each node's output typically replaces the current item rather than merging with it, data from early in the chain can disappear by the time a later node needs it. Recognizing this is what motivates reaching back to earlier nodes by name instead of relying only on `$json`, and it's the natural lead-in to expressions and variables.