"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const LANGUAGES = [
  { code: "ESP", src: "/flags/esp.svg", alt: "Spain Flag" },
  { code: "FRA", src: "/flags/fra.png", alt: "France Flag" },
  { code: "JPN", src: "/flags/jap.webp", alt: "Japan Flag" },
  { code: "CHN", src: "/flags/chn.svg", alt: "China Flag" },
  { code: "ASL", src: "/flags/usa.webp", alt: "USA Flag" },
  { code: "GER", src: "/flags/ger.svg", alt: "Germany Flag" },
  { code: "ITA", src: "/flags/ita.svg", alt: "Italy Flag" },
  { code: "POR", src: "/flags/por.svg", alt: "Portugal Flag" },
  { code: "RUS", src: "/flags/rus.svg", alt: "Russia Flag" },
  { code: "KOR", src: "/flags/kor.svg", alt: "Korea Flag" },
  { code: "NLD", src: "/flags/nld.svg", alt: "Netherlands Flag" },
  { code: "SWE", src: "/flags/swe.svg", alt: "Sweden Flag" },
  { code: "NOR", src: "/flags/nor.svg", alt: "Norway Flag" },
  { code: "DNK", src: "/flags/dnk.svg", alt: "Denmark Flag" },
  { code: "POL", src: "/flags/pol.svg", alt: "Poland Flag" },
  { code: "TUR", src: "/flags/tur.svg", alt: "Turkey Flag" },
  { code: "HIN", src: "/flags/ind.svg", alt: "India Flag" },
  { code: "ARA", src: "/flags/ara.svg", alt: "Arabic Flag" },
  { code: "HEB", src: "/flags/isb.svg", alt: "Hebrew Flag" },
  { code: "VIE", src: "/flags/vie.svg", alt: "Vietnam Flag" },
  { code: "THA", src: "/flags/tha.svg", alt: "Thailand Flag" },
  { code: "IND", src: "/flags/indon.svg", alt: "Indonesia Flag" },
  { code: "GRE", src: "/flags/gre.svg", alt: "Greece Flag" },
  { code: "CZE", src: "/flags/cze.svg", alt: "Czech Flag" },
];

export const Footer = () => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const VISIBLE = 5;
  const totalPages = Math.ceil(LANGUAGES.length / VISIBLE);

  const scrollToPage = (pageIndex: number) => {
    const container = scrollerRef.current;
    if (!container) return;
    const pageWidth = container.clientWidth;
    const target = pageIndex * pageWidth;
    container.scrollTo({ left: target, behavior: "smooth" });
  };

  const handlePrev = () => {
    const container = scrollerRef.current;
    if (!container) return;
    const pageWidth = container.clientWidth;
    const currentPage = Math.round(container.scrollLeft / pageWidth);
    const prev = Math.max(0, currentPage - 1);
    scrollToPage(prev);
  };

  const handleNext = () => {
    const container = scrollerRef.current;
    if (!container) return;
    const pageWidth = container.clientWidth;
    const currentPage = Math.round(container.scrollLeft / pageWidth);
    const next = Math.min(totalPages - 1, currentPage + 1);
    scrollToPage(next);
  };

  return (
    <footer className="hidden lg:block h-20 border-slate-200 p-2 w-full border-t-2">
      <div className="w-full h-full flex items-center">
        {/* Prev button */}
        <Button onClick={handlePrev} className="flex-shrink-0">
          ‹
        </Button>

        {/* Scrollable flags */}
        <div
          ref={scrollerRef}
          className="overflow-hidden flex-1"
          style={{ minWidth: 0 }}
        >
          <div className="flex" style={{ willChange: "transform" }}>
            {LANGUAGES.map((lang, idx) => (
              <div
                key={lang.code + idx}
                className="flex-shrink-0 flex items-center justify-center"
                style={{ flex: "0 0 20%" }} // exactly 5 items per page
              >
                <Button
                  variant="flag"
                  className="p-2 flex flex-col items-center justify-center h-auto w-auto"
                >
                  <Image
                    className="rounded-md border border-gray-300"
                    src={lang.src}
                    alt={lang.alt}
                    height={32}
                    width={40}
                  />
                  <span className="text-sm font-medium mt-1">{lang.code}</span>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Next button */}
        <Button onClick={handleNext} className="flex-shrink-0">
          ›
        </Button>
      </div>
    </footer>
  );
};

export default Footer;