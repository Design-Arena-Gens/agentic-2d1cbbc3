"use client";

import { useState, useMemo } from "react";
import { STYLE_PRESETS, ASPECT_RATIOS, DURATION_PRESETS } from "@/lib/presets";
import clsx from "clsx";

type FormValues = {
  prompt: string;
  duration: number;
  aspectRatio: string;
  stylePreset: string;
  guidanceScale: number;
  creativity: number;
};

type PromptFormProps = {
  loading: boolean;
  onGenerate: (values: FormValues) => Promise<void> | void;
};

const DEFAULT_PROMPT =
  "A night-time drone flyover across a neon-drenched megacity as rain shimmers on the rooftops and holograms pulse against the skyline";

export function PromptForm({ loading, onGenerate }: PromptFormProps) {
  const [prompt, setPrompt] = useState<string>(DEFAULT_PROMPT);
  const [duration, setDuration] = useState<number>(20);
  const [aspectRatio, setAspectRatio] = useState<string>(ASPECT_RATIOS[0]?.id ?? "16:9");
  const [stylePreset, setStylePreset] = useState<string>(STYLE_PRESETS[0]?.id ?? "cinematic");
  const [guidanceScale, setGuidanceScale] = useState<number>(0.7);
  const [creativity, setCreativity] = useState<number>(0.55);

  const wordCount = useMemo(() => prompt.trim().split(/\s+/).filter(Boolean).length, [prompt]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!prompt.trim()) return;

    await onGenerate({ prompt, duration, aspectRatio, stylePreset, guidanceScale, creativity });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <label className="flex items-center justify-between text-sm font-medium text-slate-200">
          <span>Prompt to video directive</span>
          <span className="text-xs text-slate-400">{wordCount} words</span>
        </label>
        <textarea
          className="glassy gradient-ring w-full rounded-2xl px-5 py-4 text-base shadow-glow outline-none transition focus:ring-2 focus:ring-accent/70"
          rows={5}
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Describe the story, environment, motion, and mood you want to see"
        />
        <div className="flex flex-wrap gap-2 text-xs text-slate-400">
          <span className="rounded-full border border-accent/30 px-3 py-1">Include camera moves</span>
          <span className="rounded-full border border-accent/30 px-3 py-1">Describe lighting</span>
          <span className="rounded-full border border-accent/30 px-3 py-1">Call out pace + energy</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {DURATION_PRESETS.map((preset) => {
          const active = Number(preset.id) === duration;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => setDuration(Number(preset.id))}
              className={clsx(
                "glassy rounded-2xl px-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
                active ? "ring-2 ring-accent/70" : "opacity-80 hover:opacity-100"
              )}
            >
              <div className="text-sm text-slate-300">Duration</div>
              <div className="text-lg font-semibold text-white">{preset.label}</div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="glassy rounded-2xl p-5">
          <label className="text-sm font-medium text-slate-200">Visual style blueprint</label>
          <div className="mt-4 grid grid-cols-1 gap-3">
            {STYLE_PRESETS.map((preset) => {
              const active = preset.id === stylePreset;
              return (
                <button
                  type="button"
                  key={preset.id}
                  className={clsx(
                    "w-full rounded-xl border px-4 py-3 text-left transition",
                    active
                      ? "border-accent/70 bg-accent/10 text-white"
                      : "border-transparent bg-surface/60 text-slate-300 hover:border-accent/30"
                  )}
                  onClick={() => setStylePreset(preset.id)}
                >
                  <div className="text-sm font-semibold">{preset.name}</div>
                  <p className="mt-1 text-xs text-slate-400">{preset.description}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-wide text-slate-500">{preset.camera}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="glassy rounded-2xl p-5">
            <label className="text-sm font-medium text-slate-200">Aspect ratio</label>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {ASPECT_RATIOS.map((ratio) => {
                const active = ratio.id === aspectRatio;
                return (
                  <button
                    type="button"
                    key={ratio.id}
                    className={clsx(
                      "rounded-xl border px-4 py-3 text-left transition",
                      active
                        ? "border-accent/70 bg-accent/10 text-white"
                        : "border-transparent bg-surface/60 text-slate-300 hover:border-accent/30"
                    )}
                    onClick={() => setAspectRatio(ratio.id)}
                  >
                    <div className="text-sm font-semibold">{ratio.label}</div>
                    <div className="mt-1 text-xs uppercase tracking-wide text-slate-500">{ratio.id}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="glassy rounded-2xl p-5">
            <label className="text-sm font-medium text-slate-200">Guidance vs exploration</label>
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Creative stability ({Math.round(guidanceScale * 100)}%)</span>
                  <span>Generative freedom ({Math.round((1 - guidanceScale) * 100)}%)</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={guidanceScale}
                  onChange={(event) => setGuidanceScale(Number(event.target.value))}
                  className="mt-2 w-full accent-accent"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Grounded execution</span>
                  <span>High-concept remix</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={creativity}
                  onChange={(event) => setCreativity(Number(event.target.value))}
                  className="mt-2 w-full accent-accent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-accent px-6 py-4 text-lg font-semibold text-slate-950 transition hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span className="absolute inset-0 bg-white/30 opacity-0 transition group-hover:opacity-20" />
        {loading ? "Synthesizing agent plan…" : "Generate Motion Blueprint"}
      </button>
    </form>
  );
}
