import React from "react";
import Image from "next/image";

function Navbar() {
  return (
    <div className="w-full h-16 px-8 py-3 flex items-center text-black justify-between">
      <Image src="/imgs/logo.png" height={38} width={130} alt="logo" />
      <div className="Aeonik border border-gray-900 p-1 flex items-center justify-between gap-2 rounded-2xl">
        <a
          className="px-1 duration-200 transition-all hover:bg-black/10 rounded-2xl"
          href="/hi"
        >
          होम
        </a>
        <a
          className="px-1 hover:bg-black/10 rounded-2xl duration-200 transition-all"
          href="/hi/test"
        >
          परीक्षण
        </a>
        <a
          className="px-1 hover:bg-black/10 rounded-2xl duration-200 transition-all"
          href="/hi/learn"
        >
          सीखें
        </a>
      </div>
      <div className="flex text-sm items-center justify-center gap-1 w-[130px]">
        <a className="hover:underline transform duration-300" href="\">
          EN
        </a>
        |
        <a href="/hi" className="hover:underline transform duration-300">
          HI
        </a>
      </div>
    </div>
  );
}

export default Navbar;
