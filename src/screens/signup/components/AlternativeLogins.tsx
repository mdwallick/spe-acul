import React from "react";

import Separator from "@/common/Separator";
import SocialProviderButton from "@/common/SocialProviderButton";
// import { getIcon } from "@/utils/helpers/iconUtils";
import { useSignupManager } from "@/screens/signup/hooks/useSignupManager";
import type { SocialConnection } from "@/utils/helpers/socialUtils";
import { getSocialProviderDetails } from "@/utils/helpers/socialUtils";

// No props needed as it uses hooks internally
const AlternativeLogins: React.FC = () => {
  const { signupInstance, handleFederatedSignup, texts } = useSignupManager();

  const alternateConnections = signupInstance?.transaction
    ?.alternateConnections as SocialConnection[] | undefined;

  // Handle text fallbacks in component
  const separatorText = texts?.separatorText || "OR";
  const showSeparator = alternateConnections && alternateConnections.length > 0;

  return (
    <>
      <div className="space-y-3 mt-4 flex justify-center">
        {alternateConnections?.map((connection) => {
          const { displayName, iconComponent } =
            getSocialProviderDetails(connection);
          const socialButtonText = `Continue with ${displayName}`;
          return (
            <SocialProviderButton
              key={connection.name}
              displayName={displayName}
              buttonText={socialButtonText}
              iconComponent={iconComponent}
              onClick={() => handleFederatedSignup(connection.name)}
            />
          );
        })}
      </div>

      {showSeparator && <Separator text={separatorText} />}
    </>
  );
};

export default AlternativeLogins;
