import { companyDetails } from "@/utils/info/details";
import { Clock, Mail, MapPin, Phone, Building2 } from "lucide-react";

interface ContactInfoItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

export const ContactInformation: React.FC = () => {
  const contactItems: ContactInfoItem[] = [
    {
      icon: <MapPin className="w-6 h-6 group-hover:text-cyan-400" />,
      label: "Office Address",
      value: `${companyDetails.longAddress}`,
    },
    {
      icon: <Phone className="w-6 h-6 group-hover:text-cyan-400" />,
      label: "Phone",
      value: `${companyDetails.phoneNumber}`,
      href: `tel:${companyDetails.phoneNumber}`,
    },
    {
      icon: <Mail className="w-6 h-6 group-hover:text-cyan-400" />,
      label: "Email",
      value: `${companyDetails.email}`,
      href: `mailto:${companyDetails.email}`,
    },
    {
      icon: <Clock className="w-6 h-6 group-hover:text-cyan-400" />,
      label: "Business Hours",
      value: `${companyDetails.businessHours}`,
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-linear-to-b from-slate-950 via-blue-950 to-slate-950 border-y border-white/10 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-linear-to-r from-transparent to-blue-400/40" />
            <span className="text-zinc-400 font-semibold tracking-wider uppercase text-sm flex items-center gap-2">
              <Building2 className="w-4 h-4 text-cyan-400" />
              Contact Details
            </span>
            <div className="h-px w-12 bg-linear-to-l from-transparent to-blue-400/40" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="block">Get in Touch</span>
            <span className="block bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mt-2">
              We&apos;re Here to Help
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Reach out through any of our channels for prompt assistance
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {contactItems.map((item, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8 hover:bg-white/10 hover:border-blue-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-white bg-linear-to-br from-blue-600 to-cyan-600 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs md:text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">
                    {item.label}
                  </h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white text-base md:text-lg font-semibold hover:text-cyan-400 transition-colors duration-300 block wrap-break-word"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white text-base md:text-lg font-semibold wrap-break-word">
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
