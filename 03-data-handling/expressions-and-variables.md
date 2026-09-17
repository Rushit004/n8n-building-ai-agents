# Using Expressions and Variables

## 🎯 Objective
Expressions are how static node fields become dynamic, data-driven values. This doc covers the expression syntax, the most commonly used variables, and how to reference data from earlier in a workflow.

## 📚 Concepts Covered
- What an expression is
- The `{{ }}` syntax
- Key variables: `$json`, `$node`, `$input`
- Referencing data from other nodes

## 🧠 Concept Explanations

### What an Expression Is
**Definition:** An expression is a small piece of code inside a node's field that gets evaluated at runtime, letting the field's value depend on actual incoming data instead of being hardcoded.
**Why it matters:** Without expressions, every node field would need a fixed value typed in manually — expressions are what make a workflow reusable across different inputs.
**Simple explanation:** It's the difference between writing a fixed number into a field versus writing a formula that calculates it from other data.
**Practical example:** Instead of hardcoding an email subject as "Report", an expression can generate `"Report for {{ $json.date }}"` dynamically.

### The `{{ }}` Syntax
**Definition:** Any text wrapped in double curly braces inside a node field is treated as an expression and evaluated; anything outside the braces stays literal text.
**Why it matters:** This lets static text and dynamic data mix freely in the same field.
**Simple explanation:** Think of `{{ }}` as a "compute this part" marker inside an otherwise plain sentence.
**Practical example:** `=Generate notes on: {{ $json['Enter the Topic name want to revise/explore.'] }}` mixes a fixed instruction with a dynamic topic pulled from form input.

### Key Variables

**`$json`**
**Definition:** Refers to the JSON data of the current item being processed by the node.
**Simple explanation:** "The data sitting right in front of this node, right now."
**Practical example:** `{{ $json.email }}` pulls the `email` field from the current item.

**`$node`**
**Definition:** Refers to another specific node by name, letting you pull its output even if it isn't the node directly before the current one.
**Simple explanation:** "Reach back to a specific earlier node by name, not just the one right before me."
**Practical example:** `{{ $node["Topic Selection"].json["submittedAt"] }}` pulls a field from the Topic Selection node's output, even several steps later.

**`$input`**
**Definition:** Refers to the data coming into the current node from its connected input, useful when a node has multiple inputs.
**Simple explanation:** "What's arriving at my doorstep right now."
**Practical example:** `{{ $input.all() }}` gets every item currently entering the node.

### Referencing Data From Other Nodes
**Definition:** Expressions aren't limited to the immediately previous node — any earlier node's output in the same execution path can be referenced by name.
**Why it matters:** Complex workflows often need a value from several steps back (e.g. the original trigger's input), not just the node right before.
**Practical example:** In a workflow where a topic is submitted once but used by two separate AI generator nodes and later a document-writer node, each downstream node can still reference `$node["Topic Selection"]` directly instead of the value being manually re-passed forward.

## 📌 Key Points
- Expressions live inside `{{ }}`; everything outside stays literal text
- `$json` = current item's data; `$node["Name"]` = a specific named node's output; `$input` = data entering this node
- A field prefixed with `=` in the raw JSON (as seen in exported workflows) indicates the field's value is expression-driven
- Expressions can reference any earlier node in the same path, not just the immediately previous one
- Expressions are what make one workflow reusable across many different inputs instead of needing to be rebuilt per case

## 🌍 Real-World Applications
- Dynamically inserting a user's submitted topic into an AI prompt, as seen in a Notes/Q&A generator workflow
- Pulling a timestamp from the original trigger node deep into a later step, for logging or filenames
- Building conditional messages that change wording based on a field's value (e.g. personalizing an email greeting)

## 🔗 Related Topics
- **Previous:** How data flows in n8n
- **Next:** Control nodes — Switch, If, Split, Merge

## ✅ Summary
Expressions turn static node fields into dynamic ones by wrapping code in `{{ }}`, evaluated against the workflow's actual data at runtime. The most-used variables — `$json` for the current item, `$node["Name"]` for a specific earlier node, and `$input` for what's arriving at the current node — cover most referencing needs, and none of them are limited to only the immediately preceding node. Mastering expressions is what turns a one-off workflow into something that adapts automatically to whatever data flows through it.