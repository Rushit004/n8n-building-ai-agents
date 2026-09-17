# How Data Flows in n8n

## 🎯 Objective
Every node in n8n receives and passes along data in a specific shape. This doc covers what that data actually looks like, how it moves between nodes, and why understanding "items" is the key to debugging any workflow.

## 📚 Concepts Covered
- Items and the JSON data structure
- Data flow between connected nodes
- Multiple items and array processing
- Binary data
- Tracking data origin (paired items)

## 🧠 Concept Explanations

### Items
**Definition:** The basic unit of data in n8n — each item is a JSON object, and a node's output is always an array of items, even when there's only one.
**Why it matters:** Every node operates on items, not on a single blob of data, which is why one node can process 1 or 1,000 records with the exact same logic.
**Simple explanation:** Think of items like index cards passing down a conveyor belt — one node might read a card, another might edit it, another might duplicate it.
**Practical example:** A form submission producing one item: `{ "topic": "Gradient Descent" }`, passed as `[{ "json": { "topic": "Gradient Descent" } }]`.

### Data Flow Between Nodes
**Definition:** Each node takes the array of items from the node(s) connected to its input, processes them, and outputs a new array of items to the next connected node.
**Why it matters:** This is what makes the canvas layout meaningful — the visual left-to-right connections directly represent how data actually moves.
**Simple explanation:** Node output always becomes the next node's input; nothing skips or teleports past a connection.
**Practical example:** In a "Topic Selection → Notes Generator" connection, the exact item(s) coming out of Topic Selection are what Notes Generator receives to work with.

### Multiple Items and Array Processing
**Definition:** A single node execution can output many items at once, and downstream nodes automatically process each item in turn unless told otherwise.
**Why it matters:** This is what allows one Slack node, for example, to send 50 messages instead of writing 50 separate Slack nodes.
**Simple explanation:** n8n loops through the array behind the scenes so you don't have to build the loop manually for simple cases.
**Practical example:** A node reading 20 rows from a spreadsheet outputs 20 items; a connected "Send Email" node then sends 20 separate emails automatically.

### Binary Data
**Definition:** A separate channel alongside the JSON data used specifically for files — images, PDFs, CSVs — attached to an item rather than embedded in its JSON.
**Why it matters:** Files need to be carried alongside structured data without bloating or breaking the JSON payload.
**Simple explanation:** Each item can carry both a JSON part (structured fields) and a binary part (an attached file) at the same time.
**Practical example:** A node downloading a PDF attaches it as binary data on the item, while the JSON part still holds metadata like the filename.

### Tracking Data Origin (Paired Items)
**Definition:** n8n tracks which output item came from which input item using `pairedItem` metadata, so it's possible to trace a piece of data back to its origin even after several transformations.
**Why it matters:** In workflows that merge, split, or branch data, this is what lets you debug exactly which original input produced a given result.
**Simple explanation:** It's a breadcrumb trail attached to each item.
**Practical example:** After a Merge node combines two branches, each resulting item still knows which original branch and index it came from.

## 📌 Key Points
- A node's output is always an array of items, even for a single result
- Items = JSON data + optional binary data, bundled together
- Connections on the canvas are a literal map of data flow, not just a visual suggestion
- n8n automatically iterates over multiple items without needing a manual loop for simple cases
- `pairedItem` metadata preserves traceability back to the original input, especially important after Merge or Split operations

## 🌍 Real-World Applications
- Debugging why only 1 of 50 expected emails went out, by inspecting item count at each node in Executions
- Processing a batch of spreadsheet rows through the same set of nodes without duplicating logic per row
- Tracing a final merged output (like combined Notes + Q/A text) back to confirm it used the correct original topic input

## 🔗 Related Topics
- **Previous:** Docker self-hosted setup
- **Next:** Using expressions and variables

## ✅ Summary
Data in n8n always travels as an array of items, each a JSON object optionally paired with binary file data, and a node's connections on the canvas literally define how that array flows from one step to the next. Because n8n automatically iterates over multiple items, the same node logic scales from one record to thousands without extra setup, and `pairedItem` metadata keeps a traceable link back to each item's origin even through merges and branches. Understanding items as the fundamental unit — not the workflow as a whole — is what makes debugging and building complex workflows manageable.