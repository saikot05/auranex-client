"use client";

import React from 'react';
import { StatCard } from './StatCard';
import { Calendar, Persons, Star } from "@gravity-ui/icons";
import { History, Activity, ShieldCheck, ClipboardList } from "lucide-react";
import { Card } from '@heroui/react';

export const DashboardStats = ({ role = "patient", stats }) => {
    if (role === "doctor") {
        return (
            <>
                <StatCard
                    title="Total Patients"
                    value={stats?.totalPatients ?? 0}
                    icon={Persons}
                    description="Unique patients served"
                    variantColor="blue"
                />
                <StatCard
                    title="Today's Appointments"
                    value={stats?.todaysAppointments ?? 0}
                    icon={Calendar}
                    description="Scheduled for today"
                    variantColor="teal"
                />
                <StatCard
                    title="Reviews Received"
                    value={stats?.reviewsCount ?? 0}
                    icon={Star}
                    description="Total patient feedbacks"
                    variantColor="rose"
                />
            </>
        );
    }

    if (role === "admin") {
        return (
            <>
                <StatCard
                    title="Total Users"
                    value={stats?.totalUsers ?? 0}
                    icon={Persons}
                    description="Active patients on platform"
                    variantColor="blue"
                />
                <StatCard
                    title="Manage Doctors"
                    value={stats?.unverifiedDoctorsCount ?? 0}
                    icon={ShieldCheck}
                    description="Pending verification requests"
                    variantColor="warning"
                />
                <StatCard
                    title="Total Appointments"
                    value={stats?.totalSystemAppointments ?? 0}
                    icon={ClipboardList}
                    description="Overall system bookings"
                    variantColor="teal"
                />
                <StatCard
                    title="Platform Analytics"
                    value={stats?.analyticsScore ?? "98%"}
                    icon={Activity}
                    description="System uptime & health"
                    variantColor="emerald"
                />
            </>
        );
    }

    return (
        <>
            <StatCard
                title="Upcoming Appointments"
                value={stats?.upcomingCount ?? 0}
                icon={Calendar}
                description="Next session scheduled"
                variantColor="teal"
            />
            <StatCard
                title="Appointment History"
                value={stats?.totalAppointments ?? 0}
                icon={History}
                description="Total consultations"
                variantColor="blue"
            />
            <StatCard
                title="Total Payments"
                value={stats?.totalPaid ? `$${stats.totalPaid}` : "$0"}
                icon={Card}
                description="Processed via Stripe"
                variantColor="emerald"
            />
            <StatCard
                title="Favorite Doctors"
                value={stats?.favDoctorsCount ?? 0}
                icon={Star}
                description="Saved specialist profiles"
                variantColor="rose"
            />
        </>
    );
};