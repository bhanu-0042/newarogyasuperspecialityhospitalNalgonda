import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { loginAdmin, type AdminLoginRequest, type AdminSession } from "@/lib/admin";

const STORAGE_KEY = "arogya_admin_session";

interface AdminAuthContextValue {
  session: AdminSession | null;
  isAuthenticated: boolean;
  isReady: boolean;
  login: (payload: AdminLoginRequest) => Promise<AdminSession>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

function loadStoredSession(): AdminSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as AdminSession;

    if (!parsed.accessToken || parsed.role !== "admin" || !parsed.expiresAt) {
      return null;
    }

    if (Date.parse(parsed.expiresAt) <= Date.now()) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return parsed;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setSession(loadStoredSession());
    setIsReady(true);
  }, []);

  const login = async (payload: AdminLoginRequest) => {
    const nextSession = await loginAdmin(payload);
    setSession(nextSession);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
    return nextSession;
  };

  const logout = () => {
    setSession(null);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      session,
      isAuthenticated: Boolean(session?.accessToken),
      isReady,
      login,
      logout,
    }),
    [session, isReady],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider.");
  }

  return context;
}
