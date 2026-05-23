import HeroSection from "@/components/hero-section";
import PageAnimations from "@/components/page-animations";
import Services from "@/components/services";
import Appointments from "@/components/appointments";
import About from "@/components/about";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <main>
      <PageAnimations />
      <HeroSection />
      <div className="w-full h-32 bg-linear-to-b from-(--background) sticky top-0 z-20" />
      <Services />
      <Appointments />
      <About />
      <Testimonials />
    </main>
  );
}
