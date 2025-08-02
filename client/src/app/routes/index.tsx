import { Layout } from "components/templates/Layout";
import { useAuth } from "context/AuthContext";
import { DashboardPage } from "components/pages/DashboardPage";
import { LoginPage } from "components/pages/LoginPage";
import { RegisterPage } from "components/pages/RegisterPage";
import { Route, Routes } from "react-router-dom";

export const AuthRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
        {!user ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<LoginPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        ) : (
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
          </Route>
        )}
    </Routes>
  );
};