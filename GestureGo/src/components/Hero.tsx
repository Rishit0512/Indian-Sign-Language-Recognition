"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "./Navbar";

gsap.registerPlugin(useGSAP);

export default function HeroSection() {
  const hero = useRef(null);
  const imageRefs = useRef([]);

  imageRefs.current = [];

  const addToImages = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  useEffect(() => {
    const container = hero.current;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      imageRefs.current.forEach((img) => {
        const imgRect = img.getBoundingClientRect();
        const imgCenterX = imgRect.left + imgRect.width / 2 - rect.left;
        const imgCenterY = imgRect.top + imgRect.height / 2 - rect.top;

        const distanceX = mouseX - imgCenterX;
        const distanceY = mouseY - imgCenterY;
        const distance = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY
        );

        const maxMove = 100; // Maximum movement allowed
        const moveX = (distanceX / rect.width) * maxMove;
        const moveY = (distanceY / rect.height) * maxMove;

        const influence = Math.max(1 - distance / 700, 0);

        gsap.to(img, {
          x: moveX * influence,
          y: moveY * influence,
          duration: 0.5,
          ease: "power3.out",
        });
      });
    };

    const handleMouseLeave = () => {
      imageRefs.current.forEach((img) => {
        gsap.to(img, {
          x: 0,
          y: 0,
          duration: 1,
          ease: "bounce.out",
        });
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useGSAP(() => {
    gsap.to(hero.current, {
      scale: 1,
      opacity: 1,
      duration: 1.7,
    });
  }, []);

  return (
    <div className="w-full h-screen">
      <Navbar />
      <section
        style={{ height: "calc(100vh - 88px)" }}
        className="text-black grid grid-rows-2 px-6 mt-5"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center text-center py-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Speak Without Speaking
          </h1>
          <p className="text-md max-w-3xl md:text-md text-gray-600 mb-8">
            GestureGo helps non-verbal individuals communicate effortlessly
            using real-time Indian Sign Language recognition.
          </p>
          <Button className="text-lg px-6 py-3 bg-[#ffc410] hover:bg-[#ffc410]/85 border-2 border-black transition text-black Aeonik cursor-pointer">
            Try It Live
          </Button>
        </motion.div>

        <div className="w-full flex justify-center">
          <div
            ref={hero}
            className="max-w-3xl cursor-pointer grid grid-cols-4 scale-0 opacity-0 gap-1"
          >
            <div ref={addToImages}>
              <Image
                src="/imgs/hello.png"
                className="rounded-2xl rotate-8"
                alt="Hello"
                width={180}
                height={180}
              />
            </div>
            <div ref={addToImages}>
              <Image
                src="/imgs/no.png"
                className="rounded-2xl -rotate-5"
                alt="No"
                width={180}
                height={180}
              />
            </div>
            <div ref={addToImages}>
              <Image
                src="/imgs/namaste.png"
                className="rounded-2xl rotate-1"
                alt="Namaste"
                width={180}
                height={180}
              />
            </div>
            <div ref={addToImages}>
              <Image
                src="/imgs/yes.png"
                className="rounded-2xl rotate-12"
                alt="Yes"
                width={180}
                height={180}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
