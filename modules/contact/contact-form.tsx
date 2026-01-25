"use client";

import { AlertCircle, CheckCircle } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const subjectOptions = [
    "General Inquiry",
    "Investment Consultation",
    "Product Information",
    "Selling Gold/Silver",
    "Account Support",
    "Other",
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(
        `Name: ${formData.fullName}\n` +
          `Email: ${formData.email}\n` +
          `Phone: ${formData.phone || "Not provided"}\n\n` +
          `Subject: ${formData.subject}\n\n` +
          `Message:\n${formData.message}`,
      );

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@srgold.com&su=${subject}&body=${body}`;

      window.open(gmailUrl, "_blank");

      toast.success("Opening Gmail in new tab...");
      setSubmitStatus("success");

      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setErrors({});
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      toast.error("Failed to open Gmail");
      setSubmitStatus("error");
      console.error("Submission error:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 md:py-16 px-4 bg-black">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/5 backdrop-blur-md rounded-xl md:rounded-2xl border border-white/10 p-6 md:p-8 lg:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Send Us a Message
          </h2>
          <p className="text-zinc-400 mb-6 md:mb-8">
            Fill out the form below and we&apos;ll get back to you shortly.
          </p>

          <div>
            {/* Row 1: Full Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-zinc-300 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                    errors.fullName ? "border-red-500" : "border-white/10"
                  } text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all hover:bg-white/[0.07]`}
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-zinc-300 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                    errors.email ? "border-red-500" : "border-white/10"
                  } text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all hover:bg-white/[0.07]`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Row 2: Phone & Subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-zinc-300 mb-2"
                >
                  Phone Number{" "}
                  <span className="text-zinc-500 font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all hover:bg-white/[0.07]"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-zinc-300 mb-2"
                >
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                    errors.subject ? "border-red-500" : "border-white/10"
                  } text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all hover:bg-white/[0.07]`}
                >
                  <option value="" className="bg-zinc-900">
                    Select a subject
                  </option>
                  {subjectOptions.map((option) => (
                    <option key={option} value={option} className="bg-zinc-900">
                      {option}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-400">{errors.subject}</p>
                )}
              </div>
            </div>

            {/* Row 3: Message */}
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-zinc-300 mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                  errors.message ? "border-red-500" : "border-white/10"
                } text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all resize-none hover:bg-white/[0.07]`}
                placeholder="Tell us how we can help you..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-400">{errors.message}</p>
              )}
            </div>

            {/* Submit Status Messages */}
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start backdrop-blur-md">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                <div>
                  <p className="text-green-300 font-semibold">
                    Gmail opened successfully!
                  </p>
                  <p className="text-green-400/80 text-sm">
                    Please send the email from your Gmail to complete the
                    submission.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start backdrop-blur-md">
                <AlertCircle className="w-5 h-5 text-red-400 mr-3 mt-0.5 shrink-0" />
                <div>
                  <p className="text-red-300 font-semibold">
                    Something went wrong
                  </p>
                  <p className="text-red-400/80 text-sm">
                    Please try again or contact us directly at info@srgold.com
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold py-3.5 md:py-4 px-6 rounded-lg hover:bg-amber-500/20 hover:border-amber-500/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-300 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white/5"
            >
              {isSubmitting ? "Opening Gmail..." : "Send Message"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
