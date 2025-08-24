import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    // Check if user exists in local storage
    const user = localStorage.getItem("user");

    if (!user) {
        // Redirect to login if user not found
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
