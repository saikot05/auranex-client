"use server"

import { revalidatePath } from "next/cache";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const rescheduleAppointmentAction = async(id, newDate) => {
    try {
        const res = await fetch(`${baseUrl}/api/appointments/reschedule/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newDate })
        });

        if (!res.ok) throw new Error("Failed to reschedule");
        const data = await res.json();

        if (data.modifiedCount > 0 || data.acknowledged) {
            revalidatePath("/dashboard/patient/appointments");
            return { success: true, data };
        }
        return { success: false, error: "No documents were updated" };
    } catch (error) {
        console.error("rescheduleAction error:", error);
        return { success: false, error: error.message };
    }
};

export const cancelAppointmentAction = async(id) => {
    try {
        const res = await fetch(`${baseUrl}/api/appointments/cancel/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) throw new Error("Failed to cancel");
        const data = await res.json();

        if (data.modifiedCount > 0 || data.acknowledged) {
            revalidatePath("/dashboard/patient/appointments");
            return { success: true, data };
        }
        return { success: false, error: "No documents were updated" };
    } catch (error) {
        console.error("cancelAction error:", error);
        return { success: false, error: error.message };
    }
};