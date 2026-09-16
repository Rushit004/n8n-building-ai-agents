# Integrations in n8n

## 🎯 Objective
n8n's real value comes from how many apps and services it can talk to. This doc covers what an "integration" actually means in n8n, how authentication works behind it, and what to do when an app isn't natively supported.

## 📚 Concepts Covered
- What an integration is in n8n
- Built-in app nodes
- Credentials and authentication
- The HTTP Request node as a universal fallback
- Community and custom nodes

## 🧠 Concept Explanations

### What an Integration Is
**Definition:** An integration is a pre-built connection between n8n and a specific external app or service, exposed as a node with ready-made actions for that app.
**Why it matters:** Instead of manually figuring out each app's API, authentication method, and data format, the integration node already knows all of that — you just fill in the fields.
**Simple explanation:** It's a translator that already speaks both n8n's language and the target app's language.
**Practical example:** The Google Sheets node exposes actions like "Append Row" or "Update Row" without you writing any raw API calls.

### Built-in App Nodes
**Definition:** Nodes n8n ships with by default for popular services — Slack, Gmail, Notion, Airtable, PostgreSQL, and hundreds more.
**Why it matters:** For common tools, this means zero setup beyond authenticating; the hard integration work is already done.
**Simple explanation:** These are the "plug and play" nodes.
**Practical example:** Dragging in a Notion node and picking "Create Page" instead of researching Notion's API docs.

### Credentials and Authentication
**Definition:** A stored, reusable set of login details or API keys that a node uses to authenticate with an external service.
**Why it matters:** Credentials are saved once and reused across any workflow, so you're not re-entering API keys every time you build something new — and they're stored separately from the workflow itself.
**Simple explanation:** Think of it as a keychain — you set up the key once, and any node that needs that door just grabs it.
**Practical example:** Connecting a Gmail account once via OAuth2, then reusing that same connection in five unrelated workflows.

### The HTTP Request Node (Universal Fallback)
**Definition:** A generic node that lets you call any API directly, by specifying the URL, method, headers, and body yourself.
**Why it matters:** Not every service has a dedicated n8n node — the HTTP Request node means that's rarely a blocker, since almost any API can still be reached manually.
**Simple explanation:** If the built-in node is a pre-translated phrasebook, HTTP Request is knowing the raw language yourself.
**Practical example:** A niche SaaS tool with no n8n node yet — its documented REST API can still be called directly through HTTP Request.

### Community and Custom Nodes
**Definition:** Additional nodes built by the n8n community (or by you) that extend coverage beyond the official built-in set.
**Why it matters:** Between official nodes and HTTP Request, there's also a middle ground of community-maintained nodes for less mainstream tools, saving you from writing raw API calls yourself.
**Simple explanation:** A growing library on top of the default one, maintained outside n8n's core team.

## 📌 Key Points
- Integrations = pre-built nodes for specific apps with ready-made actions
- Credentials are stored once and reused across multiple workflows and nodes
- HTTP Request node means n8n can technically reach any API, even without a dedicated node
- Community nodes fill gaps between "officially supported" and "build it yourself"
- Authentication methods vary by service (API key, OAuth2, Basic Auth) but are all managed through the same Credentials system

## 🌍 Real-World Applications
- Connecting a CRM, email tool, and spreadsheet in one workflow without writing custom API integration code
- Calling an internal company API that will never have an official n8n node, via HTTP Request
- Reusing one authenticated Slack connection across dozens of unrelated workflows instead of reconnecting each time

## 🔗 Related Topics
- **Previous:** Types of nodes
- **Next:** Hands-on — building your first simple workflow

## ✅ Summary
Integrations are what make n8n practically useful — pre-built nodes that already understand a specific app's actions and data format, authenticated once through the Credentials system and reusable everywhere. When an app doesn't have a dedicated node, the HTTP Request node acts as a universal fallback, since it can call any documented API directly, and community nodes fill in much of the space in between. Understanding integrations this way makes it clear that n8n is never truly limited to its official node list — it's limited only by what has an accessible API.