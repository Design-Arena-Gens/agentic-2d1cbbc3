import { NextResponse } from "next/server";
import { generateVideoPlan } from "@/lib/generator";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      prompt,
      duration = 20,
      aspectRatio = "16:9",
      stylePreset = "cinematic",
      guidanceScale = 0.7,
      creativity = 0.5,
    } = body ?? {};

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 6) {
      return NextResponse.json(
        { error: "Prompt must be a descriptive string with at least 6 characters." },
        { status: 400 }
      );
    }

    const options = {
      duration: Number(duration) || 20,
      aspectRatio: String(aspectRatio),
      stylePreset: String(stylePreset),
      guidanceScale: Math.min(Math.max(Number(guidanceScale) || 0.7, 0), 1),
      creativity: Math.min(Math.max(Number(creativity) || 0.5, 0), 1),
    };

    const plan = generateVideoPlan(prompt, options);

    return NextResponse.json({
      status: "ready",
      plan,
    });
  } catch (error) {
    console.error("Generation error", error);
    return NextResponse.json(
      { error: "Failed to synthesize video plan. Please retry." },
      { status: 500 }
    );
  }
}
