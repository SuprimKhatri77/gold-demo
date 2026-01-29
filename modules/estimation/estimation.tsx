"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Shield,
  Clock,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Calculator,
  FileText,
  Building2,
  Globe,
  Award,
  Zap,
  AlertTriangle,
} from "lucide-react";

type TabType = "buy" | "sell";

type Product = "Gold" | "Silver" | "Platinum" | "Palladium";

type WeightUnit = "g" | "oz" | "kg";

interface FormData {
  email: string;
  phone: string;
  company: string;
  product: Product | "";
  weight: string;
  weightUnit: WeightUnit;
  purity: string;
}

interface FormErrors {
  email?: string;
  phone?: string;
  company?: string;
  product?: string;
  weight?: string;
  purity?: string;
}

type SubmissionState = "idle" | "loading" | "success" | "error";

const products: { name: Product; color: string; spotPrice: number }[] = [
  { name: "Gold", color: "from-amber-500 to-yellow-500", spotPrice: 2047 },
  { name: "Silver", color: "from-slate-300 to-zinc-400", spotPrice: 23.84 },
  { name: "Platinum", color: "from-cyan-400 to-blue-500", spotPrice: 912 },
  {
    name: "Palladium",
    color: "from-purple-400 to-indigo-500",
    spotPrice: 1023,
  },
];

const weightUnits: { value: WeightUnit; label: string }[] = [
  { value: "g", label: "Gram" },
  { value: "oz", label: "Troy Oz" },
  { value: "kg", label: "Kilogram" },
];

const features = [
  {
    title: "Live Market Pricing",
    description: "Real-time spot prices with transparent premium calculations",
    icon: TrendingUp,
    color: "blue",
  },
  {
    title: "Bulk Discounts",
    description: "Volume-based pricing for large wholesale orders",
    icon: Calculator,
    color: "cyan",
  },
  {
    title: "Fast Turnaround",
    description: "Detailed quotes delivered within 2-4 business hours",
    icon: Zap,
    color: "amber",
  },
  {
    title: "Certified Quality",
    description: "LBMA certified materials with full documentation",
    icon: Award,
    color: "purple",
  },
];

const steps = [
  {
    number: "01",
    title: "Submit Requirements",
    description: "Provide your metal specifications and order quantity",
  },
  {
    number: "02",
    title: "Market Analysis",
    description: "Our team reviews current rates and availability",
  },
  {
    number: "03",
    title: "Receive Quote",
    description: "Get detailed pricing with volume discounts applied",
  },
  {
    number: "04",
    title: "Confirm & Ship",
    description: "Approve quote and receive secure delivery",
  },
];

const faqs = [
  {
    question: "What's your minimum order quantity?",
    answer:
      "Minimum orders vary by metal: Gold 100g+, Silver 5kg+, Platinum/Palladium 50g+. Contact us for custom requirements.",
  },
  {
    question: "How are quotes calculated?",
    answer:
      "Quotes are based on current spot prices plus applicable premiums, which vary based on form, purity, and order volume. Bulk orders receive significant discounts.",
  },
  {
    question: "What documentation is provided?",
    answer:
      "All shipments include assay certificates, chain of custody documentation, and LBMA certification where applicable.",
  },
  {
    question: "Do you offer credit terms?",
    answer:
      "Established business partners can apply for net payment terms after credit review. New customers typically use wire transfer or escrow.",
  },
];

export default function Estimation() {
  const [activeTab, setActiveTab] = useState<TabType>("buy");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "",
    company: "",
    product: "",
    weight: "",
    weightUnit: "kg",
    purity: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [estimatedValue, setEstimatedValue] = useState<number>(0);

  // Calculate estimated value in real-time
  useEffect(() => {
    if (formData.product && formData.weight) {
      const selectedProduct = products.find((p) => p.name === formData.product);
      if (selectedProduct) {
        let weightInOz = parseFloat(formData.weight);

        // Convert to troy ounces
        if (formData.weightUnit === "g") {
          weightInOz = weightInOz / 31.1035;
        } else if (formData.weightUnit === "kg") {
          weightInOz = (weightInOz * 1000) / 31.1035;
        }

        const value = weightInOz * selectedProduct.spotPrice;
        setEstimatedValue(value);
      }
    } else {
      setEstimatedValue(0);
    }
  }, [formData.product, formData.weight, formData.weightUnit]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Business email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!formData.phone) {
      newErrors.phone = "Contact number is required";
    } else if (
      !phoneRegex.test(formData.phone) ||
      formData.phone.replace(/\D/g, "").length < 10
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!formData.product) {
      newErrors.product = "Please select a metal";
    }

    if (!formData.weight) {
      newErrors.weight = "Quantity is required";
    } else if (isNaN(Number(formData.weight)) || Number(formData.weight) <= 0) {
      newErrors.weight = "Please enter a valid quantity";
    }

    if (!formData.purity) {
      newErrors.purity = "Purity specification is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmissionState("loading");

    const subject = `${activeTab === "buy" ? "Bulk Purchase" : "Wholesale Selling"} Quote Request - ${formData.product}`;

    const body = `
Wholesale Quote Request

Type: ${activeTab === "buy" ? "Purchase Order" : "Selling Inquiry"}

Company Information:
- Company: ${formData.company}
- Contact Email: ${formData.email}
- Phone: ${formData.phone}

Order Details:
- Metal: ${formData.product}
- Quantity: ${formData.weight} ${formData.weightUnit}
- Purity: ${formData.purity}
- Estimated Value: $${estimatedValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}

Please provide a detailed quote including:
- Current market pricing
- Applicable volume discounts
- Available forms and delivery options
- Payment terms

Looking forward to your response.
    `.trim();

    try {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@srgold.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.open(gmailUrl, "_blank");

      setSubmissionState("success");

      setTimeout(() => {
        setFormData({
          email: "",
          phone: "",
          company: "",
          product: "",
          weight: "",
          weightUnit: "kg",
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
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="fixed top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="fixed bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-400/40 transition-all duration-300 group mb-8">
              <Calculator className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm text-zinc-300 font-semibold">
                Wholesale Price Calculator
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block text-white">Get Instant Wholesale</span>
              <span className="block bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mt-2">
                Precious Metals Quotes
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed">
              Real-time market pricing for bulk orders. Competitive rates,
              transparent premiums, and volume discounts for B2B partners.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl p-6 border border-white/10 hover:border-blue-400/40 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div
                    className={`w-12 h-12 bg-linear-to-br from-${feature.color}-600 to-${feature.color === "amber" ? "yellow" : feature.color}-600 rounded-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Left Column - Form (3 columns) */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Request Your Quote
              </h2>

              {/* Tabs */}
              <div className="relative bg-white/5 backdrop-blur-xl  p-2 mb-6 border border-white/10">
                <div className="grid grid-cols-2 gap-2 relative">
                  <motion.div
                    className="absolute inset-y-0 bg-linear-to-r from-blue-600 to-cyan-600  shadow-lg shadow-blue-500/30"
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
                    className={`relative z-10 py-3.5 font-bold transition-colors duration-200 ${
                      activeTab === "buy"
                        ? "text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Buy Wholesale
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("sell")}
                    className={`relative z-10 py-3.5 font-bold transition-colors duration-200 ${
                      activeTab === "sell"
                        ? "text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Sell Wholesale
                  </button>
                </div>
              </div>

              {/* Form */}
              <div className="bg-white/5 backdrop-blur-xl p-6 md:p-8 border border-white/10 hover:border-blue-400/30 transition-all duration-500">
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
                    {/* Company Name */}
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-semibold text-zinc-300 mb-2"
                      >
                        Company Name *
                      </label>
                      <input
                        type="text"
                        id="company"
                        value={formData.company}
                        onChange={(e) =>
                          handleInputChange("company", e.target.value)
                        }
                        className={`w-full bg-white/5 border ${
                          errors.company
                            ? "border-red-500"
                            : "border-white/10 hover:border-blue-400/40"
                        } rounded-xs px-4 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-200`}
                        placeholder="Your Company Ltd."
                        disabled={submissionState === "loading"}
                      />
                      {errors.company && (
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                          <span>
                            <AlertTriangle />
                          </span>{" "}
                          {errors.company}
                        </p>
                      )}
                    </div>

                    {/* Email & Phone Row */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold text-zinc-300 mb-2"
                        >
                          Business Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className={`w-full bg-white/5 border ${
                            errors.email
                              ? "border-red-500"
                              : "border-white/10 hover:border-blue-400/40"
                          } rounded-xs px-4 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-200`}
                          placeholder="contact@company.com"
                          disabled={submissionState === "loading"}
                        />
                        {errors.email && (
                          <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                            <span>
                              <AlertTriangle />
                            </span>{" "}
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-semibold text-zinc-300 mb-2"
                        >
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className={`w-full bg-white/5 border ${
                            errors.phone
                              ? "border-red-500"
                              : "border-white/10 hover:border-blue-400/40"
                          } rounded-xs px-4 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-200`}
                          placeholder="+1 (555) 123-4567"
                          disabled={submissionState === "loading"}
                        />
                        {errors.phone && (
                          <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                            <span>
                              <AlertTriangle />
                            </span>{" "}
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Product Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-zinc-300 mb-3">
                        Select Metal *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {products.map((product) => (
                          <button
                            key={product.name}
                            type="button"
                            onClick={() =>
                              handleInputChange("product", product.name)
                            }
                            className={`p-4 border-2 transition-all duration-300 ${
                              formData.product === product.name
                                ? `border-${product.color.split("-")[1]}-500 bg-${product.color.split("-")[1]}-500/10`
                                : "border-white/10 bg-white/5 hover:border-blue-400/40"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white">
                                {product.name}
                              </span>
                              <Sparkles
                                className={`w-4 h-4 ${formData.product === product.name ? `text-${product.color.split("-")[1]}-400` : "text-zinc-500"}`}
                              />
                            </div>
                            <div className="text-left mt-2">
                              <span className="text-xs text-zinc-500">
                                Spot Price
                              </span>
                              <div
                                className={`text-lg font-bold bg-linear-to-r ${product.color} bg-clip-text text-transparent`}
                              >
                                ${product.spotPrice}/oz
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                      {errors.product && (
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                          <span>
                            <AlertTriangle />
                          </span>{" "}
                          {errors.product}
                        </p>
                      )}
                    </div>

                    {/* Weight Input */}
                    <div>
                      <label
                        htmlFor="weight"
                        className="block text-sm font-semibold text-zinc-300 mb-2"
                      >
                        Quantity *
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
                            className={`w-full bg-white/5 border ${
                              errors.weight
                                ? "border-red-500"
                                : "border-white/10 hover:border-blue-400/40"
                            } rounded-xs px-4 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-200`}
                            placeholder="100"
                            disabled={submissionState === "loading"}
                          />
                        </div>

                        <select
                          value={formData.weightUnit}
                          onChange={(e) =>
                            handleInputChange("weightUnit", e.target.value)
                          }
                          className="bg-white/5 border border-white/10 hover:border-blue-400/40 rounded-xs px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-200 cursor-pointer min-w-32"
                          disabled={submissionState === "loading"}
                        >
                          {weightUnits.map((unit) => (
                            <option
                              key={unit.value}
                              value={unit.value}
                              className="bg-slate-950"
                            >
                              {unit.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.weight && (
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                          <span>
                            <AlertTriangle />
                          </span>{" "}
                          {errors.weight}
                        </p>
                      )}
                    </div>

                    {/* Purity */}
                    <div>
                      <label
                        htmlFor="purity"
                        className="block text-sm font-semibold text-zinc-300 mb-2"
                      >
                        Purity Requirement *
                      </label>
                      <input
                        type="text"
                        id="purity"
                        value={formData.purity}
                        onChange={(e) =>
                          handleInputChange("purity", e.target.value)
                        }
                        className={`w-full bg-white/5 border ${
                          errors.purity
                            ? "border-red-500"
                            : "border-white/10 hover:border-blue-400/40"
                        } rounded-xs px-4 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-200`}
                        placeholder="e.g., 99.99%, .9999, 24K"
                        disabled={submissionState === "loading"}
                      />
                      {errors.purity && (
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                          <span>
                            <AlertTriangle />
                          </span>{" "}
                          {errors.purity}
                        </p>
                      )}
                    </div>

                    {/* Estimated Value Display */}
                    {estimatedValue > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-linear-to-r from-blue-600/20 to-cyan-600/20 border border-blue-400/30 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-zinc-400">
                            Estimated Market Value
                          </span>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">
                              $
                              {estimatedValue.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </div>
                            <div className="text-xs text-zinc-500">
                              Based on spot price
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={
                        submissionState === "loading" ||
                        submissionState === "success"
                      }
                      className={`group w-full py-4 font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                        submissionState === "success"
                          ? "bg-green-600 text-white"
                          : submissionState === "error"
                            ? "bg-red-600 text-white"
                            : submissionState === "loading"
                              ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                              : "bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                      }`}
                    >
                      {submissionState === "loading" && (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                      )}
                      {submissionState === "success" &&
                        "✓ Request Sent Successfully"}
                      {submissionState === "error" &&
                        "Error - Please Try Again"}
                      {submissionState === "idle" && (
                        <>
                          <FileText className="w-5 h-5" />
                          Request {activeTab === "buy"
                            ? "Purchase"
                            : "Selling"}{" "}
                          Quote
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
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

          {/* Right Column - Info (2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <Globe className="w-6 h-6 text-cyan-400" />
                How It Works
              </h3>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-sm bg-linear-to-br from-blue-600 to-cyan-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="font-bold text-white mb-1">
                        {step.title}
                      </h4>
                      <p className="text-sm text-zinc-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-linear-to-br from-blue-600/20 to-cyan-600/20 p-6 border border-blue-400/30"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-cyan-600 rounded-sm flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">
                    Trusted B2B Partner
                  </h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    All quotes are confidential and based on real-time market
                    data. LBMA certified materials with full documentation.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-xl p-4 border border-white/10 text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-1">
                  2-4h
                </div>
                <div className="text-xs text-zinc-400">Quote Response</div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl p-4 border border-white/10 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  500+
                </div>
                <div className="text-xs text-zinc-400">Active Partners</div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-400 text-lg">
              Common questions about wholesale precious metals trading
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden hover:border-blue-400/40 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-lg text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-cyan-400 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 bg-white/5 backdrop-blur-xl rounded-2xl p-12 border border-white/10 text-center hover:border-blue-400/30 transition-all duration-500"
        >
          <Building2 className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Partner With Us?
          </h3>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses worldwide who trust us for reliable
            precious metals supply at competitive wholesale rates.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 text-zinc-400">
              <Shield className="w-5 h-5 text-green-400" />
              <span>LBMA Certified</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <Clock className="w-5 h-5 text-blue-400" />
              <span>Fast Quotes</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <span>Volume Discounts</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
