import { authClient } from "@/lib/auth-client";

const TOKEN_KEY = "auranex_jwt";

export const issueToken = async () => {
    try {
        const { data, error } = await authClient.token();
        if (error || !data?.token) return null;
        localStorage.setItem(TOKEN_KEY, data.token);
        document.cookie = `${TOKEN_KEY}=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict`;
        return data.token;
    } catch (err) {
        return null;
    }
};

export const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
};

export const clearToken = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
    document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
};

export const authFetch = async (url, options = {}) => {
    const token = getToken();
    return fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
};
