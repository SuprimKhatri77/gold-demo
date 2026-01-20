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
      icon: <MapPin className="w-6 h-6" />,
      label: "Office Address",
      value: "123 Gold Exchange Street, Financial District, New York, NY 10005",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+1 (800) 555-GOLD",
      href: "tel:+18005554653",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "info@premiumgold.com",
      href: "mailto:info@premiumgold.com",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Business Hours",
      value: "Monday - Friday: 9:00 AM - 6:00 PM EST",
    },
  ];

  return (
    <section className="py-12 px-4 bg-linear-to-br from-gray-50 to-amber-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl  font-bold text-gray-900 mb-3">
            Contact Information
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Reach out to us through any of the following channels
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {contactItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start">
                <div className="shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                  {item.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    {item.label}
                  </h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-gray-900 font-medium hover:text-amber-600 transition"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-900 font-medium">{item.value}</p>
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
