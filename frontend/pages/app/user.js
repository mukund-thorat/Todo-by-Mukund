import { fetchWithAuth } from "/static/utils/utils.js";

const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", async () => {
    const response = await fetchWithAuth("auth/logout", {
        method: "GET",
    })

    const result = await response.json();

    if (response.status === 200 && result) {
        sessionStorage.removeItem("access_token")
        window.location.href = "/login";
    }
})
