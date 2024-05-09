import {
  Route,
  Routes
} from 'react-router-dom';
import AuthorizedAdminRoute from './AuthorizedAdminRoute';
import AuthorizedUserRoute from './AuthorizedUserRoute';
import SignUp from './core/components/authentication/Sign Up/SignUp';
import Admin from './pages/admin/Admin';
import ApprovedRequests from './pages/admin/components/ApprovedRequests';
import PendingRequests from './pages/admin/components/PendingRequests';
import User from './pages/user/User';
import ProtectedRoute from './routes/ProtectedRoutes';
import PublicRoute from './routes/PublicRoutes';
import { useAppSelector } from './store/store';
import AuthCallback from './core/components/auth/AuthCallback';
import { PftRoutes } from './core/utility/enums/core.enum';
import RejectedRequests from './pages/admin/components/RejectedRequests';

export const AppRoutes = () => {
  //   const [role, setRole] = useState<string>('');
  //   useEffect(() => {
  //     const roleData = localStorage.getItem('role');
  //     if (roleData) {
  //       setRole(roleData);
  //     }
  //   }, []);
  //   const router = createBrowserRouter([
  //     {
  //       path: '/',
  //       element: <Master Children={App} setRole={setRole} />,
  //       children: [
  //         {
  //           path: '/',
  //           element: role && (role === 'Admin' ? <Admin /> : <User />),
  //           children: role === 'Admin' ? adminRoutes : userRoutes,
  //         },
  //       ],
  //     },
  //     {
  //       path: '/callback',
  //       element: <AuthCallback />,
  //     },
  //     {
  //       path: PftRoutes.SIGNUP,
  //       element: <SignUp />,
  //     },
  //     {
  //       path: '*',
  //       element: <PageNotFound />,
  //     },
  //   ]);

  //   return <RouterProvider router={router} />;
  // };

  // const adminRoutes = [
  //   { path: '/', element: <Navigate to={PftRoutes.PENDING_REQUESTS} /> },
  //   { path: PftRoutes.PENDING_REQUESTS, element: <PendingRequests /> },
  //   { path: PftRoutes.APPROVED_REQUESTS, element: <ApprovedRequests /> },
  //   { path: PftRoutes.REJECTED_REQUESTS, element: <RejectedRequests /> },
  // ];

  // const userRoutes = [
  //   { path: '/', element: <PendingRequests /> },
  //   { path: '/expense', element: <ApprovedRequests /> },
  // ];

  const role = useAppSelector((state) => state.auth.role);

  return (
    <Routes>
      <Route path="/callback" element={<AuthCallback />} />
      <Route path="*" element={<div>no page found</div>} />
      <Route element={<PublicRoute />}>
        <Route path="/sign-up" element={<SignUp />} />

      </Route>
      {/* {role ? ( */}
      <Route element={<ProtectedRoute />}>
        <Route Component={Admin}>
          <Route
            path="/"

            element={
              role === "Admin" ? (
                // <AuthorizedUserRoute role={role}>
                <PendingRequests />
                // </AuthorizedUserRoute>
              ) : (
                // <AuthorizedAdminRoute role={role}>
                <ApprovedRequests />
                // </AuthorizedAdminRoute>
              )
            }
          ></Route>
          <Route
            path={PftRoutes.PENDING_REQUESTS}
            element={
              <AuthorizedAdminRoute role={role}>
                <PendingRequests />
              </AuthorizedAdminRoute>
            }
          ></Route>
          <Route
            path={PftRoutes.APPROVED_REQUESTS}
            element={
              <AuthorizedAdminRoute role={role}>
                <ApprovedRequests />
              </AuthorizedAdminRoute>
            }
          ></Route>
          <Route
            path={PftRoutes.REJECTED_REQUESTS}
            element={
              <AuthorizedAdminRoute role={role}>
                <RejectedRequests />
              </AuthorizedAdminRoute>
            }
          ></Route>
        </Route>
      </Route>
      {/* ) : ( */}
      {/* <Route element={<ProtectedRoute role={role} />}> */}
      <Route Component={User}>
        {/* <Route
          path="/"
          element={
            
          }
        ></Route> */}
        <Route
          path="/jigar"
          element={
            <AuthorizedUserRoute role={role}>
              <div>User</div>
            </AuthorizedUserRoute>
          }
        ></Route>
        <Route
          path="/job-details/:id"
          element={
            <AuthorizedUserRoute role={role}>
              <div>Expense</div>
            </AuthorizedUserRoute>
          }
        ></Route>
        {/* <Route path="/job-application" Component={JobApplication}></Route> */}
      </Route>
      {/* </Route> */}
      {/* )} */}
    </Routes>
  );
}