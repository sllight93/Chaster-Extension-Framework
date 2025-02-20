import React, { useState, useEffect } from "react";

interface CountdownProps {
  timeString: string; // Format "DD:HH:MM:SS"
  isFrozen?: boolean;
}

// Hilfsfunktion: Konvertiere den Zeitstring in Sekunden
function convertTimeStringToSeconds(time: string): number {
  const parts = time.split(":").map(Number);
  if (parts.length !== 4) return 0;
  const [dd, hh, mm, ss] = parts;
  return dd * 86400 + hh * 3600 + mm * 60 + ss;
}

// Hilfsfunktion: Formatiere Sekunden zurück in [DD, HH, MM, SS] als jeweils zweistellige Strings
function formatSeconds(seconds: number): [string, string, string, string] {
  const dd = Math.floor(seconds / 86400);
  seconds %= 86400;
  const hh = Math.floor(seconds / 3600);
  seconds %= 3600;
  const mm = Math.floor(seconds / 60);
  const ss = seconds % 60;
  // Funktion zum Auffüllen mit führender Null
  const pad = (n: number) => n.toString().padStart(2, "0");
  return [pad(dd), pad(hh), pad(mm), pad(ss)];
}

export default function Countdown({ timeString, isFrozen = false }: CountdownProps) {
  const initialSeconds = convertTimeStringToSeconds(timeString);
  const [remaining, setRemaining] = useState(initialSeconds);

  useEffect(() => {
    if (isFrozen) return; // Wenn gesperrt, starte keinen Timer
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isFrozen]);

  const [d, h, m, s] = formatSeconds(remaining);
  const parts = [d, h, m, s];
  const labels = ["days", "hours", "mins", "secs"];

  return (
    <div className="countdown-timer d-flex align-items-center justify-content-center">
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          <div className="countdown-item">
            <div className="countdown-digits">
              {part.split("").map((digit, i) => (
                <div key={i} className="countdown-digit">
                  {digit}
                </div>
              ))}
            </div>
            <div className="countdown-label-item">{labels[index]}</div>
          </div>
          {index < parts.length - 1 && (
            <div className="countdown-sep">:</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}