// PrivateRoute.tsx

const roles = ["Admin", "User"];

const AuthorizedUserRoute = ({
  children,
  role,
}: {
  children: JSX.Element;
  role: string | null | undefined
}) => {
  //   let location = useLocation();

  const userHasRequiredRole = role === "User";
  console.log(userHasRequiredRole);
  console.log(roles);
  console.log(role);

  if (!userHasRequiredRole) {
    return <h1>Unauthorize</h1>; // build your won access denied page (sth like 404)
  }

  return children;
};

export default AuthorizedUserRoute;
