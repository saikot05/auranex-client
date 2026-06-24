"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { issueToken, getToken, clearToken } from "@/lib/jwt";

export function TokenProvider({ children }) {
    const { data: session } = useSession();

    useEffect(() => {
        const email = session?.user?.email;
        const role = session?.user?.role;

        if (email && !getToken()) {
            issueToken();
        }

        if (!email) {
            clearToken();
        }
    }, [session]);

    return children;
}
