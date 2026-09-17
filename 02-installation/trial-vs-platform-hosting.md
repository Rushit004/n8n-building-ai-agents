# Free Trial vs Platform Hosting

## 🎯 Objective
Before installing anything, n8n offers a quick way to try it out: a time-limited free trial on n8n Cloud. This doc covers what that trial actually is, how it differs from paid platform hosting, and how to think about the choice while learning.

## 📚 Concepts Covered
- The 15-day free trial
- Platform hosting (paid Cloud plans)
- Choosing between the two while learning

## 🧠 Concept Explanations

### The 15-Day Free Trial
**Definition:** A time-limited, full-featured version of n8n Cloud that lets you build and run workflows without payment or installation, for a fixed trial window.
**Why it matters:** It removes every setup barrier for a beginner — no Docker, no server, no billing — so the first days of learning can go straight into building workflows instead of configuring infrastructure.
**Simple explanation:** It's a test drive of the fully hosted product, with a countdown attached.
**Practical example:** Signing up at n8n.io and immediately getting a working instance to build in, with full node access during the trial period.
**Important constraint:** Once the trial ends, that instance and its workflows are no longer accessible unless you convert to a paid plan — which is exactly why exporting workflow JSON and documenting as you go (rather than relying on the live instance) matters.

### Platform Hosting (Paid Cloud Plans)
**Definition:** Continuing on n8n Cloud past the trial by subscribing to a paid plan, keeping the same managed, no-maintenance experience indefinitely.
**Why it matters:** It's the natural next step if self-hosting feels like too much setup overhead, and workflows need to keep running continuously.
**Simple explanation:** Same rented-apartment model as before, just paying rent to stay instead of it being a free trial stay.
**Practical example:** Upgrading a trial account to a paid tier so scheduled workflows (like the AI News Summarizer) keep running daily without interruption.

### Choosing Between Them While Learning
**Definition:** The practical decision of whether to pay for continued Cloud access, switch to self-hosting, or simply accept that trial-built workflows are temporary learning exercises.
**Why it matters:** For a learning phase specifically, permanence often matters less than being able to freely experiment — which changes the calculus compared to running production automations.
**Simple explanation:** If the goal is learning and portfolio documentation rather than a live production automation, the trial is often enough — as long as the workflow JSON and documentation are captured before it lapses.
**Practical example:** Using the free trial to complete an entire course's hands-on exercises, exporting each workflow's JSON immediately after building it, rather than paying for continued hosting.

## 📌 Key Points
- The free trial gives full n8n Cloud functionality for a fixed 15-day window
- Trial workflows become inaccessible once the trial ends, unless upgraded to a paid plan
- Platform hosting = paying to continue the same managed Cloud experience beyond the trial
- For learning purposes, exporting workflow JSON before the trial ends preserves the actual evidence of work, independent of whether you ever pay for hosting
- The decision to pay, self-host, or let the trial lapse depends on whether the goal is a permanent running automation or a documented learning exercise

## 🌍 Real-World Applications
- A learner completing a course entirely within the trial window, documenting each workflow as they go
- A small business converting from trial to a paid Cloud plan once a workflow becomes business-critical and needs to keep running
- A developer deciding self-hosting is more cost-effective than a recurring Cloud subscription once usage grows significantly

## 🔗 Related Topics
- **Previous:** Hosted vs self-hosted
- **Next:** Setting up self-hosted n8n using Docker

## ✅ Summary
The 15-day free trial is a full-featured but temporary window into n8n Cloud, ideal for learning since it removes all setup friction — but it comes with the catch that everything built disappears once the trial ends unless upgraded to paid platform hosting. For someone using the trial purely to learn and document, the practical takeaway isn't whether to pay, but to treat every workflow as temporary and export its JSON immediately after building it, so the learning evidence survives independently of the trial's expiry.