import { useEffect, useState } from "react";
import { AuthContext } from "@/contexts/auth/context";
import { STORAGE_KEYS } from "@/constants/storage";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  function authenticate(token: string) {
    setToken(token);
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  }

  function unauthenticate() {
    setToken(null);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        authenticate,
        unauthenticate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
