import type { ReactNode } from "react";
import { JetBrains_Mono, Onest, Young_Serif } from "next/font/google";

// About's own type (design/about/about-build-plan.md): Young Serif for headings, Onest for
// text, JetBrains Mono for labels. Loaded on this route only; `.about-type` (app/globals.css)
// points the site's font variables at them inside the page.
const youngSerif = Young_Serif({ subsets: ["latin"], weight: "400", variable: "--font-young-serif", display: "swap" });
const onest = Onest({ subsets: ["latin"], variable: "--font-onest", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export default function AboutLayout({ children }: { children: ReactNode }) {
    return <div className={`${youngSerif.variable} ${onest.variable} ${jetbrains.variable} about-type`}>{children}</div>;
}
