# Conditional Workflows

## 🎯 Objective
So far, data has always moved down every connected path — but real automations often need to make decisions: send this item down path A, or path B, depending on what's inside it. This doc covers how conditional logic works in n8n, the difference between the If and Switch nodes, and how conditions are actually evaluated against incoming data.

## 📚 Concepts Covered
- What conditional logic is in a workflow
- The If node (binary branching)
- The Switch node (multi-way branching)
- How conditions are evaluated
- Combining conditions with expressions

## 🧠 Concept Explanations

### Conditional Logic in a Workflow
**Definition:** Conditional logic lets a workflow inspect the data in the current item and route it down a different path depending on whether that data meets a specified condition, instead of every item always following the exact same route.
**Why it matters:** Real data isn't uniform — a support ticket might be urgent or routine, a form submission might be valid or missing fields — and treating every item identically ignores that. Conditionals are what let one workflow handle many different cases correctly.
**Simple explanation:** It's the workflow equivalent of an "if this, then that; otherwise, this other thing" decision point.
**Practical example:** Routing a submitted support ticket to a "high priority" path if its urgency field equals `"high"`, and to a "normal" path otherwise.

### The If Node (Binary Branching)
**Definition:** The If node evaluates a condition against the current item and splits execution into exactly two outputs — `true` and `false` — sending the item down whichever path matches.
**Why it matters:** It's the simplest and most common way to introduce a yes/no decision point into an otherwise linear or parallel chain.
**Simple explanation:** One fork in the road with exactly two directions: this way, or that way.
**Practical example:** An If node checking `{{ $json.status }} === "approved"` — approved items go out the `true` output toward a "send confirmation" node, everything else goes out `false` toward a "send rejection" node.

### The Switch Node (Multi-Way Branching)
**Definition:** The Switch node evaluates the current item against multiple possible conditions or values and routes it to one of several outputs — more than the two an If node offers.
**Why it matters:** Some decisions genuinely have more than two outcomes, and chaining multiple If nodes together to express that gets messy fast; Switch expresses "route to one of N paths" directly.
**Simple explanation:** Instead of a single fork with two directions, it's an intersection with several exits, and the item takes whichever one matches its value.
**Practical example:** A Switch node routing a submitted topic's `category` field to a "Technical," "Billing," or "General" branch, each handled by a different downstream chain.

### How Conditions Are Evaluated
**Definition:** Both If and Switch nodes evaluate their conditions using the same expression system used elsewhere in n8n — meaning conditions are typically built from `{{ }}` expressions referencing `$json` or other node data, compared against a fixed value or another expression.
**Why it matters:** Because conditions use the same expression syntax as any other field, the same rules apply — you can pull data from the current item or reach back to an earlier node, not just compare hardcoded values.
**Simple explanation:** A condition is really just an expression that resolves to true or false (or a matching value), evaluated fresh for every item passing through.
**Practical example:** A condition comparing `{{ $json.score }}` to a numeric threshold, where `score` was itself computed by an earlier node in the chain.

### Combining Conditions With Expressions
**Definition:** Conditions aren't limited to simple field comparisons — since they're built from expressions, they can reference data from other nodes (via `$node`/`$('NodeName')`), combine multiple fields, or apply logic beyond a single equality check.
**Why it matters:** This is what lets conditional routing stay accurate even in workflows where the deciding data isn't sitting in the current item, but came from several steps back.
**Simple explanation:** A condition can look anywhere in the workflow's available data, not just at what's directly in front of it.
**Practical example:** An If node checking a value from the original trigger node (`$('Form Trigger').item.json.priority`) even though several processing nodes have run and overwritten `$json` since then.

## 📌 Key Points
- Conditional logic routes items down different paths based on their data, rather than sending every item the same way
- The If node gives exactly two outputs: `true` and `false`
- The Switch node gives multiple outputs, useful when there are more than two possible routes
- Conditions are built using the same `{{ }}` expression syntax as any other field
- Conditions can reference earlier nodes by name, not just the current item's `$json`

## 🌍 Real-World Applications
- Routing support tickets by urgency or category to different teams/channels
- Sending a different email template depending on whether a form field passes validation
- Branching an AI-generated response's handling based on a confidence score or classification label
- Splitting order processing by payment status (paid, pending, failed)

## 🔗 Related Topics
- **Previous:** [Parallel Workflows](./parallel-workflows.md)
- **Next:** Loops and batching — processing multiple items over multiple executions

## ✅ Summary
Conditional workflows introduce decision points that route items down different paths based on their actual data, rather than treating every item the same way. The If node handles simple true/false branching, while the Switch node scales that up to multiple possible routes, and both rely on the same expression syntax used throughout n8n — meaning conditions can reference not just the current item but data from any earlier node. This is the natural next step after linear and parallel workflows: it's what lets a workflow actually respond to what's inside the data, instead of just processing it.