// About.tsx
import React, { useEffect } from "react";
import Image from "next/image";
import profileImage from "@/public/images/jackie-profile.jpg";
import workImage from "@/public/images/jackie-working.jpg";
import Button from "./button";

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
        className="min-h-screen w-full grid place-items-center p-4 md:py-24"
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
              />
            </div>
          </div>
          <div className="flex flex-col gap-8 place-items-start">
            <blockquote className="text-3xl font-nyght-italic bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent ps-2 max-w-[56ch] text-balance">
              Jackie is committed to fostering strong relationships with her
              clients, ensuring each appointment is a personalized &amp;
              enjoyable experience.
            </blockquote>
            <Button variant="outline" size="lg">
              Make an Appointment
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
