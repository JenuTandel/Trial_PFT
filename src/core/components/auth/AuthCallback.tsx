import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthCallback() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, error, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function handleAfterLogin() {
      try {
        if (!isLoading && !error && isAuthenticated) {
          const claims = await getAccessTokenSilently();
          localStorage.setItem('user', claims)
          localStorage.setItem('role', 'Admin')
          console.log('User:', claims);
          navigate('/');
        }
      } catch (error) {
        console.error(error);
      }
    }
    handleAfterLogin();
  }, [isAuthenticated, isLoading, error, getAccessTokenSilently, navigate]);
  return <div>Authcallback</div>;
}

export default AuthCallback;
