export async function getMe(): Promise<string> {
    const token = sessionStorage.getItem("access_token");
    if (!token) throw new Error("You don't have access token");

    const response = await fetch("http://localhost:8000/auth/me", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
}