"use client";

import React from "react";
import { PersonPlus, Calendar, Stethoscope } from "@gravity-ui/icons";

const steps = [
  {
    number: "01",
    title: "Create Account",
    description: "Sign up in seconds and build your secure health profile to get started.",
    icon: <PersonPlus className="w-8 h-8 text-blue-600" />,
  },
  {
    number: "02",
    title: "Find Specialist",
    description: "Browse through our verified network of doctors based on your specific needs.",
    icon: <Stethoscope className="w-8 h-8 text-blue-600" />,
  },
  {
    number: "03",
    title: "Book & Consult",
    description: "Schedule your appointment effortlessly and connect with your doctor instantly.",
    icon: <Calendar className="w-8 h-8 text-blue-600" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100 mb-4">
            Simple Steps to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">Better Health</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
            Our streamlined process ensures you get the medical attention you need without any complexity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="absolute top-16 left-1/4 right-1/4 h-0.5 bg-zinc-200 dark:bg-zinc-800 hidden md:block" />

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white dark:bg-zinc-900 border-4 border-zinc-50 dark:border-zinc-950 rounded-full flex items-center justify-center shadow-lg mb-6 text-blue-600">
                {step.icon}
              </div>
              <span className="text-blue-500 font-bold text-sm tracking-widest mb-2">{step.number}</span>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">{step.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}