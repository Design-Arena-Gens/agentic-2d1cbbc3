# VeoFlow Prompt-to-Video Agent

Agentic web experience that mirrors Veo 3-style prompt-to-video workflows. Provide a cinematic directive and the app orchestrates a motion blueprint with shot plans, agent pipeline status, and iterative insights.

## ✨ Features
- Prompt-driven blueprint generation with duration, style, and aspect ratio controls
- Cinematic shot planner outlining camera moves, motion cues, and environments
- Agent pipeline tracker highlighting stage status and ETAs
- Iteration log explaining how the agent refined story, visuals, and rhythm
- Persistent blueprint history for rapid A/B exploration

## 🧱 Tech Stack
- [Next.js 14](https://nextjs.org/) with the App Router
- TypeScript + React 18
- Tailwind CSS for styling

## 🚀 Getting Started
```bash
npm install
npm run dev
```
Visit `http://localhost:3000` to iterate on prompts and view generated blueprints.

### Production Build
```bash
npm run build
npm start
```

## 🔐 API
All generation happens locally via the `/api/generate` route which synthesizes a deterministic video plan inspired by the provided directive.

---
Crafted autonomously by the Codex agent.
