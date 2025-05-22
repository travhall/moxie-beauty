// About.tsx
import React, { useEffect } from "react";
import Image from "next/image";
import profileImage from "@/public/images/jackie-profile.jpg";
import workImage from "@/public/images/jackie-working.jpg";

const About = () => {
  useEffect(() => {
    const initSectionAnimations = () => {
      console.log("Animations initialized");
    };

    initSectionAnimations();
  }, []);

  return (
    <>
      <section
        className="min-h-screen w-full grid place-items-center p-4 md:pt-24"
        id="About"
      >
        <div className="max-w-5xl">
          <div
            className="about-container flex flex-col md:flex-row justify-center pt-8"
            data-animate="about"
          >
            <Image
              src={profileImage}
              alt="Jackie Schult, owner and operator of Moxie Beauty Studio"
              className="h-96 w-64 -mb-4 mr-4 md:mr-8 lg:mr-10 rounded-tl rounded-tr-[4rem] rounded-br rounded-bl-[4rem] border border-l-[.5rem] border-t-[.5rem] border-(--accent) object-cover z-0"
              priority={false}
              loading="lazy"
            />
            <div
              className="about-content px-4 text-pretty"
              data-animate="about-content"
            >
              <h2 className="font-nyght bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl my-8 pb-2 text-balance">
                Discover the Heart & Soul of Moxie
              </h2>
              <p className="text-base mb-12 max-w-[68ch] text-balance">
                Moxie Beauty Studio is owned and operated by{" "}
                <strong>Jackie Schult</strong>. Jackie specializes in{" "}
                <em>
                  eyelash extensions, lash lift and tint, eyebrow lamination,
                  microblading, and waxing
                </em>
                . Her dedication to continuous improvement drives her to expand
                both her skills and services, always staying ahead of industry
                trends to provide the best possible care.
              </p>
              <Image
                src={workImage}
                alt="A picture of Jackie working on another satisfied client."
                className="h-96 w-full max-w-[36rem] mb-8 mr-8 md:mr-8 lg:mr-10 rounded-tl rounded-tr-[4rem] rounded-br rounded-bl-[4rem] border border-l-[.5rem] border-t-[.5rem] border-(--accent) object-cover object-top z-0"
                priority={false}
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex flex-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="hsl(var(--background))"
              viewBox="0 0 50 60"
              className="w-20 h-auto fill-(--accent)"
            >
              <path d="M36.7282 29.0497C30.6329 30.4594 23.5969 35.5518 23.5283 42.1787C23.5283 42.3961 23.4724 42.5942 23.3617 42.7732C23.1657 43.0993 23.051 43.0737 23.0187 42.6965C22.2641 35.1586 16.3844 30.1334 9.0348 28.9346C9.00246 28.9282 8.99266 28.941 9.0054 28.9729C9.0054 28.9794 9.0054 28.989 9.0054 29.0017C9.01226 29.0209 9.02206 29.0273 9.0348 29.0209C17.2144 27.6335 21.9574 22.9663 23.2637 15.0192C23.2637 15.0141 23.2656 15.0092 23.2695 15.0057C23.2735 15.002 23.2784 15 23.2833 15C23.2882 15 23.293 15.002 23.297 15.0057C23.3009 15.0092 23.3029 15.0141 23.3029 15.0192C24.322 22.0009 29.3001 27.8892 36.7184 28.8483C37.0907 28.893 37.0937 28.9602 36.7282 29.0497Z" />
            </svg>
            <blockquote className="text-3xl font-nyght-italic bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent max-w-[56ch] text-balance p-6 pl-0">
              Jackie is committed to fostering strong relationships with her
              clients, ensuring each appointment is a personalized &amp;
              enjoyable experience.
            </blockquote>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
