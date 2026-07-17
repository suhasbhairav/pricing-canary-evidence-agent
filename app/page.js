"use client";

import { useMemo, useState } from "react";

const template = {
  "slug": "pricing-canary-evidence-agent",
  "title": "Pricing Canary Evidence Agent",
  "tagline": "Plan canary runs, capture evidence, and verify pricing changes before rollout.",
  "query": "pricing canary run-evidence index 10-account run",
  "agents": [
    [
      "Canary Run Planner",
      "Creates pricing canary cohorts, success criteria, rollback triggers, and evidence needs."
    ],
    [
      "Evidence Pack Auditor",
      "Checks run evidence for completeness, account coverage, and decision readiness."
    ]
  ],
  "accent": "#dc2626",
  "accent2": "#f97316",
  "dark": "#450a0a",
  "soft": "#fff1f2",
  "examples": [
    "Plan a pricing canary run-evidence index for a 10-account run.",
    "Audit a canary price rollout for missing metrics, rollback rules, and stakeholder approvals.",
    "Create the evidence pack for expanding a pricing change from pilot to production."
  ],
  "useCases": [
    "Pricing canaries",
    "Evidence packs",
    "10-account pilots",
    "Rollback planning"
  ],
  "keywords": [
    "pricing canary run-evidence index",
    "pricing canary run-evidence index 10-account run"
  ]
};

export default function Home() {
  const [prompt, setPrompt] = useState(template.examples[0]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const agentCards = useMemo(() => template.agents.map(([name, role], index) => ({ name, role, index })), []);

  async function runAgents(event) {
    event.preventDefault();
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt || isRunning) return;

    setIsRunning(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/agents/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: cleanPrompt }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The agent workflow failed.");
      setResult(data);
    } catch (runError) {
      setError(runError.message);
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--page)] text-[var(--ink)]">
      <section className="hero-shell">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">OpenAI Agents SDK Template</p>
            <h1>{template.title}</h1>
            <p className="lede">{template.tagline}</p>
            <div className="hero-actions">
              <a href="https://suhasbhairav.com/ai-templates" target="_blank" rel="noopener noreferrer">AI Templates</a>
              <a href="https://suhasbhairav.com" target="_blank" rel="noopener noreferrer">Suhas Bhairav</a>
            </div>
          </div>
          <div className="signal-panel" aria-label="Template search signal">
            <span>Target query</span>
            <strong>{template.query}</strong>
            <small>Model: gpt-5-nano</small>
          </div>
        </div>
      </section>

      <section className="workspace">
        <aside className="sidebar">
          <form className="composer" onSubmit={runAgents}>
            <label htmlFor="prompt">Scenario</label>
            <textarea
              id="prompt"
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Describe the workflow, risk, dataset, process, or decision you want the agents to analyze."
              value={prompt}
            />
            <button disabled={isRunning || !prompt.trim()} type="submit">
              {isRunning ? "Running two agents..." : "Run agent workflow"}
            </button>
          </form>

          <div className="examples">
            <h2>Example runs</h2>
            {template.examples.map((example) => (
              <button key={example} type="button" onClick={() => setPrompt(example)}>{example}</button>
            ))}
          </div>
        </aside>

        <section className="results">
          <div className="result-head">
            <div>
              <p>Agent workbench</p>
              <h2>Two specialist agents, one reviewed plan</h2>
            </div>
            <span>{result?.model || "gpt-5-nano"}</span>
          </div>

          {error ? <div className="error">{error}</div> : null}

          <div className="scroll-area">
            {!result && !isRunning ? (
              <div className="empty-state">
                <div className="orb">2</div>
                <h3>Ready for a domain-specific run</h3>
                <p>Submit a scenario and the agents will produce a first-pass analysis plus a reviewer checklist.</p>
              </div>
            ) : null}

            {isRunning ? (
              <div className="running-list">
                {agentCards.map((agent) => (
                  <article className="running-card" key={agent.name}>
                    <span>{agent.index + 1}</span>
                    <div>
                      <h3>{agent.name}</h3>
                      <p>Working through the prompt...</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}

            {result ? (
              <div className="agent-output-list">
                {result.agents?.map((agent, index) => (
                  <article className="agent-output" key={agent.name}>
                    <div className="agent-title">
                      <span>{index + 1}</span>
                      <div>
                        <h3>{agent.name}</h3>
                        <p>{agent.role}</p>
                      </div>
                    </div>
                    <pre>{agent.output}</pre>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <aside className="right-rail">
          <div className="mini-panel">
            <h2>Agents</h2>
            {agentCards.map((agent) => (
              <div className="agent-chip" key={agent.name}>
                <strong>{agent.name}</strong>
                <span>{agent.role}</span>
              </div>
            ))}
          </div>
          <div className="mini-panel">
            <h2>Built for</h2>
            <div className="tag-list">{template.useCases.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        </aside>
      </section>
    </main>
  );
}
