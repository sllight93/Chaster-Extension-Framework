// src/utils/sessionUtils.ts

import { PartnerExtensionsApi } from '@chasterapp/chaster-js';
import { Logger } from '@nestjs/common';

const partnerExtensionsApi = new PartnerExtensionsApi();
const logger = new Logger('SessionUtils');

/**
 * Ermittelt die Authentifizierungsdaten für eine Session anhand eines Tokens.
 *
 * Diese Funktion ruft die Session-Informationen von der PartnerExtensionsApi ab, indem sie
 * den übergebenen Token, den Client-Identifier und das API-Token verwendet. Wird keine
 * Session-ID in der Antwort gefunden, so wird ein Fehler ausgelöst.
 *
 * @param token - Das Authentifizierungs-Token, das zur Ermittlung der Session verwendet wird.
 * @returns Ein Promise, das ein Objekt mit den folgenden Eigenschaften auflöst:
 *  - sessionId: Die aktuell gültige Session-ID.
 *  - mainToken: Der übergebene Token (als Haupttoken).
 *  - apiKey: Das API-Token.
 *  - clientId: Der Client-Identifier.
 *  - lockId: Die Lock-ID der Session.
 *
 * @throws Fehler, wenn einer der Parameter fehlt oder die Session nicht abgerufen werden kann.
 *
 * @example
 * const authData = await getSessionAuthData('sessionToken123');
 * console.log(authData.sessionId);
 */
export async function getSessionAuthData(token: string): Promise<{ sessionId: string; mainToken: string; apiKey: string; clientId: string; lockId: string }> {
  const clientId = process.env.X_CHASTER_CLIENT_ID;
  const apiToken = process.env.CHASTER_API_TOKEN;

  if (!token || !clientId || !apiToken) {
    throw new Error('Fehlende Parameter: token, clientId oder CHASTER_API_TOKEN');
  }

  try {
    const response = await partnerExtensionsApi.getSessionAuth(token, clientId, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'X-CHASTER-CLIENT-ID': clientId,
      },
    });

    if (!response.data.session?.sessionId) {
      throw new Error('Keine Session-ID in der Antwort');
    }

    return {
      sessionId: response.data.session.sessionId,
      mainToken: token,
      apiKey: apiToken,
      clientId,
      lockId: response.data.session.lock._id,
    };
  } catch (error: any) {
    logger.error('Fehler beim Abrufen der Session-Infos:', error.response?.data || error.message);
    throw new Error('Session konnte nicht abgerufen werden');
  }
}
