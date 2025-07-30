import React from "react";

import Separator from "@/common/Separator";
import SocialProviderButton from "@/common/SocialProviderButton";
import type { SocialConnection } from "@/utils/helpers/socialUtils";
import { getSocialProviderDetails } from "@/utils/helpers/socialUtils";

import { useLoginManager } from "../hooks/useLoginManager";

// No props needed as it uses hooks internally
const AlternativeLogins: React.FC = () => {
  const { loginInstance, handleFederatedLogin, texts } = useLoginManager();

  const alternateConnections = loginInstance?.transaction
    ?.alternateConnections as SocialConnection[] | undefined;

  // Handle text fallbacks in component
  const separatorText = texts?.separatorText || "OR";
  const showSeparator = alternateConnections && alternateConnections.length > 0;

  return (
    <>
      {showSeparator && <Separator text={separatorText} />}

      <div className="space-y-3 mt-4">
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
              onClick={() => handleFederatedLogin(connection.name)}
            />
          );
        })}
      </div>
    </>
  );
};

export default AlternativeLogins;
