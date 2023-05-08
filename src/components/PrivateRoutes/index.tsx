import { Navigate, Outlet } from 'react-router-dom';
const PrivateRoutes = () => {
  const auth = localStorage.getItem('auth');
  if (auth != 'authenticated') {
    return <Outlet />;
  } else {
    return <Navigate replace to="/login" />;
  }
};
export default PrivateRoutes;
