import Link from "next/link";
import Logo from "./logo";
import FooterThemeIsland from "./footer-theme-island";
import { siteConfig } from "@/lib/site-config";
import { getSquareServices, groupServices } from "@/lib/square";

const studioLinks = [
  { label: "About Moxie", href: "/about" },
  { label: "Your Visit", href: "/visit" },
  { label: "Aftercare", href: "/aftercare" },
  { label: "Policies", href: "/policies" },
] as const;

const stayCloseLinks = [
  { label: "Instagram", href: siteConfig.social.instagram.href, external: true },
  { label: "TikTok", href: siteConfig.social.tiktok.href, external: true },
  { label: "Facebook", href: siteConfig.social.facebook.href, external: true },
] as const;

function FooterCol({
  heading,
  links,
}: {
  heading: string;
  links: readonly { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <p className="font-nyght-bold text-[10px] tracking-[0.3em] uppercase text-(--ink-mute) mb-5">
        {heading}
      </p>
      <ul className="flex flex-col gap-3">
        {links.map(({ label, href, external }) => (
          <li key={label}>
            {external ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in new tab)`}
                className="text-sm text-(--ink-soft) no-underline hover:text-(--accent) transition-colors duration-200 rounded-full"
              >
                {label}
              </a>
            ) : (
              <Link
                href={href}
                className="text-sm text-(--ink-soft) no-underline hover:text-(--accent) transition-colors duration-200 rounded-full"
              >
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const YEAR = new Date().getFullYear();

export default async function Footer() {
  const year = YEAR;

  // Derive service links from the same Square data as the services page.
  // Uses the shared cache — no extra network request.
  let serviceLinks: { label: string; href: string }[] = [];
  try {
    const services = await getSquareServices();
    const { brow, lash, extras } = groupServices(services);
    if (brow.length > 0) {
      serviceLinks.push({ label: "Brow Services", href: "/services#brow" });
      if (brow.some((s) => /microblade/i.test(s.name)))
        serviceLinks.push({ label: "Microblading", href: "/services#brow" });
    }
    if (lash.length > 0) {
      serviceLinks.push({ label: "Lash Extensions", href: "/services#lash" });
      if (lash.some((s) => /lift/i.test(s.name)))
        serviceLinks.push({ label: "Lash Lift & Tint", href: "/services#lash" });
    }
    if (extras.length > 0)
      serviceLinks.push({ label: "Extras", href: "/services#extras" });
  } catch {
    // Square unavailable — fall back to the two sections we know exist
    serviceLinks = [
      { label: "Brow Services", href: "/services#brow" },
      { label: "Microblading", href: "/services#brow" },
      { label: "Lash Extensions", href: "/services#lash" },
      { label: "Lash Lift & Tint", href: "/services#lash" },
    ];
  }

  return (
    <footer className="border-t border-(--line-soft) bg-(--background)/60">
      <div className="max-w-335 mx-auto px-10 max-[720px]:px-5.5">
        {/* ── Main grid ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-[280px_1fr_1fr_1fr] gap-10 lg:gap-16 py-16">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-block mb-5 rounded-sm"
              aria-label="Moxie Beauty Studio — Home"
            >
              <Logo placement="footer" />
            </Link>

            <p className="text-sm text-(--ink-soft) leading-relaxed max-w-70 mb-8">
              A lash &amp; brow studio in Rochester, Wisconsin. By appointment
              only.
            </p>

            {/* Theme toggle */}
            <FooterThemeIsland />
          </div>

          {/* Link columns */}
          <FooterCol heading="Services" links={serviceLinks} />
          <FooterCol heading="Studio" links={studioLinks} />
          <FooterCol heading="Stay close" links={stayCloseLinks} />
        </div>

        {/* ── Footer foot ─────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-6 border-t border-(--line-soft)">
          <p className="text-[11px] text-(--ink-mute)">
            &copy; {year}&nbsp;Moxie Beauty Studio &nbsp;&middot;&nbsp;
            {siteConfig.address.short} &nbsp;&middot;&nbsp;
            {siteConfig.url.replace("https://", "")}
          </p>
          <p className="text-[11px] text-(--ink-mute)">
            Booking handled by Square &nbsp;&middot;&nbsp; Crafted with care by{" "}
            <a
              href="https://travishall.design"
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--ink-mute) hover:text-(--accent) transition-colors duration-200 rounded-full"
            >
              travishall.design
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
