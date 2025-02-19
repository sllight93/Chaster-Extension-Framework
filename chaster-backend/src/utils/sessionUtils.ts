// src/utils/sessionUtils.ts

import { PartnerExtensionsApi } from '@chasterapp/chaster-js';

const partnerExtensionsApi = new PartnerExtensionsApi();

export async function getSessionAuthData(token: string): Promise<{ sessionId: string; mainToken: string; apiKey: string; clientId: string, lockId: string }> {
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
      lockId: response.data.session.lock._id
    };
  } catch (error: any) {
    console.error('❌ Fehler beim Abrufen der Session-Infos:', error.response?.data || error.message);
    throw new Error('Session konnte nicht abgerufen werden');
  }
}
