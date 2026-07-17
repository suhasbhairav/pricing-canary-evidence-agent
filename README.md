# Pricing Canary Evidence Agent

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-149eca?style=for-the-badge&logo=react&logoColor=white)
![OpenAI Agents SDK](https://img.shields.io/badge/OpenAI-Agents_SDK-412991?style=for-the-badge&logo=openai&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Only-f7df1e?style=for-the-badge&logo=javascript&logoColor=111)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)

**Plan canary runs, capture evidence, and verify pricing changes before rollout.**

Built by **[Suhas Bhairav](https://suhasbhairav.com)** as part of **[AI Templates](https://suhasbhairav.com/ai-templates)**.

> A production-minded Next.js JavaScript starter that runs a two-agent OpenAI Agents SDK workflow on the server and presents the output in a polished responsive workbench.

## Template Links

| Destination | URL |
| --- | --- |
| AI Templates Hub | [https://suhasbhairav.com/ai-templates](https://suhasbhairav.com/ai-templates) |
| This Template Page | [https://suhasbhairav.com/ai-templates/pricing-canary-evidence-agent](https://suhasbhairav.com/ai-templates/pricing-canary-evidence-agent) |
| Creator | [https://suhasbhairav.com](https://suhasbhairav.com) |

## One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsuhasbhairav%2Fpricing-canary-evidence-agent&env=OPENAI_API_KEY%2COPENAI_AGENT_MODEL&envDescription=Add+server-side+OpenAI+settings+for+this+AI+Templates+starter.&envLink=https%3A%2F%2Fgithub.com%2Fsuhasbhairav%2Fpricing-canary-evidence-agent%23environment-variables)

The deploy flow asks for `OPENAI_API_KEY` and optionally `OPENAI_AGENT_MODEL`. Keep these values server-side only.

## Executive Overview

Pricing Canary Evidence Agent is built for teams researching **pricing canary run-evidence index 10-account run**. It includes a domain-specific first-pass agent and a reviewer agent so the output is not just a chat response, but an operating plan with controls, implementation steps, and human approval points.

The app is intentionally simple to adapt: the frontend is a single responsive workbench, the workflow is isolated in `lib/agents/workflow.js`, and the API key never leaves the server route.

## Agents Included

| Agent | Responsibility |
| --- | --- |
| Canary Run Planner | Creates pricing canary cohorts, success criteria, rollback triggers, and evidence needs. |
| Evidence Pack Auditor | Checks run evidence for completeness, account coverage, and decision readiness. |

## Best-Fit Use Cases

- Pricing canaries
- Evidence packs
- 10-account pilots
- Rollback planning

## Search And Discovery Keywords

`pricing canary run-evidence index` · `pricing canary run-evidence index 10-account run` · `AI Templates` · `OpenAI Agents SDK starter` · `Next.js AI template`

## Architecture

```text
Browser workbench
   ↓
Next.js App Router page
   ↓
POST /api/agents/chat
   ↓
Canary Run Planner
   ↓
Evidence Pack Auditor
   ↓
Reviewed operating plan
```

## Project Structure

- `app/page.js` - responsive workbench UI
- `app/api/agents/chat/route.js` - server-side workflow endpoint
- `lib/agents/workflow.js` - OpenAI Agents SDK setup
- `app/globals.css` - theme and responsive layout
- `.env.example` - environment variable reference

## Quick Start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open the app:

```text
http://localhost:3000
```

If port 3000 is already in use:

```bash
npm run dev -- -p 3001
```

## Environment Variables

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `OPENAI_API_KEY` | Yes | - | Server-side OpenAI API key. |
| `OPENAI_AGENT_MODEL` | No | `gpt-5-nano` | Model used by both agents. |

## API Surface

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/agents/chat` | `POST` | Runs the two-agent workflow for the submitted scenario. |

Example request:

```json
{
  "prompt": "Plan a pricing canary run-evidence index for a 10-account run."
}
```

## Production Hardening Checklist

| Area | Recommended Upgrade |
| --- | --- |
| Authentication | Add Clerk, Auth.js, Supabase Auth, or your organization identity provider. |
| Authorization | Scope runs by user, team, tenant, and workspace. |
| Persistence | Store agent runs, reviewer decisions, and evidence artifacts. |
| Observability | Add structured logs, traces, latency metrics, and error capture. |
| Cost Controls | Add quotas, model allowlists, token budgets, and abuse monitoring. |
| Safety | Add input validation, output review, and approval gates for high-risk actions. |
| Evaluation | Save golden prompts and compare outputs before production changes. |

## Security Notes

- Never expose `OPENAI_API_KEY` in client components.
- Do not commit `.env.local`.
- Validate request bodies before calling model APIs.
- Add rate limits before public launch.
- Review prompts and logs for sensitive data before persistence.

## Verification

```bash
npm run lint
npm run build
```

## License

MIT. Use this starter freely, adapt it for your product, and keep creator attribution where appropriate.
