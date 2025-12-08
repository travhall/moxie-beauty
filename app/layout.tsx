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
  title: "Moxie Beauty Studio",
  description: "Moxie is …",
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
      </head>
      <body
        className={`${mulish.variable} ${nyghtLight.variable} ${nyghtLightItalic.variable} ${nyghtDark.variable} ${nyghtDarkItalic.variable} antialiased relative`}
        id="top"
      >
        <ThemeProvider>
          <Navigation />
          {children}
          <Analytics />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
