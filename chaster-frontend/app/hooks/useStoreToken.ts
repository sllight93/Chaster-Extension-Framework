// chaster-frontend/app/hooks/useStoreToken.ts

import { useEffect, useState } from "react";

export default function useStoreToken(): string | null {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      try {
        const parsed = JSON.parse(decodeURIComponent(hash));
        const extractedToken = parsed.mainToken;
        setToken(extractedToken);

      } catch (error) {
        console.error("Error storing token:", error);
      }
    }
  }, []);

  return token;
}
