import { NextResponse } from "next/server";

const sweetMessages = [
  "We detected cozy gradients and gentle onboarding beats.",
  "Motion cues suggest soft fades and looping reminders.",
  "Your narrative implies branching choices--SCENE prepped state logic.",
];

const buildPreviewLink = (slug: string) =>
  `https://scene-demo.pages.dev/preview/${slug}-${Math.random().toString(36).slice(2, 6)}`;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.projectName !== "string" || typeof body.inputMode !== "string") {
    return NextResponse.json({ error: "Missing projectName or inputMode" }, { status: 400 });
  }

  const projectName = body.projectName.trim();
  if (!projectName) {
    return NextResponse.json({ error: "Project name cannot be empty" }, { status: 400 });
  }

  const slug = projectName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);

  const previewLink = buildPreviewLink(slug || "scene");
  const summary = sweetMessages[Math.floor(Math.random() * sweetMessages.length)];

  return NextResponse.json({
    status: "ok",
    previewLink,
    summary,
    nextSteps: [
      `Invite Dedalus agents to refine your ${body.inputMode}.`,
      "Share the preview link with your crew and gather vibes.",
      "Use plain language commands to tweak tone or motion.",
    ],
  });
}
