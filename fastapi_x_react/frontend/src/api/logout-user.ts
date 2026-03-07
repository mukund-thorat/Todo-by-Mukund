import {apiUrl} from "./config.ts";

export async function logoutUser(){
    const response = await fetch(apiUrl("/auth/logout"), {
        method: "GET",
        credentials: "include"
    })


    if (!response.ok) {
        throw new Error("Logout failed");
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
        return await response.json();
    }

    return null;
}
