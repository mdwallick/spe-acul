import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

interface EmailInputFieldProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fieldName: Path<T>;
  label: string;
  placeholder?: string;
  autoComplete?: string;
  watch?: UseFormWatch<T>;
  validationRules?: RegisterOptions<T, Path<T>>;
}

function EmailInputField<T extends FieldValues>({
  register,
  errors,
  fieldName,
  label,
  placeholder,
  autoComplete = "email",
  watch,
  validationRules,
}: EmailInputFieldProps<T>) {
  let rules: RegisterOptions<T, Path<T>> = {
    required: `${label} is required`,
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  };
  if (validationRules) {
    rules = Object.assign({}, rules, validationRules);
  }
  // Confirm email logic (if fieldName is confirmEmail and watch is provided)
  if ((fieldName as string) === "confirmEmail" && watch) {
    const validateConfirmEmail = (value: string) =>
      value === watch("email" as Path<T>) || "Emails do not match";
    rules = { ...rules, validate: validateConfirmEmail };
  }
  return (
    <div className="space-y-2 min-h-[80px]">
      <label
        htmlFor={String(fieldName)}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        {...register(fieldName, rules)}
        id={String(fieldName)}
        type="email"
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      {errors[fieldName]?.message && (
        <p className="text-sm text-red-600">
          {String(errors[fieldName]?.message)}
        </p>
      )}
    </div>
  );
}

export default EmailInputField;
