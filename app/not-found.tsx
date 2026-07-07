import type { Metadata } from "next";
import Button from "@/components/button";
import { containerClass } from "@/lib/layout";

export const metadata: Metadata = {
  title: "Page Not Found | Moxie Beauty Studio",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main>
      <section className="pt-24 pb-24 min-h-[50vh] flex items-center">
        <div className={containerClass}>
          <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--accent-text) mb-6">
            404
          </p>
          <h1 className="font-nyght text-4xl lg:text-5xl leading-tight mb-6 text-balance">
            We couldn&apos;t find that page.
          </h1>
          <p className="max-w-[60ch] mb-10 text-pretty">
            The page you&apos;re looking for may have moved or no longer
            exists. Here are a couple of places to pick back up.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" showArrow href="/">
              Back to Home
            </Button>
            <Button variant="ghost" size="lg" href="/services">
              Explore Services
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
