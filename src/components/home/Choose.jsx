"use client";

import React from "react";
import { ShieldCheck, HeartPulse, Clock, Sparkles } from "@gravity-ui/icons";

const benefits = [
  {
    title: "Verified Specialists",
    description: "All our doctors are board-certified and thoroughly vetted to ensure you receive the highest quality of care.",
    icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "24/7 Urgent Access",
    description: "Get connected with medical professionals anytime, anywhere, ensuring you're never alone in a health crisis.",
    icon: <HeartPulse className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Seamless Booking",
    description: "Our intuitive platform makes scheduling appointments as simple as a few clicks, saving your valuable time.",
    icon: <Clock className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Personalized Care",
    description: "Digital health records and tailored treatment plans designed specifically for your unique medical history.",
    icon: <Sparkles className="w-8 h-8 text-blue-600" />,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white dark:bg-zinc-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100 mb-4">
            Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">MediCare Connect</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg">
            We bridge the gap between technology and compassion to provide a superior healthcare experience.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-blue-500/20 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="mb-6 p-3 bg-white dark:bg-zinc-800 rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                {benefit.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}