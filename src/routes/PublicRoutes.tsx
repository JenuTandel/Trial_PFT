import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";

/**
 * @name PublicRoute
 * @description : checks if user is authenicated and redirtects to home if authenticated and tries to go to loginpage
 * @returns <Outlets/>
 */

function PublicRoute() {
    const access_token = useAppSelector((state) => state.auth.access_token);

    console.log("public");

    return <>{!access_token ? <Outlet /> : <Navigate to="/" />}</>;
}

export default PublicRoute;