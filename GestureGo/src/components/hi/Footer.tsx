"use client";

import { ArrowRight, Github, Twitter } from "lucide-react";
import Link from "next/link";

export default function GestureGoFooter() {
  return (
    <footer className="bg-black text-white py-16 px-6 md:px-8">
      <div className="max-w-7xl mx-auto rounded-2xl border border-gray-800 p-4 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-4">
          {/* Left tagline */}
          <div className="space-y-2">
            <h4 className="text-xl font-semibold">
              जहां <span className="text-purple-400">सौंदर्य</span> और{" "}
              <span className="text-cyan-400">कार्यात्मकता</span> मिलते हैं
            </h4>
          </div>

          {/* Explore Links */}
          <div className="space-y-3">
            <h4 className="text-2xl font-bold text-[#ffaf03]">
              एक्सप्लोर करें
            </h4>
            <ul className="space-y-2 text-gray-300 font-medium">
              <li>
                <Link href="/">होम</Link>
              </li>
              <li>
                <Link href="/test">टेस्ट</Link>
              </li>
              <li>
                <Link href="/learn">सीखें</Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h4 className="text-2xl font-bold text-cyan-400">हमसे जुड़ें</h4>
            <ul className="space-y-2 text-gray-300 font-medium">
              <li className="flex items-center gap-2">
                <Github size={18} />
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Twitter size={18} />
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Me */}
          <div className="flex flex-col items-start justify-center">
            <Link
              href="/contact"
              className="flex items-center gap-2 text-lg font-semibold border border-gray-600 rounded-full px-5 py-2 hover:bg-white hover:text-black transition"
            >
              संपर्क करें <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Website name big */}
        <div className="text-center text-[10vh] font-extrabold text-white mb-3">
          GestureGo
        </div>

        {/* Bottom credits */}
        <div className="flex justify-between items-center text-gray-400 text-sm flex-wrap">
          <p>GestureGo ©2025 - गोपनीयता नीति</p>
          <p>दिल्ली, भारत</p>
        </div>
      </div>
    </footer>
  );
}
