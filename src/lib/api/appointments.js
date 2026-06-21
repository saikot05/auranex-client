const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getAppointments = async(email) => {
    try {
        const res = await fetch(`${baseUrl}/api/appointments/patient/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error("Failed to fetch appointments");
        }

        return await res.json();
    } catch (error) {
        console.error("getAppointments api error:", error);
        return [];
    }
};