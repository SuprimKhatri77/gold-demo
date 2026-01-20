import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useScrollAnimation } from "./landing";

export const Contact: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="contact"
      className="py-28 bg-linear-to-b from-white to-gray-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-1 w-12 bg-linear-to-r from-transparent to-amber-400"></div>
            <span className="text-amber-600 font-bold tracking-wider uppercase text-sm flex items-center gap-2">
              <MessageCircle size={16} className="animate-pulse" />
              Get In Touch
            </span>
            <div className="h-1 w-12 bg-linear-to-l from-transparent to-amber-400"></div>
          </div>

          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Let&apos;s Start a
            <span className="block bg-linear-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
              Conversation
            </span>
          </h2>

          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Our gold specialists are here to answer your questions and help you
            find the perfect pieces for your collection.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
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
              subtext: "We&apos;ll respond within 24 hours",
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
              className={`group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-gray-100 hover:border-amber-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-linear-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-all duration-300 group-hover:scale-110 transform text-white">
                <contact.icon size={28} />
              </div>
              <h3 className="text-2xl font-black mb-3 group-hover:text-amber-600 transition-colors">
                {contact.title}
              </h3>
              <p className="text-xl font-bold text-gray-900 mb-2">
                {contact.info}
              </p>
              <p className="text-gray-600">{contact.subtext}</p>
            </a>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
          <h3 className="text-3xl font-black mb-8 text-center">
            Send Us a Message
          </h3>
          <form className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-amber-400 focus:outline-none transition-colors font-medium"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-amber-400 focus:outline-none transition-colors font-medium"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-amber-400 focus:outline-none transition-colors font-medium"
            />
            <input
              type="text"
              placeholder="Subject"
              className="px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-amber-400 focus:outline-none transition-colors font-medium"
            />
            <textarea
              placeholder="Your Message"
              rows={6}
              className="md:col-span-2 px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-amber-400 focus:outline-none transition-colors font-medium resize-none"
            ></textarea>
            <button
              type="submit"
              className="md:col-span-2 group bg-linear-to-r from-amber-500 to-amber-600 text-white px-10 py-5 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 font-bold text-lg transform hover:scale-105 flex items-center justify-center gap-3"
            >
              Send Message
              <Send
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
