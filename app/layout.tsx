import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Mulish } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "../providers/theme-provider";
import { BookingProvider } from "@/context/BookingContext";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Blob from "@/components/blob";
import { siteConfig } from "@/lib/site-config";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

const nyghtLight = localFont({
  src: [
    {
      path: "../public/fonts/NyghtSerif-Light.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-nyght-light",
  display: "swap",
});

const nyghtLightItalic = localFont({
  src: [
    {
      path: "../public/fonts/NyghtSerif-LightItalic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-nyght-light-italic",
  display: "swap",
});

const nyghtDark = localFont({
  src: [
    {
      path: "../public/fonts/NyghtSerif-Dark.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-nyght-dark",
  display: "swap",
});

const nyghtDarkItalic = localFont({
  src: [
    {
      path: "../public/fonts/NyghtSerif-DarkItalic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-nyght-dark-italic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://moxiebeautystudiowi.com"),
  title: "Moxie Beauty Studio | Lash & Brow Specialists in Wisconsin",
  description:
    "Moxie Beauty Studio specializes in bespoke lash and brow transformations in Wisconsin. Services include eyelash extensions, lash lift & tint, microblading, brow lamination, and facial waxing.",
  keywords: [
    "lash extensions",
    "microblading",
    "brow lamination",
    "lash lift and tint",
    "facial waxing",
    "beauty studio Wisconsin",
    "eyelash extensions Wisconsin",
    "brow services",
  ],
  authors: [{ name: "Moxie Beauty Studio" }],
  creator: "Moxie Beauty Studio",
  publisher: "Moxie Beauty Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://moxiebeautystudiowi.com",
    siteName: "Moxie Beauty Studio",
    title: "Moxie Beauty Studio | Lash & Brow Specialists in Wisconsin",
    description:
      "Where artistry meets individuality. Specializing in bespoke lash and brow transformations with services including eyelash extensions, lash lift & tint, microblading, brow lamination, and facial waxing.",
    images: [
      {
        url: "/images/hero-img.jpg",
        width: 1200,
        height: 630,
        alt: "Moxie Beauty Studio - Professional Lash and Brow Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moxie Beauty Studio | Lash & Brow Specialists",
    description:
      "Bespoke lash and brow transformations. Eyelash extensions, microblading, lash lift & tint, and more.",
    images: ["/images/hero-img.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when ready:
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch {}
            `,
          }}
        />
        {/* Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BeautySalon",
              name: siteConfig.name,
              image: `${siteConfig.url}/images/hero-img.jpg`,
              "@id": siteConfig.url,
              url: siteConfig.url,
              telephone: siteConfig.contact.phone,
              email: siteConfig.contact.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: siteConfig.address.street,
                addressLocality: siteConfig.address.city,
                addressRegion: siteConfig.address.state,
                postalCode: siteConfig.address.zip,
                addressCountry: siteConfig.address.country,
              },
              priceRange: "$$",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  opens: "10:00",
                  closes: "19:00",
                },
              ],
              sameAs: [
                siteConfig.social.instagram.href,
                siteConfig.social.facebook.href,
                siteConfig.social.tiktok.href,
              ],
              hasOfferingCatalog: {
                "@type": "OfferingCatalog",
                name: "Beauty Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Eyelash Extensions",
                      description:
                        "Hand-applied lash extensions for customizable length, curl, and volume",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Lash Lift & Tint",
                      description:
                        "Natural lash curl and tint for a low-maintenance look",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Microblading",
                      description:
                        "Semi-permanent brow enhancement with natural hair-like strokes",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Brow Lamination & Tint",
                      description:
                        "Fluffy, brushed-up brows with tint for definition",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Eyebrow & Facial Waxing",
                      description:
                        "Precise waxing for smooth skin and shaped brows",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body
        className={`${mulish.variable} ${nyghtLight.variable} ${nyghtLightItalic.variable} ${nyghtDark.variable} ${nyghtDarkItalic.variable} antialiased relative`}
        id="top"
      >
        {/* Skip-to-content — first focusable element on every page (WCAG 2.4.1) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-99999 focus:px-5 focus:py-2.5 focus:rounded-full focus:bg-(--background) focus:text-(--foreground) focus:border focus:border-(--accent) focus:text-sm focus:font-medium focus:shadow-md focus:outline-2 focus:outline-(--accent)"
        >
          Skip to content
        </a>

        <Blob />
        <div className="site-container">
          <ThemeProvider>
            <BookingProvider>
              <Navigation />
              {/* Skip-link target — tabIndex={-1} allows programmatic focus */}
              <div id="main-content" tabIndex={-1} className="outline-none">
                {children}
              </div>
              <Analytics />
              <Footer />
            </BookingProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
