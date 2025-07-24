export interface SignupFormData {
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    dob: { month: string; day: string; year: string };
    mobile: string;
    city: string;
    state: string;
    zip: string;
    gender: string;
    showPassword: boolean;
    captcha?: string;
    // Communication preferences and legal agreements
    newsletter?: boolean;
    marketing?: boolean;
    financialIncentive?: boolean;
    termsAgreement?: boolean;
}

// Type for the data that gets passed to the signup manager
export interface SignupManagerData {
    email: string;
    password: string;
    captcha?: string;
    firstName: string;
    lastName: string;
    dob: { month: string; day: string; year: string };
    mobile: string;
    city: string;
    state: string;
    zip: string;
    gender: string;
    // Communication preferences and legal agreements
    newsletter?: boolean;
    marketing?: boolean;
    financialIncentive?: boolean;
    termsAgreement?: boolean;
} 