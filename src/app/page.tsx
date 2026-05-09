import { CtaFinal } from "@/components/sections/cta-final";
import { DemoSection } from "@/components/sections/demo";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Nav } from "@/components/sections/nav";
import { Pricing } from "@/components/sections/pricing";
import { Testimonial } from "@/components/sections/testimonial";

const Home = () => (
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

export default Home;
