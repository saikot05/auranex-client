"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Person, Star } from "@gravity-ui/icons";
import { UserPlus, CalendarCheck } from "lucide-react";
import { getPlatformStats } from "@/lib/api/stats";

export default function PlatformStats() {
  const [stats, setStats] = useState({
    doctors: 0,
    patients: 0,
    appointments: 0,
    reviews: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const data = await getPlatformStats();
      if (data.success) {
        setStats({
          doctors: data.stats.totalDoctors,
          patients: data.stats.totalPatients,
          appointments: data.stats.totalAppointments,
          reviews: data.stats.totalReviews,
        });
      }
    }
    fetchStats();
  }, []);

  const statItems = [
    { label: "Total Doctors", value: stats.doctors, icon: <UserPlus size={28} />, colorClass: "text-blue-600 dark:text-blue-400", bgClass: "bg-blue-600/10 dark:bg-blue-400/10" },
    { label: "Total Patients", value: stats.patients, icon: <Person size={28} />, colorClass: "text-emerald-600 dark:text-emerald-400", bgClass: "bg-emerald-600/10 dark:bg-emerald-400/10" },
    { label: "Total Appointments", value: stats.appointments, icon: <CalendarCheck size={28} />, colorClass: "text-amber-600 dark:text-amber-400", bgClass: "bg-amber-600/10 dark:bg-amber-400/10" },
    { label: "Total Reviews", value: stats.reviews, icon: <Star size={28} />, colorClass: "text-purple-600 dark:text-purple-400", bgClass: "bg-purple-600/10 dark:bg-purple-400/10" },
  ];

  return (
    
    <section className="py-20 bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {statItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className={`mx-auto mb-4 p-4 w-fit rounded-full ${item.bgClass} ${item.colorClass}`}>
              {item.icon}
            </div>
            
            
            <h3 className="text-4xl font-black mb-2 text-slate-900 dark:text-white">
              {item.value}<span className="text-sm ml-1 opacity-70">+</span>
            </h3>
            
            <p className="text-slate-600 dark:text-blue-100 font-medium tracking-wide">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}