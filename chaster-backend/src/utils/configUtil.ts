import { PartnerExtensionsApi, PatchExtensionSessionDto, GetPartnerSessionRepDto } from '@chasterapp/chaster-js';
import { AxiosResponse } from 'axios';
import { getSessionAuthData } from './sessionUtils';
import { SetConfigDto } from './config.dto';
import { Logger } from '@nestjs/common';

const partnerExtensionsApi = new PartnerExtensionsApi();
const logger = new Logger('ConfigUtil');

/**
 * Entfernt alle nicht im Schema definierten Felder aus der Konfiguration.
 * Es wird angenommen, dass das erlaubte Schema im Feld session.config folgende Schlüssel vorsieht:
 * difficulty, votes_target, count_only_loggedin, split, daily_quota, punish_mult.
 * 
 * Dabei bleibt die komplette, eventuell verschachtelte Struktur der einzelnen Felder erhalten.
 * metadata und data werden aus dem übergebenen session-Objekt vollständig übernommen.
 *
 * @param session - Das Session-Objekt, wie es von der API zurückgegeben wird.
 * @returns Die gesäuberte Konfiguration als SetConfigDto.
 */
function stripConfig(session: any): SetConfigDto {
  const allowedConfig = {
    difficulty: session.config?.difficulty,
    votes_target: session.config?.votes_target,
    count_only_loggedin: session.config?.count_only_loggedin,
    split: session.config?.split,
    daily_quota: session.config?.daily_quota,
    punish_mult: session.config?.punish_mult,
  };

  const allowedLock = {
    keyholder: {
      username: session.lock?.keyholder?.username,
      avatarUrl: session.lock?.keyholder?.avatarUrl,
      online: session.lock?.keyholder?.online,
    },
    user: {
      username: session.lock?.user?.username,
      avatarUrl: session.lock?.user?.avatarUrl,
      online: session.lock?.user?.online,
    },
    _id: session.lock?._id,
    status: session.lock?.status,
    canBeUnlocked: session.lock?.canBeUnlocked,
    totalDuration: session.lock?.totalDuration,
    hideTimeLogs: session.lock?.hideTimeLogs,
    isAllowedToViewTimeLogs: session.lock?.isAllowedToViewTimeLogs,
    isFrozen: session.lock?.isFrozen,
    frozenAt: session.lock?.frozenAt,
    startDate: session.lock?.startDate,
    endDate: session.lock?.endDate,
    displayRemainingTime: session.lock?.displayRemainingTime,
    title: session.lock?.title,
    lastVerificationPicture: session.lock?.lastVerificationPicture,
    extensionAllowUnlocking: session.lock?.extensionAllowUnlocking,
  };

  return {
    config: allowedConfig,
    metadata: session.metadata || {},
    data: session.data || {},
    // Das lock-Objekt wird nicht gestript und steht somit für die Anzeige bereit.
    lock: allowedLock,
  };
}

/**
 * Ruft die aktuelle Konfiguration ab.
 * Es wird angenommen, dass die API-Antwort ein session-Objekt enthält, in dem:
 *  - Die Konfiguration unter session.config zu finden ist.
 *  - metadata und data auf oberster Ebene enthalten sind.
 *
 * @param token - Das Token, über das intern die Session ermittelt wird.
 * @param options - Optionale zusätzliche Request-Parameter.
 * @returns Die gesäuberte Konfiguration als SetConfigDto.
 */
export async function configGet(token: string, options?: any): Promise<SetConfigDto> {
  logger.debug(`Rufe Konfiguration für Token ${token} ab.`);
  const sessionInfo = await getSessionAuthData(token);
  const authOptions = {
    headers: { Authorization: `Bearer ${sessionInfo.apiKey}` },
    ...options,
  };
  const response: AxiosResponse<GetPartnerSessionRepDto> = await partnerExtensionsApi.getExtensionSession(
    sessionInfo.sessionId,
    authOptions
  );
  const session = (response.data as any).session;
  logger.debug(`Erhaltene Session: ${JSON.stringify(session)}`);

  const strippedConfig: SetConfigDto = stripConfig(session);
  logger.debug(`Gesäuberte Konfiguration: ${JSON.stringify(strippedConfig)}`);

  return strippedConfig;
}

/**
 * Setzt die vollständige Konfiguration.
 * Es wird erwartet, dass der übergebene Input exakt dem SetConfigDto entspricht.
 *
 * @param token - Das Token, über das intern die Session ermittelt wird.
 * @param config - Das vollständige Konfigurationsobjekt.
 * @param options - Optionale zusätzliche Request-Parameter.
 */
export async function configSet(token: string, config: SetConfigDto, options?: any): Promise<void> {
  logger.debug(`Setze Konfiguration für Token ${token}. Eingehende Konfiguration: ${JSON.stringify(config)}`);
  const sessionInfo = await getSessionAuthData(token);
  const patchDto: PatchExtensionSessionDto = { 
    config: config.config, 
    metadata: config.metadata, 
    data: config.data 
  };
  const authOptions = {
    headers: { Authorization: `Bearer ${sessionInfo.apiKey}` },
    ...options,
  };
  await partnerExtensionsApi.patchExtensionSession(sessionInfo.sessionId, patchDto, authOptions);
  logger.debug(`Konfiguration erfolgreich gesetzt für Session ${sessionInfo.sessionId}.`);
}

/**
 * Aktualisiert (merged) die Konfiguration.
 * Zunächst wird die bestehende Konfiguration abgerufen. Anschließend werden die neuen Werte
 * per Shallow-Merge in die aktuelle Konfiguration integriert (bestehende Felder werden durch die neuen ersetzt).
 * Das vollständige, gemergte Objekt wird dann versendet.
 *
 * @param token - Das Token, über das intern die Session ermittelt wird.
 * @param newConfig - Ein Teilobjekt des SetConfigDto, das die zu aktualisierenden Felder enthält.
 * @param options - Optionale zusätzliche Request-Parameter.
 */
export async function configUpdate(token: string, newConfig: Partial<SetConfigDto>, options?: any): Promise<void> {
  logger.debug(`Update Konfiguration für Token ${token} mit neuen Werten: ${JSON.stringify(newConfig)}`);
  const sessionInfo = await getSessionAuthData(token);
  const authOptions = {
    headers: { Authorization: `Bearer ${sessionInfo.apiKey}` },
    ...options,
  };

  const response: AxiosResponse<GetPartnerSessionRepDto> = await partnerExtensionsApi.getExtensionSession(sessionInfo.sessionId, authOptions);
  const session = (response.data as any).session;
  const currentConfig: SetConfigDto = stripConfig(session);

  // Shallow-Merge für jeden Top-Level-Bereich
  const mergedConfig: SetConfigDto = {
    config: { ...currentConfig.config, ...(newConfig.config || {}) },
    metadata: { ...currentConfig.metadata, ...(newConfig.metadata || {}) },
    data: { ...currentConfig.data, ...(newConfig.data || {}) },
  };

  logger.debug(`Gemergte Konfiguration: ${JSON.stringify(mergedConfig)}`);

  const patchDto: PatchExtensionSessionDto = {
    config: mergedConfig.config,
    metadata: mergedConfig.metadata,
    data: mergedConfig.data,
  };

  await partnerExtensionsApi.patchExtensionSession(sessionInfo.sessionId, patchDto, authOptions);
  logger.debug(`Konfiguration erfolgreich aktualisiert für Session ${sessionInfo.sessionId}.`);
}
