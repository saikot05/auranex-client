"use client";

import React from "react";
import Link from "next/link";
import { FaHeartbeat, FaPhoneAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Job discovery", href: "/jobs" },
        { label: "Worker AI", href: "/worker-ai" },
        { label: "Companies", href: "/companies" },
        { label: "Salary data", href: "/salary" },
      ],
    },
    {
      title: "Navigations",
      links: [
        { label: "Help center", href: "/help" },
        { label: "Career library", href: "/careers" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Brand Guideline", href: "/brand" },
        { label: "Newsroom", href: "/news" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-[#050505] text-zinc-400 pt-16 pb-8 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12">
          
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 w-fit group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/10 transition-transform duration-300 group-hover:scale-105">
                <FaHeartbeat className="text-white h-5 w-5 animate-pulse" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-base text-white tracking-wide">Auranex</span>
                <span className="font-medium text-xs text-zinc-500">Health Systems</span>
              </div>
            </Link>
            
            <p className="text-zinc-500 text-sm max-w-sm font-normal leading-relaxed mt-2">
              Providing compassionate and professional healthcare connectivity for your family's well-being.
            </p>

            <div className="mt-2 rounded-xl bg-zinc-950 border border-zinc-900 p-4 max-w-xs flex items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Emergency Hotline</h4>
                <p className="text-lg font-black text-blue-500 mt-0.5">10655</p>
              </div>
              <div className="h-9 w-9 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500">
                <FaPhoneAlt className="h-4 w-4 animate-bounce" />
              </div>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-4">
                <h3 className="text-blue-500 font-semibold text-sm sm:text-base tracking-wide">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-zinc-400 hover:text-white text-sm font-normal transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[1px] w-full bg-zinc-900" aria-hidden="true" />

        <div className="pt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-zinc-600 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} Auranex Health. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link href="/terms" className="hover:text-zinc-400 transition-colors duration-200">
                Terms & Policy
              </Link>
              <span className="text-zinc-800" aria-hidden="true">—</span>
              <Link href="/privacy" className="hover:text-zinc-400 transition-colors duration-200">
                Privacy Guideline
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-[#121212] hover:bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white transition-colors duration-200 border border-zinc-800/40"
              aria-label="Facebook"
            >
              <FaFacebookF className="h-4 w-4" />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center text-white transition-colors duration-200 shadow-md shadow-blue-500/10"
              aria-label="Twitter"
            >
              <FaTwitter className="h-4 w-4" />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-[#121212] hover:bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white transition-colors duration-200 border border-zinc-800/40"
              aria-label="Instagram"
            >
              <FaInstagram className="h-4 w-4" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-[#121212] hover:bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white transition-colors duration-200 border border-zinc-800/40"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="h-4 w-4" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}