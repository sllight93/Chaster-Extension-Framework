'use client';

import { useState } from 'react';

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
  "Easy - Low chance of modifing a vote.": {
    nothing: 500,
    double: 10,
    invert: 25,
    double_invert: 10,
    jackpot: 1,
  },
  "Normal - Medium chance of modifing a vote.": {
    nothing: 300,
    double: 20,
    invert: 39,
    double_invert: 20,
    jackpot: 1,
  },
  "Hard Settings - Depending your required visits this can take weeks!": {
    nothing: 200,
    double: 15,
    invert: 35,
    double_invert: 15,
    jackpot: 1,
  },
  "Extreme - Your lock will propabply last a lot, lot longer with this!": {
    nothing: 100,
    double: 10,
    invert: 30,
    double_invert: 10,
    jackpot: 1,
  },
  "Sadistic - Does it need further explaination?": {
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
  const [difficulty, setDifficulty] = useState('Normal - Medium chance of modifing a vote.');
  const [split, setSplit] = useState(50); // Standardwert 50%
  const [integerValue, setIntegerValue] = useState(0);
  const [onlyCountLoggedIn, setOnlyCountLoggedIn] = useState(true);
  
 
  
  const currentConfig = configPresets[difficulty];

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
      <h1>Difficulty Setting</h1>

{/* Difficulty-Auswahl als radiale Selektoren, vertikal gestapelt */}
<div style={{ marginBottom: '1rem' }}>
  <label htmlFor="radio-group" >
    <p className="caption">
      Difficulty settings that affect how the modifiers are weighted
    </p>
  </label>
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
          value={integerValue}
          onChange={(e) => setIntegerValue(Number(e.target.value))}
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

      {/*Horizontale Trennlinie */}
      <hr></hr>


      {/* Aktuelle Konfigurationsparameter anzeigen */}
      {/* <section style={{ marginTop: '2rem' }}> 
        <h2>Aktuelle Konfigurationsparameter ({difficulty}):</h2>
        <p>Split: {split}%</p>
        <p>Integer Input: {integerValue}</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {Object.entries(currentConfig).map(([key, config]) => (
            <li
              key={key}
              style={{
                margin: '0.5rem 0',
                padding: '0.5rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-default)',
              }}
            >
              <strong>{key.toUpperCase()}</strong>: {config.weight}
              {config.title && (
                <>
                  <br />
                  <em>{config.title}</em>
                </>
              )}
              {config.description && (
                <>
                  <br />
                  {config.description}
                </>
              )}
            </li>
          ))}
        </ul>
      </section> */}
    </main>
  );
}
