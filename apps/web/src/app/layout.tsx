import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

import { cn } from "../lib/utils";

export const metadata: Metadata = {
  title: "Slot Guide",
  description: "Next.js starter for Slot Guide with Tailwind and shadcn/ui"
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          "text-foreground"
        )}
      >
        {children}
      </body>
    </html>
  );
}
