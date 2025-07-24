import { useState } from "react";
import LoginIdInstance from "@auth0/auth0-acul-js/login-id";
import { executeSafely } from "@/utils/helpers/executeSafely";

export const useLoginIdManager = () => {
    const [loginIdInstance] = useState(() => new LoginIdInstance());

    const { transaction, screen } = loginIdInstance;
    const { isSignupEnabled, isForgotPasswordEnabled, isPasskeyEnabled } =
        transaction;

    // Extract links for consumption by UI components
    const { signupLink, resetPasswordLink, texts, captchaImage } = screen;

    const handleLoginId = async (loginId: string, captcha?: string): Promise<void> => {
        const options = {
            username: loginId?.trim() || "",
            captcha: screen.isCaptchaAvailable ? captcha?.trim() : undefined,
        };

        await executeSafely(`LoginId with options: ${JSON.stringify(options)}`, async () => {
            //await loginIdInstance.login(options);

            try {
                const response = await fetch(`http://localhost:4001/user?email=${encodeURIComponent(options.username)}`);
                if (!response.ok) {
                    console.log("No user found for this email.")
                    return;
                }

                const userData = await response.json();
                const connections = userData.connections || [];

                if (connections.includes("password")) {
                    console.log("Show login-password")
                    submitFormWithState("password", transaction.state);
                } else if (connections.includes("email")) {
                    console.log("Show login-passwordless-email-code")
                    submitFormWithState("email", transaction.state);
                } else {
                    console.log("Unsupported connection type", connections)
                }
            } catch (err) {
                console.log("Mock API error:", err);
            }
        });
    };

    const submitFormWithState = (connection: string, stateValue: string) => {
        // Create a new form element
        const form = document.createElement("form");
        form.method = "POST";
        form.style.display = "none"; // Hide the form

        // Create the 'connection' hidden input
        const connectionInput = document.createElement("input");
        connectionInput.type = "hidden";
        connectionInput.name = "connection";
        connectionInput.value = connection;
        form.appendChild(connectionInput);

        // Create the 'state' hidden input
        const stateInput = document.createElement("input");
        stateInput.type = "hidden";
        stateInput.name = "state";
        stateInput.value = stateValue;
        form.appendChild(stateInput);

        // Append the form to the document body
        document.body.appendChild(form);

        // Submit the form
        form.submit();
    }

    //   const handleLoginId = (loginId: string, captcha?: string): void => {
    //     const options = {
    //       username: loginId?.trim() || "",
    //       captcha: screen.isCaptchaAvailable ? captcha?.trim() : undefined,
    //     };
    //     executeSafely(`LoginId with options: ${JSON.stringify(options)}`, () =>
    //       loginIdInstance.login(options),
    //     );
    //   };

    const handleFederatedLogin = (connectionName: string) => {
        executeSafely(`Federated login with connection: ${connectionName}`, () =>
            loginIdInstance.federatedLogin({ connection: connectionName }),
        );
    };

    const handlePasskeyLogin = () => {
        if (isPasskeyEnabled) {
            executeSafely(`Passkey login`, () => loginIdInstance.passkeyLogin());
        }
    };

    return {
        loginIdInstance,
        handleLoginId,
        handleFederatedLogin,
        handlePasskeyLogin,
        // --- State & Data for UI ---
        // Raw texts object - let components handle their own fallbacks
        texts: texts || {},
        // Explicit state flags for conditional rendering
        isSignupEnabled: isSignupEnabled === true,
        isForgotPasswordEnabled: isForgotPasswordEnabled === true,
        isPasskeyEnabled: isPasskeyEnabled === true,
        isCaptchaAvailable: screen.isCaptchaAvailable === true,
        // Derived data
        errors: transaction.errors || [],
        captchaImage,
        // Direct links for UI
        signupLink,
        resetPasswordLink,
    };
};
