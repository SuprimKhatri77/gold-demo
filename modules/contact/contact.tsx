import { ContactHero } from "./contact-hero";
import { ContactForm } from "./contact-form";
import { ContactInformation } from "./contact-info";
import { MapSection } from "./map";
import { TrustSection } from "./trust";

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <ContactHero />
      <ContactForm />
      <ContactInformation />
      <MapSection />
      <TrustSection />
    </div>
  );
};
