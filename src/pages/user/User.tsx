import { Outlet } from 'react-router-dom';

function User() {
  return (
    <>
      <h1>User</h1>
      <Outlet />
    </>
  );
}

export default User;
