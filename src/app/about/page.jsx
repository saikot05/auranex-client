"use client";

import React from "react";

export default function AboutUsPage() {
  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500 py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide mb-4">
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-zinc-100 mb-6">
            Empowering Lives Through <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">Accessible Healthcare</span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            At AuraNex, we believe that quality medical advice should be just a click away. Our mission is to bridge the gap between patients and specialized care through innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Our Mission</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We aim to democratize healthcare by providing a transparent, efficient, and compassionate platform where patients can find the right specialists without the frustration of traditional booking processes.
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Our Vision</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              To build a global digital health ecosystem where patient-doctor communication is seamless, secure, and empowered by technology for better health outcomes for everyone.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Verified Doctors", value: "500+" },
            { label: "Happy Patients", value: "10k+" },
            { label: "Consultations", value: "25k+" },
            { label: "Specializations", value: "40+" },
          ].map((stat, index) => (
            <div key={index} className="p-6">
              <div className="text-4xl font-black text-blue-600 mb-2">{stat.value}</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}