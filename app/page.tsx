import HeroSection from "@/components/hero-section";
import Services from "@/components/services";
import Appointments from "@/components/appointments";
import About from "@/components/about";
import MarqueeTicker from "@/components/marquee-ticker";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <MarqueeTicker
        items={[
          "brow lamination",
          "classic lashes",
          "volume sets",
          "hybrid lashes",
          "lash lifts",
          "brow shaping",
          "tinting",
          "henna brows",
        ]}
      />
      <Services />
      <About />
      <Appointments context="home" />
    </main>
  );
}
