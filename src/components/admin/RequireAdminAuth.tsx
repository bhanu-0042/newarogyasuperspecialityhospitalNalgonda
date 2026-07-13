import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

export function RequireAdminAuth({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { isAuthenticated, isReady } = useAdminAuth();

  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
