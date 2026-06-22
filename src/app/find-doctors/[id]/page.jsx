"use client";

import React, { useState, useEffect } from 'react';
import { Spinner, Button, Card } from "@heroui/react";
import { StarFill, Suitcase, CircleDollar, Calendar, Timeline } from "@gravity-ui/icons";
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { getDoctorDetails } from "@/lib/api/doctors";

export default function DoctorDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");

    useEffect(() => {
        const fetchDoctorData = async () => {
            if (!id) return;
            setLoading(true);
            const data = await getDoctorDetails(id);
            if (data && data.success) {
                setDoctor(data.doctor);
            }
            setLoading(false);
        };
        fetchDoctorData();
    }, [id]);

    const handleBookingCheckout = async () => {
        if (!selectedDate || !selectedSlot) return;

        try {
            const response = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    doctorName: doctor.doctorName,
                    amount: doctor.consultationFee,
                    doctorId: doctor._id,
                    selectedDate, 
                    selectedSlot,
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("Error:", data.error);
                alert("Failed to initiate payment. Please try again.");
            }
        } catch (error) {
            console.error("Checkout Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-[#0B0F19]">
                <Spinner size="lg" label="Loading doctor profile..." color="primary" />
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-500 dark:text-slate-400">
                <p className="text-lg font-medium">Doctor details not found.</p>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border border-slate-200 dark:border-slate-800/70 bg-white dark:bg-[#111827] p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-start" shadow="none">
                        <div className="overflow-hidden rounded-xl relative w-full md:w-48 h-48 bg-slate-100 dark:bg-slate-900 shrink-0 mx-auto md:mx-0">
                            <Image
                                alt={doctor.doctorName}
                                className="w-full h-full object-cover object-top"
                                src={doctor.profileImage || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=500"}
                                width={200}
                                height={200}
                                priority={true}
                                unoptimized
                            />
                        </div>

                        <div className="space-y-4 text-center md:text-left w-full">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                <div>
                                    <div className="flex items-center gap-2 justify-center md:justify-start">
                                        <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">{doctor.doctorName}</h1>
                                        {doctor.verificationStatus === "verified" && (
                                            <span className="bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-500/30">Verified</span>
                                        )}
                                    </div>
                                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">{doctor.specialization}</p>
                                </div>
                                <div className="flex items-center justify-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-0.5 rounded-full text-xs font-bold self-center md:self-start">
                                    <StarFill size={12} />
                                    {doctor.rating || "4.8"}
                                </div>
                            </div>

                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                {doctor.qualifications || "MBBS, FCPS, MD (Specialist)"}
                            </p>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-sm text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-2.5 justify-center md:justify-start">
                                    <Suitcase size={18} className="text-slate-400 dark:text-slate-500" />
                                    <span>{doctor.experience} Years Experience</span>
                                </div>
                                <div className="flex items-center gap-2.5 justify-center md:justify-start">
                                    <CircleDollar size={18} className="text-slate-400 dark:text-slate-500" />
                                    <span className="font-bold text-slate-700 dark:text-slate-200">${doctor.consultationFee} <span className="text-xs font-normal text-slate-400 dark:text-slate-500">USD</span></span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="border border-slate-200 dark:border-slate-800/70 bg-white dark:bg-[#111827] p-6 rounded-2xl space-y-4" shadow="none">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">Hospital / Chamber Location</h2>
                        <div className="p-4 bg-slate-50 dark:bg-[#131B2E]/60 border border-slate-200 dark:border-slate-800/80 rounded-xl">
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{doctor.hospitalName || "MediCare Connect Central Hub"}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Global Medical Complex, Suite 402, Dhaka</p>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card className="border border-slate-200 dark:border-slate-800/70 bg-white dark:bg-[#111827] p-6 rounded-2xl space-y-6 sticky top-6" shadow="none">
                        <div>
                            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">Book Appointment</h2>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Stripe Payment Gateway Integrated</p>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
                                <Calendar size={14} /> Available Days
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {doctor.availableDays && doctor.availableDays.length > 0 ? (
                                    doctor.availableDays.map((date) => (
                                        <button
                                            key={date}
                                            onClick={() => setSelectedDate(date)}
                                            className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                                                selectedDate === date
                                                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20"
                                                    : "bg-slate-50 dark:bg-[#1E293B]/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                                            }`}
                                        >
                                            {date}
                                        </button>
                                    ))
                                ) : (
                                    <span className="text-xs text-slate-400 dark:text-slate-500 col-span-2">No active schedules.</span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
                                <Timeline size={14} /> Slots
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {doctor.availableSlots && doctor.availableSlots.length > 0 ? (
                                    doctor.availableSlots.map((slot) => (
                                        <button
                                            key={slot}
                                            onClick={() => setSelectedSlot(slot)}
                                            className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                                                selectedSlot === slot
                                                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-500 text-white shadow-lg"
                                                    : "bg-slate-50 dark:bg-[#1E293B]/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                                            }`}
                                        >
                                            {slot}
                                        </button>
                                    ))
                                ) : (
                                    <span className="text-xs text-slate-400 dark:text-slate-500 col-span-2">No slots available.</span>
                                )}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-400 dark:text-slate-500 font-medium">Consultation Fee:</span>
                                <span className="text-xl font-black text-slate-800 dark:text-slate-100">${doctor.consultationFee}</span>
                            </div>

                            <Button
                                color="primary"
                                variant="solid"
                                isDisabled={!selectedDate || !selectedSlot}
                                onClick={handleBookingCheckout}
                                className="w-full font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl shadow-blue-600/10 py-6 text-sm"
                            >
                                Proceed to Pay & Book
                            </Button>
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
}