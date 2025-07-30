import React from "react";
import { useForm } from "react-hook-form";

import type { Error } from "@auth0/auth0-acul-js";

import Alert from "@/common/Alert";
import Button from "@/common/Button";
import EmailInputField from "@/common/EmailInputField";
import PasswordField from "@/common/PasswordField";
import { useSignupManager } from "@/screens/signup/hooks/useSignupManager";
import type { SignupFormData } from "@/types/signup";

import DateOfBirthField from "./DateOfBirthField";
import GenderField from "./GenderField";
import PasswordRequirements from "./PasswordRequirements";
import PhoneInputField from "./PhoneInputField";
import StateField from "./StateField";
import TextInputField from "./TextInputField";

// No props needed as it uses hooks internally for data and actions
const SignupForm: React.FC = () => {
  const { handleSignup, errors, texts } = useSignupManager();

  // Handle text fallbacks in component
  const buttonText = texts?.buttonText || "Continue";
  const loadingText = "Processing..."; // Default fallback

  // Get general errors (not field-specific)
  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<SignupFormData>();

  // Proper submit handler with form data
  const onSubmit = (data: SignupFormData) => {
    // Pass all form data to the signup manager
    handleSignup(data);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* General alerts at the top */}
        {generalErrors.length > 0 && (
          <div className="space-y-3 mb-4">
            {generalErrors.map((error: Error, index: number) => (
              <Alert key={index} type="error" message={error.message} />
            ))}
          </div>
        )}

        {/* Two Column Layout */}
        <div className="text-sm font-medium text-gray-700 mb-4 text-center">
          All Fields Required
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Left Column - Personal Information */}
          <div className="space-y-4">
            <TextInputField
              register={register}
              errors={formErrors}
              fieldName="firstName"
              label="First name"
              autoComplete="given-name"
            />

            <TextInputField
              register={register}
              errors={formErrors}
              fieldName="lastName"
              label="Last name"
              autoComplete="family-name"
            />

            <EmailInputField
              register={register}
              errors={formErrors}
              fieldName="email"
              label="Email"
              autoComplete="email"
            />

            <EmailInputField
              register={register}
              errors={formErrors}
              fieldName="confirmEmail"
              label="Confirm Email"
              autoComplete="email"
              watch={watch}
            />

            <PhoneInputField
              register={register}
              errors={formErrors}
              fieldName="mobile"
              label="Mobile Number"
              autoComplete="tel"
            />

            <DateOfBirthField
              register={register}
              errors={formErrors}
              watch={watch}
            />
          </div>

          {/* Right Column - Address, Gender, Password */}
          <div className="space-y-4">
            <TextInputField
              register={register}
              errors={formErrors}
              fieldName="city"
              label="City"
              autoComplete="address-level2"
            />

            <StateField register={register} errors={formErrors} />

            <TextInputField
              register={register}
              errors={formErrors}
              fieldName="zip"
              label="Zip or Postal Code"
              autoComplete="postal-code"
            />

            <GenderField register={register} errors={formErrors} />

            <PasswordField
              register={register}
              errors={formErrors}
              fieldName="password"
              label="Password"
              autoComplete="new-password"
            />

            <PasswordField
              register={register}
              errors={formErrors}
              fieldName="confirmPassword"
              label="Confirm Password"
              autoComplete="new-password"
              validationRules={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              }}
            />

            <PasswordRequirements watch={watch} />
          </div>
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
    </div>
  );
};

export default SignupForm;
