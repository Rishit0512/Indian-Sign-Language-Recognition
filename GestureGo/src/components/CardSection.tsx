"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Hand, Eye, MoveRight, ScanLine, Settings } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    title: "Capture Gesture",
    description:
      "GestureGo accesses your webcam and captures real-time images of your hand gestures for analysis.",
    icon: Hand,
    img: "/imgs/1.jpg",
  },
  {
    title: "Hand Detection",
    description:
      "Using AI models like MediaPipe, the system identifies your hand and locates important landmarks like fingers, palm, and joints.",
    icon: Eye,
    img: "/imgs/2.jpg",
  },
  {
    title: "Feature Extraction",
    description:
      "The system converts hand shapes into digital vectors to enable accurate recognition.",
    icon: ScanLine,
    img: "/imgs/3.jpg",
  },
  {
    title: "Gesture Recognition",
    description:
      "Using deep learning, the system recognizes your hand gesture and predicts its meaning.",
    icon: MoveRight,
    img: "/imgs/4.jpg",
  },
  {
    title: "System Response",
    description:
      "Finally, the app responds to your gesture, performing the corresponding action like translating it to speech or text.",
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
            // Define when each card should appear based on scroll progress
            const start = index * 0.2;
            const end = start + 0.2;

            // Create individual transforms
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
