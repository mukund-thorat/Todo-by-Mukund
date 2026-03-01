import {refreshAccessToken} from "./refresh-token.ts";


export async function fetchWithAuth(url: string, options: RequestInit): Promise<Response> {
    let token = localStorage.getItem("access_token");
    if (!token) token = await refreshAccessToken();

    const request = (accessToken: string) => {
        return fetch(url, {
            ...options,
            headers: {
                ...(options.headers ?? {}),
                Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include"
        })
    }

    let response = await request(token)

    if (response.status === 401 || response.status === 403) {
        token = await refreshAccessToken();
        response = await request(token);
    }

    return response;
}