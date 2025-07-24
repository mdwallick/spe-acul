import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/common/Button";
import Alert from "@/common/Alert";
import CaptchaBox from "@/common/CaptchaBox";
import { getFieldError } from "@/utils/helpers/errorUtils";
import { useSignupManager } from "@/screens/signup/hooks/useSignupManager";
import type { Error } from "@auth0/auth0-acul-js";
import type { SignupFormData } from "@/types/signup";

// No props needed as it uses hooks internally for data and actions
const SignupForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        handleSignup,
        errors,
        isCaptchaAvailable,
        captchaImage,
        //signupInstance,
        texts,
    } = useSignupManager();

    // Handle text fallbacks in component
    const buttonText = texts?.buttonText || "Continue";
    const loadingText = "Processing..."; // Default fallback
    const captchaLabel = texts?.captchaCodePlaceholder?.concat("*") || "CAPTCHA*";
    const captchaImageAlt = "CAPTCHA challenge"; // Default fallback

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

    const watchedEmail = watch("email");
    const watchedPassword = watch("password");

    // Proper submit handler with form data
    const onSubmit = (data: SignupFormData) => {
        // Pass all form data to the signup manager
        handleSignup(data);
    };

    // Password validation functions
    const hasMinLength = (password: string) => password && password.length >= 8 && password.length <= 20;
    const hasNumber = (password: string) => password && /\d/.test(password);
    const hasLetter = (password: string) => password && /[a-zA-Z]/.test(password);
    const hasSpecialChar = (password: string) => password && /[@!#$^]/.test(password);
    const hasEmailPortion = (password: string, email: string) => {
        if (!email || !password) return false;
        const emailParts = email.split('@')[0].toLowerCase();
        return password.toLowerCase().includes(emailParts);
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

                        <div className="space-y-2 min-h-[80px]">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                First name
                            </label>
                            <input
                                {...register("firstName", {
                                    required: "First name is required",
                                })}
                                id="firstName"
                                name="ulp-firstName"
                                type="text"
                                autoComplete="given-name"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            {formErrors.firstName?.message && (
                                <p className="text-sm text-red-600">{formErrors.firstName.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 min-h-[80px]">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                Last name
                            </label>
                            <input
                                {...register("lastName", {
                                    required: "Last name is required",
                                })}
                                id="lastName"
                                name="ulp-lastName"
                                type="text"
                                autoComplete="family-name"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            {formErrors.lastName?.message && (
                                <p className="text-sm text-red-600">{formErrors.lastName.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 min-h-[80px]">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                                id="email"
                                name="ulp-email"
                                type="email"
                                autoComplete="email"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            {formErrors.email?.message && (
                                <p className="text-sm text-red-600">{formErrors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 min-h-[80px]">
                            <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700">
                                Confirm Email
                            </label>
                            <input
                                {...register("confirmEmail", {
                                    required: "Please confirm your email",
                                    validate: (value) => value === watchedEmail || "Emails do not match",
                                })}
                                id="confirmEmail"
                                name="ulp-confirmEmail"
                                type="email"
                                autoComplete="email"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            {formErrors.confirmEmail?.message && (
                                <p className="text-sm text-red-600">{formErrors.confirmEmail.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 min-h-[80px]">
                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                                Mobile Number
                            </label>
                            <input
                                {...register("mobile", {
                                    required: "Mobile number is required",
                                })}
                                id="mobile"
                                name="ulp-mobile"
                                type="tel"
                                autoComplete="tel"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            {formErrors.mobile?.message && (
                                <p className="text-sm text-red-600">{formErrors.mobile.message}</p>
                            )}
                        </div>

                        {/* Date of Birth */}
                        <div className="space-y-2 min-h-[80px]">
                            <label className="block text-sm font-medium text-gray-700">
                                Date of Birth
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                <select
                                    {...register("dob.month", { required: "Month is required" })}
                                    name="ulp-dob-month"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Month</option>
                                    {Array.from({ length: 12 }, (_, i) => {
                                        const month = new Date(2024, i, 1).toLocaleString('default', { month: 'long' });
                                        return (
                                            <option key={i + 1} value={i + 1}>
                                                {month}
                                            </option>
                                        );
                                    })}
                                </select>
                                <select
                                    {...register("dob.day", { required: "Day is required" })}
                                    name="ulp-dob-day"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Day</option>
                                    {Array.from({ length: 31 }, (_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    {...register("dob.year", {
                                        required: "Year is required",
                                        pattern: {
                                            value: /^\d{4}$/,
                                            message: "Please enter a valid 4-digit year",
                                        },
                                    })}
                                    name="ulp-dob-year"
                                    type="text"
                                    placeholder="YYYY *"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Address, Gender, Password */}
                    <div className="space-y-4">
                        <div className="space-y-2 min-h-[80px]">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                City
                            </label>
                            <input
                                {...register("city", {
                                    required: "City is required",
                                })}
                                id="city"
                                name="ulp-city"
                                type="text"
                                autoComplete="address-level2"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            {formErrors.city?.message && (
                                <p className="text-sm text-red-600">{formErrors.city.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 min-h-[80px]">
                            <label className="block text-sm font-medium text-gray-700">
                                State/Province
                            </label>
                            <select
                                {...register("state", { required: "State is required" })}
                                name="ulp-state"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select State</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        </div>

                        <div className="space-y-2 min-h-[80px]">
                            <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                                Zip or Postal Code
                            </label>
                            <input
                                {...register("zip", {
                                    required: "Zip code is required",
                                })}
                                id="zip"
                                name="ulp-zip"
                                type="text"
                                autoComplete="postal-code"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            {formErrors.zip?.message && (
                                <p className="text-sm text-red-600">{formErrors.zip.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 min-h-[80px]">
                            <label className="block text-sm font-medium text-gray-700">
                                Gender (Select One)
                            </label>
                            <select
                                {...register("gender", { required: "Gender is required" })}
                                name="ulp-gender"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="prefer-not-to-say">Prefer not to say</option>
                            </select>
                        </div>

                        {/* Password Field with Show Checkbox */}
                        <div className="space-y-2 min-h-[80px]">
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="flex gap-2">
                                <input
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters",
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "Password must be at most 20 characters",
                                        },
                                    })}
                                    name="ulp-password"
                                    type={showPassword ? "text" : "password"}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="showPassword"
                                        checked={showPassword}
                                        onChange={(e) => setShowPassword(e.target.checked)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="showPassword" className="ml-2 text-sm text-gray-700">
                                        Show
                                    </label>
                                </div>
                            </div>
                            {formErrors.password?.message && (
                                <p className="text-sm text-red-600">{formErrors.password.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 min-h-[80px]">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) => value === watchedPassword || "Passwords do not match",
                                })}
                                id="confirmPassword"
                                name="ulp-confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                autoComplete="new-password"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            {formErrors.confirmPassword?.message && (
                                <p className="text-sm text-red-600">{formErrors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Password Requirements */}
                        <div className="space-y-2 min-h-[120px]">
                            <p className="text-sm font-medium text-gray-700">Password must have:</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li className={`flex items-center ${hasMinLength(watchedPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                                    <span className="mr-2">{hasMinLength(watchedPassword) ? '✓' : '○'}</span>
                                    Minimum 8 characters, maximum 20
                                </li>
                                <li className={`flex items-center ${hasNumber(watchedPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                                    <span className="mr-2">{hasNumber(watchedPassword) ? '✓' : '○'}</span>
                                    At least one number
                                </li>
                                <li className={`flex items-center ${hasLetter(watchedPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                                    <span className="mr-2">{hasLetter(watchedPassword) ? '✓' : '○'}</span>
                                    At least one letter
                                </li>
                                <li className={`flex items-center ${hasSpecialChar(watchedPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                                    <span className="mr-2">{hasSpecialChar(watchedPassword) ? '✓' : '○'}</span>
                                    At least one special character (such as @,!,#,$,^)
                                </li>
                                <li className={`flex items-center ${!hasEmailPortion(watchedPassword, watchedEmail) ? 'text-green-600' : 'text-gray-500'}`}>
                                    <span className="mr-2">{!hasEmailPortion(watchedPassword, watchedEmail) ? '✓' : '○'}</span>
                                    Cannot contain any portion of your email address
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* CAPTCHA */}
                {isCaptchaAvailable && (
                    <CaptchaBox
                        className="mb-4"
                        id="captcha-input-signup"
                        name="ulp-captcha"
                        label={captchaLabel}
                        imageUrl={captchaImage || ""}
                        imageAltText={captchaImageAlt}
                        inputProps={{
                            ...register("captcha", {
                                required: "Please complete the CAPTCHA",
                                maxLength: {
                                    value: 15,
                                    message: "CAPTCHA too long",
                                },
                            }),
                        }}
                        error={
                            formErrors.captcha?.message || getFieldError("captcha", errors)
                        }
                    />
                )}

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
