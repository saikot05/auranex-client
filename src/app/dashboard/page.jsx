"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Spinner } from "@heroui/react";

export default function DashboardRootPage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isPending) {
            const role = session?.user?.role || "patient";
            router.replace(`/dashboard/${role}`);
        }
    }, [session, isPending, router]);

    return (
        <div className="flex justify-center items-center h-[70vh]">
            <Spinner size="lg" label="Redirecting to your dashboard..." color="primary" />
        </div>
    );
}