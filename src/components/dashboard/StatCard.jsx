"use client";

import React from 'react';
import { Card } from '@heroui/react';

export const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    description, 
    variantColor = "blue" 
}) => {
    
    const colorMap = {
        teal: "text-teal-600 bg-teal-50 dark:bg-teal-950/40 border-teal-100 dark:border-teal-900/50",
        blue: "text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900/50",
        emerald: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/50",
        rose: "text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-100 dark:border-rose-900/50"
    };

    return (
        <Card className="border border-default-200/60 shadow-sm bg-content1 h-full rounded-2xl hover:scale-[1.02] transition-transform duration-200">
            <Card.Content className="p-6 flex flex-row items-center justify-between gap-4 h-full">
                <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-default-400">
                        {title}
                    </span>
                    <h3 className="text-3xl font-extrabold tracking-tight text-default-900">
                        {value}
                    </h3>
                    {description && (
                        <p className="text-xs font-medium text-default-500">
                            {description}
                        </p>
                    )}
                </div>
                
                {Icon && (
                    <div className={`p-3.5 rounded-2xl shrink-0 border ${colorMap[variantColor]}`}>
                        <Icon className="size-6 stroke-[2.2]" />
                    </div>
                )}
            </Card.Content>
        </Card>
    );
};
