import type {tokenModel} from "../entities/token.ts";

export async function tokenLogin(token: string): Promise<tokenModel>{
    const response = await fetch("http://127.0.0.1:8000/auth/google/token/login", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
        credentials: "include"
    });
    if (!response.ok) {
        throw new Error("Registration failed");
    }
    return await response.json();
}