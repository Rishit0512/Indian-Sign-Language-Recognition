// components/GestureGoImpactSection.tsx
"use client";

import { motion } from "framer-motion";
import { Mic, BrainCog, Globe2 } from "lucide-react";

export default function GestureGoImpactSection() {
  return (
    <section className="relative bg-black text-white py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Empowering Communication through AI
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 max-w-3xl mb-12"
        >
          GestureGo bridges the gap for the dumb and deaf communities by
          translating hand gestures into spoken words and text. Powered by
          advanced AI, our platform brings their voices to the world — making
          everyday conversations easier, faster, and more inclusive.
        </motion.p>

        <div className="px-[10vw] grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Real-Time Translation",
              description:
                "Instantly converts gestures into speech or text, enabling immediate communication without barriers.",
              icon: Mic,
            },
            {
              title: "AI-Powered Learning",
              description:
                "Continuously adapts to unique gesture styles using machine learning, making it smarter over time.",
              icon: BrainCog,
            },
            {
              title: "Accessible Everywhere",
              description:
                "Designed to work seamlessly across devices, ensuring support wherever and whenever it's needed.",
              icon: Globe2,
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
              className="bg-white border-2 cursor-pointer border-[#feca2b] rounded-2xl p-8 backdrop-blur-sm hover:scale-105 transition transform duration-300"
            >
              <feature.icon size={40} className="text-[#feca2b] mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-2 text-black">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
