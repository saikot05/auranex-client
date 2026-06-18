"use client";

import React from "react";
import { Button, Link } from "@heroui/react";
import { ArrowRight, ShieldCheck, HeartPulse, Sparkles } from "@gravity-ui/icons";

export default function Hero() {
  return (
    <section className="relative w-full bg-theme text-theme pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-500">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[120px] animate-pulse duration-[6000ms] transition-colors duration-500" />
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-[150px] animate-pulse duration-[8000ms] transition-colors duration-500" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 max-w-2xl w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400 animate-spin duration-[4000ms]" />
              Next-Gen Healthcare Connection
            </div>

            <div className="w-full text-left">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.15] text-left inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-300">
                Your Health, <br />
                Our Priority Connection
              </h1>
            </div>

            <div className="w-full text-left">
              <p className="text-muted-theme text-base sm:text-lg font-normal leading-relaxed text-left max-w-xl">
                Connect instantly with top-rated certified doctors, manage digital medical records, and experience seamless healthcare delivery tailored for your family.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
              <Button
                as={Link}
                href="/appointments"
                size="lg"
                radius="xl"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-lg shadow-blue-500/20 hover:opacity-90 transition-opacity duration-300"
                endContent={<ArrowRight className="h-4 w-4" />}
              >
                Book Appointment
              </Button>

              <Button
                as={Link}
                href="/doctors"
                size="lg"
                radius="xl"
                variant="bordered"
                className="w-full sm:w-auto border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 font-semibold transition-all duration-200"
              >
                Explore Doctors
              </Button>
            </div>

            <div className="pt-6 flex flex-wrap justify-start gap-6 text-xs text-zinc-500">
              <div className="flex items-center gap-2 text-muted-theme">
                <HeartPulse className="text-blue-600 dark:text-blue-500 h-4 w-4" /> 24/7 Urgent Care Access
              </div>
              <div className="flex items-center gap-2 text-muted-theme">
                <ShieldCheck className="text-cyan-600 dark:text-cyan-500 h-4 w-4" /> Verified Practitioners
              </div>
            </div>
          </div>

          {/* Right Column: Only 3D Frame and Image */}
          <div className="lg:col-span-5 w-full flex justify-center items-center [perspective:1200px]">
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[2.5rem] bg-gradient-to-tr from-blue-500/10 via-cyan-500/5 to-transparent p-3 border border-zinc-200/60 dark:border-zinc-800/50 [transform-style:preserve-3d] [transform:rotateY(-12deg)_rotateX(6deg)] hover:[transform:rotateY(-4deg)_rotateX(2deg)] transition-transform duration-700 ease-out group">
              
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-cyan-500/30 rounded-[2.5rem] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />

              <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 [transform:translateZ(20px)] transition-all duration-500 shadow-2xl">
                
                {/* Clean Image Component without any icons/text overlay */}
                <img
                  src="https://i.ibb.co/rGmcv49v/vitaly-gariev-e-Vrm8-G3-Uh-YQ-unsplash.jpg"
                  alt="Healthcare Professional"
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                />
                
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}