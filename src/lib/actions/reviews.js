const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const deleteReview = async(reviewId) => {
    try {
        const res = await fetch(`${baseUrl}/api/reviews/${reviewId}`, {
            method: 'DELETE',
        });
        return await res.json();
    } catch (error) {
        return { success: false, error: "Delete failed" };
    }
};