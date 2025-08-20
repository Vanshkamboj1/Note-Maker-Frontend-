import { Navigate } from "react-router-dom";
import { ROUTES } from "../constants/route";
import { useAuth } from "../context/AuthContext";
import { LoadingScreen } from "../components/LoadingPage";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <LoadingScreen />;
  }
  if (!user ) return <Navigate to={ROUTES.LOGIN} />;
  return <>{children}</>;
};
