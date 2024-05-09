import { useEffect, useState } from 'react';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import App from './App';
import Master from './Master';
import AuthCallback from './core/components/auth/AuthCallback';
import SignUp from './core/components/authentication/Sign Up/SignUp';
import { PageNotFound } from './pages/PageNotFound';
import Admin from './pages/admin/Admin';
import ApprovedRequests from './pages/admin/components/ApprovedRequests';
import PendingRequests from './pages/admin/components/PendingRequests';
import RejectedRequests from './pages/admin/components/RejectedRequests';
import User from './pages/user/User';
import { PftRoutes } from './core/utility/enums/core.enum';

export const AppRoutes = () => {
  const [role, setRole] = useState<string>('');
  useEffect(() => {
    const roleData = localStorage.getItem('role');
    if (roleData) {
      setRole(roleData);
    }
  }, []);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Master Children={App} setRole={setRole} />,
      children: [
        {
          path: '/',
          element: role && (role === 'Admin' ? <Admin /> : <User />),
          children: role === 'Admin' ? adminRoutes : userRoutes,
        },
      ],
    },
    {
      path: '/callback',
      element: <AuthCallback />,
    },
    {
      path: PftRoutes.SIGNUP,
      element: <SignUp />,
    },
    {
      path: '*',
      element: <PageNotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

const adminRoutes = [
  { path: '/', element: <Navigate to={PftRoutes.PENDING_REQUESTS} /> },
  { path: PftRoutes.PENDING_REQUESTS, element: <PendingRequests /> },
  { path: PftRoutes.APPROVED_REQUESTS, element: <ApprovedRequests /> },
  { path: PftRoutes.REJECTED_REQUESTS, element: <RejectedRequests /> },
];

const userRoutes = [
  { path: '/', element: <PendingRequests /> },
  { path: '/expense', element: <ApprovedRequests /> },
];
