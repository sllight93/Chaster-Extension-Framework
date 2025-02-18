// app/page.tsx
'use client';

import { useState } from 'react';

import './globals.css';

export default function HomePage() {
  const [counter, setCounter] = useState(0);
  const [difficulty, setDifficulty] = useState<string>('Easy'); // Standardmäßig "Easy"

  const difficulties = ['Easy', 'Normal', 'Hard', 'Extreme', 'Sadistic'];

  const handleButtonClick = () => {
    setCounter(counter + 1);
  };

  const handleDifficultyChange = (level: string) => {
    setDifficulty(level);
  };

  return (
    <main
      style={{
        padding: '1rem',
        borderRadius: 'var(--radius-large)',
        backgroundColor: 'var(--color-bg-alt)',
        maxWidth: '800px',
        margin: '1rem auto',
        color: 'var(--color-text)'
      }}
    >
      <h1>Chaster Extension</h1>

      {/* Button und Counter */}
      <div style={{ margin: '1rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="btn-primary" onClick={handleButtonClick}>
          Increment
        </button>
        <span style={{ fontSize: '1.5rem' }}>{counter}</span>
      </div>

      {/* Exklusive Checkbox-Liste */}
      <div>
        <h2>Select Difficulty</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {difficulties.map((level) => (
            <li key={level} style={{ margin: '0.5rem 0' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                {/* Da nur eine Auswahl möglich sein soll, steuern wir den checked-Zustand */}
                <input
                  type="checkbox"
                  checked={difficulty === level}
                  onChange={() => handleDifficultyChange(level)}
                  style={{ marginRight: '0.5rem' }}
                />
                {level}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
