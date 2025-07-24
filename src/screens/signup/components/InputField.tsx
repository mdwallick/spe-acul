import React from "react";
import { UseFormRegister, FieldErrors, RegisterOptions } from "react-hook-form";
import type { SignupFormData } from "@/types/signup";

interface InputFieldProps {
    register: UseFormRegister<SignupFormData>;
    errors: FieldErrors<SignupFormData>;
    fieldName: keyof SignupFormData;
    label: string;
    type?: "text" | "email" | "tel";
    placeholder?: string;
    autoComplete?: string;
    validationRules?: RegisterOptions<SignupFormData, keyof SignupFormData>;
}

const InputField: React.FC<InputFieldProps> = ({
    register,
    errors,
    fieldName,
    label,
    type = "text",
    placeholder,
    autoComplete,
    validationRules
}) => {
    return (
        <div className="space-y-2 min-h-[80px]">
            <label htmlFor={fieldName} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                {...register(fieldName, validationRules)}
                id={fieldName}
                type={type}
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

export default InputField; 