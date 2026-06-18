"use client";

import React from "react";
import { Button, Link } from "@heroui/react";
import { ArrowRight, ShieldCheck, HeartPulse, Sparkles } from "@gravity-ui/icons";

export default function Hero() {
  return (
    <section className="relative w-full bg-white dark:bg-[#050505] text-slate-900 dark:text-white pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-500">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[120px] animate-pulse duration-[6000ms] transition-colors duration-500" />
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-[150px] animate-pulse duration-[8000ms] transition-colors duration-500" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400 animate-spin duration-[4000ms]" />
              Next-Gen Healthcare Connection
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.15] text-zinc-900 dark:text-white">
              Your Health, <br />
              Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 dark:from-blue-500 dark:via-blue-400 dark:to-cyan-400">Priority Connection</span>
            </h1>

            <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              Connect instantly with top-rated certified doctors, manage digital medical records, and experience seamless healthcare delivery tailored for your family.
            </p>

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

            <div className="pt-6 flex flex-wrap justify-center lg:justify-start gap-6 text-xs text-zinc-500 dark:text-zinc-500">
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <HeartPulse className="text-blue-600 dark:text-blue-500 h-4 w-4" /> 24/7 Urgent Care Access
              </div>
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <ShieldCheck className="text-cyan-600 dark:text-cyan-500 h-4 w-4" /> Verified Practitioners
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 w-full flex justify-center items-center">
            <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
              <div className="absolute inset-0 rounded-[2.5rem] border border-blue-500/10 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-transparent animate-pulse duration-[4000ms]" />
              <div className="absolute inset-6 rounded-[2rem] border border-zinc-200 dark:border-cyan-500/10 bg-zinc-50 dark:bg-zinc-950/40 backdrop-blur-3xl transition-colors duration-500" />
              
              <div className="relative z-10 flex flex-col items-center gap-4 group">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-blue-500/30 transition-transform duration-500 group-hover:scale-110">
                  <HeartPulse className="text-white h-10 w-10 animate-pulse duration-[1500ms]" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-zinc-800 dark:text-white tracking-wide">Auranex Pulse</div>
                  <div className="text-xs text-cyan-600 dark:text-cyan-400 mt-0.5 font-medium">System Active</div>
                </div>
              </div>

              <div className="absolute top-10 right-4 bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-xl animate-bounce duration-[5000ms] transition-colors duration-500">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300">100+ Doctors Online</span>
              </div>

              <div className="absolute bottom-12 left-2 bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-xl animate-bounce duration-[4000ms] delay-200 transition-colors duration-500">
                <ShieldCheck className="text-blue-600 dark:text-blue-500 h-3.5 w-3.5" />
                <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300">End-to-End Encrypted</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}