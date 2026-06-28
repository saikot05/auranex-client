"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Spinner, Button, Card } from "@heroui/react";
import { StarFill, Suitcase, CircleDollar, ChevronLeft, ChevronRight, Timeline, CircleCheck } from "@gravity-ui/icons";
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { getDoctorDetails } from "@/lib/api/doctors";
import { useSession } from "@/lib/auth-client";

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];


const DAY_NAME_TO_INDEX = {
    sunday: 0, sun: 0,
    monday: 1, mon: 1,
    tuesday: 2, tue: 2,
    wednesday: 3, wed: 3,
    thursday: 4, thu: 4,
    friday: 5, fri: 5,
    saturday: 6, sat: 6,
};

function AvailabilityCalendar({ availableDays = [], selectedDate, onDateSelect }) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());

    
    const availableWeekdayIndices = new Set();
    const availableAbsoluteDates = new Set();

    availableDays.forEach((day) => {
        const lower = day.toLowerCase().trim();
        if (DAY_NAME_TO_INDEX[lower] !== undefined) {
            availableWeekdayIndices.add(DAY_NAME_TO_INDEX[lower]);
        } else {
            // treat as an absolute date string "YYYY-MM-DD" or similar
            availableAbsoluteDates.add(day);
        }
    });

    const isDayAvailable = useCallback((date) => {
        const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        if (availableAbsoluteDates.has(dateStr) || availableAbsoluteDates.has(date.toDateString())) return true;
        if (availableWeekdayIndices.has(date.getDay())) return true;
        return false;
    }, [availableWeekdayIndices, availableAbsoluteDates]);

    const isPast = (date) => date < today;

   
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    const prevMonth = () => {
        if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
        else setViewMonth(m => m - 1);
    };
    const nextMonth = () => {
        if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
        else setViewMonth(m => m + 1);
    };

   
    const handleDayClick = (day) => {
        const date = new Date(viewYear, viewMonth, day);
        if (isPast(date) || !isDayAvailable(date)) return;
        const formatted = `${MONTH_NAMES[viewMonth]} ${day}, ${viewYear}`;
        onDateSelect(formatted);
    };

    const isSelectedDay = (day) => {
        const formatted = `${MONTH_NAMES[viewMonth]} ${day}, ${viewYear}`;
        return selectedDate === formatted;
    };

    const cells = [];
    
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return (
        <div className="w-full space-y-3">
            {/* Month nav */}
            <div className="flex items-center justify-between">
                <button
                    onClick={prevMonth}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Previous month"
                >
                    <ChevronLeft size={14} />
                </button>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {MONTH_NAMES[viewMonth]} {viewYear}
                </span>
                <button
                    onClick={nextMonth}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Next month"
                >
                    <ChevronRight size={14} />
                </button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-0.5">
                {WEEKDAY_NAMES.map(d => (
                    <div key={d} className="text-center text-[10px] font-bold text-slate-400 dark:text-slate-500 py-1 uppercase tracking-wide">
                        {d}
                    </div>
                ))}

                {/* Day cells */}
                {cells.map((day, i) => {
                    if (!day) return <div key={`empty-${i}`} />;

                    const date = new Date(viewYear, viewMonth, day);
                    const past = isPast(date);
                    const available = isDayAvailable(date);
                    const selected = isSelectedDay(day);
                    const isToday = date.getTime() === today.getTime();

                    let cellClass = "relative w-full aspect-square flex items-center justify-center text-xs rounded-lg font-semibold transition-all duration-150 ";

                    if (selected) {
                        cellClass += "bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-105 z-10 ";
                    } else if (past) {
                        cellClass += "text-slate-300 dark:text-slate-700 cursor-not-allowed ";
                    } else if (available) {
                        cellClass += "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 cursor-pointer ";
                    } else {
                        cellClass += "text-slate-400 dark:text-slate-600 cursor-not-allowed ";
                    }

                    if (isToday && !selected) {
                        cellClass += "ring-2 ring-blue-400/50 dark:ring-blue-500/40 ";
                    }

                    return (
                        <button
                            key={day}
                            onClick={() => handleDayClick(day)}
                            disabled={past || !available}
                            className={cellClass}
                            aria-label={`${MONTH_NAMES[viewMonth]} ${day}`}
                            aria-pressed={selected}
                        >
                            {day}
                            {available && !past && !selected && (
                                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-400 dark:bg-emerald-500 rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 pt-1 border-t border-slate-100 dark:border-slate-800/60">
                <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/40 rounded-sm" />
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-blue-600 rounded-sm" />
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Selected</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm ring-2 ring-blue-400/50" />
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Today</span>
                </div>
            </div>
        </div>
    );
}

export default function DoctorDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");
    const [isBooking, setIsBooking] = useState(false);

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
        if (!session) {
        router.push('/auth/signin');
        return;
        }

        if (!selectedDate || !selectedSlot || isBooking) return;
        setIsBooking(true);

        try {
            const response = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    doctorName: doctor.doctorName,
                    amount: doctor.consultationFee,
                    doctorId: doctor._id,
                    doctorEmail: doctor.email,
                    patientEmail: session?.user?.email,
                    patientName: session?.user?.name,
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
                setIsBooking(false);
            }
        } catch (error) {
            console.error("Checkout Error:", error);
            alert("An error occurred. Please try again.");
            setIsBooking(false);
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
                
                {/* ── Left Column ── */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Doctor Profile Card */}
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

                    {/* Hospital Location */}
                    <Card className="border border-slate-200 dark:border-slate-800/70 bg-white dark:bg-[#111827] p-6 rounded-2xl space-y-4" shadow="none">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">Hospital / Chamber Location</h2>
                        <div className="p-4 bg-slate-50 dark:bg-[#131B2E]/60 border border-slate-200 dark:border-slate-800/80 rounded-xl">
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{doctor.hospitalName || "MediCare Connect Central Hub"}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Global Medical Complex, Suite 402, Dhaka</p>
                        </div>
                    </Card>

                    {/* Weekly Schedule Overview */}
                    {doctor.availableDays && doctor.availableDays.length > 0 && (
                        <Card className="border border-slate-200 dark:border-slate-800/70 bg-white dark:bg-[#111827] p-6 rounded-2xl space-y-4" shadow="none">
                            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">Weekly Availability</h2>
                            <div className="flex flex-wrap gap-2">
                                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => {
                                    const isAvailable = doctor.availableDays.some(d =>
                                        d.toLowerCase().startsWith(day.toLowerCase())
                                    );
                                    return (
                                        <div key={day} className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                                            isAvailable
                                                ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
                                                : "bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/40 text-slate-400 dark:text-slate-600"
                                        }`}>
                                            {day}
                                            {isAvailable && <span className="ml-1">✓</span>}
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                    )}
                </div>

                {/* ── Right Column: Booking Card ── */}
                <div className="lg:col-span-1">
                    <Card className="border border-slate-200 dark:border-slate-800/70 bg-white dark:bg-[#111827] p-5 rounded-2xl space-y-5 sticky top-6" shadow="none">
                        <div>
                            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">Book Appointment</h2>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Stripe Payment Gateway Integrated</p>
                        </div>

                        {/* ── Availability Calendar (Option 2) ── */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                                <span className="w-3.5 h-3.5 rounded-sm bg-blue-500/20 border border-blue-400/30 inline-flex items-center justify-center text-[8px] text-blue-500">📅</span>
                                Select Date
                            </label>

                            {doctor.availableDays && doctor.availableDays.length > 0 ? (
                                <AvailabilityCalendar
                                    availableDays={doctor.availableDays}
                                    selectedDate={selectedDate}
                                    onDateSelect={(d) => { setSelectedDate(d); setSelectedSlot(""); }}
                                />
                            ) : (
                                <div className="py-6 text-center">
                                    <p className="text-xs text-slate-400 dark:text-slate-500">No scheduled days configured yet.</p>
                                </div>
                            )}
                        </div>

                        {/* Selected date pill */}
                        {selectedDate && (
                            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-xs font-semibold text-blue-700 dark:text-blue-300">
                                <CircleCheck size={14} className="shrink-0" />
                                {selectedDate}
                            </div>
                        )}

                        {/* Time Slots */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                                <Timeline size={13} /> Time Slot
                            </label>
                            {doctor.availableSlots && doctor.availableSlots.length > 0 ? (
                                <div className="grid grid-cols-2 gap-2">
                                    {doctor.availableSlots.map((slot) => (
                                        <button
                                            key={slot}
                                            onClick={() => setSelectedSlot(slot)}
                                            disabled={!selectedDate}
                                            className={`py-2 px-2.5 text-xs font-semibold rounded-xl border transition-all ${
                                                !selectedDate
                                                    ? "opacity-40 cursor-not-allowed bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700 text-slate-400"
                                                    : selectedSlot === slot
                                                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-500 text-white shadow-lg shadow-blue-600/20"
                                                    : "bg-slate-50 dark:bg-[#1E293B]/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10"
                                            }`}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <span className="text-xs text-slate-400 dark:text-slate-500">No time slots available.</span>
                            )}
                            {!selectedDate && doctor.availableSlots?.length > 0 && (
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">Select a date first to pick a slot.</p>
                            )}
                        </div>

                        {/* Fee + Book Button */}
                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-400 dark:text-slate-500 font-medium">Consultation Fee:</span>
                                <span className="text-xl font-black text-slate-800 dark:text-slate-100">${doctor.consultationFee}</span>
                            </div>

                            {/* Booking summary */}
                            {selectedDate && selectedSlot && (
                                <div className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#131B2E]/60 border border-slate-200 dark:border-slate-800/60 text-xs space-y-1">
                                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                                        <span>Date</span>
                                        <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedDate}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                                        <span>Time</span>
                                        <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedSlot}</span>
                                    </div>
                                </div>
                            )}

                            <Button
                                color="primary"
                                variant="solid"
                                isDisabled={!!session && (!selectedDate || !selectedSlot || isBooking)}
                                isLoading={isBooking}
                                onClick={handleBookingCheckout}
                                className="w-full font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl shadow-blue-600/10 py-6 text-sm"
                            >
                                {isBooking ? "Redirecting to Payment...": !session ? "Login to Book"  : "Proceed to Pay & Book"}
                            </Button>
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
}