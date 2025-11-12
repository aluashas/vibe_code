import { NextResponse } from "next/server";

const onboardingTemplates = [
  "Upload your first storyboard so Forma can learn your pace.",
  "Invite a collaborator to leave inline scene notes.",
  "Ask the Dedalus Director agent to check tone + flow.",
];

const buildWorkspaceLink = (name: string) => {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);
  return `https://app.forma.so/${slug || "studio"}`;
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Missing body" }, { status: 400 });
  }

  const { name, email, studio, focus } = body;
  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  const welcomeNote = `Hey ${name}, Forma set up a cozy workspace for ${studio || "your studio"}.`;
  const workspaceLink = buildWorkspaceLink(studio || name);
  const onboarding = onboardingTemplates.map((line, idx) => {
    if (idx === 2 && focus) {
      return `Ask the Producer agent to weave ${focus} into the onboarding script.`;
    }
    return line;
  });

  return NextResponse.json({
    workspaceLink,
    onboarding,
    welcomeNote,
  });
}
