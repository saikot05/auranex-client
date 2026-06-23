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