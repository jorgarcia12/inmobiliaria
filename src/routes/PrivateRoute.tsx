import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { usuarioStore } from "../store/usuarioStore";

interface PrivateRouteProps {
  children: JSX.Element;
  requiredRole?: string;
}

export const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
  const { usuarioLogueado } = usuarioStore();

  if (!usuarioLogueado) return <Navigate to="/auth/login" replace />;
  if (requiredRole && usuarioLogueado.rol !== requiredRole)
    return <Navigate to="/" replace />;

  return children;
};
