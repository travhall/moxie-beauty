"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import apptImage from "@/public/images/moxie-lobby.jpg";
import apptImage2 from "@/public/images/appt-img.jpg";
import Button from "./button";
import { useEffect, useRef, useState } from "react";

interface AppointmentsProps {
  onBookingClick: () => void;
}

const steps = [
  {
    id: "step-discover",
    label: "Find Your Service",
    content: (
      <>
        <p className="mb-4 leading-relaxed">
          Whether you&rsquo;re drawn to full, fluttery lashes or perfectly
          defined brows, our menu of services is designed to match your beauty
          goals and lifestyle.
        </p>
        <p className="mb-4 leading-relaxed">
          New to microblading? We recommend starting with a{" "}
          <span className="text-(--accent) font-medium">
            complimentary consultation
          </span>{" "}
          — we&rsquo;ll map your ideal shape, select the perfect pigment, and
          walk you through the full process before you commit to anything.
        </p>
        <p className="leading-relaxed">
          Ready to get started? Complete our{" "}
          <span className="text-(--accent) font-medium">New Client Form</span>{" "}
          before your visit so we can hit the ground running from the moment you
          arrive.
        </p>
      </>
    ),
  },
  {
    id: "step-prepare",
    label: "Before You Arrive",
    content: (
      <>
        <p className="mb-5 leading-relaxed">
          A little preparation goes a long way. Here&rsquo;s how to set
          yourself up for the best possible experience:
        </p>
        <ul className="space-y-3">
          {[
            "Arrive 5–10 minutes early — 15 minutes if it's your first visit with us",
            "Come with clean, makeup-free lashes or brows for the best results",
            "Wear comfortable clothing — some services take up to two hours",
            "We maintain a relaxing adult environment, so please plan for childcare",
            "Limit caffeine before lash appointments to help you stay still and comfortable",
            "Skip retinol products for three days before any brow or waxing service",
          ].map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed">
              <span className="text-(--accent) font-semibold shrink-0 select-none">
                —
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "step-expect",
    label: "What to Expect",
    content: (
      <>
        <p className="mb-5 leading-relaxed">
          Every service is tailored to you — here&rsquo;s a general sense of
          what to plan for.
        </p>
        <div className="space-y-5">
          <div>
            <h4 className="font-semibold text-(--accent) mb-1.5">
              Lash Extensions
            </h4>
            <p className="text-sm leading-relaxed text-(--foreground)/75">
              Full sets take approximately two hours with completely clean
              lashes. For fills: 1-week (30 min), 2-week (60 min), 3-week (75
              min).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-(--accent) mb-1.5">
              Lash Lift & Tint
            </h4>
            <p className="text-sm leading-relaxed text-(--foreground)/75">
              Plan for about 90 minutes. Come with clean, dry lashes and leave
              with beautifully curled and tinted results.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-(--accent) mb-1.5">
              Microblading
            </h4>
            <p className="text-sm leading-relaxed text-(--foreground)/75">
              Begins with a complimentary consultation to map your shape and
              choose your pigment, followed by your full service appointment.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "step-aftercare",
    label: "Caring for Your Results",
    content: (
      <>
        <p className="mb-5 leading-relaxed">
          Your results are worth protecting. A little care in the days after
          your service keeps everything looking its best.
        </p>
        <div className="space-y-5">
          <div>
            <h4 className="font-semibold text-(--accent) mb-2">
              For Lash Services
            </h4>
            <ul className="space-y-2">
              {[
                "Keep lashes completely dry for the first 24 hours",
                "Avoid tanning beds, saunas, and hot yoga for 48 hours",
                "Sleep on your back when possible to maintain lash shape",
                "Book fills every 2–3 weeks to keep your look seamless",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-(--foreground)/75"
                >
                  <span className="text-(--accent) shrink-0 select-none">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-(--accent) mb-2">
              For Microblading
            </h4>
            <ul className="space-y-2">
              {[
                "Avoid sweating, swimming, and direct water contact for 10 days",
                "Expect light flaking — it's a normal part of the healing process",
                "Your 6-week touch-up is required for the best final result",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-(--foreground)/75"
                >
                  <span className="text-(--accent) shrink-0 select-none">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    ),
  },
];

export default function Appointments({ onBookingClick }: AppointmentsProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [exitIndex, setExitIndex] = useState<number | null>(null);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(
    0
  );
  const scrollWrapperRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const activeIndexRef = useRef(-1);
  const exitTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const wrapper = scrollWrapperRef.current;
    if (!wrapper) return;

    const handleScroll = () => {
      const rect = wrapper.getBoundingClientRect();

      if (rect.top > 0) {
        activeIndexRef.current = -1;
        setActiveIndex(-1);
        return;
      }

      if (rect.bottom < 0) {
        activeIndexRef.current = -1;
        setActiveIndex(-1);
        return;
      }

      const wrapperHeight = wrapper.offsetHeight;
      const scrolledIntoWrapper = Math.max(0, -rect.top);
      const usableScrollRange = wrapperHeight * 0.8;
      const cappedScroll = Math.min(scrolledIntoWrapper, usableScrollRange);
      const progress = cappedScroll / usableScrollRange;

      const index = Math.min(
        Math.floor(progress * steps.length),
        steps.length - 1
      );

      const currentIndex = activeIndexRef.current;
      if (index !== currentIndex) {
        if (exitTimerRef.current) clearTimeout(exitTimerRef.current);

        if (currentIndex >= 0) {
          setExitIndex(currentIndex);
          exitTimerRef.current = setTimeout(() => setExitIndex(null), 800);
        }

        activeIndexRef.current = index;
        setActiveIndex(index);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, []);

  const scrollToSteps = () => {
    const wrapper = scrollWrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + rect.top + 10, behavior: "smooth" });
  };

  const scrollToStep = (targetIndex: number) => {
    const wrapper = scrollWrapperRef.current;
    if (!wrapper) return;
    const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
    const usableScrollRange = wrapper.offsetHeight * 0.8;
    const targetProgress = targetIndex / steps.length + 0.01;
    window.scrollTo({
      top: wrapperTop + targetProgress * usableScrollRange,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full md:pt-24 relative z-10"
      id="Appointments"
      tabIndex={-1}
      aria-label="Appointments section"
    >
      {/* Intro — always visible, sticks while scroll wrapper fills the section */}
      <div className="flex flex-col md:flex-row lg:gap-14 items-start lg:sticky lg:top-40 min-h-screen z-0">
        {/* <Image
          src={apptImage}
          alt="Moxie's waiting room."
          className="w-full lg:max-w-1/2 h-96 lg:h-auto max-h-[60vh] rounded-tl rounded-tr-[4rem] rounded-br rounded-bl-[4rem] border-r border-b border-l-8 border-t-8 border-(--accent) object-cover mt-8 lg:mt-0 fade-in-section"
        /> */}
        <div className="relative w-2/5 xl:w-1/2 shrink-0 fade-in-section border-r-16 border-(--accent) rounded-tr-[25%] overflow-hidden">
          <Image
            src={apptImage}
            alt="Moxie Beauty Studio lobby"
            width={1280}
            height={720}
            className="object-cover"
            sizes="(min-width: 1280px) 50vw, 40vw"
          />
        </div>
        <div className="content relative max-w-2xl text-balance mt-8">
          <h2 className="font-nyght bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent text-6xl xl:text-7xl my-8 pb-2 text-balance fade-in-section delay-100">
            Your Moxie Beauty Journey
          </h2>
          <p className="text-xl mb-4 fade-in-section delay-200">
            Every Moxie appointment is crafted around you — your goals, your
            lifestyle, your look.
          </p>
          <p className="text-base mb-10 fade-in-section delay-300">
            Scroll through the steps below to walk through the full experience,
            or book directly when you&rsquo;re ready.
          </p>
          <div className="flex flex-col lg:flex-row items-start gap-4 fade-in-section delay-400">
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
              onClick={scrollToSteps}
            >
              Plan Your Visit
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile: Accordion */}
      <div className="lg:hidden appointments-mobile-stack w-full max-w-3xl mx-auto p-8">
        {steps.map((step, index) => {
          const isOpen = openAccordionIndex === index;
          const accordionId = `accordion-${step.id}`;
          const panelId = `panel-${step.id}`;
          const delayClass = `delay-${Math.min((index + 1) * 100, 400)}`;

          return (
            <div
              key={step.id}
              className={`border-b border-(--foreground)/10 last:border-b-0 fade-in-section ${delayClass}`}
            >
              <h3>
                <button
                  type="button"
                  id={accordionId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenAccordionIndex(isOpen ? null : index)}
                  className="flex justify-between items-center w-full py-6 text-left font-nyght text-2xl transition-colors hover:text-(--accent)"
                >
                  <span>
                    <span className="text-(--accent)/60 text-sm font-sans font-semibold tracking-widest mr-3">
                      0{index + 1}
                    </span>
                    {step.label}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 shrink-0 ml-4 ${isOpen ? "rotate-180" : ""
                      }`}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={accordionId}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="pb-6 text-(--foreground)/80">{step.content}</div>
              </div>
            </div>
          );
        })}
        <div className="pt-8 mb-48">
          <Button onClick={onBookingClick} size="lg" className="w-full">
            Make an Appointment
          </Button>
        </div>
      </div>

      {/* Desktop: Scroll-driven step journey */}
      <div
        ref={scrollWrapperRef}
        className="hidden lg:block appointments-scroll-wrapper"
        style={{ height: "300vh" }}
      >
        <div className="sticky top-0 min-h-dvh flex overflow-hidden border-t border-(--accent)/20 bg-(--background)/90 backdrop-blur-xl z-50">

          {/* Left: persistent image */}
          <div className="relative w-2/5 xl:w-1/2 shrink-0 border-r-16 border-(--accent) rounded-br-[25%] overflow-hidden">
            <Image
              src={apptImage2}
              alt="Moxie Beauty Studio lobby"
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 50vw, 40vw"
            />
            {/* Soft gradient blends image into the content panel */}
            {/* <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-(--background)/60" /> */}
          </div>

          {/* Right: step content */}
          <div className="flex-1 flex items-center justify-start">
            <div className="w-full max-w-xl px-10 xl:px-14 py-12">

              {/* Step indicator */}
              <div
                className={`flex items-center gap-3 mb-10 transition-opacity duration-500 ${activeIndex >= 0 ? "opacity-100" : "opacity-0"
                  }`}
                aria-hidden="true"
              >
                <div className="flex gap-1.5 items-center">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-px transition-all duration-500 ease-out rounded-full ${i === activeIndex
                        ? "w-8 bg-(--accent)"
                        : i < activeIndex
                          ? "w-4 bg-(--accent)/40"
                          : "w-4 bg-(--foreground)/15"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-xs tracking-widest text-(--foreground)/30 tabular-nums">
                  {activeIndex >= 0 ? `0${activeIndex + 1}` : "01"} /{" "}
                  0{steps.length}
                </span>
              </div>

              {/* Content — grid overlap so enter/exit animate in the same space */}
              <div className="grid">
                {/* Exiting step */}
                {exitIndex !== null &&
                  exitIndex >= 0 &&
                  exitIndex !== activeIndex && (
                    <div className="step-content-exit col-start-1 row-start-1">
                      <h3 className="font-nyght text-3xl lg:text-4xl mb-6 text-balance">
                        {steps[exitIndex].label}
                      </h3>
                      <div className="text-(--foreground)/75">
                        {steps[exitIndex].content}
                      </div>
                    </div>
                  )}

                {/* Active step */}
                {activeIndex >= 0 && (
                  <div
                    key={`step-${activeIndex}`}
                    className="step-content-enter col-start-1 row-start-1"
                  >
                    <h3 className="font-nyght text-3xl lg:text-4xl mb-6 text-balance">
                      {steps[activeIndex].label}
                    </h3>
                    <div className="text-(--foreground)/75">
                      {steps[activeIndex].content}
                    </div>

                    <div className="flex items-center gap-4 mt-10">
                      <Button onClick={onBookingClick}>Book Now</Button>
                      {activeIndex < steps.length - 1 ? (
                        <Button
                          variant="ghost"
                          onClick={() => scrollToStep(activeIndex + 1)}
                          className="inline-flex items-center gap-2 group"
                        >
                          Next{" "}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => {
                            document
                              .getElementById("About")
                              ?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                          className="inline-flex items-center gap-2"
                        >
                          Get To Know Moxie
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
