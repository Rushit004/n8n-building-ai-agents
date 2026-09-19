# What is n8n and Automation

## 🎯 Objective
Before touching any node or canvas, it helps to understand the problem n8n exists to solve. This doc covers what a workflow actually is, why manual repetition becomes a bottleneck, and where n8n sits among automation tools.

## 📚 Concepts Covered
- Workflows
- Automation (and the problem it solves)
- What n8n is
- Where n8n fits in the automation landscape

## 🧠 Concept Explanations

### Workflows
**Definition:** A workflow is a sequence of steps that takes some input, processes it, and produces an output — with each step's result feeding into the next.
**Why it matters:** Almost every repetitive task at work is secretly a workflow: check inbox → extract data → update a sheet → notify a teammate. Once you see a task as a chain of discrete steps, it becomes something you can automate rather than repeat by hand.
**Simple explanation:** Think of a workflow like an assembly line — each station does one small job, and the item moves down the line until it comes out finished.
**Practical example:** "New form submission → save to spreadsheet → send confirmation email" is a 3-step workflow.

### The Need for Automation
**Definition:** Automation replaces manual, repetitive human action with a system that executes the same steps reliably, on trigger, without supervision.
**Why it matters:** Manual repetition doesn't scale — it consumes time, introduces human error, and blocks people from higher-value work. As data sources and tools multiply (forms, CRMs, spreadsheets, chat apps), someone has to move data between them, and doing that by hand becomes the actual bottleneck.
**Simple explanation:** If you find yourself doing the exact same 5 clicks every day, that's a signal the task wants to be automated, not repeated.
**Practical example:** Instead of manually copying new customer sign-ups from a form into a CRM every morning, automation does it the instant the form is submitted.

### What is n8n
**Definition:** n8n ("nodes and n8n," pronounced "n-eight-n") is a workflow automation tool that lets you connect apps, APIs, and data sources visually, using a node-based canvas instead of writing a full custom integration from scratch.
**Why it matters:** It removes most of the boilerplate work of connecting services (auth, request formatting, response parsing) while still allowing custom code when a built-in node isn't enough — making it flexible for both non-developers and engineers.
**Simple explanation:** Each node is one action (fetch data, transform it, send it somewhere), and you drag lines between nodes to define the order things happen in.
**Practical example:** A node that watches Gmail for new emails, connected to a node that posts a summary in Slack.

### Where n8n Fits In
**Definition:** n8n sits in the "workflow automation / integration platform" category, alongside tools like Zapier and Make, but distinguishes itself by being open-source, self-hostable, and code-friendly.
**Why it matters:** Unlike closed SaaS automation tools, n8n lets you inspect, modify, and host the automation logic yourself, which matters for cost control, data privacy, and handling complex logic that simpler tools can't express.
**Simple explanation:** If Zapier is a sealed appliance, n8n is more like a kit you can open up and rewire.

## 📌 Key Points
- A workflow = ordered steps, each step's output becomes the next step's input
- Automation solves the scaling problem of manual repetition, not just "saving time" on one task
- n8n is node-based: each node represents one unit of work
- n8n is open-source and self-hostable, unlike most closed automation SaaS tools
- n8n supports both no-code nodes and custom code nodes in the same workflow

## 🌍 Real-World Applications
- Automatically summarizing and routing incoming support emails
- Syncing new CRM leads into a spreadsheet or Slack channel in real time
- Scheduling and sending daily reports without manual triggering
- Connecting AI models (LLMs) into business processes, like auto-generating replies or summaries

## 🔗 Related Topics
- **Previous:** None — this is the starting concept
- **Next:** n8n interface overview and types of nodes

## ✅ Summary
A workflow is just a sequence of steps where each output feeds the next step's input, and automation exists because manually repeating those steps doesn't scale as tasks and tools multiply. n8n is a node-based automation platform that visually connects apps and data sources, standing out from closed tools like Zapier by being open-source, self-hostable, and capable of mixing no-code nodes with custom code. Understanding this positions n8n as a flexible middle ground between low-code automation tools and building integrations entirely from scratch.