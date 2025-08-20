import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axiosClient from "../axiosClient";
import { LoadingScreen } from "../components/LoadingPage";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/route";
import Cookies from "js-cookie";

export interface UserType {
  id: string;
  fname: string;
  lname: string;
  email: string;
}

interface AuthContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axiosClient.post("/auth/logout");
      Cookies.remove("token");
      setUser(null);
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    axiosClient
      .get("/auth/me", { withCredentials: true }) // just to be sure
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside an AuthProvider");
  return context;
};
