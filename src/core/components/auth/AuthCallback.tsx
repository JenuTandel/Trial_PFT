import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setRole, setToken } from '../../../features/auth/auth';
import { useAppDispatch, useAppSelector } from '../../../store/store';

function AuthCallback() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.access_token)
  const navigate = useNavigate();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  console.log("Auth Callback");
  useEffect(() => {
    console.log("useEffect");
    if (!user) {
      handleAfterLogin();
    }
    async function handleAfterLogin() {
      console.log("After login");
      try {

        console.log("Authenticated");
        const claims = await getAccessTokenSilently();
        // localStorage.setItem('user', claims)
        // localStorage.setItem('role', 'Admin')
        dispatch(setToken(claims));
        dispatch(setRole('Admin'))
        console.log('User:', claims);
        navigate('/');

      } catch (error) {
        console.error(error);
      }
    }
    // navigate('/');
  }, [isAuthenticated, getAccessTokenSilently]);

  return <div>Loading...</div>;
}

export default AuthCallback;