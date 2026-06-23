const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getAdminUsers = async() => {
    try {
        const res = await fetch(`${baseUrl}/api/admin/users`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });
        if (!res.ok) throw new Error("Failed to fetch users");
        return await res.json();
    } catch (error) {
        console.error("getAdminUsers api error:", error);
        return { success: false, users: [] };
    }
};

export const getAdminDoctors = async(status = "") => {
    try {
        const query = status ? `?status=${status}` : "";
        const res = await fetch(`${baseUrl}/api/admin/doctors${query}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });
        if (!res.ok) throw new Error("Failed to fetch doctors");
        return await res.json();
    } catch (error) {
        console.error("getAdminDoctors api error:", error);
        return { success: false, doctors: [] };
    }
};

export const getAdminAppointments = async(filters = {}) => {
    try {
        const queryParams = new URLSearchParams({
            ...(filters.status && { status: filters.status }),
            page: filters.page || 1,
            limit: filters.limit || 10,
        });
        const res = await fetch(`${baseUrl}/api/admin/appointments?${queryParams}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });
        if (!res.ok) throw new Error("Failed to fetch appointments");
        return await res.json();
    } catch (error) {
        console.error("getAdminAppointments api error:", error);
        return { success: false, appointments: [], total: 0, totalPages: 1 };
    }
};

export const getAdminPayments = async(filters = {}) => {
    try {
        const queryParams = new URLSearchParams({
            page: filters.page || 1,
            limit: filters.limit || 10,
        });
        const res = await fetch(`${baseUrl}/api/admin/payments?${queryParams}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });
        if (!res.ok) throw new Error("Failed to fetch payments");
        return await res.json();
    } catch (error) {
        console.error("getAdminPayments api error:", error);
        return { success: false, payments: [], total: 0, totalPages: 1 };
    }
};

export const getAdminStats = async() => {
    try {
        const res = await fetch(`${baseUrl}/api/admin/stats`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });
        if (!res.ok) throw new Error("Failed to fetch stats");
        return await res.json();
    } catch (error) {
        console.error("getAdminStats api error:", error);
        return { success: false, stats: null };
    }
};

export const getDoctorPerformance = async() => {
    try {
        const res = await fetch(`${baseUrl}/api/admin/doctor-performance`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });
        if (!res.ok) throw new Error("Failed to fetch doctor performance");
        return await res.json();
    } catch (error) {
        console.error("getDoctorPerformance api error:", error);
        return { success: false, data: [] };
    }
};