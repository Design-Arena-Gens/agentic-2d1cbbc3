"use client";

import { useState, useTransition } from "react";
import { PromptForm } from "@/components/PromptForm";
import { GenerationResult } from "@/components/GenerationResult";
import type { VideoPlan } from "@/lib/generator";
import clsx from "clsx";

type GeneratePayload = {
  prompt: string;
  duration: number;
  aspectRatio: string;
  stylePreset: string;
  guidanceScale: number;
  creativity: number;
};

type HistoryEntry = {
  plan: VideoPlan;
  prompt: string;
  createdAt: string;
};

export default function Home() {
  const [activePlan, setActivePlan] = useState<VideoPlan | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleGenerate = (values: GeneratePayload) => {
    startTransition(async () => {
      try {
        setStatusMessage("Dispatching agents across render stack…");
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          throw new Error(payload.error ?? "Generation failed");
        }

        const payload = (await response.json()) as { plan: VideoPlan };
        setActivePlan(payload.plan);
        setStatusMessage("Compiled motion blueprint");
        setHistory((prev) => [
          { plan: payload.plan, prompt: values.prompt, createdAt: new Date().toISOString() },
          ...prev,
        ]);
      } catch (error) {
        console.error(error);
        setStatusMessage((error as Error).message ?? "Failed to generate plan");
      }
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_55%)] pb-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.15),_transparent_65%)]" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pt-16">
        <header className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-xs uppercase tracking-widest text-accent">
            <span className="animate-pulse">●</span>
            VeoFlow Agentic Stack
          </div>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">
            Prompt-to-video agent inspired by Veo 3 motion intelligence
          </h1>
          <p className="max-w-2xl text-base text-slate-300">
            Compose cinematic sequences from a single directive. The agent dissects narrative beats, proposes camera choreography, and blends lighting passes into a cohesive render-ready blueprint.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-400">
            <span className="rounded-full border border-accent/30 px-3 py-1">Scene graph reasoning</span>
            <span className="rounded-full border border-accent/30 px-3 py-1">Shot pacing intelligence</span>
            <span className="rounded-full border border-accent/30 px-3 py-1">Adaptive style modulation</span>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,40%),minmax(0,60%)]">
          <div className="space-y-6">
            <PromptForm loading={isPending} onGenerate={handleGenerate} />
            <div className="glassy rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-100">Agent activity</h3>
                <span className="text-xs text-accent">{statusMessage ?? "Idle"}</span>
              </div>
              <ul className="mt-4 space-y-3 text-xs text-slate-300">
                <li>⚡ Multi-pass rendering simulated locally for preview.</li>
                <li>🧠 Story reasoning stack tuned for cinematic pacing.</li>
                <li>🎬 Outputs include shot list, motion cues, and iteration history.</li>
              </ul>
            </div>

            {history.length > 0 && (
              <div className="glassy rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-100">Recent blueprints</h3>
                  <span className="text-xs text-slate-400">{history.length} stored</span>
                </div>
                <div className="mt-4 space-y-3">
                  {history.map((entry) => (
                    <button
                      key={entry.plan.id}
                      className={clsx(
                        "w-full rounded-2xl border px-4 py-3 text-left text-sm transition",
                        activePlan?.id === entry.plan.id
                          ? "border-accent/60 bg-accent/10 text-white"
                          : "border-transparent bg-surface/60 text-slate-300 hover:border-accent/30"
                      )}
                      onClick={() => setActivePlan(entry.plan)}
                    >
                      <p className="line-clamp-2 text-[13px] leading-relaxed">{entry.prompt}</p>
                      <p className="mt-2 text-[11px] uppercase tracking-wide text-slate-500">
                        {new Date(entry.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <GenerationResult plan={activePlan} loading={isPending} />
          </div>
        </section>
      </div>
    </main>
  );
}
