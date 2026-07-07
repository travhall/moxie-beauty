"use client";

import Button from "@/components/button";
import { containerClass } from "@/lib/layout";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <section className="pt-24 pb-24 min-h-[50vh] flex items-center">
        <div className={containerClass}>
          <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--accent-text) mb-6">
            Something went wrong
          </p>
          <h1 className="font-nyght text-4xl lg:text-5xl leading-tight mb-6 text-balance">
            That didn&apos;t load right.
          </h1>
          <p className="max-w-[60ch] mb-10 text-pretty">
            An unexpected error occurred. You can try again, or head back to
            the homepage.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" showArrow onClick={() => reset()}>
              Try Again
            </Button>
            <Button variant="ghost" size="lg" href="/">
              Back to Home
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
