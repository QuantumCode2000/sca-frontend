import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import Layout from "../layout/Layout";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/insert-private-key" replace />;
  }

  return <Layout />;
};

export default PrivateRoute;
