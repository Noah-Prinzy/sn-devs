"use client";

import { useState } from "react";
import { CATEGORIES, TEMPLATES, type Category } from "@/data/templates";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TemplateCard } from "@/components/store/template-card";

// The Store: every S&N Edition template, filterable by category.
export function StorePage() {
    const [cat, setCat] = useState<Category | "all">("all");
    const shown = cat === "all" ? TEMPLATES : TEMPLATES.filter((t) => t.category === cat);

    return (
        <main className="min-h-svh bg-background px-4 pb-28 pt-36 text-foreground md:px-6">
            <div className="mx-auto max-w-6xl">
                <p className="text-xs font-semibold uppercase tracking-[.3em] text-[var(--brand)]">Store</p>
                <h1 className="mt-3 max-w-2xl font-heading text-5xl md:text-7xl">Templates, ready to ship.</h1>
                <p className="mt-5 max-w-xl text-muted-foreground">
                    S&N Edition templates: restyled, tested and documented by our team. Buy once, download straight away, and build on it however you like.
                </p>

                <Tabs value={cat} onValueChange={(v) => setCat(v as Category | "all")} className="mt-12">
                    <TabsList variant="line" className="h-auto flex-wrap">
                        <TabsTrigger value="all">All</TabsTrigger>
                        {CATEGORIES.map((c) => <TabsTrigger key={c.id} value={c.id}>{c.name}</TabsTrigger>)}
                    </TabsList>
                </Tabs>
                {cat !== "all" && <p className="mt-4 text-sm text-muted-foreground">{CATEGORIES.find((c) => c.id === cat)?.blurb}</p>}

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {shown.map((t) => <TemplateCard key={t.slug} t={t} />)}
                </div>

                <p className="mt-20 text-sm text-muted-foreground">Prices in UGX; USD is a rough guide. Want it set up and customised for you? See Ready-Made Templates on the Services page.</p>
            </div>
        </main>
    );
}
