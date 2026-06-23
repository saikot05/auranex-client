const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const deleteUser = async(id) => {
    try {
        const res = await fetch(`${baseUrl}/api/admin/users/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        return await res.json();
    } catch (error) {
        console.error("deleteUser action error:", error);
        return { success: false, message: "Network error occurred" };
    }
};

export const updateUserStatus = async(id, status) => {
    try {
        const res = await fetch(`${baseUrl}/api/admin/users/${id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
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
        const res = await fetch(`${baseUrl}/api/admin/doctors/${id}/verify`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action }),
        });
        return await res.json();
    } catch (error) {
        console.error("updateDoctorVerification action error:", error);
        return { success: false, message: "Network error occurred" };
    }
};