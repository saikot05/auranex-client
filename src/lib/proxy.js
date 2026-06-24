import { getToken } from "./jwt";

const getServerToken = async () => {
    if (typeof window !== "undefined") return null;
    try {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        return cookieStore.get("auranex_jwt")?.value || null;
    } catch {
        return null;
    }
};

export const authFetch = new Proxy(
    typeof window !== "undefined" ? window.fetch : fetch,
    {
        apply: async (target, thisArg, args) => {
            const [url, options = {}] = args;
            let token = null;
            if (typeof window !== "undefined") {
                token = getToken();
            } else {
                token = await getServerToken();
            }
            const headers = {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            };
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
            return target(url, {
                ...options,
                headers,
            });
        },
    }
);
