import type { ReactNode } from "react";
import { Bricolage_Grotesque, Gloock, Martian_Mono } from "next/font/google";

// Contact's own type (design/contact/fonts-v1.png, set 01): Gloock for headings, Bricolage
// Grotesque for text, Martian Mono for labels. Loaded on this route only; `.contact-type`
// (app/globals.css) points the site's font variables at them inside the page.
const gloock = Gloock({ subsets: ["latin"], weight: "400", variable: "--font-gloock", display: "swap" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const martian = Martian_Mono({ subsets: ["latin"], variable: "--font-martian", display: "swap" });

export default function ContactLayout({ children }: { children: ReactNode }) {
    return <div className={`${gloock.variable} ${bricolage.variable} ${martian.variable} contact-type`}>{children}</div>;
}
