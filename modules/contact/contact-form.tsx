"use client";

import { AlertCircle, CheckCircle, Send } from "lucide-react";
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
    "Bulk Order Inquiry",
    "Custom Quote Request",
    "Partnership Opportunity",
    "Product Specifications",
    "Delivery & Logistics",
    "Account Management",
    "General Business Inquiry",
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
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-10 lg:p-12 hover:border-blue-400/30 transition-all duration-500">
          {/* Header */}
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Send Us a Message
            </h2>
            <p className="text-zinc-400 text-lg">
              Fill out the form below and our team will respond within 24 hours
            </p>
          </div>

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
                  className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border ${
                    errors.fullName
                      ? "border-red-500"
                      : "border-white/10 hover:border-blue-400/40"
                  } text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all`}
                  placeholder="John Smith"
                />
                {errors.fullName && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.fullName}
                  </p>
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
                  className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border ${
                    errors.email
                      ? "border-red-500"
                      : "border-white/10 hover:border-blue-400/40"
                  } text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all`}
                  placeholder="john@company.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
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
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/40 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all"
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
                  className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border ${
                    errors.subject
                      ? "border-red-500"
                      : "border-white/10 hover:border-blue-400/40"
                  } text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all`}
                >
                  <option value="" className="bg-slate-950">
                    Select a subject
                  </option>
                  {subjectOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                      className="bg-slate-950"
                    >
                      {option}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.subject}
                  </p>
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
                className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border ${
                  errors.message
                    ? "border-red-500"
                    : "border-white/10 hover:border-blue-400/40"
                } text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all resize-none`}
                placeholder="Tell us about your precious metals requirements, order quantities, or any specific questions..."
              />
              {errors.message && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Status Messages */}
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-start backdrop-blur-md">
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
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start backdrop-blur-md">
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
              className="group w-full bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-4 md:py-5 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Opening Gmail...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </>
              )}
            </button>

            <p className="text-center text-sm text-zinc-500 mt-4">
              We typically respond to all inquiries within 24 business hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
