'use client';

import { useState, useEffect } from 'react';
import useToken from "../hooks/useToken";
import { useConfig } from "../hooks/useConfig";
import { InitConfigDto } from "../hooks/config.dto";

type DifficultySetting = {
  weight: number;
  title: string;
  description: string;
};

const baseDifficulty: Record<string, DifficultySetting> = {
  nothing: {
    weight: 320,
    title: "nothing",
    description: "",
  },
  double: {
    weight: 20,
    title: "Lucky Vote",
    description: "Critical vote by [username]. It counts twice!",
  },
  invert: {
    weight: 39,
    title: "This doesn't look right...",
    description: "Invalid vote by [Username] doesn't count.",
  },
  double_invert: {
    weight: 20,
    title: "Mouse slip",
    description: "[Username] clearly hit the wrong button!",
  },
  jackpot: {
    weight: 1,
    title: "Jackpot!",
    description: "Super critical vote by [username]! It count's 10 times!",
  },
};

const weightAdjustments: Record<string, Record<string, number>> = {
  "Easy": {
    nothing: 500,
    double: 10,
    invert: 25,
    double_invert: 10,
    jackpot: 1,
  },
  "Normal": {
    nothing: 300,
    double: 20,
    invert: 39,
    double_invert: 20,
    jackpot: 1,
  },
  "Hard Settings": {
    nothing: 200,
    double: 15,
    invert: 35,
    double_invert: 15,
    jackpot: 1,
  },
  "Extreme": {
    nothing: 100,
    double: 10,
    invert: 30,
    double_invert: 10,
    jackpot: 1,
  },
  "Sadistic": {
    nothing: 50,
    double: 10,
    invert: 15,
    double_invert: 10,
    jackpot: 2,
  },
};

const configPresets: Record<string, Record<string, DifficultySetting>> = {};
Object.keys(weightAdjustments).forEach((difficulty) => {
  configPresets[difficulty] = {};
  Object.keys(baseDifficulty).forEach((key) => {
    configPresets[difficulty][key] = {
      ...baseDifficulty[key],
      weight: weightAdjustments[difficulty][key],
    };
  });
});

export default function HomePage() {
  // Send a message to the Chaster modal to tell it that your configuration page supports the save capability
  useEffect(() => {
    window.parent.postMessage(
      JSON.stringify({
        type: "partner_configuration",
        event: "capabilities",
        payload: { features: { save: true } },
      }),
      "*"
    );
  }, []);

  const [difficulty, setDifficulty] = useState('Normal');
  const [split, setSplit] = useState(50); 
  const [visitsRequired, setVisitsRequired] = useState(0);
  const [dailyQuota, setDailyQuota] = useState(15);
  const [punishMult, setPunishMult] = useState(1.0);
  const [onlyCountLoggedIn, setOnlyCountLoggedIn] = useState(true);
  
  // Extract mainToken from hash & send to backend
  const token = useToken();
  const { loadConfig } = useConfig(token!);
  const [data, setData] = useState<InitConfigDto>();

  useEffect(() => {
    if (!token) return;
    loadConfig().then((configData) => {
      if (configData) {
        setData(configData);
      } else {
        console.error("Geladene Konfiguration entspricht nicht dem erwarteten Schema.", configData);
      }
    });
  }, [token, loadConfig]);

  // Event Listener for events coming from Chaster
  useEffect(() => {
    const handleMessage = async (e: MessageEvent) => {
      if (typeof e.data !== "string") return;
      let message;
      try {
        message = JSON.parse(e.data);
      } catch (err) {
        console.error("Fehler beim Parsen der Nachricht:", err);
        return;
      }

      const { type, event } = message;
      if (type === "chaster" && event === "partner_configuration_save") {
        // Zeige einen Spinner im Modal an
        window.parent.postMessage(
          JSON.stringify({ type: "partner_configuration", event: "save_loading" }),
          "*"
        );

        // Erstelle die Konfiguration aus den aktuellen States
        const configuration = JSON.stringify({
          config: {
            difficulty: configPresets[difficulty] // Umwandlung in Array aus DifficultyDto
              ? Object.values(configPresets[difficulty]).map(
                  (setting): { type: string; weight: number } => ({
                    type: setting.title,
                    weight: setting.weight,
                  })
                )
              : [],
            votes_target: visitsRequired,
            count_only_loggedin: onlyCountLoggedIn,
            split: split,
            daily_quota: dailyQuota,
            punish_mult: punishMult,
          },
        });

        // Benutze den Token als configurationToken (anpassen, falls ein anderer Wert genutzt wird)
        const configurationToken = token;

        try {
          await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/configuration/${configurationToken}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: configuration,
          });
          // Schließe das Modal via Save-Success Event
          window.parent.postMessage(
            JSON.stringify({ type: "partner_configuration", event: "save_success" }),
            "*"
          );
        } catch (err: any) {
          // Stoppe den Spinner auf dem Modal, da ein Fehler aufgetreten ist
          window.parent.postMessage(
            JSON.stringify({ type: "partner_configuration", event: "save_failed" }),
            "*"
          );
          // Fehlerbehandlung im Konfigurationsfenster
          console.error("Fehler beim Speichern der Konfiguration:", err.message);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [difficulty, split, visitsRequired, dailyQuota, punishMult, onlyCountLoggedIn, token]);

  // HTML Page
  return (
    <main
      style={{
        padding: '1rem',
        borderRadius: 'var(--radius-large)',
        maxWidth: '800px',
        margin: '1rem auto',
        color: 'var(--color-text)',
      }}
    >
      <hr />
      <h1>Difficulty Setting</h1>
      <label htmlFor="radio-group">
        <p className="caption">Affect how the modifiers are weighted</p>
      </label>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <div className="radio-group">
            {Object.keys(configPresets).map((level) => (
              <label key={level} className="radio-label">
                <input
                  type="radio"
                  name="difficulty"
                  value={level}
                  checked={difficulty === level}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="radio-input"
                />
                <span className="radio-custom"></span>
                <span className="radio-text">{level}</span>
              </label>
            ))}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div
            className="forma-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '150px 1fr',
              rowGap: '0.5rem',
              columnGap: '0.5rem',
              alignItems: 'center',
            }}
          >
            <label htmlFor="quotaInput" style={{ margin: 0, lineHeight: '2.5' }}>
              <p className="caption">Daily Quota</p>
            </label>
            <input
              type="number"
              id="quotaInput"
              value={dailyQuota}
              onChange={(e) => setDailyQuota(Number(e.target.value))}
              className="input-field"
              style={{ margin: 0 }}
            />

            <label htmlFor="punishMultInput" style={{ margin: 0, lineHeight: '2.5' }}>
              <p className="caption">Multiplicator</p>
            </label>
            <input
              type="number"
              step="0.01"
              id="punishMultInput"
              value={punishMult}
              onChange={(e) => setPunishMult(Number(e.target.value))}
              className="input-field"
              style={{ margin: 0 }}
            />
          </div>
        </div>
      </div>

      <hr />

      <div style={{ marginBottom: '0.3rem' }}>
        <label htmlFor="integer-input">
          Number of visits required
          <p className="caption">You will need to get a certain number of visitors before you can unlock your lock.</p>
        </label>
        <input
          type="number"
          id="integer-input"
          value={visitsRequired}
          onChange={(e) => setVisitsRequired(Number(e.target.value))}
        />
      </div>
            
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          id="only-logged-in"
          checked={onlyCountLoggedIn}
          onChange={(e) => setOnlyCountLoggedIn(e.target.checked)}
        />
        <label htmlFor="only-logged-in" className="checkbox-label">Only count votes from logged-in people.</label>
      </div>

      <hr />

      <div style={{ marginBottom: '1rem' }}>
        <p>Modifier Split</p>
        <label htmlFor="split-slider" className="subtext">
          The split will determine how many votes you'll need to acquire before the lock gets unfrozen. ({split}%):
        </label>
        <input
          type="range"
          id="split-slider"
          min="25"
          max="75"
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
        />
      </div>

      <button className="btn-primary" onClick={() => { /* weitere Logik z.B. zum Speichern per Button */ }} disabled={!token}>
          {token ? "Submit" : "Lade Token..."}
      </button>
    </main>
  );
}

