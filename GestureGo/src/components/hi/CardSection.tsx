"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Hand, Eye, MoveRight, ScanLine, Settings } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    title: "हावभाव कैप्चर करें",
    description:
      "GestureGo आपके वेबकैम का उपयोग करता है और विश्लेषण के लिए आपके हाथ के इशारों की रीयल-टाइम छवियां कैप्चर करता है।",
    icon: Hand,
    img: "/imgs/1.jpg",
  },
  {
    title: "हाथ की पहचान",
    description:
      "MediaPipe जैसे AI मॉडल का उपयोग करके, सिस्टम आपके हाथ की पहचान करता है और उंगलियों, हथेली और जोड़ों जैसे महत्वपूर्ण बिंदुओं को ट्रैक करता है।",
    icon: Eye,
    img: "/imgs/2.jpg",
  },
  {
    title: "फ़ीचर निष्कर्षण",
    description:
      "सिस्टम हाथ की आकृतियों को डिजिटल वेक्टर में बदलता है ताकि सटीक पहचान सुनिश्चित की जा सके।",
    icon: ScanLine,
    img: "/imgs/3.jpg",
  },
  {
    title: "हावभाव की पहचान",
    description:
      "डीप लर्निंग का उपयोग करके, सिस्टम आपके हाथ के इशारे को पहचानता है और उसके अर्थ की भविष्यवाणी करता है।",
    icon: MoveRight,
    img: "/imgs/4.jpg",
  },
  {
    title: "सिस्टम प्रतिक्रिया",
    description:
      "अंत में, ऐप आपके इशारे के अनुसार प्रतिक्रिया करता है, जैसे उसे आवाज़ या टेक्स्ट में बदलना।",
    icon: Settings,
    img: "/imgs/5.jpg",
  },
];

export default function CardSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative w-full h-[500vh] bg-black">
      <div className="sticky top-0 flex items-center justify-center h-screen">
        <div className="relative w-full max-w-4xl flex flex-col items-center justify-center">
          {steps.map((step, index) => {
            const start = index * 0.2;
            const end = start + 0.2;

            const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
            const translateY = useTransform(
              scrollYProgress,
              [start, end],
              ["100%", "0%"]
            );
            const scale = useTransform(
              scrollYProgress,
              [start, end],
              [0.95, 1]
            );

            return (
              <motion.div
                key={index}
                style={{ opacity, y: translateY, scale }}
                className="absolute w-full bg-white rounded-2xl max-w-xl shadow-2xl text-center grid grid-cols-2"
              >
                <div className="flex justify-center">
                  <Image
                    src={step.img}
                    alt="Gesture"
                    width={240}
                    height={240}
                    className="w-full rounded-l-2xl object-cover"
                  />
                </div>
                <div className="text-center mt-2 p-2 flex flex-col items-center justify-center">
                  <step.icon size={36} className="text-black mb-2" />
                  <h2 className="text-2xl font-bold mb-2 text-gray-900">
                    {step.title}
                  </h2>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
