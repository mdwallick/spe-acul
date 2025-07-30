import { useState } from "react";

import LoginInstance from "@auth0/auth0-acul-js/login";

import { executeSafely } from "@/utils/helpers/executeSafely";

export const useLoginManager = () => {
  const [loginInstance] = useState(() => new LoginInstance());

  const { transaction, screen } = loginInstance;
  const { isSignupEnabled, isForgotPasswordEnabled } = transaction;

  // Extract links for consumption by UI components
  const { signupLink, resetPasswordLink, texts, captchaImage } = screen;

  const handleLogin = (
    email: string,
    password: string,
    captcha?: string,
  ): void => {
    const options = {
      username: email?.trim() || "",
      password: password?.trim() || "",
      captcha: screen.isCaptchaAvailable ? captcha?.trim() : undefined,
    };
    executeSafely(`Login with options: ${JSON.stringify(options)}`, () =>
      loginInstance.login(options),
    );
  };

  const handleFederatedLogin = (connectionName: string) => {
    executeSafely(`Federated login with connection: ${connectionName}`, () =>
      loginInstance.federatedLogin({ connection: connectionName }),
    );
  };

  return {
    loginInstance,
    handleLogin,
    handleFederatedLogin,
    // --- State & Data for UI ---
    // Raw texts object - let components handle their own fallbacks
    texts: texts || {},
    // Explicit state flags for conditional rendering
    isSignupEnabled: isSignupEnabled === true,
    isForgotPasswordEnabled: isForgotPasswordEnabled === true,
    isCaptchaAvailable: screen.isCaptchaAvailable === true,
    // Derived data
    errors: transaction.errors || [],
    captchaImage,
    // Direct links for UI
    signupLink,
    resetPasswordLink,
  };
};
