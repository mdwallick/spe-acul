import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import type { SignupFormData } from "@/types/signup";

interface GenderFieldProps {
  register: UseFormRegister<SignupFormData>;
  errors: FieldErrors<SignupFormData>;
}

const GenderField: React.FC<GenderFieldProps> = ({ register, errors }) => {
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other-prefer-not-to-say", label: "Other/Prefer not to say" },
  ];

  return (
    <div className="space-y-2 min-h-[80px]">
      <label className="block text-sm font-medium text-gray-700">
        Gender (Select One)
      </label>
      <select
        {...register("gender", { required: "Gender is required" })}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select Gender</option>
        {genderOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors.gender?.message && (
        <p className="text-sm text-red-600">{errors.gender.message}</p>
      )}
    </div>
  );
};

export default GenderField;
