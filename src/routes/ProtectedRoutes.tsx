import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/store";

export default function ProtectedRoute() {
    const access_token = useAppSelector((state) => state.auth.access_token);

    const location = useLocation();
    console.log("protected");

    return (
        <>
            {access_token ? (
                <Outlet />
            ) : (
                <Navigate to="/sign-up" replace state={{ path: location.pathname }} />
            )}
        </>
    );
}