"use client";

import React from "react";
import { motion } from "motion/react";
import { HeartPulse, Brain, Bone, Baby, Stethoscope, UserPlus } from "lucide-react";

const specializations = [
  { name: "Cardiology", icon: <HeartPulse size={32} />, color: "text-red-500", bg: "bg-red-500/10" },
  { name: "Neurology", icon: <Brain size={32} />, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { name: "Orthopedics", icon: <Bone size={32} />, color: "text-amber-500", bg: "bg-amber-500/10" },
  { name: "Pediatrics", icon: <Baby size={32} />, color: "text-pink-500", bg: "bg-pink-500/10" },
  { name: "Dermatology", icon: <Stethoscope size={32} />, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  { name: "General Medicine", icon: <UserPlus size={32} />, color: "text-emerald-500", bg: "bg-emerald-500/10" },
];

export default function MedicalSpecializations() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-[#0B0F19] dark:to-[#131B2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section with Smooth Left-to-Right Animation */}
        <div className="text-center mb-16 overflow-hidden">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase text-sm">
              Our Specialties
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-800 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-500">
              Find Care by Specialization
            </h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full" />
          </motion.div>
        </div>

        {/* Specialization Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {specializations.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -12, scale: 1.05 }}
              className="group flex flex-col items-center justify-center p-8 bg-white dark:bg-[#1E293B] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all cursor-pointer"
            >
              <div className={`p-5 rounded-2xl ${item.bg} ${item.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}