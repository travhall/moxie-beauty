// Appointments.tsx
import React, { useEffect } from "react";

const Appointments = () => {
  useEffect(() => {
    const initSectionAnimations = () => {
      console.log("Animations initialized");
      // Animation logic would go here
    };

    initSectionAnimations();
  }, []);

  return (
    <section
      className="relative grid place-content-center p-4 md:py-[10vh] w-full min-h-screen"
      id="Appointments"
      data-animate="appointments"
    >
      <div
        className="services-container flex flex-col md:flex-row justify-center pt-8"
        data-animate="appointments-container"
      >
        <div
          className="content relative max-w-2xl text-balance"
          data-animate="appointments-content"
        >
          <h2 className="font-nyght bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl my-8 pb-2 text-balance">
            Your Moxie Beauty Journey
          </h2>
          <p className="text-xl mb-4">
            Discover the perfect service for your beauty goals by exploring our
            menu of lash and brow enhancements.
          </p>
          <p className="text-base mb-12">
            If you&rsquo;re considering microblading, we recommend starting with
            a <a href="">complimentary consultation</a> where we&rsquo;ll
            discuss your desired shape, ideal pigment, and what to expect during
            the healing process.
          </p>

          <p className="mb-4"></p>
        </div>
      </div>
    </section>
  );
};

export default Appointments;
