import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {
  const auth = localStorage.getItem('auth');
  if (auth === 'authenticated') {
    return <Navigate replace to="/" />;
  } else {
    return <Outlet />;
  }
};
export default PublicRoutes;
