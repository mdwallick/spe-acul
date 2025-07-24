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
} 