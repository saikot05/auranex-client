"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "@gravity-ui/icons";

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

export default function AvailabilityCalendar({ availableDays = [], selectedDate, onDateSelect }) {
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

            <div className="grid grid-cols-7 gap-0.5">
                {WEEKDAY_NAMES.map(d => (
                    <div key={d} className="text-center text-[10px] font-bold text-slate-400 dark:text-slate-500 py-1 uppercase tracking-wide">
                        {d}
                    </div>
                ))}

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