import { Link } from "next-view-transitions";
import { siteConfig } from "@/lib/site-config";

interface BreadcrumbsProps {
  /** Current page label, e.g. "Our Story". Home is added automatically. */
  page: string;
  /** Current page path, e.g. "/about". Used for the structured-data URL. */
  href: string;
  className?: string;
}

export default function Breadcrumbs({
  page,
  href,
  className = "mb-10",
}: BreadcrumbsProps) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page,
        item: `${siteConfig.url}${href}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-(--ink-mute)">
          <li>
            <Link
              href="/"
              className="hover:text-(--accent) transition-colors"
            >
              Moxie
            </Link>
          </li>
          <li aria-hidden="true">
            <span className="inline-block w-1.25 h-1.25 rounded-full bg-(--accent) mx-1" />
          </li>
          <li>
            <span aria-current="page">{page}</span>
          </li>
        </ol>
      </nav>
    </>
  );
}
