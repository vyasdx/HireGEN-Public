import { NextResponse } from "next/server";
import { builderInputSchema } from "@/lib/skill-graph-schema";
import { generateSkillGraph } from "@/lib/skill-graph";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = builderInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid builder input",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const generation = await generateSkillGraph(parsed.data);

  return NextResponse.json({
    ...generation,
    generated_at: new Date().toISOString(),
  });
}
