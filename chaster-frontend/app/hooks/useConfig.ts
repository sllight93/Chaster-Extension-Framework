import { useState, useEffect } from 'react';
import { SetConfigDto, UpdateConfigDto } from './config.dto';


export function useConfig(token: string) {
  const [config, setConfig] = useState<UpdateConfigDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadConfig() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/config/${token}`, {
        method: 'GET', // Wir nutzen POST, um den Token im Body zu senden
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      // Wir erwarten, dass das Backend-Response-Objekt etwa so aussieht: { success: true, config: {...} }
      setConfig(data.config);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function saveConfig(newConfig: UpdateConfigDto) {
    setLoading(true);
    setError(null);
    try {
      // Senden als PATCH: Wir erwarten, dass der Backend-Endpunkt den token aus dem Body entnimmt und ein vollständiges Objekt speichert.
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/config/${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, ...newConfig })
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      // Nach dem Speichern laden wir die aktuelle Konfiguration neu
      await loadConfig();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Lade die Konfiguration, sobald der Token verfügbar ist
  useEffect(() => {
    if (token) {
      loadConfig();
    }
  }, [token]);

  return { config, loading, error, loadConfig, saveConfig };
}
