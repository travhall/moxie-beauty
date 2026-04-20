"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import apptImage from "@/public/images/moxie-lobby.jpg";
import apptImgDiscover from "@/public/images/appt-img4.jpg";
import apptImgPrepare from "@/public/images/appt-img2.jpg";
import apptImgExpect from "@/public/images/appt-img.jpg";
import apptImgAftercare from "@/public/images/appt-img3.jpg";
import Button from "./button";
import { useEffect, useRef, useState } from "react";

interface AppointmentsProps {
  onBookingClick: () => void;
}

const steps = [
  {
    id: "step-discover",
    label: "Find Your Service",
    image: apptImgDiscover,
    imageAlt: "Moxie Beauty Studio consultation and waiting area",
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
    image: apptImgPrepare,
    imageAlt: "Moxie Beauty Studio entrance through barn doors",
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
    image: apptImgExpect,
    imageAlt: "Moxie Beauty Studio treatment room",
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
    image: apptImgAftercare,
    imageAlt: "Moxie Beauty Studio professional workstation with certifications",
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
  // Desktop scroll-driven state
  const [activeIndex, setActiveIndex] = useState(-1);
  const [exitIndex, setExitIndex] = useState<number | null>(null);
  // Tablet tap-driven state
  const [tabIndex, setTabIndex] = useState(0);
  const [tabExitIndex, setTabExitIndex] = useState<number | null>(null);

  const scrollWrapperRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const activeIndexRef = useRef(-1);
  const exitTimerRef = useRef<NodeJS.Timeout | null>(null);
  const tabExitTimerRef = useRef<NodeJS.Timeout | null>(null);

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
      if (tabExitTimerRef.current) clearTimeout(tabExitTimerRef.current);
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

  const handleTabChange = (index: number) => {
    if (index === tabIndex) return;
    if (tabExitTimerRef.current) clearTimeout(tabExitTimerRef.current);
    setTabExitIndex(tabIndex);
    tabExitTimerRef.current = setTimeout(() => setTabExitIndex(null), 800);
    setTabIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full relative z-10"
      id="Appointments"
      tabIndex={-1}
      aria-label="Appointments section"
    >
      {/* Intro — mobile/tablet only; desktop uses the persistent column layout below */}
      <div className="flex flex-col md:flex-row lg:gap-14 items-center lg:items-start lg:sticky lg:top-40 min-h-screen z-0 lg:hidden">
        {/* Image: hidden on mobile, shown md+ */}
        <div className="hidden md:block relative w-2/5 lg:w-1/2 self-stretch shrink-0 fade-in-section border-r-16 border-(--accent) rounded-tr-4xl lg:rounded-tr-[25%] overflow-hidden">
          <Image
            src={apptImage}
            alt="Moxie Beauty Studio lobby"
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 50vw, 40vw"
          />
        </div>
        <div className="content relative max-w-2xl text-balance p-8">
          <h2 className="font-nyght bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent text-5xl lg:text-6xl my-8 pb-2 text-balance fade-in-section delay-100">
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
          <div className="flex flex-col lg:flex-row items-start gap-4 fade-in-section delay-400 mb-16">
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

      {/* ── Mobile: Vertical step cards (< md) ──────────────────────────── */}
      <div className="md:hidden">
        {steps.map((step, index) => {
          const delayClass = `delay-${Math.min((index + 1) * 100, 400)}`;
          return (
            <div
              key={step.id}
              className={`fade-in-section ${delayClass}`}
            >
              {/* Step image with number badge */}
              <div className="relative w-full aspect-4/3 overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 767px) 100vw, 50vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-linear-to-t from-(--foreground)/50 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 text-(--accent) text-xs font-semibold tracking-widest bg-(--background)/85 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  0{index + 1}
                </span>
              </div>
              {/* Step content */}
              <div className="px-6 pt-6 pb-8 border-b border-(--foreground)/10 last:border-b-0">
                <h3 className="font-nyght text-3xl mb-4">{step.label}</h3>
                <div className="text-(--foreground)/75">
                  {step.content}
                </div>
              </div>
            </div>
          );
        })}
        <div className="px-6 pt-8 pb-20">
          <Button onClick={onBookingClick} size="lg" className="w-full">
            Make an Appointment
          </Button>
        </div>
      </div>

      {/* ── Tablet: Interactive split panel (md to lg) ───────────────────── */}
      <div className="hidden md:flex lg:hidden min-h-screen overflow-hidden">

        {/* Left: per-step crossfade images */}
        <div className="relative w-2/5 lg:w-1/2 shrink-0 border-r-16 border-(--accent) rounded-br-4xl lg:rounded-br-[25%] overflow-hidden">
          {steps.map((step, i) => (
            <div
              key={step.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === tabIndex ? "opacity-100" : "opacity-0"
                }`}
            >
              <Image
                src={step.image}
                alt={step.imageAlt}
                fill
                className="object-cover"
                sizes="40vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* Right: clickable step indicator + animated content */}
        <div className="flex-1 flex items-start overflow-y-auto">
          <div className="w-full max-w-2xl px-8 pt-16 pb-12">

            {/* Clickable step indicator — mirrors desktop but interactive */}
            <div
              className="flex items-center gap-3 mb-10"
              aria-label="Step navigation"
            >
              <div className="flex gap-1.5 items-center">
                {steps.map((step, i) => (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => handleTabChange(i)}
                    aria-current={i === tabIndex ? "step" : undefined}
                    aria-label={step.label}
                    className="group py-2 px-0.5 -my-2 cursor-pointer"
                  >
                    <div
                      className={`h-px transition-all duration-500 ease-out rounded-full ${i === tabIndex
                        ? "w-8 bg-(--accent)"
                        : i < tabIndex
                          ? "w-4 bg-(--accent)/40 group-hover:bg-(--accent)/60"
                          : "w-4 bg-(--foreground)/15 group-hover:bg-(--foreground)/30"
                        }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs tracking-widest text-(--foreground)/30 tabular-nums">
                0{tabIndex + 1} / 0{steps.length}
              </span>
            </div>

            {/* Content — same grid overlap enter/exit pattern as desktop */}
            <div className="grid">
              {/* Exiting step */}
              {tabExitIndex !== null && tabExitIndex !== tabIndex && (
                <div className="step-content-exit col-start-1 row-start-1">
                  <h3 className="font-nyght text-3xl mb-6 text-balance">
                    {steps[tabExitIndex].label}
                  </h3>
                  <div className="text-(--foreground)/75">
                    {steps[tabExitIndex].content}
                  </div>
                </div>
              )}

              {/* Active step */}
              <div
                key={`tab-${tabIndex}`}
                className="step-content-enter col-start-1 row-start-1"
              >
                <h3 className="font-nyght text-3xl mb-6 text-balance">
                  {steps[tabIndex].label}
                </h3>
                <div className="text-(--foreground)/75">
                  {steps[tabIndex].content}
                </div>
                <div className="flex items-center gap-4 mt-10">
                  <Button onClick={onBookingClick}>Book Now</Button>
                  {tabIndex < steps.length - 1 ? (
                    <Button
                      variant="ghost"
                      onClick={() => handleTabChange(tabIndex + 1)}
                      className="inline-flex items-center gap-2 group"
                    >
                      {steps[tabIndex + 1].label}{" "}
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
            </div>

          </div>
        </div>
      </div>

      {/* ── Desktop: Persistent column + scroll-driven steps (lg+) ─────── */}
      <div className="hidden lg:flex">

        {/* Left: single sticky image column — shared by intro and steps */}
        <div
          className="self-start sticky top-0 h-screen w-1/2 shrink-0 border-r-16 border-(--accent) rounded-tr-[25%] overflow-hidden"
          style={{
            borderBottomRightRadius: activeIndex >= 0 ? "25%" : "0",
            transition: "border-bottom-right-radius 600ms ease-in-out",
          }}
        >
          {/* Lobby image — shown during intro phase */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeIndex < 0 ? "opacity-100" : "opacity-0"
              }`}
          >
            <Image
              src={apptImage}
              alt="Moxie Beauty Studio lobby"
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 50vw, 40vw"
            />
          </div>
          {/* Step images — crossfade as steps activate */}
          {steps.map((step, i) => (
            <div
              key={step.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === activeIndex ? "opacity-100" : "opacity-0"
                }`}
            >
              <Image
                src={step.image}
                alt={step.imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 50vw, 40vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* Right: intro text (in flow) + scroll-driven step content */}
        <div className="flex-1">

          {/* Intro text — sticky matches original lg:top-40 behavior */}
          <div className="min-h-screen flex items-start sticky top-40">
            <div className="content relative max-w-2xl text-balance px-12 xl:px-16 pt-16">
              <h2 className="font-nyght bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent text-5xl lg:text-6xl my-8 pb-2 text-balance fade-in-section delay-100">
                Your Moxie Beauty Journey
              </h2>
              <p className="text-xl mb-4 fade-in-section delay-200">
                Every Moxie appointment is crafted around you — your goals, your
                lifestyle, your look.
              </p>
              <p className="text-base mb-10 fade-in-section delay-300">
                Scroll through the steps below to walk through the full
                experience, or book directly when you&rsquo;re ready.
              </p>
              <div className="flex flex-col lg:flex-row items-start gap-4 fade-in-section delay-400 mb-16">
                <Button size="lg" onClick={onBookingClick}>
                  Make an Appointment
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={scrollToSteps}
                >
                  Plan Your Visit
                </Button>
              </div>
            </div>
          </div>

          {/* Scroll wrapper — drives step progression */}
          <div
            ref={scrollWrapperRef}
            className="appointments-scroll-wrapper"
            style={{ height: "300vh" }}
          >
            <div className="sticky top-0 min-h-dvh flex items-center bg-(--background)/80 backdrop-blur-xl z-50">
              <div className="w-full max-w-2xl px-12 xl:px-16">

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

                {/* Content — grid overlap for enter/exit animation */}
                <div className="grid">
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
                            {steps[activeIndex + 1].label}{" "}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            onClick={() => {
                              document
                                .getElementById("About")
                                ?.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
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
      </div>
    </section>
  );
}
