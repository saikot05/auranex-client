const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getAllDoctors = async(filters = {}) => {
    try {
        const queryParams = new URLSearchParams({
            search: filters.search || "",
            specialization: filters.specialization || "",
            sortBy: filters.sortBy || "",
            page: filters.page || 1,
            limit: filters.limit || 6,
        });

        const res = await fetch(`${baseUrl}/api/doctors?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        if (!res.ok) throw new Error("Failed to fetch doctors");
        return await res.json();
    } catch (error) {
        console.error("getAllDoctors api error:", error);
        return { success: false, doctors: [], totalPages: 1, currentPage: 1 };
    }
};

export const getDoctorDetails = async(id) => {
    try {
        const res = await fetch(`${baseUrl}/api/doctors/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store'
        });
        if (!res.ok) throw new Error("Failed to fetch doctor details");
        return await res.json();
    } catch (error) {
        console.error("getDoctorDetails api error:", error);
        return null;
    }
};

export const getDoctorSlots = async(email) => {
    try {
        if (!email) return { success: false, data: [] };

        const res = await fetch(`${baseUrl}/api/doctor/slots?email=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store'
        });

        if (!res.ok) throw new Error("Failed to fetch slots");
        return await res.json();
    } catch (error) {
        console.error("getDoctorSlots api error:", error);
        return { success: false, data: [] };
    }
};

export const getDoctorPrescriptions = async(email) => {
    try {
        if (!email) return { success: false, data: [] };
        const res = await fetch(`${baseUrl}/api/doctor/prescriptions?email=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store'
        });
        if (!res.ok) throw new Error("Failed to fetch prescriptions");
        return await res.json();
    } catch (error) {
        console.error("getDoctorPrescriptions api error:", error);
        return { success: false, data: [] };
    }
};

export const getDoctorAppointments = async(email) => {
    try {
        if (!email) return { success: false, data: [] };
        const res = await fetch(`${baseUrl}/api/appointments/doctor/${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store'
        });
        if (!res.ok) throw new Error("Failed to fetch appointments");
        return await res.json();
    } catch (error) {
        console.error("getDoctorAppointments api error:", error);
        return { success: false, data: [] };
    }
};

export const getDoctorProfile = async(email) => {
    try {
        if (!email) return null;
        const res = await fetch(`${baseUrl}/api/doctors/profile/${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store'
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        return await res.json();
    } catch (error) {
        console.error("getDoctorProfile api error:", error);
        return null;
    }
};