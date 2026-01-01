import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NotificationsPage from "./pages/NotificationsPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import OnboardingPage from "./pages/OnboardingPage";
import { Toaster } from "react-hot-toast";
import useAuthUser from "./components/useAuthUser";
import Layout from "./components/Layout";
import { useThemestore } from "./store/useThemestore";

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const { theme, setTheme } = useThemestore(); // OK even if unused for now

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return null;

  return (
     <>
      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              isOnboarded ? (
                <Layout showSidebar={true}>
                  <HomePage />
                </Layout>
              ) : (
                <Navigate to="/onboarding" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* SIGNUP */}
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignUpPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />

        {/* PROTECTED */}
        <Route
          path="/notifications"
          element={
            !isAuthenticated ? (
              <Navigate to="/login" replace />
            ) : !isOnboarded ? (
              <Navigate to="/onboarding" replace />
            ) : (
              <Layout showSidebar>
                <NotificationsPage />
              </Layout>
            )
          }
        />

        <Route
          path="/chat/:id"
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={false}>
              <ChatPage/>
            </Layout>
          ):(<Navigate to={!isAuthenticated ? "/login": "/onboarding"}/>)}
        />

        <Route
          path="/call/:id"
          element={isAuthenticated && isOnboarded ? (<CallPage/>) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>)}
        />

        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              isOnboarded ? (
                <Navigate to="/" replace />
              ) : (
                <OnboardingPage />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#0f172a",
            color: "#e5e7eb",
            borderRadius: "12px",
            border: "1px solid #1e293b",
          },
        }}
      />
    </>
  );
};

export default App;
