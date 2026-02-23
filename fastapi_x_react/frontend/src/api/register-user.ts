import type {RegisterFormData} from "../entities/user.ts";

export async function registerUser(formData: RegisterFormData){
    const response = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            avatar: null
        })
    });
    if (!response.ok) {
        throw new Error("Registration failed");
    }
    return await response.json();
}