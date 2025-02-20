import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkSession } from 'api/auth';

const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        console.error(error);
        alert(error.message);
      }
    };

    checkAuth();
  }, [navigate]);

  if (!isAuthenticated) return null;

  return element;
};

export default PrivateRoute;
