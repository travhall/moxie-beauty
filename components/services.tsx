// Services.tsx
import React, { useEffect } from "react";
// import Image from "next/image";
// import serviceImage from "@/public/images/services-img.jpg";

const Services = () => {
  useEffect(() => {
    const initSectionAnimations = () => {
      console.log("Animations initialized");
    };

    initSectionAnimations();
  }, []);

  return (
    <section
      className="min-h-screen w-full grid place-items-center p-4 md:py-24"
      id="Services"
      data-animate="services"
    >
      <div
        className="services-container flex flex-col md:flex-row-reverse justify-center pt-8"
        data-animate="services"
      >
        {/* <Image
          src={serviceImage}
          alt="Close up of a woman receiving lash treatment."
          className="h-96 w-full md:w-1/2 mb-8 mr-8 md:mr-8 lg:mr-10 rounded-tl rounded-tr-[4rem] rounded-br rounded-bl-[4rem] border-r-[.5rem] border-b-[.5rem] border-rose-gold-500 dark:border-ivory-rose-500 object-cover z-0"
        /> */}
        <div className="content-block space-y-4 max-w-2xl text-pretty">
          <h2 className="font-nyght bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl my-8 pb-2 text-balance">
            The Magic of Moxie
          </h2>
          <p className="text-xl mb-4">
            Discover Moxie&rsquo;s premium beauty treatments and services,
            meticulously crafted to enhance your natural allure.
          </p>
          <p className="text-base mb-12">
            From special occasions to everyday self-care, Moxie is here to help
            you look and feel your best. Our expert team provides personalized
            services, including lashes, brows, microblading, and waxing, to
            ensure flawless, long-lasting results. With a perfect balance of
            artistry and precision, we&rsquo;re dedicated to making every visit
            unforgettable. <a href="">Schedule your appointment</a> today and
            experience the Moxie magic.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
