import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../Componets/Context/useAuth";

type Props = {
  children: React.ReactNode;
};

const ProtectedRouter = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  return isLoggedIn() ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRouter;
