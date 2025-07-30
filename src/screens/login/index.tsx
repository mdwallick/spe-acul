import React from "react";

import Card from "@/common/Card";
import { applyAuth0Theme } from "@/utils/theme";

import AlternativeLogins from "./components/AlternativeLogins";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import { useLoginManager } from "./hooks/useLoginManager";

const LoginIdScreen: React.FC = () => {
  const { loginInstance, texts } = useLoginManager();

  document.title = texts?.pageTitle || "Login";

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(loginInstance);

  return (
    <div className="min-h-screen flex items-center justify-center px-10 py-20">
      <Card className="w-full max-w-[400px]">
        <Header />
        <LoginForm />
        <Footer />
        <AlternativeLogins />
      </Card>
    </div>
  );
};

export default LoginIdScreen;
