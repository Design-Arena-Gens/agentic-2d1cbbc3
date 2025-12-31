import { type VideoPlan } from "@/lib/generator";
import clsx from "clsx";

type GenerationResultProps = {
  plan: VideoPlan | null;
  loading: boolean;
};

export function GenerationResult({ plan, loading }: GenerationResultProps) {
  if (!plan) {
    return (
      <div className="glassy gradient-ring flex h-full min-h-[400px] flex-col items-center justify-center rounded-3xl p-10 text-center">
        <div className="rounded-full border border-accent/40 px-4 py-1 text-xs uppercase tracking-wider text-accent">
          VeoFlow agent ready
        </div>
        <h2 className="mt-5 text-3xl font-semibold text-white">
          Map a cinematic journey from words alone
        </h2>
        <p className="mt-4 max-w-xl text-sm text-slate-300">
          Provide a rich directive and the agent orchestrates shot design, motion cues, and lighting passes—fully inspired by Veo 3 workflows.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glassy gradient-ring overflow-hidden rounded-3xl border border-accent/20">
        <div className="relative aspect-video w-full">
          <video
            className="h-full w-full object-cover"
            poster={plan.previewStill}
            src={plan.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            controls
          />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-surface/80">
              <span className="animate-pulse text-sm uppercase tracking-widest text-accent">Rendering…</span>
            </div>
          )}
        </div>
        <div className="grid gap-6 border-t border-accent/10 bg-surface/80 p-6 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-accent">Energy profile</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{plan.energyLevel}</h3>
            <p className="mt-3 text-sm text-slate-300">{plan.summary}</p>
          </div>
          <div className="rounded-2xl border border-accent/10 bg-surface/60 p-4 text-sm text-slate-200">
            <p className="text-xs uppercase tracking-wide text-accent/90">Narrative hook</p>
            <p className="mt-2 text-base font-medium text-white">{plan.narrativeHook}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
              <span className="rounded-full border border-accent/30 px-3 py-1">Adaptive story arcs</span>
              <span className="rounded-full border border-accent/30 px-3 py-1">Spatial audio sync</span>
              <span className="rounded-full border border-accent/30 px-3 py-1">Agentic iteration</span>
            </div>
          </div>
        </div>
      </div>

      <section className="grid gap-6 lg:grid-cols-5">
        <div className="glassy gradient-ring rounded-3xl p-6 lg:col-span-3">
          <header className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-accent">Shot planner</p>
              <h3 className="text-xl font-semibold">Timeline blueprint</h3>
            </div>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
              {plan.shots.length} shots
            </span>
          </header>
          <div className="mt-5 space-y-4">
            {plan.shots.map((shot, index) => (
              <div
                key={shot.id}
                className="rounded-2xl border border-accent/10 bg-surface/70 p-4 transition hover:border-accent/40"
              >
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-2 text-accent/80">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-xs font-semibold text-accent">
                      {index + 1}
                    </span>
                    {shot.timestamp}
                  </span>
                  <span>{shot.environment}</span>
                </div>
                <div className="mt-3 text-base font-medium text-white">{shot.beat}</div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                  <Chip icon="🎥">{shot.camera}</Chip>
                  <Chip icon="🌌">{shot.motion}</Chip>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div className="glassy gradient-ring rounded-3xl p-6">
            <header className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-accent">Agent pipeline</p>
                <h3 className="text-xl font-semibold">Execution status</h3>
              </div>
            </header>
            <div className="mt-5 space-y-4">
              {plan.tasks.map((task) => (
                <div
                  key={task.label}
                  className="flex items-center justify-between rounded-2xl border border-transparent bg-surface/70 p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{task.label}</p>
                    <p className="text-xs text-slate-400">ETA {task.eta}</p>
                  </div>
                  <StatusPill status={task.status} />
                </div>
              ))}
            </div>
          </div>

          <div className="glassy gradient-ring rounded-3xl p-6">
            <p className="text-xs uppercase tracking-wide text-accent">Agent iterations</p>
            <h3 className="mt-1 text-xl font-semibold">What evolved</h3>
            <div className="mt-5 space-y-4">
              {plan.iterations.map((iteration, index) => (
                <div key={`${iteration.type}-${index}`} className="rounded-2xl border border-accent/10 bg-surface/70 p-4">
                  <p className="text-xs uppercase tracking-wide text-accent/70">{iteration.type}</p>
                  <p className="mt-2 text-sm text-slate-100">{iteration.description}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                    <span className="rounded-full border border-accent/30 px-2 py-1 uppercase tracking-wide">
                      Impact: {iteration.impact}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

type ChipProps = {
  icon: string;
  children: React.ReactNode;
};

function Chip({ icon, children }: ChipProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-surface/60 px-3 py-1 text-xs text-slate-300">
      <span>{icon}</span>
      {children}
    </span>
  );
}

type Status = "complete" | "in-progress" | "queued";

function StatusPill({ status }: { status: Status }) {
  const label = status === "complete" ? "Complete" : status === "in-progress" ? "In progress" : "Queued";
  return (
    <span
      className={clsx(
        "rounded-full px-3 py-1 text-xs font-medium",
        status === "complete" && "bg-success/15 text-success",
        status === "in-progress" && "bg-warning/15 text-warning",
        status === "queued" && "bg-slate-700 text-slate-300"
      )}
    >
      {label}
    </span>
  );
}
