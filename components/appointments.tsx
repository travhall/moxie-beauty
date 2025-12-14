"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Logo from "./logo";
import apptImage from "@/public/images/moxie-lobby.jpg";
import Button from "./button";
import { useEffect, useRef, useState } from "react";

interface AppointmentsProps {
  onBookingClick: () => void;
}

const getAppointmentSections = (onBookingClick: () => void) => [
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

export default function Appointments({ onBookingClick }: AppointmentsProps) {
  const appointmentSections = getAppointmentSections(onBookingClick);
  const [activeSectionIndex, setActiveSectionIndex] = useState(-1);
  const [prevSectionIndex, setPrevSectionIndex] = useState(-1);
  const [isSlideInComplete, setIsSlideInComplete] = useState(false);
  const [showPrevPanel, setShowPrevPanel] = useState(false);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(
    0
  );
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

      // After wrapper leaves viewport completely
      if (rect.bottom < 0) {
        setActiveSectionIndex(-1);
        return;
      }

      // Calculate how far we've scrolled into the wrapper
      const wrapperHeight = wrapper.offsetHeight;
      const scrolledIntoWrapper = Math.max(0, -rect.top);

      // Define the usable scroll range (0 to 80% of wrapper height)
      // This ensures the last panel appears before we'd scroll past the section
      const usableScrollRange = wrapperHeight * 0.8;

      // Cap scroll at the usable range
      const cappedScroll = Math.min(scrolledIntoWrapper, usableScrollRange);

      // Calculate progress (0 to 1) based on usable range
      const progress = cappedScroll / usableScrollRange;

      // Map progress to panel index
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

          // Use single RAF to ensure initial render is painted before animation starts
          requestAnimationFrame(() => {
            console.log(`Starting slide-in animation for panel ${index}`);
            setIsSlideInComplete(true);
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
      <div className="container flex flex-col md:flex-row lg:gap-14 items-start mx-auto p-8 lg:mb-10 lg:sticky lg:top-24 min-h-screen z-0">
        <Image
          src={apptImage}
          alt="Moxie's waiting room."
          className="w-full lg:max-w-1/2 h-96 lg:h-auto max-h-[60vh] rounded-tl rounded-tr-[4rem] rounded-br rounded-bl-[4rem] border border-l-8 border-t-8 border-(--accent) object-cover mt-8 lg:mt-0"
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
            <Button
              size="lg"
              onClick={onBookingClick}
              className="w-full md:w-auto"
            >
              Make an Appointment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full md:w-auto hidden! lg:inline-flex!"
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

                  // console.log("Plan button clicked:", {
                  //   currentScrollY,
                  //   rectTop: rect.top,
                  //   buffer,
                  //   targetScrollY,
                  //   scrollAmount: rect.top + buffer,
                  // });

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

      {/* Mobile: Accordion panels */}
      <div className="lg:hidden appointments-mobile-stack w-full max-w-3xl mx-auto p-8">
        {appointmentSections.map((section, index) => {
          const isOpen = openAccordionIndex === index;
          const accordionId = `accordion-${section.id}`;
          const panelId = `panel-${section.id}`;

          return (
            <div
              key={section.id}
              className="appointment-mobile-accordion border-b border-(--foreground)/10 last:border-b-0"
            >
              <h3>
                <button
                  type="button"
                  id={accordionId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenAccordionIndex(isOpen ? null : index)}
                  className="flex justify-between items-center w-full py-6 text-left font-nyght text-3xl transition-colors hover:text-(--accent)"
                >
                  <span>{section.title}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 shrink-0 ml-4 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={accordionId}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-500 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pb-6 prose max-w-none">{section.content}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: Animated scroll-driven panels */}
      <div
        ref={scrollWrapperRef}
        className="hidden lg:block appointments-scroll-wrapper sticky top-0 border-t border-(--accent)/50"
        style={{ height: `300vh` }}
      >
        <div className="sticky-scroll-container grid place-content-center min-h-dvh sticky top-0 overflow-hidden snap-start snap-always w-full backdrop-blur-lg bg-(--background)/75 z-50">
          <Logo placement="background" />

          {showPrevPanel &&
            prevSectionIndex >= 0 &&
            prevSectionIndex !== activeSectionIndex && (
              <div
                className={`sticky-panel w-1/2 absolute top-0 z-10 sticky-panel-${appointmentSections[prevSectionIndex].position} slide-in fade-out`}
                style={{ zIndex: 1 }}
              >
                <div className="sticky-panel-content min-h-dvh flex justify-center items-center bg-(--background)/90 backdrop-blur-lg">
                  <div className="max-w-xl p-8 lg:p-12">
                    <h3 className="text-3xl lg:text-4xl font-nyght mb-5 lg:mb-6">
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
                  <h3 className="text-3xl lg:text-4xl font-nyght mb-5 lg:mb-6">
                    {appointmentSections[activeSectionIndex].title}
                  </h3>
                  <div className="prose max-w-none">
                    {appointmentSections[activeSectionIndex].content}
                  </div>
                  <div className="flex flex-row items-center gap-4 mt-8">
                    <Button onClick={onBookingClick}>Book Now</Button>
                    {activeSectionIndex < appointmentSections.length - 1 ? (
                      <Button
                        variant="ghost"
                        onClick={() => {
                          const wrapper = scrollWrapperRef.current;
                          if (!wrapper) return;

                          const nextPanelIndex = activeSectionIndex + 1;
                          const wrapperHeight = wrapper.offsetHeight;
                          const wrapperTop =
                            wrapper.getBoundingClientRect().top +
                            window.scrollY;

                          // Use same usable range as handleScroll (80% of wrapper)
                          const usableScrollRange = wrapperHeight * 0.8;

                          // Calculate target progress for next panel
                          const targetProgress =
                            nextPanelIndex / appointmentSections.length + 0.01;

                          // Calculate scroll needed within the usable range
                          const scrollNeeded =
                            targetProgress * usableScrollRange;
                          const targetScrollY = wrapperTop + scrollNeeded;

                          console.log("Next button clicked:", {
                            currentPanel: activeSectionIndex,
                            nextPanel: nextPanelIndex,
                            wrapperTop,
                            wrapperHeight,
                            usableScrollRange,
                            targetProgress,
                            scrollNeeded,
                            targetScrollY,
                            currentScrollY: window.scrollY,
                          });

                          window.scrollTo({
                            top: targetScrollY,
                            behavior: "smooth",
                          });
                        }}
                        className="inline-flex self-start items-center gap-2 group"
                      >
                        Next{" "}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => {
                          const aboutSection = document.getElementById("About");
                          if (aboutSection) {
                            aboutSection.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }
                        }}
                        className="inline-flex self-start items-center gap-2 group"
                      >
                        Get To Know Us
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
