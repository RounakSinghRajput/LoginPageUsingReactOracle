import { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Dashboard from "./Dashboard";

export default function App() {
  // "login" | "register" | "dashboard"
  const [view, setView] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);

  function handleLoginSuccess(user) {
    setCurrentUser(user);
    setView("dashboard");
  }

  function handleLogout() {
    setCurrentUser(null);
    setView("login");
  }

  if (view === "dashboard" && currentUser) {
    return <Dashboard user={currentUser} onLogout={handleLogout} />;
  }

  if (view === "register") {
    return (
      <RegisterPage
        onRegistered={() => setView("login")}
        onSwitchToLogin={() => setView("login")}
      />
    );
  }

  return (
    <LoginPage
      onLoginSuccess={handleLoginSuccess}
      onSwitchToRegister={() => setView("register")}
    />
  );
}