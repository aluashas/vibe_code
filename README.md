# FORMA · Storyboard to Startup

Forma is a friendly AI studio where designers upload Figmas, storyboards, sketches, or mood photos and instantly get working products that keep the original vibe.

## ✨ Highlights
- **Intro hero** that describes the Forma mission and invites users to create an account.
- **Mini-facts + pillars** showcasing why Forma is narrative-first, multimodal, and playful.
- **Account creation flow** with validation, loading state, and backend hookup.
- **Workspace preview card** that reveals onboarding steps and a generated workspace link.
- **Output cards** explaining the playground, code bundle, and story cues you receive.
- **Dedalus MCP integration example** showing how to call external tools via the Dedalus SDK.
- **Next.js API routes** (`/api/accounts`, `/api/analyze`) acting as playful backend stubs.

## 🧱 Tech Stack
- Next.js 14 (App Router)
- React + TypeScript
- Tailwind CSS with a pastel palette (`tailwind.config.ts`)
- Static content stored in `src/data/forma.ts`

## 🚀 Getting Started
```bash
npm install
npm run dev
```
Visit `http://localhost:3000` to explore Forma. Everything is client-side -- swap in real uploads, MCP calls, or auth when you are ready.

## 📁 Key Files
- `src/app/page.tsx` - hero, pillars, and account creation experience
- `src/data/forma.ts` - mini-facts, pillars, and output descriptions
- `src/app/globals.css` & `tailwind.config.ts` - typography + color system
- `src/app/api/accounts/route.ts` - mock backend endpoint for account creation
- `src/app/api/analyze/route.ts` - mock backend endpoint for narrative analysis

## 🔌 MCP Integration (Dedalus Labs)

Basic remote MCP usage with the Dedalus SDK lets you connect Forma to external tools/services. This mirrors the Dedalus Labs example:

```python
import asyncio
from dedalus_labs import AsyncDedalus, DedalusRunner
from dotenv import load_dotenv
from dedalus_labs.utils.stream import stream_async

load_dotenv()

async def main():
    client = AsyncDedalus()
    runner = DedalusRunner(client)

    result = await runner.run(
        input="Who won Wimbledon 2025?",
        model="openai/gpt-5-mini",
        mcp_servers=["windsor/brave-search-mcp"],
        stream=False
    )

    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

## 🔮 Future Ideas
1. Accept real uploads (Figma tokens, image sketches) and stream interpreted results back.
2. Wire Dedalus MCP agents directly into the workspace card for live suggestions.
3. Add auth + database to persist Forma accounts.

Design the story. Forma builds the world.
