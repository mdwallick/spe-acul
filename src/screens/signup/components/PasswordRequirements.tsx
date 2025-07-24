import React, { useEffect } from "react";
import { UseFormWatch } from "react-hook-form";
import type { SignupFormData } from "@/types/signup";

interface PasswordRequirementsProps {
    watch: UseFormWatch<SignupFormData>;
}

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ watch }) => {
    const watchedPassword = watch("password");
    const watchedEmail = watch("email");

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
    );
};

export default PasswordRequirements; 