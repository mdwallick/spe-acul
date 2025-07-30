import { useState } from "react";

import SignupInstance from "@auth0/auth0-acul-js/signup";

import type { SignupManagerData } from "@/types/signup";
import { executeSafely } from "@/utils/helpers/executeSafely";

export const useSignupManager = () => {
    const [signupInstance] = useState(() => new SignupInstance());

    const { transaction, screen } = signupInstance;

    // Extract links for consumption by UI components
    const { texts } = screen;

    const handleSignup = (formData: SignupManagerData): void => {
        // Build the signup payload with custom fields using the ulp- prefix pattern
        const signupPayload: Record<string, string | boolean> = {
            username: formData.email?.trim() || "",
            password: formData.password?.trim() || "",
            ...(screen.isCaptchaAvailable && formData.captcha ? { captcha: formData.captcha.trim() } : {}),
            // Add custom fields with ulp- prefix for server-side processing
            "ulp-firstName": formData.firstName?.trim() || "",
            "ulp-lastName": formData.lastName?.trim() || "",
            "ulp-dob-month": formData.dob.month || "",
            "ulp-dob-day": formData.dob.day || "",
            "ulp-dob-year": formData.dob.year || "",
            "ulp-mobile": formData.mobile?.trim() || "",
            "ulp-city": formData.city?.trim() || "",
            "ulp-state": formData.state || "",
            "ulp-zip": formData.zip?.trim() || "",
            "ulp-gender": formData.gender || "",
            // Communication preferences and legal agreements
            "ulp-newsletter": formData.newsletter || false,
            "ulp-marketing": formData.marketing || false,
            "ulp-financial-incentive": formData.financialIncentive || false,
            "ulp-terms-agreement": formData.termsAgreement || false,
        };

        executeSafely(
            `Signup with custom fields: ${JSON.stringify(signupPayload)}`,
            () => signupInstance.signup(signupPayload),
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
    };
};
