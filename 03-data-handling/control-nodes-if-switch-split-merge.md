# Control Nodes: IF, Switch, Split, Merge

## 🎯 Objective
These four nodes are the backbone of any non-linear workflow — they decide which path data takes, break it apart, and bring it back together. This doc covers each one in enough depth to actually build branching logic confidently.

## 📚 Concepts Covered
- IF node
- Switch node
- Split Out node
- Split In Batches node
- Merge node and its modes

## 🧠 Concept Explanations

### IF Node
**Definition:** Evaluates a condition on each item and routes it down one of two outputs — true or false.
**Why it matters:** It's the simplest branching block, used whenever a decision only has two possible outcomes.
**Simple explanation:** A fork in the road with exactly two paths.
**Practical example:** Checking `{{ $json.orderTotal > 100 }}` — orders above 100 go to a "priority" path, everything else goes to "standard".

### Switch Node
**Definition:** Evaluates a value and routes each item down one of several possible outputs, based on matching rules or a list of values.
**Why it matters:** When there are more than two possible outcomes, chaining multiple IF nodes gets messy — Switch handles multi-way branching in one node.
**Simple explanation:** A fork in the road with three, four, or more paths, chosen based on a value.
**Practical example:** Routing support tickets by `{{ $json.category }}` into "Billing", "Technical", "General", and "Other" branches from a single node.

### Split Out Node
**Definition:** Takes a single item containing a list/array field and turns each element of that list into its own separate item.
**Why it matters:** Many API responses or form fields arrive as one item with a nested array — downstream nodes usually need each element processed individually.
**Simple explanation:** Unpacking one box containing 10 things into 10 separate boxes.
**Practical example:** An API response with one item containing `"tags": ["urgent", "billing", "vip"]` becomes three separate items, one per tag.

### Split In Batches Node
**Definition:** Processes a large set of items in fixed-size groups (batches) instead of all at once, looping through the workflow once per batch.
**Why it matters:** Many external APIs enforce rate limits — sending 1,000 requests instantly can trigger failures, while batching keeps requests within safe limits.
**Simple explanation:** Instead of pushing everything through the pipe at once, you feed it through in controlled portions.
**Practical example:** Sending 500 leads to a CRM in batches of 20, with a short delay between each batch to respect the CRM's API rate limit.

### Merge Node
**Definition:** Combines data from two (or more) separate branches back into a single stream of items.
**Why it matters:** Anything that was split or branched (by IF, Switch, or parallel paths) usually needs to be recombined at some point before the next step.
**Simple explanation:** The node where separate paths rejoin into one.
**Common modes:**
- **Append** — stacks items from both inputs one after another, no matching needed
- **Combine (by matching fields)** — merges items from both inputs that share a common field value, similar to a database join
- **Combine (by position)** — pairs up the Nth item from input 1 with the Nth item from input 2
**Practical example:** Two parallel AI generator branches (one producing notes, one producing questions) feeding into a Merge node so both outputs land in the same final item before being written to a document.

## 📌 Key Points
- IF = exactly two branches (true/false); Switch = multiple branches from one node
- Split Out unpacks a list field into individual items; Split In Batches groups many items into smaller chunks for safe processing
- Merge is the natural counterpart to any branching — nothing recombines automatically without it
- Merge's mode (Append vs Combine by field vs Combine by position) changes how items are matched, not just that they're combined
- Choosing the wrong Merge mode is a common source of scrambled or duplicated data in real workflows

## 🌍 Real-World Applications
- Routing incoming form submissions to different departments based on a category field (Switch)
- Splitting a single API response containing 50 products into 50 individually processable items (Split Out)
- Safely emailing a mailing list of thousands of contacts in small batches without triggering provider rate limits (Split In Batches)
- Recombining two AI-generated outputs — like structured notes and a quiz — into one document (Merge)

## 🔗 Related Topics
- **Previous:** Expressions and variables
- **Next:** Types of workflows — linear, parallel, conditional, looping

## ✅ Summary
IF and Switch decide which path data takes — two branches versus many — while Split Out and Split In Batches control the shape and volume of items flowing through, either unpacking a list or grouping a large set into safe chunks. Merge is what brings separated paths back together, and its mode (Append, Combine by field, or Combine by position) determines exactly how items from each branch get matched up. Together these four nodes are what turn a strictly linear workflow into one that can branch, scale, and recombine intelligently.