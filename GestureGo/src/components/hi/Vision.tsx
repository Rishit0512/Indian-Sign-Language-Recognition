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
          एआई के माध्यम से संवाद को सशक्त बनाना
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 max-w-3xl mb-12"
        >
          GestureGo गूंगे और बहरे समुदायों के लिए एक पुल का कार्य करता है, जो
          हाथ के इशारों को बोले गए शब्दों और टेक्स्ट में अनुवाद करता है। उन्नत
          एआई द्वारा संचालित, हमारा प्लेटफ़ॉर्म उनकी आवाज़ों को दुनिया तक
          पहुँचाता है — जिससे दैनिक बातचीत आसान, तेज़ और अधिक समावेशी बनती है।
        </motion.p>

        <div className="px-[10vw] grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "रीयल-टाइम अनुवाद",
              description:
                "इशारों को तुरंत भाषण या टेक्स्ट में बदलता है, जिससे बिना किसी रुकावट के संवाद संभव होता है।",
              icon: Mic,
            },
            {
              title: "एआई-संचालित सीख",
              description:
                "मशीन लर्निंग के माध्यम से अलग-अलग इशारों की शैलियों के अनुसार स्वयं को ढालता है, जिससे यह समय के साथ और अधिक स्मार्ट होता जाता है।",
              icon: BrainCog,
            },
            {
              title: "हर जगह सुलभ",
              description:
                "सभी डिवाइसों पर सहजता से काम करने के लिए डिज़ाइन किया गया है, जिससे कहीं भी और कभी भी समर्थन सुनिश्चित होता है।",
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
