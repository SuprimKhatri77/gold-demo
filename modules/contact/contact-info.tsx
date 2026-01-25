import { companyDetails } from "@/utils/info/details";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

interface ContactInfoItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}
export const ContactInformation: React.FC = () => {
  const contactItems: ContactInfoItem[] = [
    {
      icon: <MapPin className="w-6 h-6 group-hover:text-amber-500" />,
      label: "Office Address",
      value: `${companyDetails.longAddress}`,
    },
    {
      icon: <Phone className="w-6 h-6 group-hover:text-amber-500" />,
      label: "Phone",
      value: `${companyDetails.phoneNumber}`,
      href: `tel:${companyDetails.phoneNumber}`,
    },
    {
      icon: <Mail className="w-6 h-6 group-hover:text-amber-500" />,
      label: "Email",
      value: `${companyDetails.email}`,
      href: `mailto:${companyDetails.email}`,
    },
    {
      icon: <Clock className="w-6 h-6 group-hover:text-amber-500" />,
      label: "Business Hours",
      value: "Monday - Friday: 9:00 AM - 6:00 PM EST",
    },
  ];

  return (
    <section className="py-12 md:py-16 px-4 bg-linear-to-br from-zinc-950 via-black to-zinc-950 border-y border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
            Contact Information
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Reach out to us through any of the following channels
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {contactItems.map((item, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-md rounded-lg md:rounded-xl border border-white/10 p-5 md:p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-white bg-white/10 backdrop-blur-md border border-white/20 p-3 transition-color duration-150 group-hover:bg-amber-400/20 group-hover:border-amber-400/30">
                  {item.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-xs md:text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-1">
                    {item.label}
                  </h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white text-sm md:text-base font-medium hover:text-amber-500 transition-colors duration-300"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white text-sm md:text-base font-medium">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
