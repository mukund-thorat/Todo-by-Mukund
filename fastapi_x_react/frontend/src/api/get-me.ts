import {refreshAccessToken} from "./refresh-token.ts";
import {userObject, type userModel} from "../entities/user.ts";

export async function fetchMe(token: string) {
    return fetch("http://localhost:8000/auth/me", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
        credentials: "include"
    });
}

export async function getMe(): Promise<userModel> {
    let token = localStorage.getItem("access_token");
    if (!token) {
        token = await refreshAccessToken();
    }

    let response = await fetchMe(token);
    if (response.status === 401 || response.status === 403) {
        token = await refreshAccessToken();
        response = await fetchMe(token);
    }

    if (!response.ok) {
        localStorage.removeItem("access_token");
        throw new Error(response.statusText);
    }

    const data = await response.json();
    return userObject.parse(data);
}
