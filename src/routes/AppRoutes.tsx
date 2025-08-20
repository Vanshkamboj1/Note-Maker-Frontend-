import { Route, Routes } from "react-router-dom";
import { Shared } from "../pages/Shared/Shared";
import { Auth } from "../pages/Auth/Auth";
import MainLayout from "../layouts/MainLayout";
import { AllNotes } from "../pages/Notes/AllNotes";
import { Trash } from "lucide-react";
import { Setting } from "../pages/Settings/Settings";
import { ROUTES } from "../constants/route";
import { ProfilePage } from "../pages/ProfilePage";
import { NotFound } from "../pages/NotFound";
import { PrivateRoute } from "./PrivateRoute";
import LandingPage from "../pages/LandingPage/index";
import FAQ from "../components/FAQ";
import AboutPage from "../components/About";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.LANDING} element={<LandingPage />} />
      <Route path={ROUTES.SHARED_NOTE} element={<Shared />} />
      <Route path={ROUTES.LOGIN} element={<Auth />} />
      <Route path={ROUTES.ANY} element={<NotFound />} />

      <Route
        path={ROUTES.APP}
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        
        <Route path="notes" element={<AllNotes />} />
        <Route path="notes/:noteId" element={<AllNotes />} />
        <Route path="trash" element={<Trash />} />
        <Route path="settings" element={<Setting />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
};
