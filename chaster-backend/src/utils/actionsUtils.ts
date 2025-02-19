import { 
    PartnerExtensionsApi, 
    SubmitRegularActionDto } from '@chasterapp/chaster-js';
import { getSessionAuthData } from './sessionUtils';

const partnerExtensionsApi = new PartnerExtensionsApi();

/**
 * Führt den Freeze-Lock-Vorgang durch.
 * @param token - Das Authentifizierungs-Token, das zur Ermittlung der Session verwendet wird.
 * @returns Ein Objekt mit Erfolgsmeldung und Session-Informationen.
 */
export async function freezeLock(token: string): Promise<{ success: boolean; message: string}> {
  console.log("Pending Regular Action...");
  
  const sessionInfo = await getSessionAuthData(token);
  const payload: SubmitRegularActionDto = {
    payload: {
        "message": "string",
        "nbActionsRemaining": 1,
        "nextActionDate": "string",
        "regularity": 0,
        "mode": "cumulative"
      }
  };

  const result = await partnerExtensionsApi.submitRegularAction(
    sessionInfo.sessionId,
    payload,
    { headers: { Authorization: `Bearer ${sessionInfo.apiKey}` } }
  );
  return {
    success: true,
    message: "Regular Action successfully processed",
  };
}
