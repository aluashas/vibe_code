import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forma · storyboard to startup",
  description:
    "Forma reads design narratives and turns Figmas, storyboards, and sketches into playful products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-ink">{children}</body>
    </html>
  );
}
