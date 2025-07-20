"use client";

import Image from "next/image";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import GestureGoFooter from "@/components/hi/Footer";
import Navbar from "@/components/hi/Navbar";

const signs = [
  { label: "नमस्ते", img: "/imgs/hello.png" },
  { label: "हाँ", img: "/imgs/yes.png" },
  { label: "नहीं", img: "/imgs/no.png" },
  { label: "मदद", img: "/imgs/namaste.png" },
];

const books = [
  {
    title: "भारतीय सांकेतिक भाषा भाषाविज्ञान",
    img: "/imgs/books/1.jpg",
    link: "https://www.amazon.in/Indian-Language-Linguistics-Parveen-Kumar/dp/8194599423",
  },
  {
    title: "हर किसी के लिए सांकेतिक भाषा: बधिरों से संवाद का एक मूल कोर्स",
    img: "/imgs/books/2.jpg",
    link: "https://www.amazon.in/Sign-Language-Everyone-Course-Communication/dp/078526986X",
  },
  {
    title: "भारतीय सांकेतिक भाषा: इसके व्याकरण का भाषावैज्ञानिक विश्लेषण",
    img: "/imgs/books/3.jpg",
    link: "https://www.amazon.in/Indian-Sign-Language-Analysis-Grammar/dp/1944838082",
  },
];

export default function LearnPage() {
  return (
    <>
      <Navbar />
      <section className="bg-white text-black min-h-screen px-6 py-20 md:px-20">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            सांकेतिक भाषा सीखें
          </h1>
          <p className="text-gray-400 text-lg">
            मूक और बधिर समुदाय से जुड़ने के लिए बुनियादी हाथ संकेतों में महारत
            हासिल करें।
          </p>
        </div>

        {/* Sign Cards */}
        <div className="max-w-6xl mx-auto text-center mb-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {signs.map((sign, index) => (
              <div
                key={index}
                className="group bg-white/5 border border-black/10 rounded-2xl p-2 flex flex-col items-center transition duration-300 hover:scale-[1.01] hover:shadow-xl"
              >
                <div className="w-full h-64 flex items-center justify-center p-2">
                  <Image
                    src={sign.img}
                    alt={sign.label}
                    width={250}
                    height={250}
                    className="object-contain max-h-full rounded-4xl transition duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mt-4 group-hover:text-black transition">
                  {sign.label}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-semibold mb-12 flex items-center justify-center gap-3 text-black">
            <BookOpen size={28} /> सांकेतिक भाषा सीखने के लिए अनुशंसित पुस्तकें
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {books.map((book, i) => (
              <div
                key={i}
                className="bg-white/5 border border-black/10 rounded-2xl p-4 flex flex-col items-center text-black shadow-lg hover:shadow-xl transition"
              >
                <div className="w-full h-72 flex items-center justify-center p-4">
                  <Image
                    src={book.img}
                    alt={book.title}
                    width={220}
                    height={300}
                    className="object-contain rounded-lg max-h-full"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-4 text-center px-2">
                  {book.title}
                </h3>
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto bg-[#feca2b] text-black font-semibold py-2 px-6 rounded-full hover:bg-yellow-400 transition"
                >
                  अभी खरीदें
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GestureGoFooter />
    </>
  );
}
