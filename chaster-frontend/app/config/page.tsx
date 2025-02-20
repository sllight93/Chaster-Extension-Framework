'use client';

import { useState, useEffect } from 'react';
import useStoreToken from "./../hooks/useStoreToken";
import { useConfig }from "./../hooks/useConfig";

const exampleConf ={
  "config": {
    "difficulty": [
      { "type": "invert", "weight": 20 },
      { "type": "double", "weight": 20 },
      { "type": "double_invert", "weight": 35 },
      { "type": "jackpot", "weight": 1 },
      { "type": "nothing", "weight": 320 }
    ],
    "votes_target": 300,
    "count_only_loggedin": true,
    "split": 50,
    "daily_quota": 20,
    "punish_mult": 1.00
  },
  "metadata": {
    "reasonsPreventingUnlocking": [
      "Not enough votes collected. Get more shared link votes to unlock!"
    ],
    "homeActions": [
      {
        "slug": "notEnoughVotesQuota",
        "title": "Daily quota not reached!",
        "description": "Let people vote for your lock to prevent punishment!",
        "icon": "fa-link",
        "badge": "20"
      }
    ]
  },
  "data": {
    "votes": {
        "total": 0,
        "eligible": 0,
        "today": 0
    }
  }
}



type Config = {
  weight: number;
  title: string;
  description: string;
};
// Basis-Konfiguration (Normal) – Texte und Titel bleiben hier gleich
const baseConfig: Record<string, Config> = {
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
// Nur die Gewichtsanpassungen pro Difficulty
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
// Erstelle die vollständigen Konfigurations-Presets, indem du die Basis-Konfiguration mit den Gewichtsanpassungen zusammenführst.
const configPresets: Record<string, Record<string, Config>> = {};
Object.keys(weightAdjustments).forEach((difficulty) => {
  configPresets[difficulty] = {};
  Object.keys(baseConfig).forEach((key) => {
    configPresets[difficulty][key] = {
      ...baseConfig[key],
      weight: weightAdjustments[difficulty][key],
    };
  });
});

// Restlicher Code: Beispiel-UI, die die Konfiguration anzeigt 
export default function HomePage() {
  

  const [isTokenLoaded, setIsTokenLoaded] = useState(false);
  const [difficulty, setDifficulty] = useState('Normal');
  const [split, setSplit] = useState(50); 
  const [visitsRequired, setVisitsRequired] = useState(0);
  const [dailyQuota, setDailyQuota] = useState(15);
  const [punishMult, setPunishMult] = useState(1.0);
  const [onlyCountLoggedIn, setOnlyCountLoggedIn] = useState(true);
  
  // Extract mainToken from hash & send to backend
  const token = useStoreToken();
  const currentConfig = configPresets[difficulty];
  const { config, loading, error, loadConfig, saveConfig } = useConfig(token!);

  //Check if Token is set
    useEffect(() => {
      if (token) {
        setIsTokenLoaded(true);
      }
    }, [token]);
    
    const handleButtonClick = async () => {
      if (!isTokenLoaded || !token) {
        console.error("❌ Token nicht verfügbar. Warte auf Initialisierung...");
        return;
      }
      try {
        // Nutze saveConfig aus dem Hook, um die Konfiguration zu speichern
        await saveConfig(exampleConf);
        console.log("Konfiguration erfolgreich gespeichert.");
      } catch (err) {
        console.error("Fehler beim Speichern der Konfiguration:", err);
      }
    };


  //HTML Page
  return (
    <main
      style={{
        padding: '1rem',
        borderRadius: 'var(--radius-large)',
        //backgroundColor: 'var(--color-bg-lightdark)',
        maxWidth: '800px',
        margin: '1rem auto',
        color: 'var(--color-text)',
      }}
    >
      <hr></hr>
      <h1>Difficulty Setting</h1>
      <label htmlFor="radio-group">
        <p className="caption">
          Affect how the modifiers are weighted
        </p>
      </label>
      {/* Difficulty-Auswahl als radiale Selektoren, vertikal gestapelt */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          {/* Hier kannst du dein erstes Element einfügen */}
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
          {/* Hier kannst du dein zweites Element einfügen */}
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

      <hr></hr>

      {/* Integer-Eingabefeld */}
      <div style={{ marginBottom: '0.3rem' }}>
        <label htmlFor="integer-input" >
          Number of visits required
          <p className="caption">You will need to get a certain number of visitors before you can unlock your lock.  </p>
        </label>
        <input
          type="number"
          id="integer-input"
          value={visitsRequired}
          onChange={(e) => setVisitsRequired(Number(e.target.value))}
        />
      </div>
            
      {/* Checkmark-Eingabefeld */}
      <div className="checkbox-wrapper" >
        <input
          type="checkbox"
          id="only-logged-in"
          checked={onlyCountLoggedIn}
          onChange={(e) => setOnlyCountLoggedIn(e.target.checked)}
        />
        <label htmlFor="only-logged-in" className="checkbox-label" >Only count votes from logged-in people.</label>
      </div>

      <hr></hr>

      {/* Slider für Split */}
      <div style={{ marginBottom: '1rem' }}>
        <p>Modifier Split</p>
        <label htmlFor="split-slider" className="subtext">The split will determine how many votes you'll need to aquire before the lock gets unfrozen. ({split}%): </label>
        <input
          type="range"
          id="split-slider"
          min="25"
          max="75"
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
        />
      </div>


      <button className="btn-primary" onClick={handleButtonClick} disabled={!isTokenLoaded}>
          {isTokenLoaded ? "Submit" : "Lade Token..."}
      </button>
    </main>
  );
}

