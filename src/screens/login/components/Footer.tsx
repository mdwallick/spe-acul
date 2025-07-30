import React from "react";

import { rebaseLinkToCurrentOrigin } from "@/utils/helpers/urlUtils";

import { useLoginManager } from "../hooks/useLoginManager";

const Footer: React.FC = () => {
  const { isSignupEnabled, signupLink, texts } = useLoginManager();

  if (!isSignupEnabled) {
    return null;
  }

  const localizedSignupLink = rebaseLinkToCurrentOrigin(signupLink);

  // Handle text fallbacks in component
  const footerText = texts?.footerText || "Don't have an account?";
  const footerLinkText = texts?.footerLinkText || "Sign up";

  return (
    <div className="mt-4 text-left">
      <span className="text-sm pr-1">{footerText}</span>
      {localizedSignupLink && (
        <a
          href={localizedSignupLink}
          className="text-sm font-bold text-link hover:text-link/80 focus:bg-link/15 focus:rounded"
        >
          {footerLinkText}
        </a>
      )}
    </div>
  );
};

export default Footer;
