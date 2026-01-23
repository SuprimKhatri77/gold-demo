import { CheckCircle } from "lucide-react";

export const TrustSection: React.FC = () => {
  const trustPoints = [
    {
      title: "24-Hour Response Time",
      description:
        "We typically respond to all inquiries within one business day",
    },
    {
      title: "Trusted by Thousands",
      description:
        "Join over 50,000 satisfied investors who trust us with their precious metals",
    },
    {
      title: "Expert Guidance",
      description:
        "Our team has over 100 years of combined experience in precious metals",
    },
  ];

  return (
    <section className="py-12 md:py-16 px-4 bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
            Why Contact Us?
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Experience the difference of working with industry-leading precious
            metals experts
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {trustPoints.map((point, index) => (
            <div key={index} className="text-center group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-amber-500/10 backdrop-blur-md border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500/20 group-hover:border-amber-500/30 transition-all duration-300 group-hover:scale-110">
                <CheckCircle className="w-7 h-7 md:w-8 md:h-8 text-amber-500/70" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                {point.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
