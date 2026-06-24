import { authFetch } from "@/lib/jwt";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createDoctorSlot = async (slotData) => {
    try {
        const res = await authFetch(`${baseUrl}/api/doctor/slots`, {
            method: "POST",
            body: JSON.stringify(slotData),
        });
        return await res.json();
    } catch (error) {
        console.error("createDoctorSlot action error:", error);
        return { success: false, message: "Network error occurred" };
    }
};

export const deleteDoctorSlot = async (id) => {
    try {
        const res = await authFetch(`${baseUrl}/api/doctor/slots/${id}`, {
            method: "DELETE",
        });
        return await res.json();
    } catch (error) {
        console.error("deleteDoctorSlot action error:", error);
        return { success: false, message: "Network error occurred" };
    }
};

export const createPrescription = async (prescriptionData) => {
    try {
        const res = await authFetch(`${baseUrl}/api/doctor/prescriptions`, {
            method: "POST",
            body: JSON.stringify(prescriptionData),
        });
        return await res.json();
    } catch (error) {
        console.error("createPrescription action error:", error);
        return { success: false, message: "Network error occurred" };
    }
};

export const updatePrescription = async (id, prescriptionData) => {
    try {
        const res = await authFetch(`${baseUrl}/api/doctor/prescriptions/${id}`, {
            method: "PUT",
            body: JSON.stringify(prescriptionData),
        });
        return await res.json();
    } catch (error) {
        console.error("updatePrescription action error:", error);
        return { success: false, message: "Network error occurred" };
    }
};

export const deletePrescription = async (id) => {
    try {
        const res = await authFetch(`${baseUrl}/api/doctor/prescriptions/${id}`, {
            method: "DELETE",
        });
        return await res.json();
    } catch (error) {
        console.error("deletePrescription action error:", error);
        return { success: false, message: "Network error occurred" };
    }
};

export const updateAppointmentStatus = async (id, status) => {
    try {
        const res = await authFetch(`${baseUrl}/api/appointments/status/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ status }),
        });
        return await res.json();
    } catch (error) {
        console.error("updateAppointmentStatus action error:", error);
        return { success: false, message: "Network error occurred" };
    }
};

export const updateDoctorProfile = async (email, profileData) => {
    try {
        const res = await authFetch(`${baseUrl}/api/doctors/update/${encodeURIComponent(email)}`, {
            method: "PATCH",
            body: JSON.stringify(profileData),
        });
        return await res.json();
    } catch (error) {
        console.error("updateDoctorProfile action error:", error);
        return { success: false, message: "Network error occurred" };
    }
};

export const paymentSave = async (session) => {
    try {
        const appointmentData = {
            doctorId: session.metadata?.doctorId,
            doctorEmail: session.metadata?.doctorEmail,
            doctorName: session.metadata?.doctorName,
            patientEmail: session.metadata?.patientEmail || session.customer_details?.email,
            patientName: session.metadata?.patientName || session.customer_details?.name || "",
            selectedDate: session.metadata?.selectedDate,
            selectedSlot: session.metadata?.selectedSlot,
            amount: session.amount_total ? session.amount_total / 100 : null,
            stripeSessionId: session.id,
            paymentStatus: "paid",
            appointmentStatus: "pending",
        };

        const [paymentRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(appointmentData),
            }),
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/appointments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(appointmentData),
            }),
        ]);

        return await paymentRes.json();
    } catch (error) {
        console.error("Payment save error:", error);
    }
};