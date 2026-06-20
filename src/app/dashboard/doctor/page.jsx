"use client";

import React from 'react';
import { useSession } from '@/lib/auth-client';
import { Spinner } from "@heroui/react";
import { DashboardStats } from '@/components/dashboard/DashboardStats';

const DoctorDashboardHomePage = () => {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <Spinner size="lg" label="Loading doctor dashboard..." color="primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6 w-full animate-in fade-in duration-200">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Doctor Console</h1>
                <p className="text-sm text-muted-foreground">Manage your patients and schedule slots.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch w-full">
                <DashboardStats role="doctor" />
            </div>
        </div>
    );
};

export default DoctorDashboardHomePage;