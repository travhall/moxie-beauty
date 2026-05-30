/**
 * Centralized business information for Moxie Beauty Studio.
 *
 * This is the single source of truth for contact details, social links, and
 * studio meta used across the site (structured data, footer, nav drawer, etc.).
 * Wire up to Square / a CMS later — swap values here and everything updates.
 */

export const siteConfig = {
  name: "Moxie Beauty Studio",
  tagline: "Brow & Lash Studio · Rochester, WI",
  url: "https://moxiebeautystudiowi.com",

  contact: {
    phone: "(262) 332-6072",
    phoneHref: "tel:+12623326072",
    smsHref: "sms:+12623326072",
    email: "hello@moxiebeautystudiowi.com",
    emailHref: "mailto:hello@moxiebeautystudiowi.com",
  },

  address: {
    street: "402 S Front St",
    city: "Rochester",
    state: "WI",
    zip: "53167",
    country: "US",
    /** Single-line display string */
    display: "402 S Front St, Rochester WI 53167",
    /** Short form used in tight spaces (mobile drawer, etc.) */
    short: "402 S Front Street, Rochester WI",
    mapsHref: "https://maps.google.com/?q=402+S+Front+St+Rochester+WI+53167",
  },

  /**
   * Provisional hours — update when confirmed with Jackie.
   * The schedule array drives the Visit page layout; add/remove rows as needed.
   */
  hours: {
    /** Human-readable summary for nav drawer and hero meta */
    display: "By Appointment Only",
    note: "Tue – Sat",
    schedule: [
      { day: "Monday", hours: null }, // closed
      { day: "Tuesday", hours: "10 AM – 7 PM" },
      { day: "Wednesday", hours: "10 AM – 7 PM" },
      { day: "Thursday", hours: "10 AM – 7 PM" },
      { day: "Friday", hours: "10 AM – 7 PM" },
      { day: "Saturday", hours: "10 AM – 7 PM" },
      { day: "Sunday", hours: null }, // closed
    ],
  },

  social: {
    instagram: {
      href: "https://www.instagram.com/moxiebeautywi/",
      handle: "@moxiebeautywi",
    },
    facebook: {
      href: "https://www.facebook.com/moxiebeautystudiowi/",
      handle: "moxiebeautystudiowi",
    },
    tiktok: {
      href: "https://www.tiktok.com/@moxiebeautystudio_wi",
      handle: "@moxiebeautystudio_wi",
    },
  },

  /** Square booking URL — used everywhere a booking link is needed */
  bookingUrl:
    "https://book.squareup.com/appointments/anzl660330wful/location/LHZ09SDE51Z6W/services",
} as const;

export type SiteConfig = typeof siteConfig;
