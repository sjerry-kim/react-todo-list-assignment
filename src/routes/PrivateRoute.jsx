import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkSession } from 'api/auth';
import { useSetRecoilState } from 'recoil';
import { alertAtom } from '../recoil/alertAtom';

const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAlertState = useSetRecoilState(alertAtom);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await checkSession();

        if (!result.session) {
          navigate('/', { replace: true });
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        // prettier-ignore
        setAlertState({
          open: true,
          message: error.message,
          severity: 'error'
        });
      }
    };

    checkAuth();
  }, [navigate]);

  if (!isAuthenticated) return null;

  return element;
};

export default PrivateRoute;
