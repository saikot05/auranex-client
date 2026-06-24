const TOKEN_KEY = "auranex_jwt";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const issueToken = async (email, role) => {
    const res = await fetch(`${BASE_URL}/api/auth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
    });
    const data = await res.json();
    if (data.success && data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
        document.cookie = `${TOKEN_KEY}=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict`;
        return data.token;
    }
    return null;
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
    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    return fetch(url, { ...options, headers });
};
