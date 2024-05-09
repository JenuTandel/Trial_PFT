// PrivateRoute.tsx
const roles = ["Admin", "User"];

const AuthorizedAdminRoute = ({
  children,
  role,
}: {
  children: JSX.Element;
  role: string | null | undefined
}) => {
  //   let location = useLocation();

  const userHasRequiredRole = role === "Admin";
  console.log(userHasRequiredRole);
  console.log(roles);
  console.log(role);

  if (!userHasRequiredRole) {
    return <h1>Unauthorize</h1>; // build your won access denied page (sth like 404)
  }

  return children;
};

export default AuthorizedAdminRoute;
