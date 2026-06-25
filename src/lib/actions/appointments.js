"use server";

import { authFetch } from "@/lib/authFetch";
import { revalidatePath } from "next/cache";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const rescheduleAppointmentAction = async (id, newDate, newSlot) => {
    try {
        const res = await authFetch(`${baseUrl}/api/appointments/reschedule/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ newDate, newSlot }),
        });

        if (!res.ok) throw new Error("Failed to reschedule");
        const data = await res.json();

        if (data.success) {
            revalidatePath("/dashboard/patient/appointments");
            return { success: true, data };
        }
        return { success: false, error: "No documents were updated" };
    } catch (error) {
        console.error("rescheduleAction error:", error);
        return { success: false, error: error.message };
    }
};

export const cancelAppointmentAction = async (id) => {
    try {
        const res = await authFetch(`${baseUrl}/api/appointments/cancel/${id}`, {
            method: "PATCH",
        });

        if (!res.ok) throw new Error("Failed to cancel");
        const data = await res.json();

        if (data.success) {
            revalidatePath("/dashboard/patient/appointments");
            return { success: true, data };
        }
        return { success: false, error: "No documents were updated" };
    } catch (error) {
        console.error("cancelAction error:", error);
        return { success: false, error: error.message };
    }
};
