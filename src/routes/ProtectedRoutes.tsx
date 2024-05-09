import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/store";

export default function ProtectedRoute() {
    const user = useAppSelector((state) => state.auth.access_token);

    const location = useLocation();
    console.log("pro");

    return (
        <>
            {user ? (
                <Outlet />
            ) : (
                <Navigate to="/sign-up" replace state={{ path: location.pathname }} />
            )}
        </>
    );
}