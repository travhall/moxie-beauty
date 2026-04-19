import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Mulish } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "../providers/theme-provider";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

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
});

const nyghtLightItalic = localFont({
  src: [
    {
      path: "../public/fonts/NyghtSerif-LightItalic.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-nyght-light-italic",
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
});

const nyghtDarkItalic = localFont({
  src: [
    {
      path: "../public/fonts/NyghtSerif-DarkItalic.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-nyght-dark-italic",
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
              name: "Moxie Beauty Studio",
              image: "https://moxiebeautystudiowi.com/images/hero-img.jpg",
              "@id": "https://moxiebeautystudiowi.com",
              url: "https://moxiebeautystudiowi.com",
              telephone: "(262) 332-6072",
              email: "hello@moxiebeautystudiowi.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Wisconsin",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                // Add your actual coordinates when ready
                // latitude: 0.0,
                // longitude: 0.0,
              },
              priceRange: "$$",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:00",
                  closes: "17:00",
                },
              ],
              sameAs: [
                // Add your social media URLs here when ready
                // "https://www.facebook.com/moxiebeautystudio",
                // "https://www.instagram.com/moxiebeautystudio",
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
                      description: "Precise waxing for smooth skin and shaped brows",
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
        <div className="site-container">
          <ThemeProvider>
            <Navigation />
            {children}
            <Analytics />
            <Footer />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
