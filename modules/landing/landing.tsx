import { Hero } from "./hero";
import { Collection } from "./collection";
import { Quality } from "./features";
import { Testimonials } from "./testimonial";
import { CTASection } from "./cta";

const Landing: React.FC = () => {
  return (
    <main className="">
      <Hero />
      <Collection />
      <Quality />
      <Testimonials />
      <CTASection />
    </main>
  );
};

export default Landing;
