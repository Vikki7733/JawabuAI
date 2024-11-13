import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");  // Get token from localStorage
  
  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return children;  // If token exists, render the children (protected component)
};

export default ProtectedRoute;
