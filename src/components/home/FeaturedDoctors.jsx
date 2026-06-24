"use client";

import React, { useEffect, useState } from "react";
import { Card, Button, Spinner } from "@heroui/react";
import { ArrowRight, Suitcase } from "@gravity-ui/icons"; 
import { getAllDoctors } from "@/lib/api/doctors";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from "motion/react"; 

export default function FeaturedDoctors() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      const data = await getAllDoctors({ limit: 4 });
      if (data?.success) {
        setDoctors(data.doctors);
      }
      setLoading(false);
    }
    fetchFeatured();
  }, []);

  if (loading) return (
    <div className="flex justify-center p-20">
      <Spinner size="lg" color="primary" />
    </div>
  );

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600">
                Featured Doctors
              </span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">Choose from our top-rated specialists for your care.</p>
          </motion.div>
          
          <Button 
            variant="bordered" 
            onClick={() => router.push('/find-doctors')} 
            className="rounded-full border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            View All <ArrowRight size={16} />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl transition-all duration-500 group">
                <motion.div 
                  className="relative w-full h-56 mb-4 overflow-hidden rounded-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image 
                    src={doctor.profileImage} 
                    alt={doctor.doctorName} 
                    fill 
                    className="object-cover" 
                    unoptimized 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>

                <div className="px-1">
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg mb-1">{doctor.doctorName}</h3>
                  <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 mb-4 font-bold">
                    {doctor.specialization}
                  </p>
                  
                  <div className="flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400 mb-6">
                     <span className="flex items-center gap-1">
                       <Suitcase size={14}/> {doctor.experience} yr exp
                     </span>
                     <span className="font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                       ${doctor.consultationFee}
                     </span>
                  </div>
                  
                  <Button 
                    size="md" 
                    fullWidth 
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
                    onClick={() => router.push(`/find-doctors/${doctor._id}`)}
                  >
                    Book Appointment
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
