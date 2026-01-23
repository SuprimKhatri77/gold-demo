export const MapSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
            Visit Our Office
          </h2>
          <p className="text-zinc-400">
            We welcome in-person consultations by appointment
          </p>
        </div>
        <div className="rounded-lg md:rounded-2xl overflow-hidden border border-white/10 backdrop-blur-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368459395!3d40.71312797933029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a1e2db4e5db%3A0x6b8d5c3e1e5c5e5c!2sFinancial%20District%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1234567890123"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location Map"
            className="w-full h-64 md:h-96 lg:h-112.5"
          />
        </div>
      </div>
    </section>
  );
};
