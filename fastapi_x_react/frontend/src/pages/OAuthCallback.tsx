import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {tokenLogin} from "../api/token_login.ts";

export default function OAuthCallback(){
    const {mutate} = useMutation({
        mutationFn: tokenLogin,
        onSuccess: data => {
            console.log(data);
            sessionStorage.setItem("access_token", data.access_token)
            window.location.href = "/dashboard"
        },
        onError: error => {
            alert(error)
        }
    })

    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash.replace("#", "");
        const params = new URLSearchParams(hash);
        const token = params.get("token");

        if (token) {
            sessionStorage.setItem("access_token", token);
            mutate(token);
        } else{
            navigate("/login");
        }
    }, []);

    return <p>Signing you in…</p>;
}