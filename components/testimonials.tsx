// TestimonialsCarousel.tsx
import React, { useEffect, useRef, useState } from "react";

interface Testimonial {
  quote: string;
  author: string;
}

const TestimonialsCarousel = () => {
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  const testimonials: Testimonial[] = [
    {
      quote:
        "I love my lashes so much. It's so easy to schedule with Jackie. She is kind, professional and makes every woman feel beautiful when they leave.",
      author: "Michelle W.",
    },
    {
      quote:
        "I've been getting my lashes for over a year and I'm hooked! I get a compliment every time I'm out, that's how good Jackie is!",
      author: "Crystal S.",
    },
    {
      quote:
        "My lashes never looked better! Jackie whispers magic onto my face. Best EVER way to get self-care into my week!",
      author: "Amanda J.",
    },
    {
      quote:
        "Jackie is an absolute artist with lashes! Everyone asks if they're my natural lashes because they look so perfect.",
      author: "Sarah T.",
    },
    {
      quote:
        "I've tried many lash technicians before finding Moxie. No one compares to Jackie's precision and attention to detail.",
      author: "Rachel K.",
    },
    {
      quote:
        "The atmosphere at Moxie is so calming, and Jackie makes the whole experience feel like a spa day. My lashes look amazing!",
      author: "Kimberly P.",
    },
    {
      quote:
        "I'm so happy with my lash extensions! Jackie takes the time to understand what look I want and delivers perfectly every time.",
      author: "Jennifer M.",
    },
    {
      quote:
        "The quality of Jackie's work is unmatched. I've been coming to Moxie for two years and wouldn't go anywhere else.",
      author: "Melissa R.",
    },
  ];

  // Scroll to focused testimonial
  const scrollToTestimonial = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const testimonialCards = container.children;
    if (testimonialCards[index]) {
      testimonialCards[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const totalTestimonials = testimonials.length;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (index + 1) % totalTestimonials;
      setFocusedIndex(nextIndex);
      scrollToTestimonial(nextIndex);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (index - 1 + totalTestimonials) % totalTestimonials;
      setFocusedIndex(prevIndex);
      scrollToTestimonial(prevIndex);
    } else if (e.key === "Home") {
      e.preventDefault();
      setFocusedIndex(0);
      scrollToTestimonial(0);
    } else if (e.key === "End") {
      e.preventDefault();
      const lastIndex = totalTestimonials - 1;
      setFocusedIndex(lastIndex);
      scrollToTestimonial(lastIndex);
    }
  };

  // Initialize animations after component mounts
  useEffect(() => {
    const initSectionAnimations = () => {
      // console.log("Animations initialized");

      // Optional: Add smooth scrolling behavior for browsers that don't support it natively
      const container = scrollContainerRef.current;
      if (container) {
        // You could add custom scroll behavior here if needed
      }
    };

    initSectionAnimations();
  }, []);

  return (
    <section
      className="testimonials rounded-tr-[6rem] rounded-bl-[6rem] bg-linear-to-b from-background to-(--accent)/20 border-b-8 border-(--accent) my-12 pb-12 overflow-visible"
      data-animate="testimonials"
    >
      <div className="mx-auto max-w-7xl overflow-visible p-6 pb-0">
        <h2 className="font-nyght bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent text-5xl xl:text-6xl my-8 pb-2 text-balance">
          What our clients are saying about Moxie
        </h2>
      </div>

      {/* Scrollable container */}
      <div className="overflow-visible ps-4 md:ps-[calc((100vw-80rem)/2+1rem)]">
        {/* Positioning container */}
        <ul
          ref={scrollContainerRef}
          className="flex snap-x snap-mandatory gap-6 py-6 overflow-x-auto"
          role="list"
          aria-label="Client testimonials"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingRight: "10vw",
          }}
        >
          {testimonials.map((testimonial, index) => (
            <li
              key={index}
              className="shrink-0 flex flex-col justify-between w-[320px] h-auto snap-start p-4 bg-(--background) rounded-tl rounded-tr-2xl rounded-br rounded-bl-2xl border border-l-8 border-t-8 border-(--accent) text-balance focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2"
              tabIndex={index === focusedIndex ? 0 : -1}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-label={`Testimonial from ${testimonial.author}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="hsl(var(--background))"
                viewBox="0 0 50 60"
                className="w-12 h-auto -mb-2 fill-(--accent)"
                aria-hidden="true"
              >
                <path d="M36.7282 29.0497C30.6329 30.4594 23.5969 35.5518 23.5283 42.1787C23.5283 42.3961 23.4724 42.5942 23.3617 42.7732C23.1657 43.0993 23.051 43.0737 23.0187 42.6965C22.2641 35.1586 16.3844 30.1334 9.0348 28.9346C9.00246 28.9282 8.99266 28.941 9.0054 28.9729C9.0054 28.9794 9.0054 28.989 9.0054 29.0017C9.01226 29.0209 9.02206 29.0273 9.0348 29.0209C17.2144 27.6335 21.9574 22.9663 23.2637 15.0192C23.2637 15.0141 23.2656 15.0092 23.2695 15.0057C23.2735 15.002 23.2784 15 23.2833 15C23.2882 15 23.293 15.002 23.297 15.0057C23.3009 15.0092 23.3029 15.0141 23.3029 15.0192C24.322 22.0009 29.3001 27.8892 36.7184 28.8483C37.0907 28.893 37.0937 28.9602 36.7282 29.0497Z" />
                <path d="M34.1553 7.97163C37.6383 7.16605 41.6589 4.2561 41.6981 0.46934C41.6981 0.345106 41.7301 0.231887 41.7933 0.129573C41.9053 -0.0567509 41.9709 -0.042118 41.9893 0.173415C42.4205 4.48079 45.7803 7.35237 49.9801 8.03739C49.9986 8.04106 50.0042 8.03371 49.9969 8.01546C49.9969 8.01179 49.9969 8.00631 49.9969 7.99903C49.993 7.98807 49.9874 7.98439 49.9801 7.98806C45.306 8.78087 42.5958 11.4478 41.8493 15.989C41.8493 15.9919 41.8482 15.9947 41.846 15.9968C41.8437 15.9989 41.8409 16 41.8381 16C41.8353 16 41.8325 15.9989 41.8303 15.9968C41.8281 15.9947 41.8269 15.9919 41.8269 15.989C41.2446 11.9995 38.3999 8.63472 34.1609 8.08671C33.9481 8.06112 33.9465 8.02276 34.1553 7.97163Z" />
                <path d="M41.8835 54.0213C39.2712 54.6255 36.2558 56.8079 36.2264 59.648C36.2264 59.7412 36.2024 59.8261 36.155 59.9028C36.071 60.0426 36.0219 60.0316 36.008 59.8699C35.6846 56.6394 33.1647 54.4857 30.0149 53.972C30.0011 53.9692 29.9969 53.9747 30.0023 53.9884C30.0023 53.9912 30.0023 53.9953 30.0023 54.0007C30.0053 54.009 30.0095 54.0117 30.0149 54.009C33.5205 53.4143 35.5532 51.4141 36.113 48.0082C36.113 48.006 36.1138 48.0039 36.1155 48.0024C36.1172 48.0009 36.1193 48 36.1214 48C36.1235 48 36.1256 48.0009 36.1273 48.0024C36.1289 48.0039 36.1298 48.006 36.1298 48.0082C36.5666 51.0004 38.7001 53.524 41.8793 53.935C42.0389 53.9542 42.0402 53.9829 41.8835 54.0213Z" />
                <path d="M4.48404 50.9126C4.0309 48.9534 2.39406 46.6918 0.264004 46.6698C0.194122 46.6698 0.130436 46.6518 0.0728849 46.6162C-0.0319224 46.5532 -0.0236914 46.5164 0.097546 46.506C2.52044 46.2635 4.13571 44.3736 4.52103 42.0112C4.5231 42.0008 4.51896 41.9976 4.5087 42.0017C4.50663 42.0017 4.50355 42.0017 4.49945 42.0017C4.49329 42.0039 4.49122 42.0071 4.49329 42.0112C4.93924 44.6404 6.4394 46.1649 8.99384 46.5847L8.99818 46.5866L9 46.591L8.99818 46.5955L8.99384 46.5973C6.74973 46.9249 4.85703 48.525 4.54877 50.9095C4.53438 51.0292 4.5128 51.0301 4.48404 50.9126Z" />
              </svg>
              <blockquote className="m-4 mt-0">
                <p className="client-quote font-display text-lg text-balance p-2">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </blockquote>
              <p className="client-name text-base tracking-widest self-end">
                ~ {testimonial.author}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
