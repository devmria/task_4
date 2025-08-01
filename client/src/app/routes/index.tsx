import { Layout } from "components/templates/Layout";
import { useAuth } from "context/AuthContext";
import { DashboardPage } from "pages/DashboardPage";
import { LoginPage } from "pages/LoginPage";
import { RegisterPage } from "pages/RegisterPage";
import { Route, Routes } from "react-router-dom";

export const AuthRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading gagagag...</div>;
  }

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
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
      )}
    </Routes>
  );
};