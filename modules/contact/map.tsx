import { MapPin, Phone } from "lucide-react";

export const MapSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-linear-to-b from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
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

      {/* Floating orbs */}
      <div className="absolute top-0 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-linear-to-r from-transparent to-blue-400/40" />
            <span className="text-zinc-400 font-semibold tracking-wider uppercase text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              Our Location
            </span>
            <div className="h-px w-12 bg-linear-to-l from-transparent to-blue-400/40" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Visit Our Office
          </h2>
          <p className="text-zinc-400 text-lg">
            Schedule an appointment for in-person consultations
          </p>
        </div>

        <div className="rounded-xs overflow-hidden border border-white/10 backdrop-blur-xl shadow-2xl shadow-blue-500/10 hover:border-blue-400/30 transition-all duration-500">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3607.9657973212693!2d55.296242975317845!3d25.27173597766311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDE2JzE4LjMiTiA1NcKwMTcnNTUuNyJF!5e0!3m2!1sen!2snp!4v1769699151866!5m2!1sen!2snp"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location Map"
            className="w-full h-80 md:h-96 lg:h-125"
          />
        </div>

        {/* Call to Action under map */}
        <div className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 text-center hover:border-blue-400/30 transition-all duration-300">
          <p className="text-zinc-400 mb-4">
            <span className="text-white font-semibold">Planning a visit?</span>{" "}
            Contact us to schedule an appointment with our metals trading
            specialists.
          </p>
          <a
            href="tel:+15551234567"
            className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-6 py-3  font-semibold transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1"
          >
            <Phone className="w-5 h-5" />
            Schedule Appointment
          </a>
        </div>
      </div>
    </section>
  );
};
