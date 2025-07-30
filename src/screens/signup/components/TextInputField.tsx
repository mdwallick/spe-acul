import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import type { SignupFormData } from "@/types/signup";

interface TextInputFieldProps {
  register: UseFormRegister<SignupFormData>;
  errors: FieldErrors<SignupFormData>;
  fieldName: keyof SignupFormData;
  label: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  register,
  errors,
  fieldName,
  label,
  placeholder,
  autoComplete,
  required = true,
}) => {
  const validationRules = required ? { required: `${label} is required` } : {};

  return (
    <div className="space-y-2 min-h-[80px]">
      <label
        htmlFor={fieldName}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        {...register(fieldName, validationRules)}
        id={fieldName}
        type="text"
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

export default TextInputField;
