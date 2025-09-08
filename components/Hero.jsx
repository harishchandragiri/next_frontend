"use client";

import { motion } from "framer-motion";

export default function Hero({ title, description }) {
  return (
    <section className="relative w-full bg-gradient-to-r from-blue-50 to-white py-12 md:py-20 px-4">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight"
        >
          {title}
        </motion.h1>

        {/* Animated Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl"
        >
          {description}
        </motion.p>

        {/* Call-to-Action Button */}
        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-md hover:bg-blue-700 transition"
        >
          Shop Now
        </motion.button> */}
      </div>
    </section>
  );
}
