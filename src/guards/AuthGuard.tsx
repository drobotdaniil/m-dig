import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthGuard: React.FC = () => {
  const isAuth = localStorage.getItem('userToken');

  if (!isAuth) {
    return <Navigate to={'/login'} />;
  }

  return <Outlet />;
};
