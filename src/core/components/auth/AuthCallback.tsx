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
      debugger;
      console.log("After login");
      console.log("Authenticated", isAuthenticated);
      if (isAuthenticated) {
        debugger;
        const claims = await getAccessTokenSilently();
        console.log('User:', claims);
        dispatch(setToken(claims));
        dispatch(setRole('Admin'))
        navigate('/');
      }
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return <div>Loading...</div>;
}

export default AuthCallback;