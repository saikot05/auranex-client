import { authFetch } from "@/lib/jwt";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getPlatformStats = async() => {
    try {
        const res = await authFetch(`${baseUrl}/api/admin/stats`, {
            method: 'GET',
            cache: 'no-store'
        });

        if (!res.ok) throw new Error("Failed to fetch stats");

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("getPlatformStats api error:", error);
        return {
            success: false,
            stats: { totalDoctors: 0, totalPatients: 0, totalAppointments: 0, totalReviews: 0 }
        };
    }
};