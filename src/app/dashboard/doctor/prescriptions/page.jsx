"use client";

import React from 'react';
import { Card } from "@heroui/react";

export default function PrescriptionsPage() {
    return (
        <div className="space-y-6 w-full max-w-5xl mx-auto p-4 animate-in fade-in duration-200">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Prescriptions</h1>
                <p className="text-sm text-muted-foreground">Create and manage digital prescriptions for your patients.</p>
            </div>
            <Card className="p-8 text-center border border-default bg-content1 text-muted-foreground rounded-2xl">
                Prescription management module will be integrated here.
            </Card>
        </div>
    );
}