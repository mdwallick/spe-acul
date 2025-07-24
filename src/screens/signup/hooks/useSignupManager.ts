import { useState } from "react";
import SignupInstance from "@auth0/auth0-acul-js/signup";
import { executeSafely } from "@/utils/helpers/executeSafely";
import type { SignupManagerData } from "@/types/signup";

export const useSignupManager = () => {
    const [signupInstance] = useState(() => new SignupInstance());

    const { transaction, screen } = signupInstance;
    // const { isPasskeyEnabled } = transaction;

    // Extract links for consumption by UI components
    const { loginLink, texts, captchaImage } = screen;

    const handleSignup = (formData: SignupManagerData): void => {
        // Build the signup payload with custom fields using the ulp- prefix pattern
        const signupPayload: any = {
            username: formData.email?.trim() || "",
            password: formData.password?.trim() || "",
            captcha: screen.isCaptchaAvailable ? formData.captcha?.trim() : undefined,
            // Add custom fields with ulp- prefix for server-side processing
            'ulp-firstName': formData.firstName?.trim() || "",
            'ulp-lastName': formData.lastName?.trim() || "",
            'ulp-dob-month': formData.dob.month || "",
            'ulp-dob-day': formData.dob.day || "",
            'ulp-dob-year': formData.dob.year || "",
            'ulp-mobile': formData.mobile?.trim() || "",
            'ulp-city': formData.city?.trim() || "",
            'ulp-state': formData.state || "",
            'ulp-zip': formData.zip?.trim() || "",
            'ulp-gender': formData.gender || "",
        };

        executeSafely(`Signup with custom fields: ${JSON.stringify(signupPayload)}`, () =>
            signupInstance.signup(signupPayload),
        );
    };

    const handleFederatedSignup = (connectionName: string) => {
        executeSafely(`Federated login with connection: ${connectionName}`, () =>
            signupInstance.federatedSignup({ connection: connectionName }),
        );
    };

    return {
        signupInstance,
        handleSignup,
        handleFederatedSignup,
        // --- State & Data for UI ---
        // Raw texts object - let components handle their own fallbacks
        texts: texts || {},
        // Explicit state flags for conditional rendering
        isCaptchaAvailable: screen.isCaptchaAvailable === true,
        // Derived data
        errors: transaction.errors || [],
        captchaImage,
        // Direct links for UI
        loginLink,
    };
};
