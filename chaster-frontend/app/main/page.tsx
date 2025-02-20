"use client";

import { useState, useEffect } from "react";
import useStoreToken from "../hooks/useStoreToken";
import Countdown from "../components/countdown";
import Keyholder from "../components/keyholder";
import Wearer from "../components/wearer";
import ExtensionMain from "./extensionMain";


import * as data from "./sampleData";

export default function HomePage() {
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);
  const token = useStoreToken();

  useEffect(() => {
    if (token) {
      setIsTokenLoaded(true);
    }
  }, [token]);

  return (
    <main
      style={{
        padding: "1rem",
        borderRadius: "var(--radius-large)",
        // backgroundColor: 'var(--color-bg-lightdark)',
        maxWidth: "800px",
        margin: "1rem auto",
        color: "var(--color-text)",
      }}
    >
      <div className="layout-container">
        {/* Linke, schmalere Spalte */}
        <div className="layout-left">
          <div className="card card-countdown">
            <div>
              <div className="card-header">
                <span className="h2">
                  Keyholder lock <i className="fas fa-flask"></i>
                </span>
                <div className="caption mb-3">Locked for 13 hours</div>
              </div>
              <div className="card-body card-body-grid">
                <div className="timer-container row">
                  <div className="text-center timer cell">
                    <Countdown timeString={data.sampleCountdownTime} />
                  </div>
                </div>
                <Keyholder 
                  name={data.sampleKeyholder.name} 
                  avatarUrl={data.sampleKeyholder.avatarUrl} 
                />
              </div>
            </div>
          </div>
        </div>
        {/* Rechte, breitere Spalte */}
        <div className="layout-right">
          <div className="card">
            <div>
              <div className="card-header">
                <span className="h2">
                  Shared Links Modifier <i className="fas fa-flask"></i>
                </span>
                <div className="caption mb-3">You have 12 pending actions required until tomorrow.</div>
              </div>
              <div className="card-body">
              <ExtensionMain data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


