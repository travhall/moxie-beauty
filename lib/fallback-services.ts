export interface FallbackService {
  id: string;
  category: "brow" | "lash" | "extras";
  name: string;
  desc: string;
  /** Overrides `desc` for the homepage teaser only, when the teaser's copy
   * intentionally differs from the full services page. */
  teaserDesc?: string;
  /** Meta pills as rendered on the full services page (ServiceCardClient). */
  cardMeta: string[];
  /** Meta pills as rendered on the homepage teaser (ServiceRowsClient).
   * `null` for services the teaser doesn't display. */
  teaserMeta: { label: string; value: string }[] | null;
}

export const FALLBACK_SERVICES: FallbackService[] = [
  {
    id: "brow-lamination-shape",
    category: "brow",
    name: "Brow Lamination & Shape",
    desc: "Beautifully lifted, fuller-looking brows designed to enhance your natural shape with an effortlessly polished finish.",
    cardMeta: ["From $95", "75 min", "Lasts 6–8 wks"],
    teaserMeta: [
      { label: "From", value: "$95" },
      { label: "Duration", value: "75 min" },
      { label: "Lasts", value: "6–8 wks" },
    ],
  },
  {
    id: "brow-tint-sculpt",
    category: "brow",
    name: "Brow Tint & Sculpt",
    desc: "A short, all-purpose visit. Soft tint matched to your hair, plus a sculpt — the easiest way to wake up looking finished.",
    cardMeta: ["From $75", "45 min", "Lasts 3–4 wks"],
    teaserMeta: null,
  },
  {
    id: "microblading",
    category: "brow",
    name: "Microblading",
    desc: "Semi-permanent, hair-stroke brows crafted to match your natural coloring and bone structure. Begins with a required consultation to discuss your goals and determine if the service is right for you.",
    teaserDesc: "Semi-permanent, hair-stroke brows matched to your natural coloring and bone structure. Starts with a required consultation.",
    cardMeta: ["Consultation required", "Lasts 12–18 mo", "Touch-up at 6–8 wks"],
    teaserMeta: [
      { label: "Consult", value: "Required" },
      { label: "Lasts", value: "12–18 mo" },
      { label: "Touch-up", value: "6–8 wks" },
    ],
  },
  {
    id: "signature-lash-set",
    category: "lash",
    name: "Signature Lash Set",
    desc: "Fully customized extensions hand-applied to your natural lashes — length, curl, and finish tailored to your eye shape and lifestyle. The look of great lashes, made to feel like yours.",
    cardMeta: ["From $145", "120 min", "Fills from $70"],
    teaserMeta: [
      { label: "From", value: "$145" },
      { label: "Duration", value: "120 min" },
      { label: "Fills", value: "from $70" },
    ],
  },
  {
    id: "volume-lash-set",
    category: "lash",
    name: "Volume Lash Set",
    desc: "Hand-crafted fans of ultra-fine extensions for soft, even density with more dimension. Choose your level of drama — from a quiet lift to a deliberate full set.",
    cardMeta: ["From $195", "150 min", "Fills from $95"],
    teaserMeta: [
      { label: "From", value: "$195" },
      { label: "Duration", value: "150 min" },
      { label: "Fills", value: "from $95" },
    ],
  },
  {
    id: "lash-lift-tint",
    category: "lash",
    name: "Lash Lift & Tint",
    desc: "A low-maintenance treatment that lifts, curls, and darkens your natural lashes for an effortlessly enhanced look.",
    teaserDesc: "A subtle curl from root to tip that makes your own lashes look longer and darker. Low maintenance, high impact.",
    cardMeta: ["From $110", "60 min", "Lasts 6–8 wks"],
    teaserMeta: [
      { label: "From", value: "$110" },
      { label: "Duration", value: "60 min" },
      { label: "Lasts", value: "6–8 wks" },
    ],
  },
  {
    id: "first-visit-consult",
    category: "extras",
    name: "First-Visit Consult",
    desc: "New here? Start with a 30-minute consultation. We'll plan a service together and book the right appointment for you.",
    cardMeta: ["Complimentary", "30 min", "In studio"],
    teaserMeta: [
      { label: "Price", value: "Complimentary" },
      { label: "Duration", value: "30 min" },
      { label: "Where", value: "In studio" },
    ],
  },
  {
    id: "lash-removal",
    category: "extras",
    name: "Lash Removal",
    desc: "Safe, gentle removal of extensions applied anywhere. No tugging, no damage to your natural lashes.",
    cardMeta: ["From $35", "30 min", "Walk-out clean"],
    teaserMeta: null,
  },
  {
    id: "lash-tint",
    category: "extras",
    name: "Lash Tint",
    desc: "A small visit, big difference — semi-permanent color that darkens the full length of your natural lashes for 4–6 weeks.",
    cardMeta: ["From $45", "30 min", "Lasts 4–6 wks"],
    teaserMeta: null,
  },
  {
    id: "moxie-gift-card",
    category: "extras",
    name: "Moxie Gift Card",
    desc: "A quietly thoughtful gift, in any amount. Delivered as a small card by mail, or by email the same day.",
    cardMeta: ["$50+", "No expiry", "Mail or email"],
    teaserMeta: null,
  },
];
