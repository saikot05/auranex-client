"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import { Spinner } from "@heroui/react";
import { DashboardStats } from '@/components/dashboard/DashboardStats';

const PatientDashboardHomePage = () => {
    const { data: session, isPending } = useSession();
    const role = session?.user?.role || "patient";
    const [stats, setStats] = useState(null);
    const [statsLoading, setStatsLoading] = useState(true);

    useEffect(() => {
        const email = session?.user?.email;
        if (!email) return;
        const fetchStats = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stats/patient/${encodeURIComponent(email)}`);
                const data = await res.json();
                if (data.success) setStats(data.stats);
            } catch {
                setStats(null);
            } finally {
                setStatsLoading(false);
            }
        };
        fetchStats();
    }, [session]);

    if (isPending) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <Spinner size="lg" label="Loading dashboard data..." color="primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6 w-full animate-in fade-in duration-200">
            <div>
                <h1 className="text-2xl font-bold text-foreground">
                    Welcome back, {session?.user?.name || 'User'}
                </h1>
                <p className="text-sm text-muted-foreground">
                    Here is your {role} panel overview logs.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 items-stretch w-full">
                {statsLoading ? (
                    <div className="col-span-4 flex justify-center py-8">
                        <Spinner size="md" color="primary" />
                    </div>
                ) : (
                    <DashboardStats role={role} stats={stats} />
                )}
            </div>
        </div>
    );
};

export default PatientDashboardHomePage;
