"use client";

import { useRef, useState } from "react";
import { miniFacts, outputs, pillars } from "@/data/forma";

type AccountResponse = {
  workspaceLink: string;
  onboarding: string[];
  welcomeNote: string;
};

export default function Home() {
  const [activePillar, setActivePillar] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", studio: "", focus: "" });
  const [status, setStatus] = useState<string | null>(null);
  const [account, setAccount] = useState<AccountResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const accountRef = useRef<HTMLDivElement | null>(null);

  const handleIntroCta = () => {
    accountRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.email) {
      setStatus("Please add your name and email to create an account.");
      return;
    }
    setLoading(true);
    setStatus("Creating your Forma workspace...");
    setAccount(null);
    try {
      const response = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Unable to create account");
      }
      const data = (await response.json()) as AccountResponse;
      setAccount(data);
      setStatus("Welcome to Forma! Your workspace link is ready.");
    } catch (error) {
      setStatus((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-4 py-12 md:px-6 lg:px-8">
      <section className="scene-panel flex flex-col gap-8 px-6 py-8 sm:px-10">
        <div className="space-y-4">
          <span className="scene-chip bg-white/80 text-ink">FORMA</span>
          <h1 className="text-balance text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Forma turns your design stories into living products.
          </h1>
          <p className="text-lg text-[#4b3d7a]">
            Upload Figmas, storyboards, sketches, or vibe photos. Forma reads the narrative, assembles
            playful interfaces, and gives you a ready-to-share playground.
          </p>
          <button
            onClick={handleIntroCta}
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200"
          >
            Create a Forma account
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {miniFacts.map((fact) => (
            <div key={fact.label} className="rounded-2xl border border-black/5 bg-white/70 px-4 py-4">
              <p className="text-2xl font-semibold text-ink">{fact.value}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-[#8c7db1]">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="scene-panel flex flex-col gap-6 px-6 py-6 sm:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[#6b5a9b]">Why Forma</p>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex-1 space-y-3">
            {pillars.map((pillar, index) => (
              <button
                key={pillar.title}
                onClick={() => setActivePillar(index)}
                className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                  activePillar === index
                    ? "border-ink bg-white shadow"
                    : "border-black/10 bg-white/60 text-ink/70 hover:border-black/30"
                }`}
              >
                <p className="text-base font-semibold text-ink">{pillar.title}</p>
                <p className="text-sm text-[#6b5a9b]">{pillar.detail}</p>
              </button>
            ))}
          </div>
          <div className="flex-1 rounded-3xl border border-black/5 bg-white/80 p-6 text-sm text-[#3d2c73]">
            <p>
              Forma treats design like a screenplay. The first screen is the pitch, the next is the mood,
              and every note becomes product logic. Pick a pillar to see what we obsess over.
            </p>
          </div>
        </div>
      </section>

      <section ref={accountRef} className="scene-panel grid gap-6 px-6 py-6 sm:px-8 lg:grid-cols-[1fr_0.95fr]">
        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[#6b5a9b]">Create account</p>
          <h2 className="text-2xl font-semibold text-ink">Bring Forma into your studio</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-ink placeholder:text-[#9c8fbc] focus:border-ink focus:outline-none"
              placeholder="Name"
            />
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-ink placeholder:text-[#9c8fbc] focus:border-ink focus:outline-none"
              placeholder="Email"
            />
            <input
              value={form.studio}
              onChange={(event) => setForm({ ...form, studio: event.target.value })}
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-ink placeholder:text-[#9c8fbc] focus:border-ink focus:outline-none"
              placeholder="Studio or collective"
            />
            <textarea
              value={form.focus}
              onChange={(event) => setForm({ ...form, focus: event.target.value })}
              className="h-24 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-ink placeholder:text-[#9c8fbc] focus:border-ink focus:outline-none"
              placeholder="What product or mood are you chasing?"
            />
            <button
              disabled={loading}
              className={`rounded-2xl bg-gradient-to-r from-sky to-petal px-5 py-3 text-sm font-semibold text-ink shadow-lg shadow-sky/30 transition ${
                loading ? "opacity-60" : ""
              }`}
            >
              {loading ? "Creating..." : "Create my account"}
            </button>
          </form>
          {status && (
            <div className="rounded-2xl border border-sky/40 bg-sky/20 p-4 text-sm text-ink">{status}</div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[#6b5a9b]">What launches with Forma</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {outputs.map((output) => (
              <article key={output.title} className="rounded-3xl border border-black/5 bg-white/85 p-4">
                <p className="text-base font-semibold text-ink">{output.title}</p>
                <p className="text-sm text-[#3d2c73]">{output.description}</p>
              </article>
            ))}
          </div>
          {account && (
            <div className="rounded-3xl border border-ink/10 bg-white/80 p-5 text-sm text-[#3d2c73]">
              <p className="text-base font-semibold text-ink">{account.welcomeNote}</p>
              <a
                href={account.workspaceLink}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block text-ink underline"
              >
                {account.workspaceLink}
              </a>
              <ul className="mt-3 space-y-1">
                {account.onboarding.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
