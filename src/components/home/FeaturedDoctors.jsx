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

  if (loading) return <div className="flex justify-center p-20"><Spinner size="lg" /></div>;

  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Featured Doctors</h2>
          <p className="text-slate-500">Choose from our top-rated specialists.</p>
        </div>
        <Button variant="flat" onClick={() => router.push('/find-doctors')} className="rounded-xl">
          View All <ArrowRight />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor._id} className="p-4 rounded-2xl hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800">
           
            <motion.div 
              className="relative w-full h-48 mb-4 overflow-hidden rounded-xl"
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
            </motion.div>

            <h3 className="font-bold text-lg">{doctor.doctorName}</h3>
            <p className="text-xs text-blue-600 mb-2 font-medium">{doctor.specialization}</p>
            
            <div className="flex justify-between text-xs text-slate-500 mb-4">
               <span><Suitcase size={14} className="inline mr-1"/> {doctor.experience} yr</span>
               <span className="font-bold text-slate-900 dark:text-white">${doctor.consultationFee}</span>
            </div>
            
            <Button size="sm" fullWidth color="primary" onClick={() => router.push(`/find-doctors/${doctor._id}`)}>
              Book Now
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}