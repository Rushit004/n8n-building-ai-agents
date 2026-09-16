# n8n Interface Overview

## 🎯 Objective
Before building anything, it helps to know what each part of the n8n editor does. This doc walks through the main screen areas so the canvas stops feeling like a blank, unfamiliar space.

## 📚 Concepts Covered
- The Canvas
- The Nodes Panel
- Top Navigation (Overview, Templates, Credentials, Executions)
- Workflow Toolbar (Save, Execute, Active toggle)
- Node interactions and connections

## 🧠 Concept Explanations

### The Canvas
**Definition:** The canvas is the large central workspace where nodes are placed and wired together to form a workflow.
**Why it matters:** Every workflow you build lives visually here — the layout itself shows you the execution order, since data flows left to right along the connections.
**Simple explanation:** Think of it as a whiteboard where each box is one action, and arrows show which action feeds into the next.
**Practical example:** A Gmail trigger node connected to a Slack node visually shows "new email → post to Slack" without needing any written explanation.

### The Nodes Panel
**Definition:** A searchable library of every available node (trigger, action, or logic block) that can be dropped onto the canvas.
**Why it matters:** With hundreds of integrations available, the panel is how you actually discover what n8n can connect to instead of memorizing node names.
**Simple explanation:** It's like an app store for individual automation steps.
**Practical example:** Opening the panel and typing "Slack" surfaces every Slack-related action (send message, get channel, etc.) instantly.
**How to open it:** click the **+** icon on the canvas, click the **+** icon on the side of an existing node, or press **N** on the keyboard.

### Top Navigation
**Definition:** The strip across the top of the app that switches between different areas of n8n, not just the workflow you're editing.
**Why it matters:** Workflows, credentials, and past runs are managed separately from the canvas — this is where that separation lives.
**Simple explanation:** Four tabs worth knowing early:
- **Overview** — list of all your workflows
- **Templates** — pre-built community workflows you can start from instead of a blank canvas
- **Credentials** — where saved API keys and logins are stored and reused across workflows
- **Executions** — a history of every run, successful or failed, with the actual data at each step

### Workflow Toolbar
**Definition:** The controls specific to the workflow currently open — save, test-run, and the Active/Inactive switch.
**Why it matters:** "Test Workflow" and "Active" are easy to confuse as a beginner but do very different things.
**Simple explanation:**
- **Execute/Test Workflow** — runs the workflow once, right now, so you can see the output at each node
- **Save** — saves your changes without running anything
- **Active toggle** — turns the workflow on so it runs automatically going forward (on its trigger, e.g. schedule or webhook); keep this off while still building

### Node Interactions
**Definition:** Hovering or clicking a node on the canvas reveals quick actions — inputs on the left side, outputs on the right, and icons for testing, deleting, or opening node settings.
**Why it matters:** This is how individual nodes get configured and connected without a separate menu system.
**Practical example:** Dragging from the right edge of one node to the left edge of another creates the connection that defines execution order.

## 📌 Key Points
- Data always flows left (input) to right (output) between connected nodes
- "Test Workflow" runs once with sample data — it does not make the workflow live
- The Active toggle is what actually schedules or activates a trigger for ongoing runs
- Executions tab keeps a record of every past run, including the data passed at each node — useful for debugging
- Templates in the Nodes/Overview area can shortcut building common workflows from scratch

## 🌍 Real-World Applications
- Using the Executions history to debug why a workflow silently failed overnight
- Starting from a Template instead of building a common integration (e.g. "New Typeform response → Google Sheets") from zero
- Managing all API keys centrally in Credentials so they can be reused across multiple workflows

## 🔗 Related Topics
- **Previous:** What is n8n and automation
- **Next:** Types of nodes

## ✅ Summary
The n8n editor centers on the canvas, where nodes are placed and connected left-to-right to define execution order, with the Nodes Panel acting as the searchable source for every available integration. The top navigation separates workflow-building from account-level concerns like saved Credentials and run history in Executions. The workflow toolbar's two most important controls — Test Workflow and the Active toggle — are easy to conflate but serve different purposes: one is a one-off dry run, the other makes the workflow live on its trigger. Knowing these areas removes most of the initial confusion of opening n8n for the first time.