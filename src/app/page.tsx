import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Features } from "@/components/sections/features";
import { DemoSection } from "@/components/sections/demo";
import { Pricing } from "@/components/sections/pricing";
import { Testimonial } from "@/components/sections/testimonial";
import { CtaFinal } from "@/components/sections/cta-final";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <DemoSection />
        <Pricing />
        <Testimonial />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
