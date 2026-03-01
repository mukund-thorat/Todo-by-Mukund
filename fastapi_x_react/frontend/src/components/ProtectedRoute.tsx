import {type ReactNode, useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import {getMe} from "../api/get-me.ts";
import {Navigate} from "react-router-dom";
import {clearUser, setUser} from "../store/userSlice.ts";
import {useAppDispatch} from "../store/hooks.ts";

function ProtectedRoute({children}: {children: ReactNode}) {
    const dispatch = useAppDispatch();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["me"],
        queryFn: getMe,
        retry: false,
        staleTime: Infinity
    })

    useEffect(() => {
        if (data) dispatch(setUser(data));
        if (isError) dispatch(clearUser());
    }, [data, isError, dispatch])

    if (isLoading) return <div>Loading...</div>
    if (isError) {
        localStorage.removeItem("access_token");
        return <Navigate to="/login" replace/>;
    }

    return <>{children}</>;
}

export default ProtectedRoute;
