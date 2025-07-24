import React from "react";
import { useSignupManager } from "@/screens/signup/hooks/useSignupManager";

const Footer: React.FC = () => {
    const { texts } = useSignupManager();

    // Handle text fallbacks in component
    const footerText = texts?.footerText || "Don't have an account?";

    return (
        <div className="mt-4 text-left">
            <span className="text-sm pr-1">{footerText}</span>
        </div>
    );
};

export default Footer;
