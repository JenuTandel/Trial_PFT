import { useAuth0 } from '@auth0/auth0-react';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setRole, setToken } from '../../../features/auth/auth';
import { useAppDispatch, useAppSelector } from '../../../store/store';

function AuthCallback() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.access_token)
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, error, getAccessTokenSilently } = useAuth0();

  useLayoutEffect(() => {
    async function handleAfterLogin() {
      try {
        if (!isLoading && !error && isAuthenticated) {
          const claims = await getAccessTokenSilently();
          // localStorage.setItem('user', claims)
          // localStorage.setItem('role', 'Admin')
          dispatch(setToken(claims));
          dispatch(setRole('Admin'))
          console.log('User:', claims);
          navigate('/');
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (!user) {
      handleAfterLogin();
    }
  }, [isAuthenticated, isLoading, error, getAccessTokenSilently, navigate]);

  return <div>Loading...</div>;
}

export default AuthCallback;