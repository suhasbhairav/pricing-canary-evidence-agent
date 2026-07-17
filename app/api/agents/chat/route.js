import { runAgentWorkflow } from "@/lib/agents/workflow";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));

  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "OPENAI_API_KEY is required to run the agents." },
      { status: 500 },
    );
  }

  if (typeof body.prompt !== "string" || body.prompt.trim().length === 0) {
    return Response.json({ error: "prompt is required" }, { status: 400 });
  }

  try {
    const result = await runAgentWorkflow(body.prompt);
    return Response.json(result);
  } catch (error) {
    return Response.json(
      { error: error.message || "The agent workflow failed." },
      { status: 500 },
    );
  }
}
