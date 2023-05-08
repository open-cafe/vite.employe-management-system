import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@/context/authContext';
const PrivateRoutes = () => {
  const { token } = useContext(AuthContext);
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate replace to="/login" />;
  }
};
export default PrivateRoutes;
