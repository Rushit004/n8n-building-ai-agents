# Hosted vs Self-Hosted n8n

## 🎯 Objective
n8n can be run in two fundamentally different ways — as a managed cloud service or on your own infrastructure. This doc covers what separates the two so the installation choice later makes sense.

## 📚 Concepts Covered
- n8n Cloud (hosted)
- Self-hosted n8n
- Trade-offs: cost, control, maintenance, data privacy

## 🧠 Concept Explanations

### n8n Cloud (Hosted)
**Definition:** A managed version of n8n run by the n8n team on their own servers — you sign up, get an instance, and start building without installing anything.
**Why it matters:** It removes all setup and server-maintenance overhead, letting you focus entirely on building workflows instead of managing infrastructure.
**Simple explanation:** It's like renting a fully furnished apartment — everything works out of the box, but you don't own the building.
**Practical example:** Signing up on n8n.io and immediately getting a workflow editor URL, with updates and uptime handled automatically.

### Self-Hosted n8n
**Definition:** Running n8n yourself, on your own server, computer, or cloud infrastructure (often via Docker), giving you full control over the instance.
**Why it matters:** It removes usage limits tied to a paid plan and keeps all workflow data on infrastructure you control — important for privacy-sensitive or high-volume use.
**Simple explanation:** It's like owning the building — more responsibility, but nothing is off-limits.
**Practical example:** Running `docker run n8nio/n8n` on a personal server or VPS and accessing the editor through your own domain.

### Trade-offs
**Definition:** The practical differences that decide which option fits a given situation — cost, control, maintenance burden, and data privacy.
**Why it matters:** Neither option is strictly better; the right choice depends on scale, budget, and how sensitive the data flowing through the workflows is.
**Simple explanation:**
- **Cost** — Cloud has a subscription/trial model; self-hosted is free software but needs infrastructure (which may itself cost money to run)
- **Control** — Self-hosted allows custom nodes, environment variables, and version choices; Cloud is managed and more restricted
- **Maintenance** — Cloud requires zero upkeep; self-hosted means you handle updates, backups, and uptime yourself
- **Data Privacy** — Self-hosted keeps all data on infrastructure you own; Cloud means workflow data passes through n8n's managed servers

## 📌 Key Points
- Hosted (Cloud) = zero setup, managed updates, usage-plan based (including the free trial)
- Self-hosted = full control and no plan limits, but you own the maintenance and infrastructure cost
- Self-hosted is commonly run via Docker for easy setup and portability
- The choice affects data privacy directly — self-hosting keeps data off third-party servers
- Many learners start on the free trial (Cloud) and move to self-hosted once workflows need to run continuously without trial limits

## 🌍 Real-World Applications
- A startup handling sensitive customer data choosing self-hosted n8n for full data control
- An individual learner using the free Cloud trial to explore n8n without any server setup
- A company scaling automation heavily and self-hosting to avoid recurring Cloud subscription costs

## 🔗 Related Topics
- **Previous:** Installation process
- **Next:** Choosing between a 15-day free trial or hosting on a platform

## ✅ Summary
Hosted n8n (n8n Cloud) trades control for convenience — no setup, no maintenance, but usage is bound to a plan or trial. Self-hosted n8n flips that trade-off, giving full control over data, customization, and cost at the price of managing the infrastructure yourself. The right choice depends on how much control and data privacy a use case needs versus how much setup effort is worth avoiding, and it's common to start hosted and move to self-hosted as needs grow.