import React from "react";
import { useForm } from "react-hook-form";

import type { Error } from "@auth0/auth0-acul-js";

import Alert from "@/common/Alert";
import Button from "@/common/Button";
import EmailInputField from "@/common/EmailInputField";
import PasswordField from "@/common/PasswordField";

import { useLoginManager } from "../hooks/useLoginManager";

interface LoginFormData {
  email: string;
  password: string;
  captcha?: string;
}

const LoginForm: React.FC = () => {
  const {
    handleLogin,
    errors,
    resetPasswordLink,
    isForgotPasswordEnabled,
    texts,
  } = useLoginManager();

  const buttonText = texts?.buttonText || "Continue";
  const loadingText = "Processing...";
  const forgotPasswordText = texts?.forgotPasswordText || "Forgot Password?";

  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];

  const {
    register,
    formState: { errors: formErrors, isSubmitting },
    handleSubmit,
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    handleLogin(data.email, data.password, data.captcha);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* General alerts at the top */}
      {generalErrors.length > 0 && (
        <div className="space-y-3 mb-4">
          {generalErrors.map((error: Error, index: number) => (
            <Alert key={index} type="error" message={error.message} />
          ))}
        </div>
      )}

      {/* Email/Username Field */}
      <EmailInputField
        register={register}
        errors={formErrors}
        fieldName="email"
        label="Email or Username"
        autoComplete="username"
      />

      {/* Password Field with Show/Hide Toggle */}
      <PasswordField
        register={register}
        errors={formErrors}
        fieldName="password"
        label="Password"
        autoComplete="current-password"
      />

      {/* Forgot Password Link */}
      <div className="text-left">
        {isForgotPasswordEnabled && resetPasswordLink && (
          <a
            href={resetPasswordLink}
            className="text-sm text-link font-bold hover:text-link/80 focus:bg-link/15 focus:rounded"
          >
            {forgotPasswordText}
          </a>
        )}
      </div>

      <Button
        type="submit"
        fullWidth
        loadingText={loadingText}
        isLoading={isSubmitting}
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default LoginForm;
