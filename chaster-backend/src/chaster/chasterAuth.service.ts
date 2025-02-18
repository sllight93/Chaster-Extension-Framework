import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import axios from 'axios';
import { PartnerExtensionsApiAxiosParamCreator, Configuration } from '@chasterapp/chaster-js';

@Injectable()
export class ChasterAuthService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ChasterAuthService.name);
  private readonly axiosParamCreator;
  private readonly config: Configuration;
  private cachedToken: string | null = null;
  private refreshInterval: NodeJS.Timeout;

  constructor() {
    const token = process.env.CHASTER_API_TOKEN;
    const clientId = process.env.CHASTER_CLIENT_ID;

    if (!token) {
      throw new Error('CHASTER_API_TOKEN is not set.');
    }
    if (!clientId) {
      throw new Error('CHASTER_CLIENT_ID is not set.');
    }

    // Erstelle die API-Konfiguration
    this.config = new Configuration({
      basePath: 'https://api.chaster.app',
      accessToken: token, // Der accessToken wird für den Request-Param-Creator benötigt
    });

    // Initialisiere den Axios-Parameter Creator
    this.axiosParamCreator = PartnerExtensionsApiAxiosParamCreator(this.config);
  }

  async onModuleInit(): Promise<void> {
    // Beim Initialisieren wird die Authentifizierung ausgeführt
    await this.authenticate();
    // Starte den regelmäßigen Check (z. B. alle 5 Minuten)
    this.startTokenRefresh();
  }

  onModuleDestroy(): void {
    // Timer bei Beendigung des Moduls löschen
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  /**
   * Führt die Authentifizierung gegen Chaster aus,
   * speichert den erhaltenen Token und loggt das Ergebnis.
   */
  private async authenticate(): Promise<void> {
    const token = process.env.CHASTER_API_TOKEN; // Hauptseitentoken
    const clientId = process.env.CHASTER_CLIENT_ID;
    const config = new Configuration({
      basePath: 'https://api.chaster.app',
      accessToken: token, // Der accessToken wird für den Request-Param-Creator benötigt
    });
    try { 
      // Erzeuge die Request-Parameter für getSessionAuth 
      const requestArgs = await this.axiosParamCreator.getSessionAuth(token, clientId, config);
      
      // Führe den Request mit axios aus
      const response = await axios.request(requestArgs);
      
      // Hier wird angenommen, dass der zurückgelieferte Token in response.data.token enthalten ist.
      // Bitte passe dies an, falls das Feld anders heißt.
      this.cachedToken = response.data.token;
      
      this.logger.log(`Chaster authentication successful. New token: ${this.cachedToken}`);
    } catch (error) {
      this.logger.error('Error during Chaster authentication', error);
      // Je nach Anforderung könnte hier auch ein erneuter Versuch erfolgen
    }
  }

  /**
   * Startet einen regelmäßigen Timer, um die Gültigkeit des Tokens zu prüfen
   * und ggf. den Token zu erneuern.
   */
  private startTokenRefresh(): void {
    // Beispielsweise alle 5 Minuten (300000 Millisekunden)
    const intervalMs = 5 * 60 * 1000;
    this.refreshInterval = setInterval(async () => {
      this.logger.log('Refreshing Chaster token...');
      await this.authenticate();
    }, intervalMs);
  }

  /**
   * Liefert den aktuell zwischengespeicherten Token zurück.
   */
  public getToken(): string | null {
    return this.cachedToken;
  }
}
