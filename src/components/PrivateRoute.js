import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import Header from './Header/Header';

const PrivateRoute = () => {
  const isAuthenticated = useSelector(state => !!state.auth.uid);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default PrivateRoute;
