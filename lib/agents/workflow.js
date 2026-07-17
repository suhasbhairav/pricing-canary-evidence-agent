import { Agent, run } from "@openai/agents";

const MODEL = process.env.OPENAI_AGENT_MODEL || "gpt-5-nano";

const workflowContext = {"title":"Pricing Canary Evidence Agent","query":"pricing canary run-evidence index 10-account run","keywords":["pricing canary run-evidence index","pricing canary run-evidence index 10-account run"],"useCases":["Pricing canaries","Evidence packs","10-account pilots","Rollback planning"]};

export const primaryAgent = new Agent({
  name: "Canary Run Planner",
  model: MODEL,
  instructions: `
You are Canary Run Planner for Pricing Canary Evidence Agent.

Purpose:
- Creates pricing canary cohorts, success criteria, rollback triggers, and evidence needs.
- Work only within this domain: pricing canary run-evidence index 10-account run.
- Ask for missing facts only when they block a safe recommendation.
- Avoid claiming external browsing, private data access, or live system access.

Return with these exact headings:
Situation
Signals
Risks
Recommended Actions
Evidence To Capture
`.trim(),
});

export const reviewerAgent = new Agent({
  name: "Evidence Pack Auditor",
  model: MODEL,
  instructions: `
You are Evidence Pack Auditor for Pricing Canary Evidence Agent.

Purpose:
- Checks run evidence for completeness, account coverage, and decision readiness.
- Review the first agent's work for gaps, unsafe assumptions, missing controls, and implementation clarity.
- Produce an operator-ready checklist that can be used by a product, operations, or engineering team.
- Keep the answer concise, concrete, and domain-specific.

Return with these exact headings:
Review Summary
Gaps Found
Control Checklist
Implementation Plan
Human Approval Points
`.trim(),
});

export async function runAgentWorkflow(prompt) {
  const cleanPrompt = String(prompt || "").trim();

  if (!cleanPrompt) {
    throw new Error("Prompt is required.");
  }

  const enrichedInput = `
Template: ${workflowContext.title}
Target query: ${workflowContext.query}
Discovery keywords: ${workflowContext.keywords.join(", ")}
Use cases: ${workflowContext.useCases.join(", ")}

User request:
${cleanPrompt}
`.trim();

  const primaryResult = await run(primaryAgent, enrichedInput);
  const primaryOutput = String(primaryResult.finalOutput || "").trim();

  const reviewerInput = `
Template: ${workflowContext.title}
Original user request:
${cleanPrompt}

First agent output:
${primaryOutput}

Review and convert this into a production-ready operating plan.
`.trim();

  const reviewerResult = await run(reviewerAgent, reviewerInput);
  const reviewerOutput = String(reviewerResult.finalOutput || "").trim();

  return {
    originalPrompt: cleanPrompt,
    model: MODEL,
    template: workflowContext,
    agents: [
      { name: primaryAgent.name, role: "Creates pricing canary cohorts, success criteria, rollback triggers, and evidence needs.", output: primaryOutput },
      { name: reviewerAgent.name, role: "Checks run evidence for completeness, account coverage, and decision readiness.", output: reviewerOutput },
    ],
  };
}
