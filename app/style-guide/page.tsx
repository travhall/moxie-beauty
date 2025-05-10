"use client";

import Button from "@/components/button";
import {
  Heart,
  Send,
  Menu,
  Facebook,
  Instagram,
  CalendarClock,
} from "lucide-react";

export default function StyleGuide() {
  return (
    <main>
      {/* STYLE GUIDE STUFFS */}
      <section className="p-12">
        <style jsx>{`
          .swatch {
            width: 100%;
            height: 80px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 8px;
            border-radius: 6px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s;
          }

          .swatch:hover {
            transform: scale(1.05);
          }

          .swatch-name {
            font-weight: 500;
            font-size: 0.875rem;
            margin-bottom: 2px;
          }

          .swatch-value {
            font-size: 0.75rem;
            opacity: 0.8;
            word-break: break-all;
          }

          .dark-text {
            color: #111827;
          }

          .light-text {
            color: #f3f4f6;
          }

          .palette-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            margin-top: 2rem;
          }
        `}</style>

        <h1 className="text-3xl font-bold mb-8">Color Palette Preview</h1>

        {/* Ivory Rose Palette */}
        <div>
          <h2 className="palette-title">Ivory Rose</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--ivory-rose-50)" }}
            >
              <div className="swatch-name">--ivory-rose-50</div>
              <div className="swatch-value">oklch(96.79% 0.0068 29.23)</div>
            </div>
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--ivory-rose-100)" }}
            >
              <div className="swatch-name">--ivory-rose-100</div>
              <div className="swatch-value">oklch(87.67% 0.0137 29.23)</div>
            </div>
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--ivory-rose-200)" }}
            >
              <div className="swatch-name">--ivory-rose-200</div>
              <div className="swatch-value">oklch(73.31% 0.0274 29.23)</div>
            </div>
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--ivory-rose-300)" }}
            >
              <div className="swatch-name">--ivory-rose-300</div>
              <div className="swatch-value">oklch(62.63% 0.0313 29.23)</div>
            </div>
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--ivory-rose-400)" }}
            >
              <div className="swatch-name">--ivory-rose-400</div>
              <div className="swatch-value">oklch(57.34% 0.0411 29.23)</div>
            </div>
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--ivory-rose-500)" }}
            >
              <div className="swatch-name">--ivory-rose-500</div>
              <div className="swatch-value">oklch(51.95% 0.0446 29.23)</div>
            </div>
            <div
              className="swatch light-text"
              style={{ backgroundColor: "var(--ivory-rose-600)" }}
            >
              <div className="swatch-name">--ivory-rose-600</div>
              <div className="swatch-value">oklch(36.71% 0.0490 29.23)</div>
            </div>
            <div
              className="swatch light-text"
              style={{ backgroundColor: "var(--ivory-rose-700)" }}
            >
              <div className="swatch-name">--ivory-rose-700</div>
              <div className="swatch-value">oklch(29.03% 0.0505 29.23)</div>
            </div>
            <div
              className="swatch light-text"
              style={{ backgroundColor: "var(--ivory-rose-800)" }}
            >
              <div className="swatch-name">--ivory-rose-800</div>
              <div className="swatch-value">oklch(21.70% 0.0520 29.23)</div>
            </div>
            <div
              className="swatch light-text"
              style={{ backgroundColor: "var(--ivory-rose-900)" }}
            >
              <div className="swatch-name">--ivory-rose-900</div>
              <div className="swatch-value">oklch(14.84% 0.0431 29.23)</div>
            </div>
          </div>
        </div>

        {/* Monstera Palette */}
        <div>
          <h2 className="palette-title">Monstera</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--monstera-50)" }}
            >
              <div className="swatch-name">--monstera-50</div>
              <div className="swatch-value">oklch(96.79% 0.0033 142.50)</div>
            </div>
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--monstera-100)" }}
            >
              <div className="swatch-name">--monstera-100</div>
              <div className="swatch-value">oklch(87.67% 0.0057 142.50)</div>
            </div>
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--monstera-200)" }}
            >
              <div className="swatch-name">--monstera-200</div>
              <div className="swatch-value">oklch(73.31% 0.0097 142.50)</div>
            </div>
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--monstera-300)" }}
            >
              <div className="swatch-name">--monstera-300</div>
              <div className="swatch-value">oklch(62.63% 0.0097 142.50)</div>
            </div>
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--monstera-400)" }}
            >
              <div className="swatch-name">--monstera-400</div>
              <div className="swatch-value">oklch(57.34% 0.0097 142.50)</div>
            </div>
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--monstera-500)" }}
            >
              <div className="swatch-name">--monstera-500</div>
              <div className="swatch-value">oklch(51.95% 0.0097 142.50)</div>
            </div>
            <div
              className="swatch light-text"
              style={{ backgroundColor: "var(--monstera-600)" }}
            >
              <div className="swatch-name">--monstera-600</div>
              <div className="swatch-value">oklch(36.71% 0.0205 142.50)</div>
            </div>
            <div
              className="swatch light-text"
              style={{ backgroundColor: "var(--monstera-700)" }}
            >
              <div className="swatch-name">--monstera-700</div>
              <div className="swatch-value">oklch(29.03% 0.0205 142.50)</div>
            </div>
            <div
              className="swatch light-text"
              style={{ backgroundColor: "var(--monstera-800)" }}
            >
              <div className="swatch-name">--monstera-800</div>
              <div className="swatch-value">oklch(21.70% 0.0422 142.50)</div>
            </div>
            <div
              className="swatch light-text"
              style={{ backgroundColor: "var(--monstera-900)" }}
            >
              <div className="swatch-name">--monstera-900</div>
              <div className="swatch-value">oklch(14.84% 0.0422 142.50)</div>
            </div>
          </div>
        </div>

        {/* Rose Gold Palette */}
        <div>
          <h2 className="palette-title">Rose Gold</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--rose-gold-50)" }}
            >
              <div className="swatch-name">--rose-gold-50</div>
              <div className="swatch-value">oklch(97.31% 0.0280 63.00)</div>
            </div>
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--rose-gold-100)" }}
            >
              <div className="swatch-name">--rose-gold-100</div>
              <div className="swatch-value">oklch(89.25% 0.0480 63.00)</div>
            </div>
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--rose-gold-200)" }}
            >
              <div className="swatch-name">--rose-gold-200</div>
              <div className="swatch-value">oklch(79.46% 0.0650 63.00)</div>
            </div>
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--rose-gold-300)" }}
            >
              <div className="swatch-name">--rose-gold-300</div>
              <div className="swatch-value">oklch(70.18% 0.0750 63.00)</div>
            </div>
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--rose-gold-400)" }}
            >
              <div className="swatch-name">--rose-gold-400</div>
              <div className="swatch-value">oklch(63.50% 0.0850 63.00)</div>
            </div>
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--rose-gold-500)" }}
            >
              <div className="swatch-name">--rose-gold-500</div>
              <div className="swatch-value">oklch(56.85% 0.0920 63.00)</div>
            </div>
            <div
              className="swatch light-text"
              style={{ backgroundColor: "var(--rose-gold-600)" }}
            >
              <div className="swatch-name">--rose-gold-600</div>
              <div className="swatch-value">oklch(42.47% 0.0720 63.00)</div>
            </div>
            <div
              className="swatch light-text"
              style={{ backgroundColor: "var(--rose-gold-700)" }}
            >
              <div className="swatch-name">--rose-gold-700</div>
              <div className="swatch-value">oklch(33.89% 0.0580 63.00)</div>
            </div>
            <div
              className="swatch light-text"
              style={{ backgroundColor: "var(--rose-gold-800)" }}
            >
              <div className="swatch-name">--rose-gold-800</div>
              <div className="swatch-value">oklch(25.42% 0.0420 63.00)</div>
            </div>
            <div
              className="swatch light-text"
              style={{ backgroundColor: "var(--rose-gold-900)" }}
            >
              <div className="swatch-name">--rose-gold-900</div>
              <div className="swatch-value">oklch(17.15% 0.0380 63.00)</div>
            </div>
          </div>
        </div>

        {/* Midnite Palette */}
        <div>
          <h2 className="palette-title">Midnite</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--midnite-50)" }}
            >
              <div className="swatch-name">--midnite-50</div>
              <div className="swatch-value">oklch(96.79% 0.0008 48.79)</div>
            </div>
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--midnite-100)" }}
            >
              <div className="swatch-name">--midnite-100</div>
              <div className="swatch-value">oklch(87.67% 0.0014 48.79)</div>
            </div>
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--midnite-200)" }}
            >
              <div className="swatch-name">--midnite-200</div>
              <div className="swatch-value">oklch(73.31% 0.0024 48.79)</div>
            </div>
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--midnite-300)" }}
            >
              <div className="swatch-name">--midnite-300</div>
              <div className="swatch-value">oklch(62.63% 0.0024 48.79)</div>
            </div>
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--midnite-400)" }}
            >
              <div className="swatch-name">--midnite-400</div>
              <div className="swatch-value">oklch(57.34% 0.0024 48.79)</div>
            </div>
            <div
              className="swatch dark-text"
              style={{ backgroundColor: "var(--midnite-500)" }}
            >
              <div className="swatch-name">--midnite-500</div>
              <div className="swatch-value">oklch(48.10% 0.0024 48.79)</div>
            </div>
            <div
              className="swatch light-text"
              style={{ backgroundColor: "var(--midnite-600)" }}
            >
              <div className="swatch-name">--midnite-600</div>
              <div className="swatch-value">oklch(32.93% 0.0024 48.79)</div>
            </div>
            <div
              className="swatch light-text"
              style={{ backgroundColor: "var(--midnite-700)" }}
            >
              <div className="swatch-name">--midnite-700</div>
              <div className="swatch-value">oklch(21.70% 0.0024 48.79)</div>
            </div>
            <div
              className="swatch light-text"
              style={{ backgroundColor: "var(--midnite-800)" }}
            >
              <div className="swatch-name">--midnite-800</div>
              <div className="swatch-value">oklch(14.84% 0.0024 48.79)</div>
            </div>
            <div
              className="swatch light-text"
              style={{ backgroundColor: "var(--midnite-900)" }}
            >
              <div className="swatch-name">--midnite-900</div>
              <div className="swatch-value">oklch(8.48% 0.0024 48.79)</div>
            </div>
          </div>
        </div>
      </section>

      <section className="p-12">
        <h2 className="text-xl mb-4">Default Variant</h2>
        <div className="flex flex-wrap gap-4">
          {/* Text only */}
          <Button>Default Button</Button>
          <Button size="sm">Small Button</Button>
          <Button size="lg">Large Button</Button>

          {/* Text + Icon Left */}
          <Button icon={Heart}>With Icon</Button>
          <Button icon={Heart} size="sm">
            Small with Icon
          </Button>
          <Button icon={Heart} size="lg">
            Large with Icon
          </Button>

          {/* Text + Icon Right */}
          <Button icon={Send} iconPosition="right">
            Icon Right
          </Button>

          {/* Icon only */}
          <Button
            icon={CalendarClock}
            iconOnly
            aria-label="Schedule Appointment"
          />
          <Button
            icon={CalendarClock}
            iconOnly
            size="sm"
            aria-label="Schedule Appointment"
          />
          <Button
            icon={CalendarClock}
            iconOnly
            size="lg"
            aria-label="Schedule Appointment"
          />

          <Button icon={Facebook} iconOnly aria-label="Facebook" />
          <Button icon={Instagram} iconOnly aria-label="Instagram" />

          {/* Loading state */}
          <Button isLoading>Loading</Button>
        </div>
      </section>

      <section className="p-12">
        <h2 className="text-xl mb-4">Outline Variant</h2>
        <div className="flex flex-wrap gap-4">
          {/* Text only */}
          <Button variant="outline">Outline Button</Button>
          <Button variant="outline" size="sm">
            Small Outline
          </Button>
          <Button variant="outline" size="lg">
            Large Outline
          </Button>

          {/* Text + Icon */}
          <Button variant="outline" icon={Heart}>
            With Icon
          </Button>

          {/* Icon only */}
          <Button variant="outline" icon={Menu} iconOnly aria-label="Menu" />

          {/* Loading state */}
          <Button variant="outline" isLoading>
            Loading
          </Button>
        </div>
      </section>

      <section className="p-12">
        <h2 className="text-xl mb-4">Ghost Variant</h2>
        <div className="flex flex-wrap gap-4">
          {/* Text only */}
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="ghost" size="sm">
            Small Ghost
          </Button>
          <Button variant="ghost" size="lg">
            Large Ghost
          </Button>

          {/* Text + Icon */}
          <Button variant="ghost" icon={Heart}>
            With Icon
          </Button>

          {/* Icon only */}
          <Button variant="ghost" icon={Menu} iconOnly aria-label="Menu" />

          {/* Loading state */}
          <Button variant="ghost" isLoading>
            Loading
          </Button>
        </div>
      </section>

      <section className="p-12">
        <h2 className="text-xl mb-4">Disabled State</h2>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled Default</Button>
          <Button variant="outline" disabled>
            Disabled Outline
          </Button>
          <Button variant="ghost" disabled>
            Disabled Ghost
          </Button>
        </div>
      </section>
    </main>
  );
}
