import { Route, Redirect, RouteProps } from "react-router-dom";

type ProtectRouteProps = RouteProps & {
  isAllowed: boolean;
  redirectTo: string;
  isVerify: boolean,
};

// function para verificar se o usuário já fez login ou não

export function ProtectedRoute({
  isAllowed,
  isVerify,
  redirectTo,
  ...routeProps
}: ProtectRouteProps) {
  if (!isAllowed) return <Redirect to={redirectTo} />;
  if (!isVerify) return <Redirect to="/verify-email" />;
  return <Route {...routeProps} />;
}
