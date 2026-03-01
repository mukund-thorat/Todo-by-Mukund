import type {tokenModel} from "../entities/token.ts";

export async function refreshAccessToken(): Promise<string> {
    const response = await fetch("http://localhost:8000/auth/refresh", {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        localStorage.removeItem("access_token");
        window.location.href = "/login";
    }

    const data: tokenModel = await response.json();
    localStorage.setItem("access_token", data.access_token);
    return data.access_token;
}
