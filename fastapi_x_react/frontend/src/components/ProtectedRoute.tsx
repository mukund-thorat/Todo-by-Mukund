import type {ReactNode} from "react";
import {useQuery} from "@tanstack/react-query";
import {getMe} from "../api/get-me.ts";
import {Navigate} from "react-router-dom";

function ProtectedRoute({children}: {children: ReactNode}) {
    const { isLoading, isError } = useQuery({
        queryKey: ["me"],
        queryFn: getMe,
        retry: false,
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) {
        localStorage.removeItem("access_token");
        return <Navigate to="/login" replace/>;
    }

    return <>{children}</>;

}

export default ProtectedRoute;
