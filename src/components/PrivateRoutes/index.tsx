import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
// import { AuthContext } from '@/context/authContext';
import { cookieName } from '@/constants/environment';
import { getCookie } from '@/utils/authCookies';
const PrivateRoutes = () => {
  const token = getCookie(cookieName);
  // const { token } = useContext(AuthContext);
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate replace to="/login" />;
  }
};
export default PrivateRoutes;
