"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { Spinner } from "@heroui/react";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { getAdminStats } from "@/api/admin";

export default function AdminDashboardHomePage() {
    const { data: session, isPending } = useSession();
    const [stats, setStats] = useState(null);
    const [statsLoading, setStatsLoading] = useState(true);

    useEffect(() => {
        getAdminStats().then((res) => {
            if (res.success) setStats(res.stats);
            setStatsLoading(false);
        });
    }, []);

    if (isPending || statsLoading) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <Spinner size="lg" label="Loading admin dashboard..." color="primary" />
            </div>
        );
    }

    const adminStats = {
        totalUsers: stats?.totalPatients ?? 0,
        unverifiedDoctorsCount: stats?.totalDoctors ?? 0,
        totalSystemAppointments: stats?.totalAppointments ?? 0,
        analyticsScore: "98%",
    };

    return (
        <div className="space-y-6 w-full animate-in fade-in duration-200">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Admin Console</h1>
                <p className="text-sm text-muted-foreground">
                    Platform-wide overview and management.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 items-stretch w-full">
                <DashboardStats role="admin" stats={adminStats} />
            </div>
        </div>
    );
}