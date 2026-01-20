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
    <section className="py-16 px-4 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl  font-bold text-gray-900 mb-3">
            Why Contact Us?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the difference of working with industry-leading precious
            metals experts
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {trustPoints.map((point, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-linear-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-all group-hover:scale-110">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {point.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
