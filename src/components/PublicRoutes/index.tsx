import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@/context/authContext';

const PublicRoutes = () => {
  const { token } = useContext(AuthContext);
  if (token) {
    return <Navigate replace to="/" />;
  } else {
    return <Outlet />;
  }
};
export default PublicRoutes;
