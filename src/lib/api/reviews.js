const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getMyReviews = async(email) => {
    try {
        const res = await fetch(`${baseUrl}/api/reviews/patient/${email}`, {
            method: 'GET',
            cache: 'no-store'
        });
        if (!res.ok) return { success: false, reviews: [] };
        return await res.json();
    } catch (error) {
        return { success: false, reviews: [] };
    }
};