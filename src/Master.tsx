import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PftRoutes } from './core/utility/enums/core.enum';

interface IProps {
  Children: React.ComponentType,
  setRole: React.Dispatch<React.SetStateAction<string>>
}
function Master({ Children }: IProps) {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('user');
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PftRoutes.SIGNUP);
    }
    if (role) {
      // setRole(role);
    }
  }, [isAuthenticated, navigate, role]);
  return isAuthenticated && role ? <Children /> : null;
}

export default Master;
