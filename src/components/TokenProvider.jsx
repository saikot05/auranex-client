"use client";

import { useEffect } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { storeToken, clearToken } from "@/lib/authFetch";

export function TokenProvider({ children }) {
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user?.email) {
            authClient.getSession({
                fetchOptions: {
                    onSuccess: (ctx) => {
                        const jwt = ctx.response.headers.get("set-auth-jwt");
                        if (jwt) storeToken(jwt);
                    },
                },
            });
        } else {
            clearToken();
        }
    }, [session]);

    return children;
}
