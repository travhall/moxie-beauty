import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  // eval() is required by Next.js/Turbopack in dev mode (HMR, stack-trace
  // reconstruction) but never used in production builds — only relax
  // script-src for it locally. Vercel Analytics' debug script is likewise
  // dev-only: in production it's served same-origin via the /_vercel/
  // insights/ rewrite, but in dev it loads directly from
  // va.vercel-scripts.com.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""} https://maps.googleapis.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://maps.gstatic.com https://maps.googleapis.com https://*.googleusercontent.com",
  "font-src 'self' data:",
  `connect-src 'self' https://maps.googleapis.com${isDev ? " https://va.vercel-scripts.com" : ""}`,
  "frame-src https://book.squareup.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
