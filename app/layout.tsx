import type { Metadata } from "next";
import { Geist_Mono, Playfair_Display, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

// Three families, latin subset, swap, preloaded: slab headings, serif body, one mono for the
// micro-labels. (Geist Sans and Urbanist were loaded but never used: the few `font-sans` spans
// fall back to the system stack.)
const robotoSlabHeading = Roboto_Slab({subsets:['latin'],variable:'--font-heading',display:'swap'});

const playfairDisplay = Playfair_Display({subsets:['latin'],variable:'--font-serif',display:'swap'});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "S&N Devs",
  description: "S&N Devs — the portfolio and service studio of Noah & Shaun. Explore our work and see what we can build for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("dark", "h-full", "antialiased", geistMono.variable, "font-serif", playfairDisplay.variable, robotoSlabHeading.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
