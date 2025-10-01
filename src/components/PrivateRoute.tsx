// src/components/PrivateRoute.tsx

import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { User } from 'firebase/auth';

// Definimos as props que nosso componente receberá
interface PrivateRouteProps extends RouteProps {
  user: User | null;
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} /> // Se houver usuário, renderize o componente
        ) : (
          <Redirect to="/signin" /> // Se não, redirecione para o login
        )
      }
    />
  );
};

export default PrivateRoute;