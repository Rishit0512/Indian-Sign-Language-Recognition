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
    <span className="text-6xl font-bold">नमस्ते</span> सिर्फ एक अभिवादन नहीं है
    — यह सम्मान और जुड़ाव दिखाने का एक तरीका है। GestureGo पर, उपयोगकर्ता एक सरल
    नमस्ते इशारे के माध्यम से आसानी से आभार, गर्मजोशी और स्वीकृति व्यक्त कर सकते
    हैं, जिससे वे बिना बोले अपनी भावनाएं व्यक्त कर सकते हैं।
  </>,
  <>
    <span className="text-6xl font-bold">हैलो</span> हर बातचीत की शुरुआत है।
    GestureGo के साथ, हाथ की एक दोस्ताना लहर तुरंत पहचानी जाती है और अनुवादित
    होती है, जिससे बधिर और मूक व्यक्ति आत्मविश्वास से अभिवादन कर सकते हैं और
    बातचीत की शुरुआत कर सकते हैं।
  </>,
  <>
    <span className="text-6xl font-bold">हां</span> कहना उतना ही महत्वपूर्ण है
    जितना कि जोर से कहना। एक त्वरित थम्ब्स-अप इशारे के माध्यम से, GestureGo इसे
    सहमति या स्वीकृति में बदल देता है, जिससे दैनिक बातचीत तेज़, आसान और अधिक
    स्वाभाविक हो जाती है।
  </>,
  <>
    जब कुछ सही नहीं होता, तो <span className="text-6xl font-bold">नहीं</span>{" "}
    स्पष्ट रूप से कहा जाना चाहिए। GestureGo थम्ब्स-डाउन इशारे को पकड़ता है और
    उपयोगकर्ताओं को विनम्रता से मना करने में मदद करता है, जिससे वे अपनी पसंद और
    निर्णय स्वतंत्र रूप से व्यक्त कर सकें।
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
