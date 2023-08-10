import { Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';
import { getCookie } from '@/utils/authCookies';
import { useEffect } from 'react';
import { cookieName } from '@/constants/environment';
const PrivateRoutes = () => {
  const token = getCookie(cookieName);
  const navigate = useNavigate();
  const { leaveId } = useParams();

  useEffect(() => {
    if (leaveId) {
      localStorage.setItem('leaveId', leaveId);
    }
  }, []);

  const timeoutRoute = () => {
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  if (token) {
    return <Outlet />;
  } else {
    timeoutRoute();
    return <Navigate replace to="/login" />;
  }
};
export default PrivateRoutes;
