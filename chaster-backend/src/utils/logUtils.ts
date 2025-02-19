// src/utils/logUtils.ts

import { PartnerExtensionsApi, PartnerCustomLogActionDto, ActionLogRoleEnum } from '@chasterapp/chaster-js';
import { getSessionAuthData } from '../utils/sessionUtils';

const partnerExtensionsApi = new PartnerExtensionsApi();
/**
 * Erstellt einen Logeintrag.
 * @param token - Das Authentifizierungs-Token, das zur Ermittlung der Session verwendet wird.
 * @param logData - Die Dauer des Pillory-Locks.
 *  * @param title - Der Grund für den Pillory-Lock.
 *  * @param description - Der Grund für den Pillory-Lock.
 *  * @param icon - The FontAwesome icon, without the `fa-` prefix.  The icon must be part of the FontAwesome v5 regular icons: https://fontawesome.com/v5/search?o=r&s=regular
 *  * @param color - Die Farbe des Logeintrags.
 * @returns Ein Objekt mit Erfolgsmeldung und Session-Informationen.
 */
export async function createLogEntry(
  token: string,
  logData: { title: string; description: string; icon?: string; color?: string | null }
): Promise<void> {
  if (!token) {
    throw new Error('Fehlende Parameter: sessionId oder token');
  }

  const sessionInfo = await getSessionAuthData(token);


  const logEntry: PartnerCustomLogActionDto = {
    title: logData.title,
    description: logData.description,
    role: ActionLogRoleEnum.Extension, 
    icon: logData.icon as any, 
    color: logData.color ?? null,
  };

  try {
    await partnerExtensionsApi.logCustomAction(sessionInfo.sessionId, logEntry, {
      headers: { Authorization: `Bearer ${sessionInfo.apiKey}` },
    });
  } catch (error) {
    console.error('Fehler beim Erstellen des Log-Eintrags:', error);
    throw new Error('Log konnte nicht erstellt werden');
  }
}
