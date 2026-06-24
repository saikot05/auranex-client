import { authFetch } from "@/lib/jwt";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getAppointments = async(email) => {
    try {
        const res = await authFetch(`${baseUrl}/api/appointments/patient/${email}`, {
            method: 'GET',
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error("Failed to fetch appointments");
        }

        return await res.json();
    } catch (error) {
        console.error("getAppointments api error:", error);
        return [];
    }
};

export const getPaymentHistory = async(email) => {
    try {
        const res = await authFetch(`${baseUrl}/api/appointments/payments/${email}`, {
            method: 'GET',
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error("Failed to fetch payment history");
        }

        return await res.json();
    } catch (error) {
        console.error("getPaymentHistory api error:", error);
        return { success: false, payments: [] };
    }
};