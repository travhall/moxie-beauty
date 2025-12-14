// components/services.tsx
import React, { useState } from "react";
import ServiceCard from "./service-card";
import ServiceOverlay from "./service-overlay";
import Button from "./button";

interface ServiceData {
  title: string;
  preview: string;
  fullDescription: string;
  readMoreLabel?: string;
}

const servicesData: ServiceData[] = [
  {
    title: "Eyelash Extensions",
    preview:
      'Wake up every morning with lush, camera-ready lashes. Our extensions are hand-applied to blend seamlessly with your natural lashes, offering customizable length, curl, and volume—from "did-she-or-didn\'t-she" subtlety to full glam.',
    fullDescription:
      "Imagine skipping mascara forever. At Moxie, we use premium lightweight fibers to create a personalized lash look that enhances your eye shape and lifestyle. A Full Set (2 hours) builds your dream lashes from scratch, while Lash Fills (30-75 min, depending on timing) keep them flawless. Pro Tip: Arrive with clean lashes (no mascara!) and avoid caffeine if it makes you twitchy—this helps you relax during the process. Results last longest when kept dry for 24 hours and away from saunas or hot yoga for 48 hours.",
    readMoreLabel: "Learn more",
  },
  {
    title: "Lash Lift & Tint",
    preview:
      "No extensions? No problem. This treatment gives your natural lashes a salon-permanent curl and tint, so they look longer, darker, and perfectly lifted—like you've just stepped out of a mascara ad.",
    fullDescription:
      "The Lash Lift + Tint is the ultimate low-maintenance luxury. We gently lift your lashes from the root (no harsh extensions!) and tint them for a wide-eyed effect that lasts 6-8 weeks. Fun fact: The lift is customized to your lash length—shorter lashes get a gentler curve, while longer lashes can handle dramatic swoops. Heads up: Avoid steam/sweat for 48 hours to lock in the curl, but after that? Mascara is optional (though you might not need it).",
    // No readMoreLabel specified - will use default "Read more"
  },
  {
    title: "Microblading",
    preview:
      "Semi-permanent brows so natural, even your closest friends will do a double-take. Hair-like strokes fill sparse areas, with pigment matched to your unique coloring.",
    fullDescription:
      "Tired of pencils and powders? Microblading is a hand-crafted technique that deposits pigment under the skin to mimic real brow hairs. At Moxie, we start with a free consultation to design your ideal shape (based on your bone structure!) and select the perfect pigment. Important: Healing takes 2 weeks (expect some flaking!), and a 6-week touch-up ensures your brows stay sharp for 1+ years. Pro move: Schedule this when you can avoid heavy sweating/swimming during healing.",
    readMoreLabel: "Book consultation",
  },
  {
    title: "Brow Lamination & Tint",
    preview:
      'The "glass skin" of brows—fluffy, brushed-up, and tinted for Insta-worthy definition. Perfect for unruly or sparse brows craving polish.',
    fullDescription:
      "This viral treatment uses a keratin solution to relax and redirect brow hairs upward, creating the illusion of fullness and symmetry. Paired with a tint, it's a game-changer for thin or uneven brows. Love your current brow makeup? Wear it to your appointment so we can replicate your fave shape. Aftercare is easy: Just avoid water/retinol for 24-48 hours, then enjoy 6+ weeks of effortless grooming.",
    readMoreLabel: "Discover more",
  },
  {
    title: "Eyebrow & Facial Waxing",
    preview:
      "Precise, smooth, and fast. Our waxing removes unwanted hair with minimal discomfort, leaving skin silky and brows flawlessly shaped.",
    fullDescription:
      "Whether you're prepping for a special event or just craving clean lines, our waxing services use high-quality formulas to reduce irritation. Note: Avoid retinol/sun exposure 3 days prior (we can't wax sensitive skin!), and skip if you've used Accutane in the last 6 months. Bonus: Regular waxing can lead to finer regrowth over time.",
    // No readMoreLabel specified - will use default "Read more"
  },
];

interface ServicesProps {
  onBookingClick: () => void;
}

const Services: React.FC<ServicesProps> = ({ onBookingClick }) => {
  const [activeService, setActiveService] = useState<number | null>(null);

  const openOverlay = (index: number) => {
    setActiveService(index);
  };

  const closeOverlay = () => {
    setActiveService(null);
  };

  return (
    <section
      className="min-h-screen w-full grid place-items-center p-4 md:py-24 mb-48"
      id="Services"
      tabIndex={-1}
      aria-label="Services section"
    >
      <div className="max-w-295 w-full mx-auto xl:mx-48">
        <div className="grid grid-cols-1 gap-6 services-grid">
          {/* Content Block */}
          <div className="services-content p-4  lg:place-self-end lg:pl-8 lg:pb-0">
            <h2 className="font-nyght bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent text-6xl xl:text-7xl my-8 pb-2 text-balance">
              The Magic of Moxie
            </h2>
            <p className="text-xl mb-4 text-balance">
              Discover Moxie&rsquo;s premium beauty treatments and services,
              meticulously crafted to enhance your natural allure.
            </p>
            <p className="text-base mb-10 text-pretty max-w-[72ch]">
              From special occasions to everyday self-care, Moxie is here to
              help you look and feel your best. Our expert team provides
              personalized services, including lashes, brows, microblading, and
              waxing, to ensure flawless, long-lasting results. With a perfect
              balance of artistry and precision, we&rsquo;re dedicated to making
              every visit unforgettable.
            </p>
            <div className="flex flex-row flex-wrap gap-4 mb-4">
              <Button
                size="lg"
                onClick={onBookingClick}
                className="w-full md:w-auto"
              >
                Make an Appointment
              </Button>
              {/* <Button
                size="lg"
                variant="outline"
                onClick={onBookingClick}
                className="w-full md:w-auto"
              >
                Schedule a Consultation
              </Button> */}
            </div>
          </div>

          {/* Service Cards */}
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              preview={service.preview}
              onOpenOverlay={() => openOverlay(index)}
              readMoreLabel={service.readMoreLabel}
              cardIndex={index}
            />
          ))}
        </div>

        {/* Service Overlay */}
        {activeService !== null && (
          <ServiceOverlay
            title={servicesData[activeService].title}
            fullDescription={servicesData[activeService].fullDescription}
            isOpen={activeService !== null}
            onClose={closeOverlay}
            onBookingClick={onBookingClick}
          />
        )}
      </div>
    </section>
  );
};

export default Services;
