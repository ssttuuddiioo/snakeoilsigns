"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { urlFor } from "@/sanity/lib/image";

interface NavProps {
  logo?: any;
  siteTitle?: string;
}

const NAV_LINKS = [
  { href: "/work", label: "MURALS" },
  { href: "/oil-paintings", label: "PAINTINGS" },
  { href: "/workshops", label: "WORKSHOPS" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

export default function Nav({ logo, siteTitle }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-ink/95 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-content mx-auto flex items-center justify-between px-6 py-5 md:px-12 md:py-6">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            {logo ? (
              <Image
                src={urlFor(logo).width(200).url()}
                alt={siteTitle || "Snake Oil Signs"}
                width={160}
                height={40}
                className="h-8 w-auto"
              />
            ) : (
              <span className="font-display text-lg md:text-xl text-white uppercase">
                {siteTitle || "Snake Oil Signs"}
              </span>
            )}
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-base xl:text-lg uppercase text-white/70 hover:text-rust transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-10 lg:hidden flex items-center gap-2"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="font-display text-base uppercase text-white">
              {menuOpen ? "CLOSE" : "MENU"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-ink transition-all duration-500 lg:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-start justify-center h-full px-8 gap-5">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-5xl sm:text-6xl uppercase text-white hover:text-rust transition-colors duration-200"
              style={{
                transitionDelay: menuOpen ? `${i * 60 + 100}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                transition:
                  "opacity 500ms ease, transform 500ms ease, color 200ms ease",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div
            className="mt-8 pt-6 border-t border-white/10"
            style={{
              opacity: menuOpen ? 1 : 0,
              transition: "opacity 600ms ease 400ms",
            }}
          >
            <a
              href="mailto:snakeoilsigns@gmail.com"
              className="text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              snakeoilsigns@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
