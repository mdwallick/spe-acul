import { lazy } from "react";

const SCREEN_COMPONENTS: Record<string, any> = {
    "login": lazy(() => import("@/screens/login")),
    "signup": lazy(() => import("@/screens/signup")),
};

export const getScreenComponent = (screenName: string) => {
    return SCREEN_COMPONENTS[screenName] || null;
};
