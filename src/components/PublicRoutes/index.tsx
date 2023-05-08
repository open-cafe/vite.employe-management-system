import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
// import { AuthContext } from '@/context/authContext';
import { getCookie } from '@/utils/authCookies';
import { cookieName } from '@/constants/environment';

const PublicRoutes = () => {
  const token = getCookie(cookieName);
  // const { token } = useContext(AuthContext);
  if (token) {
    return <Navigate replace to="/" />;
  } else {
    return <Outlet />;
  }
};
export default PublicRoutes;
