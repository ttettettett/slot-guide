import Link from "next/link";

import { Button } from "../components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br from-background to-muted p-8">
      <div className="max-w-xl space-y-4 text-center">
        <p className="text-sm uppercase tracking-wide text-muted-foreground">
          slot guide
        </p>
        <h1 className="text-4xl font-bold sm:text-5xl">Welcome to Slot Guide</h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          This Next.js app is configured with Tailwind CSS, shadcn/ui, pnpm workspaces,
          Biome formatting, and a ready-to-run CI pipeline. Start building by editing
          <code className="ml-1 rounded bg-muted px-1 py-0.5">src/app/page.tsx</code>.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button asChild>
          <Link href="https://nextjs.org/learn">Next.js Docs</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="https://ui.shadcn.com">shadcn/ui</Link>
        </Button>
      </div>
    </main>
  );
}
