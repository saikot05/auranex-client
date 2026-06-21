"use client";

import React, { useState } from "react";
import { 
    LayoutSideContentLeft, Bell, Briefcase, Gear, House, 
    Person, CreditCard, FileText 
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { Users, Activity, Stethoscope, CalendarCheck, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export function DashboardSidebar() {
    const { data: session, isPending } = useSession();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const role = session?.user?.role || "patient";

    const patientNavLinks = [
        { icon: House, href: "/dashboard", label: "Overview" },
        { icon: CalendarCheck, href: "/dashboard/patient/appointments", label: "My Appointments" },
        { icon: CreditCard, href: "/dashboard/patient/payments", label: "Payment History" },
        { icon: Star, href: "/dashboard/patient/reviews", label: "My Reviews" },
        { icon: Gear, href: "/settings", label: "Settings" },
    ];

    const doctorNavLinks = [
        { icon: House, href: "/dashboard", label: "Overview" },
        { icon: CalendarCheck, href: "/dashboard/doctor/schedule", label: "Manage Schedule" },
        { icon: Bell, href: "/dashboard/doctor/requests", label: "Appointment Requests" },
        { icon: FileText, href: "/dashboard/doctor/prescriptions", label: "Prescriptions" },
        { icon: Person, href: "/dashboard/doctor/profile", label: "Profile Management" },
    ];
    
    const adminNavLinks = [
        { icon: House, href: "/dashboard", label: "Overview" },
        { icon: Users, href: "/dashboard/admin/users", label: "Manage Users" },
        { icon: Stethoscope, href: "/dashboard/admin/doctors", label: "Manage Doctors" },
        { icon: CalendarCheck, href: "/dashboard/admin/appointments", label: "Appointments" },
        { icon: CreditCard, href: "/dashboard/admin/payments", label: "Payment Records" },
        { icon: Activity, href: "/dashboard/admin/analytics", label: "Analytics" },
    ];

    const navLinksMap = {
        patient: patientNavLinks,
        doctor: doctorNavLinks,
        admin: adminNavLinks,
    };

    const currentLinks = navLinksMap[role] || patientNavLinks;

    const navContent = (
        <div className="flex flex-col h-full justify-between w-full bg-white dark:bg-zinc-900 p-4">
            <div>
                <div className="mb-6 px-3 py-2 border-b border-default">
                    <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">AuraNex</h2>
                    <span className="text-[11px] uppercase tracking-wider font-semibold bg-blue-50 dark:bg-blue-950 text-blue-600 px-2 py-0.5 rounded mt-1 inline-block">
                        {role} Panel
                    </span>
                </div>

                <nav className="flex flex-col gap-1">
                    {currentLinks.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                                    isActive 
                                        ? "bg-blue-600 text-white shadow-sm" 
                                        : "text-foreground hover:bg-default"
                                }`}
                            >
                                <Icon className={`size-5 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );

    return (
        <>
            <aside className="hidden w-64 shrink-0 border-r border-default lg:block h-screen sticky top-0 bg-white dark:bg-zinc-900">
                {navContent}
            </aside>

            <div className="p-4 lg:hidden sticky top-0 border-b border-default bg-white dark:bg-zinc-900 w-full flex items-center justify-between z-40">
                <span className="font-bold text-blue-600">AuraNex</span>
                
                <Button variant="flat" size="sm" onPress={() => setIsOpen(true)}>
                    <LayoutSideContentLeft className="size-4 mr-1" />
                    Menu
                </Button>
            </div>

            <Drawer isOpen={isOpen} onOpenChange={setIsOpen} placement="left" size="xs">
                <Drawer.Backdrop />
                <Drawer.Content className="bg-white dark:bg-zinc-900">
                    <Drawer.CloseTrigger className="absolute right-4 top-4 z-50 text-foreground" />
                    <Drawer.Body className="p-0 h-full overflow-y-auto">
                        {navContent}
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer>
        </>
    );
}