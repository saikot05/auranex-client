import { authFetch } from "@/lib/authFetch";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getPlatformStats = async() => {
    try {
        const res = await fetch(`${baseUrl}/api/stats/platform`, {
            method: 'GET',
            cache: 'no-store'
        });
        if (!res.ok) throw new Error("Failed to fetch stats");
        return await res.json();
    } catch (error) {
        console.error("getPlatformStats api error:", error);
        return {
            success: false,
            stats: { totalDoctors: 0, totalPatients: 0, totalAppointments: 0, totalReviews: 0 }
        };
    }
};