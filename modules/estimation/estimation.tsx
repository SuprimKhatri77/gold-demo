"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TabType = "buy" | "sell";

type Product = "Gold Bar" | "Silver Bar" | "Platinum Bar" | "Palladium Bar";

type WeightUnit = "g" | "oz" | "kg";

interface FormData {
  email: string;
  phone: string;
  product: Product | "";
  weight: string;
  weightUnit: WeightUnit;
  purity: string;
}

interface FormErrors {
  email?: string;
  phone?: string;
  product?: string;
  weight?: string;
  purity?: string;
}

type SubmissionState = "idle" | "loading" | "success" | "error";

const products: Product[] = [
  "Gold Bar",
  "Silver Bar",
  "Platinum Bar",
  "Palladium Bar",
];
const weightUnits: { value: WeightUnit; label: string }[] = [
  { value: "g", label: "Gram (g)" },
  { value: "oz", label: "Ounce (oz)" },
  { value: "kg", label: "Kilogram (kg)" },
];

const features = [
  {
    title: "Expert Valuation",
    description:
      "Our certified specialists provide accurate market-based estimations",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    title: "Fast Response",
    description: "Receive your detailed estimation within 24 hours",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "Transparent Process",
    description: "Clear breakdown of pricing factors and current market rates",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
];

const steps = [
  {
    number: "01",
    title: "Submit Details",
    description: "Fill out the estimation form with your product information",
  },
  {
    number: "02",
    title: "Expert Review",
    description:
      "Our team analyzes current market rates and your specifications",
  },
  {
    number: "03",
    title: "Receive Quote",
    description: "Get a detailed estimation via email with no obligations",
  },
];

const faqs = [
  {
    question: "How accurate are your estimations?",
    answer:
      "Our estimations are based on real-time market data and consider purity, weight, and current precious metal spot prices.",
  },
  {
    question: "Is there a fee for estimation?",
    answer:
      "No, all estimation requests are completely free with no obligations to proceed.",
  },
  {
    question: "What information do I need to provide?",
    answer:
      "We need the product type, weight, purity level, and your contact details to provide an accurate estimation.",
  },
];

export default function Estimation() {
  const [activeTab, setActiveTab] = useState<TabType>("buy");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "",
    product: "",
    weight: "",
    weightUnit: "g",
    purity: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (
      !phoneRegex.test(formData.phone) ||
      formData.phone.replace(/\D/g, "").length < 10
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.product) {
      newErrors.product = "Please select a product";
    }

    if (!formData.weight) {
      newErrors.weight = "Weight is required";
    } else if (isNaN(Number(formData.weight)) || Number(formData.weight) <= 0) {
      newErrors.weight = "Please enter a valid weight";
    }

    if (!formData.purity) {
      newErrors.purity = "Purity is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmissionState("loading");

    const subject =
      activeTab === "buy"
        ? "Buying Estimation Request"
        : "Selling Estimation Request";

    const body = `
Estimation Request

Type: ${activeTab === "buy" ? "Buying" : "Selling"}

Contact Information:
- Email: ${formData.email}
- Phone: ${formData.phone}

Product Details:
- Product: ${formData.product}
- Weight: ${formData.weight} ${formData.weightUnit}
- Purity: ${formData.purity}

Please respond with an estimation at your earliest convenience.
    `.trim();

    try {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@example.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.open(gmailUrl, "_blank");

      setSubmissionState("success");

      setTimeout(() => {
        setFormData({
          email: "",
          phone: "",
          product: "",
          weight: "",
          weightUnit: "g",
          purity: "",
        });
        setSubmissionState("idle");
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionState("error");
      setTimeout(() => setSubmissionState("idle"), 3000);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-zinc-900/50 to-black pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Professional Precious Metal
              <span className="block mt-2 bg-linear-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
                Estimations
              </span>
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed">
              Get accurate, market-based valuations for your precious metals
              from our certified specialists. Whether you&apos;re buying or
              selling, we provide transparent pricing you can trust.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mt-16"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-zinc-950/50 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="text-zinc-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Form */}
          <div className="lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                Request Your Estimation
              </h2>

              {/* Tabs */}
              <div className="relative bg-zinc-950/50 backdrop-blur-md rounded-2xl p-2 mb-6 border border-white/10">
                <div className="grid grid-cols-2 gap-2 relative">
                  <motion.div
                    className="absolute inset-y-0 bg-white/10 rounded-lg border border-white/20"
                    initial={false}
                    animate={{
                      x: activeTab === "buy" ? 0 : "100%",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ width: "calc(50% - 4px)" }}
                  />

                  <button
                    type="button"
                    onClick={() => setActiveTab("buy")}
                    className={`relative z-10 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                      activeTab === "buy"
                        ? "text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                    aria-pressed={activeTab === "buy"}
                  >
                    Buy
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("sell")}
                    className={`relative z-10 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                      activeTab === "sell"
                        ? "text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                    aria-pressed={activeTab === "sell"}
                  >
                    Sell
                  </button>
                </div>
              </div>

              {/* Form */}
              <div className="bg-zinc-950/50 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <AnimatePresence mode="wait">
                  <motion.form
                    key={activeTab}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`w-full bg-zinc-900/50 border ${
                          errors.email ? "border-red-500/50" : "border-white/10"
                        } rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all duration-200`}
                        placeholder="your@email.com"
                        disabled={submissionState === "loading"}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className={`w-full bg-zinc-900/50 border ${
                          errors.phone ? "border-red-500/50" : "border-white/10"
                        } rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all duration-200`}
                        placeholder="+1 (555) 123-4567"
                        disabled={submissionState === "loading"}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="product"
                        className="block text-sm font-medium mb-2"
                      >
                        Product Type
                      </label>
                      <select
                        id="product"
                        value={formData.product}
                        onChange={(e) =>
                          handleInputChange("product", e.target.value)
                        }
                        className={`w-full bg-zinc-900/50 border ${
                          errors.product
                            ? "border-red-500/50"
                            : "border-white/10"
                        } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all duration-200 cursor-pointer`}
                        disabled={submissionState === "loading"}
                      >
                        <option value="" className="bg-zinc-900">
                          Select a product
                        </option>
                        {products.map((product) => (
                          <option
                            key={product}
                            value={product}
                            className="bg-zinc-900"
                          >
                            {product}
                          </option>
                        ))}
                      </select>
                      {errors.product && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.product}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="weight"
                        className="block text-sm font-medium mb-2"
                      >
                        Weight
                      </label>
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <input
                            type="text"
                            id="weight"
                            value={formData.weight}
                            onChange={(e) =>
                              handleInputChange("weight", e.target.value)
                            }
                            className={`w-full bg-zinc-900/50 border ${
                              errors.weight
                                ? "border-red-500/50"
                                : "border-white/10"
                            } rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all duration-200`}
                            placeholder="0.00"
                            disabled={submissionState === "loading"}
                          />
                          {errors.weight && (
                            <p className="mt-1 text-sm text-red-400">
                              {errors.weight}
                            </p>
                          )}
                        </div>

                        <select
                          value={formData.weightUnit}
                          onChange={(e) =>
                            handleInputChange("weightUnit", e.target.value)
                          }
                          className="bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all duration-200 cursor-pointer min-w-30"
                          disabled={submissionState === "loading"}
                          aria-label="Weight unit"
                        >
                          {weightUnits.map((unit) => (
                            <option
                              key={unit.value}
                              value={unit.value}
                              className="bg-zinc-900"
                            >
                              {unit.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="purity"
                        className="block text-sm font-medium mb-2"
                      >
                        Purity
                      </label>
                      <input
                        type="text"
                        id="purity"
                        value={formData.purity}
                        onChange={(e) =>
                          handleInputChange("purity", e.target.value)
                        }
                        className={`w-full bg-zinc-900/50 border ${
                          errors.purity
                            ? "border-red-500/50"
                            : "border-white/10"
                        } rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all duration-200`}
                        placeholder="e.g., 99.99%, 24K, 999"
                        disabled={submissionState === "loading"}
                      />
                      {errors.purity && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.purity}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={
                        submissionState === "loading" ||
                        submissionState === "success"
                      }
                      className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 ${
                        submissionState === "success"
                          ? "bg-green-600 text-white"
                          : submissionState === "error"
                            ? "bg-red-600 text-white"
                            : submissionState === "loading"
                              ? "bg-zinc-800 text-zinc-400 cursor-not-allowed"
                              : "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-amber-500/50"
                      }`}
                    >
                      {submissionState === "loading" && "Processing..."}
                      {submissionState === "success" && "✓ Request Sent"}
                      {submissionState === "error" &&
                        "Error - Please Try Again"}
                      {submissionState === "idle" &&
                        `Request ${activeTab === "buy" ? "Buying" : "Selling"} Estimation`}
                    </button>

                    {submissionState === "success" && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-sm text-zinc-400"
                      >
                        Gmail will open in a new tab. Please send the email to
                        complete your request.
                      </motion.p>
                    )}
                  </motion.form>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Process & FAQs */}
          <div className="space-y-12">
            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-8">How It Works</h2>
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-6 group">
                    <div className="shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-linear-to-br from-zinc-900 to-zinc-950 border border-white/10 flex items-center justify-center font-bold text-amber-500 group-hover:border-amber-500/50 transition-all duration-300">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-xl font-semibold mb-2">
                        {step.title}
                      </h3>
                      <p className="text-zinc-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-zinc-950/50 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300"
                  >
                    <button
                      onClick={() =>
                        setOpenFaq(openFaq === index ? null : index)
                      }
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                    >
                      <span className="font-semibold text-lg">
                        {faq.question}
                      </span>
                      <svg
                        className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                          openFaq === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-5 text-zinc-400 border-t border-white/10 pt-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-linear-to-br from-zinc-900 to-zinc-950 rounded-2xl p-8 border border-white/10 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-zinc-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Secure & Confidential
              </h3>
              <p className="text-zinc-400">
                All estimation requests are handled with complete
                confidentiality. Your information is never shared with third
                parties.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-linear-to-r from-zinc-900 to-zinc-950 rounded-2xl p-12 border border-white/10 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Your Estimation?
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for accurate
            precious metal valuations. No obligations, completely free.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Free Estimation</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>24hr Response</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>No Obligations</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
