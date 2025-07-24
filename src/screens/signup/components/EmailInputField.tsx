import React from "react";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import type { SignupFormData } from "@/types/signup";

interface EmailInputFieldProps {
    register: UseFormRegister<SignupFormData>;
    errors: FieldErrors<SignupFormData>;
    fieldName: "email" | "confirmEmail";
    label: string;
    placeholder?: string;
    autoComplete?: string;
    watch?: UseFormWatch<SignupFormData>;
}

const EmailInputField: React.FC<EmailInputFieldProps> = ({
    register,
    errors,
    fieldName,
    label,
    placeholder,
    autoComplete = "email",
    watch
}) => {
    const validationRules = {
        required: `${label} is required`,
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
        },
        ...(fieldName === "confirmEmail" && watch && {
            validate: (value: string) => value === watch("email") || "Emails do not match"
        })
    };

    return (
        <div className="space-y-2 min-h-[80px]">
            <label htmlFor={fieldName} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                {...register(fieldName, validationRules)}
                id={fieldName}
                type="email"
                placeholder={placeholder}
                autoComplete={autoComplete}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors[fieldName]?.message && (
                <p className="text-sm text-red-600">{errors[fieldName]?.message}</p>
            )}
        </div>
    );
};

export default EmailInputField; 