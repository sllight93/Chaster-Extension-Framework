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
  Easy: {
    nothing: 500,
    double: 10,
    invert: 25,
    double_invert: 10,
    jackpot: 1,
  },
  Normal: {
    nothing: 300,
    double: 20,
    invert: 39,
    double_invert: 20,
    jackpot: 1,
  },
  Hard: {
    nothing: 200,
    double: 15,
    invert: 35,
    double_invert: 15,
    jackpot: 1,
  },
  Extreme: {
    nothing: 100,
    double: 10,
    invert: 30,
    double_invert: 10,
    jackpot: 1,
  },
  Sadistic: {
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
  const [difficulty, setDifficulty] = useState('Normal');
  const [split, setSplit] = useState(50); // Standardwert 50%
  const [integerValue, setIntegerValue] = useState(0);
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    console.log("Clicked button")
    try {
      const response = await fetch((process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005') + '/api/incement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          value: 5,
          difficulty,
          split,
          integerValue,
          config: configPresets[difficulty],
        }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCounter(data.counter);
    } catch (error) {
      console.error('Fehler beim Aufruf des Backends:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentConfig = configPresets[difficulty];

  return (
    <main
      style={{
        padding: '1rem',
        borderRadius: 'var(--radius-large)',
        backgroundColor: 'var(--color-bg-lightdark)',
        maxWidth: '800px',
        margin: '1rem auto',
        color: 'var(--color-text)',
      }}
    >
      <h1>Chaster Extension</h1>

      {/* Difficulty-Auswahl */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="difficulty-select">Difficulty: </label>
        <select
          id="difficulty-select"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          {Object.keys(configPresets).map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* Slider für Split */}
      <div style={{ marginBottom: '1rem' }} className="subtext">
        <label htmlFor="split-slider">Split ({split}%): </label>
        <input
          type="range"
          id="split-slider"
          min="25"
          max="75"
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
        />
      </div>

      {/* Integer-Eingabefeld */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="integer-input">Integer Value: </label>
        <input
          type="number"
          id="integer-input"
          value={integerValue}
          onChange={(e) => setIntegerValue(Number(e.target.value))}
        />
      </div>

      {/* Button und Backend-Counter */}
      <div style={{ margin: '1rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="btn-primary" onClick={handleButtonClick} disabled={loading}>
          {loading ? 'Processing...' : 'Submit'}
        </button>
        <span style={{ fontSize: '1.5rem' }}>Backend Counter: {counter}</span>
      </div>

      {/* Aktuelle Konfigurationsparameter anzeigen */}
      <section style={{ marginTop: '2rem' }}>
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
      </section>
    </main>
  );
}
