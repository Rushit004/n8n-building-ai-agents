# Parallel Workflows

## 🎯 Objective
Not every task has to happen one step after another — sometimes two independent pieces of work can run side by side and get stitched back together at the end. This doc covers what makes a workflow "parallel," how branching and merging work, and what to watch for when two paths need to recombine into one.

## 📚 Concepts Covered
- What a parallel workflow is
- Branching from a single node
- Independent execution of parallel branches
- Merging branches back together
- Common pitfalls when combining parallel outputs

## 🧠 Concept Explanations

### Parallel Workflow
**Definition:** A parallel workflow is one where a single node's output feeds into two (or more) separate branches that run independently, before being recombined later — instead of a single unbranching line, the shape looks like a fork that rejoins.
**Why it matters:** Some tasks are genuinely independent of each other and don't need to wait in line — running them side by side is faster and more efficient than forcing them into a single sequential chain.
**Simple explanation:** Picture two separate assembly lines both starting from the same delivery truck, each building something different, then both feeding their finished parts onto one final line.
**Practical example:** A submitted topic simultaneously feeding a "generate notes" LLM chain and a "generate quiz questions" LLM chain, with neither branch waiting on the other.

### Branching From a Single Node
**Definition:** A node can have multiple outgoing connections, sending the same item to more than one downstream node at once — this is what creates a branch point.
**Why it matters:** It's how one trigger or one piece of input data can fan out into multiple independent workstreams without duplicating the trigger itself.
**Simple explanation:** One node "broadcasts" its output to however many nodes are connected after it.
**Practical example:** A form trigger node connected to both a "Notes Generator" node and a "Q/A Generator" node — both receive the same submitted topic.

### Independent Execution of Parallel Branches
**Definition:** Once a workflow branches, each path executes on its own — one branch's nodes don't wait for or depend on the other branch's progress, until they're explicitly reconnected.
**Why it matters:** This is the core benefit of going parallel instead of linear — the two paths genuinely don't block each other.
**Simple explanation:** Each branch runs on its own clock; neither one has to finish first for the other to proceed.
**Practical example:** The "Notes Generator" chain and "Q/A Generator" chain each have their own dedicated Chat Model node feeding them, since one shared model node can't serve two independent branches the way the workflow is wired.

### Merging Branches Back Together
**Definition:** A Merge node (or similar) takes the outputs of two or more separate branches and combines them into a single item, so downstream nodes can act on the combined result.
**Why it matters:** Parallel work is only useful if it eventually needs to come back together for a final step — without a merge point, the two branches would just stay as two separate, disconnected outputs.
**Simple explanation:** It's the point where the two assembly lines' finished parts get placed into the same box.
**Practical example:** A Merge node combining "study notes" output (input 0) with "MCQ" output (input 1) into one item before it's written into a Google Doc.

### Common Pitfalls When Combining Parallel Outputs
**Definition:** Merge nodes typically require each incoming branch to be wired to a distinct input index — mixing this up causes one branch's data to overwrite or misalign with the other's instead of combining cleanly.
**Why it matters:** A parallel workflow's biggest failure mode isn't in the branches themselves, but at the reconnection point, where it's easy to wire both branches into the same input by mistake.
**Simple explanation:** Each branch needs its own labeled slot at the merge point — dropping both into the same slot loses one of them.
**Practical example:** Wiring the Notes Generator branch to Merge input 0 and the Q/A Generator branch to Merge input 1, rather than both into input 0, which would cause one output to silently overwrite the other.

## 📌 Key Points
- Parallel = one node branches into two or more independent paths that later recombine
- A single node can output to multiple downstream nodes simultaneously
- Each branch executes independently — no branch waits on another unless explicitly merged
- Each parallel branch usually needs its own dedicated sub-nodes (e.g. its own Chat Model), not a shared one
- Merge nodes require branches wired to distinct input indices, or outputs will overwrite each other instead of combining

## 🌍 Real-World Applications
- Generating two different AI outputs (notes + quiz questions) from the same input topic simultaneously
- Fetching data from two unrelated APIs at once, then combining the results into one report
- Running independent validation checks on the same input before merging results into a final approval step

## 🔗 Related Topics
- **Previous:** [Using Expressions and Variables](./expressions-and-variables.md)
- **Next:** Control nodes — Switch, If, Split, Merge

## ✅ Summary
A parallel workflow lets a single input fan out into multiple independent branches that run without waiting on each other, which is faster than forcing unrelated tasks into one sequential chain. Branching happens when a node connects to more than one downstream node, and recombination happens at a Merge node, which requires each branch to be wired to its own distinct input index to avoid one output silently overwriting the other. This "fork and rejoin" shape is a natural next step after linear workflows, and sets up the reasoning needed for more advanced control-flow nodes like Switch and If.