const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createDoctorSlot = async(slotData) => {
    try {
        const res = await fetch(`${baseUrl}/api/doctor/slots`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(slotData),
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("createDoctorSlot action error:", error);
        return { success: false, message: "Network error occurred" };
    }
};

export const deleteDoctorSlot = async(id) => {
    try {
        const res = await fetch(`${baseUrl}/api/doctor/slots/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("deleteDoctorSlot action error:", error);
        return { success: false, message: "Network error occurred" };
    }
};
export const createPrescription = async(prescriptionData) => {
    try {
        const res = await fetch(`${baseUrl}/api/doctor/prescriptions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prescriptionData),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("createPrescription action error:", error);
        return { success: false, message: "Network error occurred" };
    }
};

export const updatePrescription = async(id, prescriptionData) => {
    try {
        const res = await fetch(`${baseUrl}/api/doctor/prescriptions/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prescriptionData),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("updatePrescription action error:", error);
        return { success: false, message: "Network error occurred" };
    }
};

export const deletePrescription = async(id) => {
    try {
        const res = await fetch(`${baseUrl}/api/doctor/prescriptions/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("deletePrescription action error:", error);
        return { success: false, message: "Network error occurred" };
    }
};

export const updateAppointmentStatus = async(id, status) => {
    try {
        const res = await fetch(`${baseUrl}/api/appointments/status/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("updateAppointmentStatus action error:", error);
        return { success: false, message: "Network error occurred" };
    }
};

export const updateDoctorProfile = async(email, profileData) => {
    try {
        const res = await fetch(`${baseUrl}/api/doctors/update/${encodeURIComponent(email)}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profileData),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("updateDoctorProfile action error:", error);
        return { success: false, message: "Network error occurred" };
    }
};

export const paymentSave = async(session) => {
    try {
        const appointmentData = {
            doctorId: session.metadata?.doctorId,
            doctorEmail: session.metadata?.doctorEmail,
            doctorName: session.metadata?.doctorName,
            patientEmail: session.metadata?.patientEmail || session.customer_details?.email,
            patientName: session.metadata?.patientName || session.customer_details?.name || '',
            selectedDate: session.metadata?.selectedDate,
            selectedSlot: session.metadata?.selectedSlot,
            amount: session.amount_total ? session.amount_total / 100 : null,
            stripeSessionId: session.id,
            paymentStatus: 'paid',
            appointmentStatus: 'pending',
        };

        const [paymentRes, appointmentRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(appointmentData),
            }),
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/appointments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(appointmentData),
            }),
        ]);

        const paymentResult = await paymentRes.json();
        return paymentResult;
    } catch (error) {
        console.error("Payment save error:", error);
    }
};