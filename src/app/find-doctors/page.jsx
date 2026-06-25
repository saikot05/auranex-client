"use client";

import React, { useState, useEffect } from 'react';
import { Spinner, Card, Button } from "@heroui/react";
import { Magnifier, StarFill, Suitcase, CircleDollar, LayoutColumns } from "@gravity-ui/icons";
import { TableProperties } from "lucide-react";
import { getAllDoctors } from "@/lib/api/doctors";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function FindDoctorsPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [layoutMode, setLayoutMode] = useState("card"); // "card" | "table"
    
    const [doctors, setDoctors] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctorsData = async () => {
            setLoading(true);
            const data = await getAllDoctors({
                search,
                specialization,
                sortBy,
                page: currentPage,
                limit: 6
            });
            
            if (data && data.success) {
                setDoctors(data.doctors || []);
                setTotalPages(data.totalPages || 1);
            } else {
                setDoctors([]);
            }
            setLoading(false);
        };

        fetchDoctorsData();
    }, [search, specialization, sortBy, currentPage]);

    return (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-10">
                
                {/* Page Header */}
                <div className="text-center space-y-3">
                    <h1 className="text-3xl font-black tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-400">
                        Find Qualified Doctors
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-normal">
                        Search by name, filter by department, or sort by fees and ratings to find your perfect healthcare match instantly.
                    </p>
                </div>

                {/* Filters + Layout Toggle */}
                <div className="bg-white dark:bg-[#131B2E]/60 backdrop-blur-md p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-xl space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative flex items-center">
                            <Magnifier className="absolute left-3.5 text-slate-400 dark:text-slate-500" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search doctor by name..." 
                                className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-[#1E293B]/50 border border-slate-300 dark:border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 transition-all"
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                            />
                        </div>

                        <select 
                            className="w-full px-3 py-2.5 bg-slate-100 dark:bg-[#1E293B]/50 border border-slate-300 dark:border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                            value={specialization}
                            onChange={(e) => { setSpecialization(e.target.value); setCurrentPage(1); }}
                        >
                            <option value="" className="bg-white dark:bg-[#131B2E] text-slate-800 dark:text-slate-200">All Specializations</option>
                            <option value="Cardiology" className="bg-white dark:bg-[#131B2E] text-slate-800 dark:text-slate-200">Cardiology</option>
                            <option value="Neurology" className="bg-white dark:bg-[#131B2E] text-slate-800 dark:text-slate-200">Neurology</option>
                            <option value="Orthopedics" className="bg-white dark:bg-[#131B2E] text-slate-800 dark:text-slate-200">Orthopedics</option>
                            <option value="Pediatrics" className="bg-white dark:bg-[#131B2E] text-slate-800 dark:text-slate-200">Pediatrics</option>
                            <option value="Dermatology" className="bg-white dark:bg-[#131B2E] text-slate-800 dark:text-slate-200">Dermatology</option>
                        </select>

                        <select 
                            className="w-full px-3 py-2.5 bg-slate-100 dark:bg-[#1E293B]/50 border border-slate-300 dark:border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                            value={sortBy}
                            onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                        >
                            <option value="" className="bg-white dark:bg-[#131B2E] text-slate-800 dark:text-slate-200">Sort By</option>
                            <option value="fee_low" className="bg-white dark:bg-[#131B2E] text-slate-800 dark:text-slate-200">Fee: Low to High</option>
                            <option value="fee_high" className="bg-white dark:bg-[#131B2E] text-slate-800 dark:text-slate-200">Fee: High to Low</option>
                            <option value="experience" className="bg-white dark:bg-[#131B2E] text-slate-800 dark:text-slate-200">Experience: High to Low</option>
                            <option value="rating" className="bg-white dark:bg-[#131B2E] text-slate-800 dark:text-slate-200">Highest Rating</option>
                        </select>
                    </div>

                    {/* Layout Toggle */}
                    <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700/40 pt-3">
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            {loading ? "Loading..." : `Showing doctors • Page ${currentPage} of ${totalPages}`}
                        </p>
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-xl border border-slate-200 dark:border-slate-700/40">
                            <button
                                id="layout-card-btn"
                                onClick={() => setLayoutMode("card")}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                    layoutMode === "card"
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                }`}
                                aria-label="Switch to card view"
                            >
                                <LayoutColumns size={14} />
                                Cards
                            </button>
                            <button
                                id="layout-table-btn"
                                onClick={() => setLayoutMode("table")}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                    layoutMode === "table"
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                }`}
                                aria-label="Switch to table view"
                            >
                                <TableProperties size={14} />
                                Table
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results */}
                {loading ? (
                    <div className="flex justify-center items-center h-[40vh]">
                        <Spinner size="lg" label="Searching doctors..." color="primary" />
                    </div>
                ) : doctors.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-[#131B2E]/30 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
                        <p className="text-slate-500 dark:text-slate-400 font-medium">No doctors found matching your criteria.</p>
                    </div>
                ) : layoutMode === "card" ? (
                    /* ── CARD VIEW ── */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
                        {doctors.map((doctor) => (
                            <Card 
                                key={doctor._id} 
                                className="group border border-slate-200 dark:border-slate-800/70 bg-white dark:bg-[#111827] hover:bg-slate-50 dark:hover:bg-[#151F32] hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/5 dark:hover:shadow-blue-900/20 transition-all duration-300 p-3.5 rounded-2xl flex flex-col justify-between" 
                                shadow="none"
                            >
                                <div>
                                    <div className="overflow-hidden rounded-xl relative w-full h-[220px] bg-slate-100 dark:bg-slate-900">
                                        <Image
                                            alt={doctor.doctorName}
                                            className="w-full h-full object-cover object-top rounded-xl transition-transform duration-500 group-hover:scale-105"
                                            src={doctor.profileImage}
                                            width={400} 
                                            height={210}
                                            priority={true}
                                            unoptimized
                                        />
                                    </div>

                                    <div className="w-full pt-4 space-y-3 text-left">
                                        <div className="flex justify-between items-start gap-2">
                                            <h3 className="font-bold text-base sm:text-lg text-slate-800 dark:text-slate-100 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {doctor.doctorName}
                                            </h3>
                                            <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-0.5 rounded-full text-xs font-bold shrink-0">
                                                <StarFill size={12} />
                                                {doctor.rating || "4.8"}
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 px-2.5 py-1 rounded-lg inline-block">
                                                {doctor.specialization}
                                            </p>
                                        </div>
                                        
                                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs sm:text-sm text-slate-500 dark:text-slate-400 space-y-2">
                                            <div className="flex items-center gap-2.5">
                                                <Suitcase size={16} className="text-slate-400 dark:text-slate-500" />
                                                <span>{doctor.experience} Years Experience</span>
                                            </div>
                                            <div className="flex items-center gap-2.5">
                                                <CircleDollar size={16} className="text-slate-400 dark:text-slate-500" />
                                                <span className="font-bold text-slate-700 dark:text-slate-200">${doctor.consultationFee} <span className="text-xs font-normal text-slate-400 dark:text-slate-500">USD</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button 
                                        color="primary" 
                                        variant="solid" 
                                        onClick={() => router.push(`/find-doctors/${doctor._id}`)}
                                        className="w-full font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/10 transition-all"
                                    >
                                        View Details / Book
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    /* ── TABLE VIEW ── */
                    <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/70 shadow-xl animate-in fade-in duration-200">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-slate-100 dark:bg-[#131B2E] border-b border-slate-200 dark:border-slate-800/60">
                                        <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Doctor</th>
                                        <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Specialization</th>
                                        <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Experience</th>
                                        <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Fee</th>
                                        <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Rating</th>
                                        <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-[#111827]">
                                    {doctors.map((doctor, idx) => (
                                        <tr 
                                            key={doctor._id}
                                            className={`hover:bg-blue-50/40 dark:hover:bg-blue-500/5 transition-colors group ${idx % 2 === 0 ? "" : "bg-slate-50/40 dark:bg-slate-900/20"}`}
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-11 h-11 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700">
                                                        <Image
                                                            src={doctor.profileImage}
                                                            alt={doctor.doctorName}
                                                            width={44}
                                                            height={44}
                                                            className="w-full h-full object-cover object-top"
                                                            unoptimized
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                            {doctor.doctorName}
                                                        </p>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">{doctor.hospitalName || "MediCare Connect"}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 px-2.5 py-1 rounded-lg">
                                                    {doctor.specialization}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                                                {doctor.experience} yrs
                                            </td>
                                            <td className="px-5 py-4 font-bold text-slate-800 dark:text-slate-100">
                                                ${doctor.consultationFee}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                                                    <StarFill size={12} />
                                                    {doctor.rating || "4.8"}
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <button
                                                    onClick={() => router.push(`/find-doctors/${doctor._id}`)}
                                                    className="text-xs font-semibold px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm shadow-blue-600/20"
                                                >
                                                    Book Now
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 pt-8 border-t border-slate-200 dark:border-slate-800/60">
                        <Button 
                            size="sm" 
                            variant="flat" 
                            isDisabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className="rounded-xl font-medium bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                        >
                            Previous
                        </Button>
                        <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mx-3 font-medium">
                            Page <span className="text-slate-800 dark:text-slate-100 font-bold">{currentPage}</span> of {totalPages}
                        </span>
                        <Button 
                            size="sm" 
                            variant="flat" 
                            isDisabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            className="rounded-xl font-medium bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                        >
                            Next
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
