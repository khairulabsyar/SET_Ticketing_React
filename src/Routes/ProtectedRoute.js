import React from "react";
import { Navigate } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";

function ProtectedRoute({
  children,
  isAllowed = true,
  redirectPath = "/home",
}) {
  const { token } = UseAuth();

  if (!token) {
    alert("Redirect to Home");
    return <Navigate to={"/home"} replace />;
  }

  if (!isAllowed) {
    alert("You have no access to this feature!");
    return <Navigate to={redirectPath} replace />;
  }
  return children;
}

export default ProtectedRoute;
