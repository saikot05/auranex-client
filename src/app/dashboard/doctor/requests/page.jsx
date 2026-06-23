"use client";

import React from 'react';
import { Card } from "@heroui/react";

export default function AppointmentRequestsPage() {
    return (
        <div className="space-y-6 w-full max-w-5xl mx-auto p-4 animate-in fade-in duration-200">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Appointment Requests</h1>
                <p className="text-sm text-muted-foreground">Manage and confirm patient booking requests.</p>
            </div>
            <Card className="p-8 text-center border border-default bg-content1 text-muted-foreground rounded-2xl">
                Appointment requests list will be integrated here.
            </Card>
        </div>
    );
}