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
  const [activeSectionIndex, setActiveSectionIndex] = useState(-1);
  const [prevSectionIndex, setPrevSectionIndex] = useState(-1);
  const [isSlideInComplete, setIsSlideInComplete] = useState(false);
  const [showPrevPanel, setShowPrevPanel] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollWrapperRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fadeOutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const wrapper = scrollWrapperRef.current;
    if (!wrapper || isMobile) return; // Skip scroll-driven animation on mobile

    const handleScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Before wrapper enters viewport
      if (rect.top > 0) {
        setActiveSectionIndex(-1);
        return;
      }

      // Calculate progress through the wrapper
      const scrolledIntoWrapper = Math.max(0, -rect.top);
      const wrapperHeight = wrapper.offsetHeight;
      const progress = Math.min(scrolledIntoWrapper / wrapperHeight, 1);

      // After wrapper leaves viewport completely
      if (progress >= 1 && rect.bottom < 0) {
        setActiveSectionIndex(-1);
        return;
      }

      const index = Math.min(
        Math.floor(progress * appointmentSections.length),
        appointmentSections.length - 1
      );

      setActiveSectionIndex((currentIndex) => {
        if (index !== currentIndex) {
          console.log(`Switching from panel ${currentIndex} to ${index}`);

          // Clear any existing timeouts
          if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
          }
          if (fadeOutTimeoutRef.current) {
            clearTimeout(fadeOutTimeoutRef.current);
          }

          // Set up the previous panel to show and fade out
          if (currentIndex >= 0) {
            setPrevSectionIndex(currentIndex);
            setShowPrevPanel(true);

            // Remove the previous panel after fade-out completes (350ms) + buffer
            fadeOutTimeoutRef.current = setTimeout(() => {
              setShowPrevPanel(false);
            }, 800);
          }

          // Reset slide-in state for new panel
          setIsSlideInComplete(false);

          // Use double RAF to ensure initial render is painted before animation starts
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              console.log(`Starting slide-in animation for panel ${index}`);
              setIsSlideInComplete(true);
            });
          });

          return index;
        }
        return currentIndex;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      if (fadeOutTimeoutRef.current) {
        clearTimeout(fadeOutTimeoutRef.current);
      }
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full max-w-7xl mx-auto p-4 md:pt-24 relative z-10"
      id="Appointments"
      tabIndex={-1}
      aria-label="Appointments section"
    >
      <div className="container flex flex-col md:flex-row gap-8 items-start mx-auto px-4 mb-10 sticky top-32 min-h-screen z-0">
        <Image
          src={apptImage}
          alt="Moxie's waiting room."
          className="w-full lg:max-w-1/2 max-h-[60vh] rounded-tl rounded-tr-[4rem] rounded-br rounded-bl-[4rem] border border-l-8 border-t-8 border-(--accent) object-cover"
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

      <div ref={scrollWrapperRef} className="appointments-scroll-wrapper" style={{ height: isMobile ? 'auto' : `${appointmentSections.length * 100}vh` }}>
        <div className="sticky-scroll-container backdrop-blur-lg bg-(--background)/75 z-50">
          {isMobile ? (
            // Mobile: Render all panels stacked
            appointmentSections.map((section, index) => (
              <div
                key={section.id}
                className={`sticky-panel sticky-panel-${section.position}`}
              >
                <div className="sticky-panel-content">
                  <div className="max-w-xl p-8 lg:p-12">
                    <h3 className="text-xl lg:text-2xl font-nyght mb-5 lg:mb-6">
                      {section.title}
                    </h3>
                    <div className="prose max-w-none">{section.content}</div>
                    {index < appointmentSections.length - 1 && (
                      <button
                        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
                        className="inline-flex self-start items-center gap-2 text-(--accent) mt-6 group"
                      >
                        Next <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Desktop: Animated scroll-driven panels
            <>
              {showPrevPanel && prevSectionIndex >= 0 && prevSectionIndex !== activeSectionIndex && (
                <div
                  className={`sticky-panel sticky-panel-${appointmentSections[prevSectionIndex].position} slide-in fade-out`}
                  style={{ zIndex: 1 }}
                >
                  <div className="sticky-panel-content">
                    <div className="max-w-xl p-8 lg:p-12">
                      <h3 className="text-xl lg:text-2xl font-nyght mb-5 lg:mb-6">
                        {appointmentSections[prevSectionIndex].title}
                      </h3>
                      <div className="prose max-w-none">{appointmentSections[prevSectionIndex].content}</div>
                    </div>
                  </div>
                </div>
              )}
              {activeSectionIndex >= 0 && (
                <div
                  className={`sticky-panel sticky-panel-${appointmentSections[activeSectionIndex].position} ${isSlideInComplete ? 'slide-in' : ''}`}
                  style={{ zIndex: 2 }}
                >
                  <div className="sticky-panel-content">
                    <div className="max-w-xl p-8 lg:p-12">
                      <h3 className="text-xl lg:text-2xl font-nyght mb-5 lg:mb-6">
                        {appointmentSections[activeSectionIndex].title}
                      </h3>
                      <div className="prose max-w-none">{appointmentSections[activeSectionIndex].content}</div>
                      {activeSectionIndex < appointmentSections.length - 1 && (
                        <button
                          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
                          className="inline-flex self-start items-center gap-2 text-(--accent) mt-6 group"
                        >
                          Next <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
