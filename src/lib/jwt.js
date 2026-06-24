/**
 * jwt.js — Client-side JWT utility for AuraNex
 *
 * Better Auth's JWT plugin handles token *signing* via authClient.token().
 * This file handles:
 *   1. Fetching & caching the token (localStorage + cookie)
 *   2. Attaching the token as Authorization: Bearer on all Express API calls
 */

import { authClient } from "@/lib/auth-client";

const TOKEN_KEY = "auranex_jwt";

/** Fetch a fresh JWT from Better Auth and cache it locally. */
export const issueToken = async () => {
    try {
        const { data, error } = await authClient.token();
        if (error || !data?.token) {
            console.error("Better Auth token error:", error);
            return null;
        }
        localStorage.setItem(TOKEN_KEY, data.token);
        document.cookie = `${TOKEN_KEY}=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict`;
        return data.token;
    } catch (err) {
        console.error("issueToken error:", err);
        return null;
    }
};

/** Read the cached JWT from localStorage (client-side only). */
export const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
};

/** Remove the cached JWT on sign-out. */
export const clearToken = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
    document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
};

/**
 * Drop-in replacement for fetch() that automatically injects the Bearer token.
 * Use this for all protected Express API calls instead of plain fetch().
 */
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
