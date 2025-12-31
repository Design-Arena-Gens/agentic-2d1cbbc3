import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "VeoFlow Agent",
  description: "Prompt-to-video agent inspired by Veo 3 with scene planning, shot design, and intelligent iterations.",
  openGraph: {
    title: "VeoFlow Agent",
    description: "Prompt-to-video agent inspired by Veo 3 with cinematic planning and auto-iteration.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "VeoFlow Agent",
    description: "Create cinematic videos from text prompts with iterative agentic workflows.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-surface">
      <body className={`${inter.variable} font-sans min-h-screen`}>{children}</body>
    </html>
  );
}
