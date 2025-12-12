"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Logo from "./logo";
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

        <div className="mt-12">
          <Button size="lg">Make an Appointment</Button>
        </div>
      </>
    ),
  },
];

export default function Appointments() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(-1);
  const [prevSectionIndex, setPrevSectionIndex] = useState(-1);
  const [isSlideInComplete, setIsSlideInComplete] = useState(false);
  const [showPrevPanel, setShowPrevPanel] = useState(false);
  const scrollWrapperRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fadeOutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const wrapper = scrollWrapperRef.current;
    if (!wrapper) return;

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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full md:pt-24 relative z-10"
      id="Appointments"
      tabIndex={-1}
      aria-label="Appointments section"
    >
      <div className="container flex flex-col md:flex-row lg:gap-8 items-start mx-auto p-8 mb-10 lg:sticky lg:top-24 min-h-screen z-0">
        <Image
          src={apptImage}
          alt="Moxie's waiting room."
          className="w-full lg:max-w-1/2 max-h-[60vh] rounded-tl rounded-tr-[4rem] rounded-br rounded-bl-[4rem] border border-l-8 border-t-8 border-(--accent) object-cover mt-8 lg:mt-0"
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
            a complimentary consultation where we&rsquo;ll discuss your desired
            shape, ideal pigment, and what to expect during the healing process.
          </p>
          <div className="flex flex-col lg:flex-row items-start gap-4">
            <Button size="lg">Make an Appointment</Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const wrapper = scrollWrapperRef.current;
                const mobileStack = document.querySelector(
                  ".appointments-mobile-stack"
                );
                const target = wrapper || mobileStack;

                if (target) {
                  // For desktop: scroll to where rect.top will be at or just above 0
                  // We need to account for the sticky intro section
                  const rect = target.getBoundingClientRect();
                  const currentScrollY = window.scrollY;

                  // Calculate the exact position where rect.top will be 0
                  // rect.top is the distance from viewport top, so we need to scroll
                  // by that amount to bring it to the top
                  // Add a small buffer to ensure we trigger the first panel
                  const buffer = 10; // 10px buffer to ensure rect.top becomes negative
                  const targetScrollY = currentScrollY + rect.top + buffer;

                  console.log("Plan button clicked:", {
                    currentScrollY,
                    rectTop: rect.top,
                    buffer,
                    targetScrollY,
                    scrollAmount: rect.top + buffer,
                  });

                  window.scrollTo({
                    top: targetScrollY,
                    behavior: "smooth",
                  });
                }
              }}
            >
              Plan Your Visit
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile: Simple stacked content sections */}
      <div className="lg:hidden appointments-mobile-stack w-full">
        {appointmentSections.map((section, index) => (
          <div
            key={section.id}
            className="appointment-mobile-panel p-4 m-4 bg-(--background) border-b border-(--foreground)/10 last-of-type:border-b-0 relative z-100"
          >
            <div className="max-w-xl mx-auto py-10">
              <h3 className="text-xl lg:text-2xl font-nyght mb-5 lg:mb-6">
                {section.title}
              </h3>
              <div className="prose max-w-none">{section.content}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Animated scroll-driven panels */}
      <div
        ref={scrollWrapperRef}
        className="hidden lg:block appointments-scroll-wrapper sticky top-0 border-t border-(--accent)/50"
        style={{ height: `${appointmentSections.length * 100}vh` }}
      >
        <div className="sticky-scroll-container grid place-content-center min-h-dvh sticky top-0 overflow-hidden snap-start snap-always w-full backdrop-blur-lg bg-(--background)/75 z-50">
          <Logo placement="footer" className="" />

          {showPrevPanel &&
            prevSectionIndex >= 0 &&
            prevSectionIndex !== activeSectionIndex && (
              <div
                className={`sticky-panel w-1/2 absolute top-0 z-10 sticky-panel-${appointmentSections[prevSectionIndex].position} slide-in fade-out`}
                style={{ zIndex: 1 }}
              >
                <div className="sticky-panel-content min-h-dvh flex justify-center items-center bg-(--background)/90 backdrop-blur-lg">
                  <div className="max-w-xl p-8 lg:p-12">
                    <h3 className="text-xl lg:text-2xl font-nyght mb-5 lg:mb-6">
                      {appointmentSections[prevSectionIndex].title}
                    </h3>
                    <div className="prose max-w-none">
                      {appointmentSections[prevSectionIndex].content}
                    </div>
                  </div>
                </div>
              </div>
            )}
          {activeSectionIndex >= 0 && (
            <div
              className={`sticky-panel w-1/2 absolute top-0 z-10 sticky-panel-${
                appointmentSections[activeSectionIndex].position
              } ${isSlideInComplete ? "slide-in" : ""}`}
              style={{ zIndex: 2 }}
            >
              <div className="sticky-panel-content min-h-dvh flex justify-center items-center bg-(--background)/90 backdrop-blur-lg">
                <div className="max-w-xl p-8 lg:p-12">
                  <h3 className="text-xl lg:text-2xl font-nyght mb-5 lg:mb-6">
                    {appointmentSections[activeSectionIndex].title}
                  </h3>
                  <div className="prose max-w-none">
                    {appointmentSections[activeSectionIndex].content}
                  </div>
                  {activeSectionIndex < appointmentSections.length - 1 && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        const wrapper = scrollWrapperRef.current;
                        if (!wrapper) return;

                        // Calculate the target panel's position
                        // Each panel represents 1/4 of the wrapper height
                        const nextPanelIndex = activeSectionIndex + 1;
                        const wrapperHeight = wrapper.offsetHeight;
                        const wrapperTop =
                          wrapper.getBoundingClientRect().top + window.scrollY;

                        // Progress needed for next panel: (nextPanelIndex / totalPanels)
                        // Add a small buffer (2%) to ensure we're solidly within the target panel
                        const progressNeeded =
                          nextPanelIndex / appointmentSections.length;
                        const bufferProgress = 0.02; // 2% buffer to avoid threshold issues
                        const scrollNeeded =
                          (progressNeeded + bufferProgress) * wrapperHeight;

                        // Target scroll position is wrapper top + scroll needed
                        const targetScrollY = wrapperTop + scrollNeeded;

                        console.log("Next button clicked:", {
                          currentPanel: activeSectionIndex,
                          nextPanel: nextPanelIndex,
                          wrapperTop,
                          wrapperHeight,
                          progressNeeded,
                          scrollNeeded,
                          targetScrollY,
                          currentScrollY: window.scrollY,
                        });

                        window.scrollTo({
                          top: targetScrollY,
                          behavior: "smooth",
                        });
                      }}
                      className="inline-flex self-start items-center gap-2 mt-6 group"
                    >
                      Next{" "}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
