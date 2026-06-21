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