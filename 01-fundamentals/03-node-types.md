# Types of Nodes in n8n

## 🎯 Objective
Every workflow in n8n is built entirely out of nodes, but not all nodes serve the same purpose. This doc breaks down the main categories so it's clear which node to reach for and why.

## 📚 Concepts Covered
- Trigger Nodes
- Action Nodes
- Control Flow Nodes
- Data Transformation Nodes
- Looping / Batch Nodes
- Core Nodes

## 🧠 Concept Explanations

### Trigger Nodes
**Definition:** The entry point of a workflow — the node that determines how and when execution starts. Every workflow needs at least one.
**Why it matters:** Without a trigger, a workflow has no way to know when it should run; it just sits idle.
**Simple explanation:** It's the "starting gun" for the whole automation.
**Practical example:** A Schedule Trigger set to run every day at 8 AM, or a Webhook Trigger that fires the moment an external service sends data to it.
**Common types:** Manual Trigger, Schedule Trigger, Webhook Trigger, Email Trigger, App-specific triggers (e.g. new row in a Google Sheet).

### Action Nodes
**Definition:** Nodes that perform an actual operation against an app, service, or system — creating, updating, sending, or fetching data.
**Why it matters:** These are the "doing" nodes; they're what makes a workflow useful rather than just theoretical.
**Simple explanation:** If the trigger is the starting gun, action nodes are every step the runner actually takes.
**Practical example:** A Slack node that posts a message, or an HTTP Request node that calls a third-party API.

### Control Flow Nodes
**Definition:** Nodes that decide which path the data takes next, based on conditions — this is where branching logic lives.
**Why it matters:** Real automations rarely run in one straight line; control flow nodes let a workflow behave differently depending on the data it receives.
**Simple explanation:** These are the "if this, then that — otherwise, this instead" decision points.
**Practical example:** An IF node checking whether an incoming order total is over $100, routing high-value orders to one path and the rest to another.
**Common types:**
- **IF** — splits into two branches (true/false) based on a condition
- **Switch** — splits into multiple branches based on several possible values
- **Merge** — combines two or more branches back into one
- **Split Out** — breaks a single item containing a list into multiple individual items

### Data Transformation Nodes
**Definition:** Nodes that reshape, clean, or restructure data as it moves through the workflow, without necessarily interacting with an external app.
**Why it matters:** Data rarely arrives in the exact shape the next node needs — these nodes bridge that gap without custom code.
**Simple explanation:** Think of them as the "prep station" between receiving raw data and using it.
**Practical example:** An Edit Fields (Set) node that renames a field from `full_name` to `name`, or a node that filters out items missing a required value.

### Looping / Batch Nodes
**Definition:** Nodes that let a workflow process multiple items one at a time or in fixed-size groups instead of all at once.
**Why it matters:** Some downstream systems (APIs, rate-limited services) can't handle large payloads in a single call, so processing in controlled batches avoids failures.
**Simple explanation:** Instead of dumping 100 items into a pipe at once, you feed them through 10 at a time.
**Practical example:** Split In Batches processing 500 leads in groups of 20 before sending each group to a CRM.

### Core Nodes
**Definition:** General-purpose utility nodes not tied to any specific app — things like code execution, wait/delay, or manual no-operation placeholders.
**Why it matters:** They cover the gaps that app-specific nodes can't, especially custom logic.
**Practical example:** A Code node running a short JavaScript snippet to do a calculation no built-in node supports.

## 📌 Key Points
- Every workflow requires exactly one entry point category: a Trigger node
- Action nodes are where actual side effects happen (sending, creating, updating)
- IF and Switch both branch data, but IF is binary while Switch supports multiple routes
- Merge is the counterpart to branching — it brings separate paths back together
- Data transformation nodes don't call external services; they just reshape what's already there
- Split In Batches exists specifically to respect rate limits and avoid overwhelming downstream systems

## 🌍 Real-World Applications
- Routing support tickets to different teams based on urgency (Switch node)
- Cleaning messy API responses before they're written to a database (transformation nodes)
- Sending a large mailing list through an email API in safe batch sizes (Split In Batches)
- Running custom business logic that no pre-built node covers (Code node)

## 🔗 Related Topics
- **Previous:** Interface overview
- **Next:** Integrations

## ✅ Summary
Nodes fall into a handful of functional categories: Triggers start a workflow, Action nodes carry out the actual work against apps or services, Control Flow nodes branch and merge execution paths based on conditions, Data Transformation nodes reshape information along the way, and Looping/Batch nodes manage volume safely. Core nodes fill in anything app-specific nodes can't, including custom code. Recognizing which category a task needs makes picking the right node far faster than searching by name alone.