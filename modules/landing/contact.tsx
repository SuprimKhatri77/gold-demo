import { useState } from "react";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";

const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = (node: HTMLElement | null) => {
    if (node) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 },
      );
      observer.observe(node);
    }
  };
  return { ref, isVisible };
};

export const Contact: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-black relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-linear-to-b from-zinc-950 via-black to-zinc-950"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 md:w-12 bg-linear-to-r from-transparent to-white/20"></div>
            <span className="text-zinc-400 font-medium tracking-wider uppercase text-xs md:text-sm flex items-center gap-2">
              <MessageCircle size={16} className="text-amber-500" />
              Get In Touch
            </span>
            <div className="h-px w-8 md:w-12 bg-linear-to-l from-transparent to-white/20"></div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight text-white">
            Let&apos;s Start a
            <span className="block bg-linear-to-r from-amber-500 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Conversation
            </span>
          </h2>

          <p className="text-zinc-400 text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4">
            Our gold specialists are here to answer your questions and help you
            find the perfect pieces for your collection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {[
            {
              icon: Phone,
              title: "Call Us",
              info: "+1 (234) 567-8900",
              subtext: "Mon-Fri, 9AM-6PM EST",
              link: "tel:+12345678900",
            },
            {
              icon: Mail,
              title: "Email Us",
              info: "contact@goldpremium.com",
              subtext: "We'll respond within 24 hours",
              link: "mailto:contact@goldpremium.com",
            },
            {
              icon: MapPin,
              title: "Visit Us",
              info: "123 Gold Street, NYC 10001",
              subtext: "By appointment only",
              link: "#",
            },
          ].map((contact, index) => (
            <a
              key={index}
              href={contact.link}
              className={`group bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-white/10 hover:border-amber-500/30 transition-all duration-500 transform hover:-translate-y-2 hover:bg-white/10 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-linear-to-br from-white/10 to-white/5 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-amber-500/30 transition-all duration-300 group-hover:scale-110 transform">
                <contact.icon size={24} className="text-amber-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-amber-500 transition-colors">
                {contact.title}
              </h3>
              <p className="text-lg md:text-xl font-semibold text-white/90 mb-2">
                {contact.info}
              </p>
              <p className="text-sm md:text-base text-zinc-400">
                {contact.subtext}
              </p>
            </a>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl md:rounded-3xl border border-white/10 p-6 md:p-10 lg:p-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-white">
            Send Us a Message
          </h3>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none transition-colors text-white placeholder:text-zinc-500 backdrop-blur-sm"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none transition-colors text-white placeholder:text-zinc-500 backdrop-blur-sm"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none transition-colors text-white placeholder:text-zinc-500 backdrop-blur-sm"
            />
            <input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              className="px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none transition-colors text-white placeholder:text-zinc-500 backdrop-blur-sm"
            />
            <textarea
              placeholder="Your Message"
              rows={6}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className="md:col-span-2 px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none transition-colors text-white placeholder:text-zinc-500 resize-none backdrop-blur-sm"
            ></textarea>
            <button
              onClick={handleSubmit}
              className="md:col-span-2  group bg-linear-to-r from-amber-700 to-amber-600 text-black px-8 md:px-10 py-4 md:py-5 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-bold text-base md:text-lg transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
            >
              Send Message
              <Send
                size={24}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
