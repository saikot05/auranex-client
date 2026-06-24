const TOKEN_KEY = "auranex_jwt";

export const storeToken = (token) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
};

export const clearToken = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
};

export const authFetch = async (url, options = {}) => {
    const token = getToken();

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return fetch(url, {
        ...options,
        headers,
    });
};
