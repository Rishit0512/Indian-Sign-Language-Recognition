// components/GestureGoFooter.tsx
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
              Where <span className="text-purple-400">aesthetics</span> &{" "}
              <span className="text-cyan-400">functionality</span> meet
            </h4>
          </div>

          {/* Explore Links */}
          <div className="space-y-3">
            <h4 className="text-2xl font-bold text-[#ffaf03]">Explore</h4>
            <ul className="space-y-2 text-gray-300 font-medium">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/test">Test</Link>
              </li>
              <li>
                <Link href="/learn">Learn</Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h4 className="text-2xl font-bold text-cyan-400">Follow Us</h4>
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
              Contact Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Website name big */}
        <div className="text-center text-[10vh] font-extrabold text-white mb-3">
          GestureGo
        </div>

        {/* Bottom credits */}
        <div className="flex justify-between items-center text-gray-400 text-sm flex-wrap">
          <p>GestureGo ©2025 - Privacy Policy</p>
          <p>Delhi, India</p>
        </div>
      </div>
    </footer>
  );
}
