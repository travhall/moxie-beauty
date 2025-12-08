"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import apptImage from "@/public/images/moxie-lobby.jpg";
import Button from "./button";
import { useEffect, useRef, useState } from "react";

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
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const scrollWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapper = scrollWrapperRef.current;
    if (!wrapper) return;

    const handleScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // How far the top of the wrapper has moved into the viewport
      const offset = -rect.top;
      const totalScrollable = wrapper.offsetHeight - viewportHeight;

      if (totalScrollable <= 0) {
        setActiveSectionIndex(0);
        return;
      }

      const rawProgress = offset / totalScrollable;
      const clamped = Math.min(Math.max(rawProgress, 0), 0.999);
      const index = Math.floor(clamped * appointmentSections.length);
      setActiveSectionIndex(index);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentSection =
    appointmentSections[activeSectionIndex] ?? appointmentSections[0];

  return (
    <section
      className="min-h-screen w-full max-w-7xl mx-auto p-4 md:pt-24 relative z-10"
      id="Appointments"
      tabIndex={-1}
      aria-label="Appointments section"
    >
      <div className="container flex flex-col md:flex-row gap-8 items-start mx-auto px-4 mb-10 sticky top-32 min-h-screen">
        <Image
          src={apptImage}
          alt="Moxie's waiting room."
          className="w-full lg:max-w-1/2 max-h-[60vh] rounded-tl rounded-tr-[4rem] rounded-br rounded-bl-[4rem] border border-l-8 border-t-8 border-(--accent) object-cover z-0"
        />
        <div className="content relative max-w-2xl text-balance">
          <h2 className="font-nyght bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl my-8 pb-2 text-balance">
            Your Moxie Beauty Journey
          </h2>
          <p className="text-xl mb-4">
            Discover the perfect service for your beauty goals by exploring our
            menu of lash and brow enhancements.
          </p>
          <p className="text-base mb-10">
            If you&rsquo;re considering microblading, we recommend starting with
            a <a href="">complimentary consultation</a> where we&rsquo;ll
            discuss your desired shape, ideal pigment, and what to expect during
            the healing process.
          </p>
          <div className="flex gap-4">
            <Button size="lg">Make an Appointment</Button>
            <Button size="lg" variant="outline">
              Plan Your Visit
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll height wrapper drives how long the pinned panel stays */}
      <div
        ref={scrollWrapperRef}
        style={{ height: `${appointmentSections.length * 100}vh` }}
      >
        {/* Single pinned visual panel that changes with active section */}
        <div className="sticky-scroll-container relative backdrop-blur-lg bg-(--background)/75 z-50">
          <div
            className={`sticky-panel sticky-panel-${currentSection.position} slide-in`}
          >
            <div className="sticky-panel-content">
              <div className="max-w-xl p-8 lg:p-12">
                <h3 className="text-xl lg:text-2xl font-nyght mb-5 lg:mb-6">
                  {currentSection.title}
                </h3>
                <div className="prose max-w-none">{currentSection.content}</div>

                {activeSectionIndex < appointmentSections.length - 1 && (
                  <button
                    onClick={() => {
                      const nextSection =
                        appointmentSections[activeSectionIndex + 1].id;
                      document.getElementById(nextSection)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                    className="inline-flex self-start items-center gap-2 text-(--accent) mt-6 group before:absolute before:-bottom-0.5 before:left-0 before:w-full before:h-0.5 before:bg-(--accent) before:transform before:scale-x-0 before:origin-right before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100 hover:before:origin-left relative"
                  >
                    Next{" "}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
