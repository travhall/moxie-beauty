"use client";

import { ArrowRight } from "lucide-react";

const appointmentSections = [
  {
    id: "section-planning",
    title: "Planning Your Visit",
    position: "left",
    content: (
      <>
        <p className="mb-4">
          Discover the perfect service for your beauty goals by exploring our
          menu of lash and brow enhancements. If you&rsquo;re considering
          microblading, we recommend starting with a{" "}
          <span className="text-rose-gold font-semibold">
            complimentary consultation
          </span>{" "}
          where we&rsquo;ll discuss your desired shape, ideal pigment, and what
          to expect during the healing process.
        </p>
        <p className="mb-4">
          For a seamless experience, we invite new clients to complete our{" "}
          <span className="text-rose-gold font-semibold">New Client Form</span>{" "}
          before your appointment. We also encourage you to review our{" "}
          <span className="text-rose-gold font-semibold">
            Booking Guidelines
          </span>{" "}
          regarding cancellations and scheduling to ensure your visit is as
          smooth as possible.
        </p>
      </>
    ),
  },
  {
    id: "section-preparing",
    title: "Preparing for Your Appointment",
    position: "right",
    content: (
      <>
        <p className="mb-4">
          To make the most of your Moxie experience, we recommend:
        </p>
        <ul className="list-disc ml-6 mb-4 space-y-2">
          <li>Arriving 5-10 minutes early (15 minutes for new clients)</li>
          <li>
            Coming with clean, makeup-free treatment areas for optimal results
          </li>
          <li>Dressing comfortably, as some services take up to 2 hours</li>
          <li>
            Making childcare arrangements, as we maintain a relaxing adult
            environment
          </li>
          <li>Limiting caffeine before lash appointments to help you relax</li>
          <li>
            Avoiding retinol products for 3 days before any brow or waxing
            services
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "section-guidelines",
    title: "Service Guidelines",
    position: "left",
    content: (
      <>
        <h4 className="font-semibold text-lg mb-2">Lash Extensions</h4>
        <p className="mb-4">
          Full sets require completely clean lashes and approximately 2 hours.
          For fills, timing depends on your maintenance schedule: 1-week fills
          (30 min), 2-week fills (60 min), or 3-week fills (75 min).
        </p>

        <h4 className="font-semibold text-lg mb-2">Lash Lift & Tint</h4>
        <p className="mb-4">
          Come with clean lashes and plan for a 90-minute appointment that will
          leave your natural lashes beautifully curled and tinted.
        </p>

        <h4 className="font-semibold text-lg mb-2">Microblading</h4>
        <p className="mb-4">
          Begin with a consultation where we&rsquo;ll map your perfect brow
          shape and select a complementary pigment for your skin tone before
          scheduling your full service.
        </p>
      </>
    ),
  },
  {
    id: "section-aftercare",
    title: "Aftercare Essentials",
    position: "right",
    content: (
      <>
        <h4 className="font-semibold text-lg mb-2">For Lash Services</h4>
        <ul className="list-disc ml-6 mb-4 space-y-2">
          <li>Keep lashes completely dry for the first 24 hours</li>
          <li>Avoid tanning beds, saunas, and hot yoga for 48 hours</li>
          <li>Sleep on your back when possible to maintain lash integrity</li>
          <li>
            Schedule regular fills every 2-3 weeks for continuous fullness
          </li>
        </ul>

        <h4 className="font-semibold text-lg mb-2">For Microblading</h4>
        <ul className="list-disc ml-6 mb-4 space-y-2">
          <li>
            Avoid sweating, swimming, and direct water contact for 10 days
          </li>
          <li>Expect some flaking as part of the normal healing process</li>
          <li>Complete your required 6-week touch-up for perfected results</li>
        </ul>
      </>
    ),
  },
];

export default function Appointments() {
  return (
    <section
      className="min-h-screen w-full p-4 md:pt-24 relative"
      id="Appointments"
    >
      <div className="container mx-auto px-4 mb-12 sticky top-28">
        <h2 className="font-nyght bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent text-center text-4xl sm:text-5xl md:text-6xl my-8 pb-2 text-balance">
          Your Moxie Beauty Journey
        </h2>
      </div>

      <div
        className="relative"
        style={{ height: `${appointmentSections.length * 100}vh` }}
      >
        {appointmentSections.map((section, index) => (
          <div
            key={section.id}
            id={section.id}
            className="sticky top-0 h-auto lg:h-screen w-full flex flex-col lg:flex-row items-start lg:items-center"
            style={{ zIndex: index + 1 }}
          >
            {/* Content Panel */}
            <div
              className={`w-full lg:w-1/2 bg-(--background)/5 backdrop-blur-lg py-8 px-4 lg:p-0 lg:h-full ${
                section.position === "left"
                  ? "lg:justify-end order-1"
                  : "lg:ml-auto lg:justify-start order-1 lg:order-1"
              } ${index > 0 ? "mt-8 lg:mt-0" : ""}`}
            >
              <div className="lg:max-w-xl lg:p-12 flex flex-col justify-center">
                <h3 className="text-xl lg:text-2xl font-nyght mb-5 lg:mb-6">
                  {section.title}
                </h3>
                <div className="prose max-w-none">{section.content}</div>

                {index < appointmentSections.length - 1 && (
                  <button
                    onClick={() => {
                      const nextSection = appointmentSections[index + 1].id;
                      document.getElementById(nextSection)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                    className="inline-flex items-center gap-2 text-rose-gold mt-6 group"
                  >
                    Next{" "}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          div[style*="height:"] {
            height: auto !important;
          }

          div[style*="zIndex:"] {
            position: relative !important;
            top: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
