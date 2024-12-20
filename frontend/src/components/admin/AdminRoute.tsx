import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminStore } from "../../store/adminStore";
import { adminService } from "../../services/adminService";

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const location = useLocation();
  const { user, setUser } = useAdminStore();

  useEffect(() => {
    // Check if there's a valid admin token but no user
    if (!user && adminService.isAuthenticated()) {
      // Attempt to restore the session
      const token = localStorage.getItem("admin_token");
      if (token) {
        try {
          const decodedUser = adminService.getUserFromToken(token);
          setUser(decodedUser);
        } catch (err) {
          // Token is invalid, remove it
          adminService.logout();
        }
      }
    }
  }, [user, setUser]);

  // If we're checking authentication, show nothing
  if (!user && adminService.isAuthenticated()) {
    return null;
  }

  // If not authenticated, redirect to admin auth
  if (!user) {
    return <Navigate to="/admin/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
