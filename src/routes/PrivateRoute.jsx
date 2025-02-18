import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from 'api/auth';

const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const redirectByAuth = async () => {
      const res = await checkAuth();

      if (!res.session) {
        navigate('/', { replace: true });
      } else {
        setIsAuthenticated(true);
      }
    };

    redirectByAuth();
  }, [navigate]);

  if (isAuthenticated === null) return null;

  return element;
};

export default PrivateRoute;
