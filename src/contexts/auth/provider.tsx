import { useEffect, useState } from "react";
import { AuthContext } from "@/contexts/auth/context";
import { STORAGE_KEYS } from "@/constants/storage";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);

    if (storedToken) {
      setToken(storedToken);
    }

    setIsLoading(false);
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
        isLoading,
        authenticate,
        unauthenticate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
