import { authFetch } from "@/lib/jwt";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getMyReviews = async(email) => {
    try {
        const res = await authFetch(`${baseUrl}/api/reviews/patient/${email}`, {
            method: 'GET',
            cache: 'no-store'
        });
        if (!res.ok) return { success: false, reviews: [] };
        return await res.json();
    } catch (error) {
        return { success: false, reviews: [] };
    }
};

export const getSuccessStories = async() => {
    try {
        const res = await fetch(`${baseUrl}/api/success-stories`, {
            method: 'GET',
            cache: 'no-store'
        });
        if (!res.ok) return { success: false, stories: [] };
        return await res.json();
    } catch (error) {
        return { success: false, stories: [] };
    }
};