"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";

const paragraphs = [
  <>
    <span className="text-6xl font-bold">Namaste</span> is more than a greeting
    — it’s a way to show respect and connection. On GestureGo, users can easily
    express gratitude, warmth, and acknowledgment through a simple Namaste
    gesture, helping them communicate feelings without speaking a word.
  </>,
  <>
    <span className="text-6xl font-bold">Hello</span> is the start of every
    conversation. With GestureGo, a friendly wave of the hand is instantly
    recognized and translated, allowing deaf and mute individuals to greet
    others confidently and start interactions smoothly.
  </>,
  <>
    Saying <span className="text-6xl font-bold">Yes</span> is just as important
    as saying it out loud. Through a quick thumbs-up gesture, GestureGo detects
    and translates it into agreement or approval, making daily conversations
    faster, easier, and more natural.
  </>,
  <>
    When something isn’t right, a <span className="text-6xl font-bold">No</span>{" "}
    needs to be said clearly. GestureGo captures the thumbs-down gesture and
    helps users refuse politely, ensuring they can express choices and
    preferences independently.
  </>,
];

const images = [
  "/imgs/personNa.png",
  "/imgs/personHe.png",
  "/imgs/personYe.png",
  "/imgs/personNo.png",
];

const bgColors = ["#feca2b", "#a4d92c", "#1dd4cb", "#ffaf03"];

export default function Sign() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) {
      setActiveIndex(0);
    } else if (latest >= 0.25 && latest < 0.5) {
      setActiveIndex(1);
    } else if (latest >= 0.5 && latest < 0.75) {
      setActiveIndex(2);
    } else {
      setActiveIndex(3);
    }
  });

  return (
    <section ref={containerRef} className="w-full h-[400vh] relative">
      <motion.div
        style={{ backgroundColor: bgColors[activeIndex] }}
        className="sticky top-0 w-full h-screen flex flex-col items-center justify-center px-12 transition-colors duration-700"
      >
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xlr items-center">
          <motion.p
            className="text-2xl font-medium text-gray-900 text-center leading-relaxed"
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {paragraphs[activeIndex]}
          </motion.p>

          <motion.div className="flex items-end justify-end perspective-[1200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="w-[480px] h-[480px] rounded-2xl"
              >
                <Image
                  src={images[activeIndex]}
                  alt="Gesture"
                  width={480}
                  height={480}
                  className="rounded-2xl object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
