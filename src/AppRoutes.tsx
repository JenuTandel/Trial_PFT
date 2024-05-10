import { Navigate, Route, Routes } from "react-router-dom"
import SignUp from "./core/components/authentication/Sign Up/SignUp"
import { PftRoutes } from "./core/utility/enums/core.enum"
import Admin from "./pages/admin/Admin"
import ApprovedRequests from "./pages/admin/components/ApprovedRequests"
import PendingRequests from "./pages/admin/components/PendingRequests"
import User from "./pages/user/User"

export const AppRoutes = () => {
  // const access_token = useAppSelector((state) => state.auth.access_token);
  // const role = useAppSelector((state) => state.auth.role);

  const access_token = localStorage.getItem("user");
  const role = localStorage.getItem("role")
  return (
    <Routes>
      {/* <Route path="/callback" Component={AuthCallback} /> */}
      <Route path="/sign-up" Component={SignUp} />
      <Route path="/" element={<Navigate to={!access_token ? PftRoutes.SIGNUP : role === "Admin" ? PftRoutes.PENDING_REQUESTS : PftRoutes.APPROVED_REQUESTS} />} />
      {/* <Route element={<ProtectedRoute />}> */}
      <Route Component={Admin}>
        <Route path={PftRoutes.PENDING_REQUESTS} Component={PendingRequests} />
      </Route>
      <Route Component={User}>
        <Route path={PftRoutes.APPROVED_REQUESTS} Component={ApprovedRequests} />
      </Route>
      {/* </Route>/ */}
    </Routes>
  )
}