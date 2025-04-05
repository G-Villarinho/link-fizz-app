import { createContext } from "react";

export interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  authenticate: (token: string) => void;
  unauthenticate: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
