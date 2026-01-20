"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function AboutUsSection() {
  return (
    <section className="bg-[#faf8f5] py-20 px-6 lg:px-20 text-gray-900">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-4">
          About SR Bullion DMCC
        </h2>
        <p className="text-lg text-gray-600">
          A legacy of trust, integrity, and excellence in precious metals.
        </p>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-16 grid lg:grid-cols-2 gap-12 items-center"
      >
        {/* Image */}
        <motion.div variants={item}>
          <Image
            src="/file.svg"
            width={20}
            height={20}
            alt="SR Bullion"
            className="rounded-2xl shadow-xl w-full object-cover"
          />
        </motion.div>

        {/* Text */}
        <motion.div variants={item} className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            SR Bullion DMCC is a trusted global provider of premium precious
            metals. We are committed to quality, transparency, and customer
            satisfaction.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            Our expertise in gold, silver, and bullion trading ensures every
            product meets the highest standards of authenticity and value.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            We build long-term relationships by delivering reliability,
            innovation, and excellence in every transaction.
          </p>
        </motion.div>
      </motion.div>

      {/* Mission, Vision, Values */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        className="mt-20 grid lg:grid-cols-3 gap-10"
      >
        <motion.div variants={item} className="bg-white p-8 rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
          <p className="text-gray-600">
            To deliver financial confidence through authentic precious metals.
          </p>
        </motion.div>

        <motion.div variants={item} className="bg-white p-8 rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
          <p className="text-gray-600">
            To be a global benchmark for trust and excellence in bullion trading.
          </p>
        </motion.div>

        <motion.div variants={item} className="bg-white p-8 rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold mb-3">Our Values</h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>Integrity</li>
            <li>Quality</li>
            <li>Customer Focus</li>
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
