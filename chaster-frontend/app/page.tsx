"use client";

import { useState, useEffect } from "react";
import useStoreToken from "./hooks/useStoreToken";

export default function HomePage() {
  const [counter, setCounter] = useState(0);
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);

  // Extract mainToken from hash & send to backend
  const token = useStoreToken();

  // Check if Token is set
  useEffect(() => {
    if (token) {
      setIsTokenLoaded(true);
    }
  }, [token]);
  console.log(token)
  return (
    <main
      style={{
        padding: "1rem",
        borderRadius: "var(--radius-large)",
        //backgroundColor: 'var(--color-bg-lightdark)',
        maxWidth: "800px",
        margin: "1rem auto",
        color: "var(--color-text)",
      }}
    >
      <div className="layout-container">
        {/* Linke, schmalere Spalte */}
        <div className="layout-left">
          <div className="card">
            <div>
              <div className="card-header">
                <span>
                  Keyholder lock
                </span>
                <div className="caption mb-3">Locked for 13 hours</div>
              </div>
            </div>
          </div>
        </div>
        {/* Rechte, breitere Spalte */}
        <div className="layout-right">
          <div className="card">
            <div>
              <div className="card-header">
                <span>
                  Keyholder lock
                </span>
                <div className="caption mb-3">Locked for 13 hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}