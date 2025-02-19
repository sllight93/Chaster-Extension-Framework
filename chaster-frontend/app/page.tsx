// chaster-frontend/app/page.tsx

"use client";

import { useState, useEffect } from "react";
import useStoreToken from "./hooks/useStoreToken";

export default function HomePage() {
  const [counter, setCounter] = useState(0);
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);

  // Extract mainToken from hash & send to backend
  const token = useStoreToken();
  
  //Check if Token is set
  useEffect(() => {
    if (token) {
      setIsTokenLoaded(true);
    }
  }, [token]);

  const handleButtonClick = async () => {
    if (!isTokenLoaded || !token ) {
      console.error("❌ Token nicht verfügbar. Warte auf Initialisierung...");
      return;
    }

    const newCounter = counter + 1;
    setCounter(newCounter);

    if (token) {

      await freezeLock( token );
      //await sendLog("Freezeing Lock", "The Freeze Button was pressed. This is a successful test!", token);

    }
  };


  const handleButtonClick2 = async () => {
    if (!isTokenLoaded || !token ) {
      console.error("❌ Token nicht verfügbar. Warte auf Initialisierung...");
      return;
    }

    const newCounter = counter + 1;
    setCounter(newCounter);

    if (token) {

      await unfreezeLock( token );
      //await sendLog("Unfreezing Lock", "The unfreeze Button was pressed. This is a successful test!", token);

    }
  };

 
  return (
    <main
      style={{
        padding: "1rem",
        borderRadius: "var(--radius-large)",
        backgroundColor: "var(--color-bg-alt)",
        maxWidth: "800px",
        margin: "1rem auto",
        color: "var(--color-text)",
      }}
    >
      <h1>Chaster Extension Framework</h1>

      {/* Button und Counter */}
      <div style={{ margin: "1rem 0", display: "flex", alignItems: "center", gap: "1rem" }}>
        <button className="btn-primary" onClick={handleButtonClick} disabled={!isTokenLoaded}>
          {isTokenLoaded ? "Freeze" : "Lade Token..."}
        </button>
        <button className="btn-primary" onClick={handleButtonClick2} disabled={!isTokenLoaded}>
          {isTokenLoaded ? "Unfreeze" : "Lade Token..."}
        </button>
        <span style={{ fontSize: "1.5rem" }}>{counter}</span>
      </div>
    </main>
  );
}





// ✅ `sendLog` jetzt eine normale Funktion außerhalb der Komponente
async function sendLog(
  title: string,
  description: string,
  token: string,
  role?: string,
  icon?: string,
  color?: string
) {
  if (!token) {
    console.error("❌ Fehler: Token fehlen.");
    return;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/incement/log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ token, title, description, role, icon, color }),
    });

    const data = await response.json();
    console.log("✅ Log erfolgreich gesendet:", data);
  } catch (error) {
    console.error("❌ Fehler beim Senden des Logs:", error);
  }
}


async function freezeLock( token: string ) {
    
  if (!token) {
    console.error("❌ Fehler: Token fehlen.");
    return;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lock/freeze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        token
       }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ Response from /api/lock/freeze:", result);
  } catch (error) {
    console.error("❌ Error sending freeze status:", error);
  }
}








async function unfreezeLock( token: string ) {
    
  if (!token) {
    console.error("❌ Fehler: Token fehlen.");
    return;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lock/unfreeze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        token
       }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ Response from /api/lock/unfreeze:", result);
  } catch (error) {
    console.error("❌ Error sending unfreeze status:", error);
  }
}