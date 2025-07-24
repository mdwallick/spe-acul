import React from "react";
import Card from "@/common/Card";
import { useSignupManager } from "./hooks/useSignupManager";
import { applyAuth0Theme } from "@/utils/theme";

import Header from "./components/Header";
import SignupForm from "./components/SignupForm";
import AlternativeLogins from "./components/AlternativeLogins";
import Footer from "./components/Footer";

const SignupScreen: React.FC = () => {
    const { signupInstance, texts } = useSignupManager();

    document.title = texts?.pageTitle || "Sign Up";

    // Apply theme from SDK instance when screen loads
    applyAuth0Theme(signupInstance);

    return (
        <div className="min-h-screen flex items-center justify-center px-10 py-20">
            <Card className="w-full max-w-[800px]">
                <Header />
                <AlternativeLogins />
                <SignupForm />
                <Footer />
            </Card>
        </div>
    );
};

export default SignupScreen;
