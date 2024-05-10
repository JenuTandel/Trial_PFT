import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { setRole, setToken } from '../../../features/auth/auth';
import { useAppDispatch } from '../../../store/store';

function AuthCallback() {
  debugger
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const handleAfterLogin = async () => {
    try {
      const claims = await getAccessTokenSilently();
      dispatch(setToken(claims));
      dispatch(setRole('Admin'));
      navigate('/');
    } catch (error) {
      console.error('Error getting access token:', error);
    }
  };

  handleAfterLogin();

  return <div>Loading...</div>;
}

export default AuthCallback;
