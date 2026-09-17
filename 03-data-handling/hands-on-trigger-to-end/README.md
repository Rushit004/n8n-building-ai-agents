# Hands-On: Data Flow from Trigger to End

## 🎯 Goal
Trace exactly how a single piece of data travels through an entire workflow — from the moment it's submitted at the trigger to the moment it leaves as an email — using the simplest possible linear workflow: **Topic-Bullet-Points to Mail**.

## ⚙️ Features
- Form trigger collecting an email address and a topic
- AI-generated meeting-ready bullet points via GPT-4o-mini, formatted as HTML
- Automatic email delivery of the generated content to the submitted address

## 🧩 Tracing the Data, Node by Node

| # | Node | Item going IN | Item coming OUT |
|---|------|----------------|-------------------|
| 1 | **On form submission** (Form Trigger) | *(nothing — this is the start)* | `{ "Enter Email ID": "...", "Enter Topic": "..." }` |
| 2 | **Basic LLM Chain** | The item above, referenced via `{{ $json['Enter Topic'] }}` inside the prompt | `{ "text": "<html>...bullet points...</html>" }` — the original fields are replaced by the chain's own output |
| 3 | **Send a message** (Gmail) | The item from step 2 | Email sent — `sendTo` is *not* pulled from `$json` here, but from `{{ $('On form submission').item.json['Enter Topic'] }}`, reaching back past the LLM Chain node to the original trigger data |

**The key insight:** by the time data reaches the Gmail node, `$json` only contains what the LLM Chain output (`text`) — the original email address and topic are no longer in the "current" item. The subject line still needs the topic though, which is only possible because n8n lets you reference an earlier node by name (`$('On form submission')`) instead of only the item directly before you. This is the clearest real example of why `$node`/`$('NodeName')` referencing (see [expressions-and-variables.md](../expressions-and-variables.md)) exists — a straight linear chain can still lose data it needs later unless you explicitly reach back for it.

## 🗂️ Files
- `workflow.json` — full exported workflow, importable via **n8n → Workflows → Import from File**
- `screenshot.png` — *(add canvas + a successful execution log, showing the item data at each step)*

## 🐛 What Broke / Lessons
- Pulling the topic into the email subject required referencing the trigger node by name (`$('On form submission')`) rather than `$json`, since the LLM Chain's output had already replaced the current item's fields.
- *(Add anything else you personally hit while building or testing this.)*

## 📎 Import Instructions
`n8n → Workflows → Import from File → workflow.json`