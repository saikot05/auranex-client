import { authFetch } from "@/lib/proxy";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const deleteUser = async(id) => {
    try {
        const res = await authFetch(`${baseUrl}/api/admin/users/${id}`, {
            method: 'DELETE',
        });
        return await res.json();
    } catch (error) {
        console.error("deleteUser action error:", error);
        return { success: false, message: "Network error occurred" };
    }
};

export const updateUserStatus = async(id, status) => {
    try {
        const res = await authFetch(`${baseUrl}/api/admin/users/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status }),
        });
        return await res.json();
    } catch (error) {
        console.error("updateUserStatus action error:", error);
        return { success: false, message: "Network error occurred" };
    }
};

export const updateDoctorVerification = async(id, action) => {
    try {
        const res = await authFetch(`${baseUrl}/api/admin/doctors/${id}/verify`, {
            method: 'PATCH',
            body: JSON.stringify({ action }),
        });
        return await res.json();
    } catch (error) {
        console.error("updateDoctorVerification action error:", error);
        return { success: false, message: "Network error occurred" };
    }
};