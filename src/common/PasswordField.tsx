// moved from src/screens/signup/components/PasswordField.tsx
import { useState } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

// Eye icons for password visibility toggle
const EyeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeSlashIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
    />
  </svg>
);

interface PasswordFieldProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fieldName: Path<T>;
  label: string;
  placeholder?: string;
  autoComplete?: string;
  validationRules?: RegisterOptions<T, Path<T>>;
}

function PasswordField<T extends FieldValues>({
  register,
  errors,
  fieldName,
  label,
  placeholder,
  autoComplete = "new-password",
  validationRules,
}: PasswordFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  // Default validation rules for password field
  const defaultValidationRules: RegisterOptions<T, Path<T>> = {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
    maxLength: {
      value: 20,
      message: "Password must be at most 20 characters",
    },
  };

  // Use provided validation rules or defaults
  let finalValidationRules: RegisterOptions<
    T,
    Path<T>
  > = defaultValidationRules;
  if (validationRules) {
    finalValidationRules = Object.assign(
      {},
      defaultValidationRules,
      validationRules,
    );
  }

  return (
    <div className="space-y-2 min-h-[80px]">
      <label
        htmlFor={String(fieldName)}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        <input
          {...register(fieldName, finalValidationRules)}
          id={String(fieldName)}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeSlashIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      {errors[fieldName]?.message && (
        <p className="text-sm text-red-600">
          {String(errors[fieldName]?.message)}
        </p>
      )}
    </div>
  );
}

export default PasswordField;
