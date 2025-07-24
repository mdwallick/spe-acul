import React, { useState, useEffect } from "react";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import type { SignupFormData } from "@/types/signup";

interface DateOfBirthFieldProps {
    register: UseFormRegister<SignupFormData>;
    errors: FieldErrors<SignupFormData>;
    watch: UseFormWatch<SignupFormData>;
}

const DateOfBirthField: React.FC<DateOfBirthFieldProps> = ({ register, errors, watch }) => {
    const watchedMonth = watch("dob.month");
    const watchedDay = watch("dob.day");
    const watchedYear = watch("dob.year");
    const [maxDays, setMaxDays] = useState(31);

    // Calculate max days for the selected month and year
    useEffect(() => {
        if (watchedMonth) {
            const month = parseInt(watchedMonth);
            let daysInMonth = 31; // Default for most months

            // Handle months with 30 days
            if ([4, 6, 9, 11].includes(month)) {
                daysInMonth = 30;
            }
            // Handle February
            else if (month === 2) {
                if (watchedYear) {
                    const year = parseInt(watchedYear);
                    // Check if it's a leap year
                    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
                    daysInMonth = isLeapYear ? 29 : 28;
                } else {
                    // If no year selected, default to 29 (leap year) to be safe
                    daysInMonth = 29;
                }
            }

            setMaxDays(daysInMonth);
        }
    }, [watchedMonth, watchedYear]);

    // Date validation function
    const validateDate = (value: string) => {
        const month = parseInt(watchedMonth || "0");
        const day = parseInt(watchedDay || "0");
        const year = parseInt(watchedYear || "0");

        if (!month || !day || !year) return true; // Let individual field validation handle this

        // Check if it's a valid date
        const date = new Date(year, month - 1, day);
        const isValidDate = date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day;

        if (!isValidDate) {
            return "Invalid date";
        }

        // Check if date is in the future
        const today = new Date();
        if (date > today) {
            return "Date of birth cannot be in the future";
        }

        // Check if person is too old (e.g., over 120 years)
        const minYear = today.getFullYear() - 120;
        if (year < minYear) {
            return "Please enter a valid year";
        }

        return true;
    };

    // Generate days based on selected month and year
    const generateDays = () => {
        const days = [];
        for (let i = 1; i <= maxDays; i++) {
            days.push(i);
        }
        return days;
    };

    return (
        <div className="space-y-2 min-h-[80px]">
            <label className="block text-sm font-medium text-gray-700">
                Date of Birth
            </label>
            <div className="grid grid-cols-3 gap-2">
                <select
                    {...register("dob.month", { required: "Month is required" })}
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
                    {...register("dob.day", {
                        required: "Day is required",
                        validate: validateDate
                    })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Day</option>
                    {generateDays().map((day) => (
                        <option key={day} value={day}>
                            {day}
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
                        validate: validateDate
                    })}
                    type="text"
                    placeholder="YYYY *"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            {(errors.dob?.month?.message || errors.dob?.day?.message || errors.dob?.year?.message) && (
                <p className="text-sm text-red-600">
                    {errors.dob?.month?.message || errors.dob?.day?.message || errors.dob?.year?.message}
                </p>
            )}
        </div>
    );
};

export default DateOfBirthField; 