import { 
    PartnerExtensionsApi, 
    FreezeLockActionModel, 
    FreezeLockActionModelNameEnum,
    UnfreezeLockActionModel, 
    UnfreezeLockActionModelNameEnum,
    ToggleFreezeLockActionModel, 
    ToggleFreezeLockActionModelNameEnum,
    PilloryLockActionModel, 
    PilloryLockActionParamsModel,  
    PilloryLockActionModelNameEnum,
    AddTimeLockActionModel, 
    AddTimeLockActionModelNameEnum,
    RemoveTimeLockActionModel, 
    RemoveTimeLockActionModelNameEnum, } from '@chasterapp/chaster-js';
import { getSessionAuthData } from './sessionUtils';

const partnerExtensionsApi = new PartnerExtensionsApi();

/**
 * Führt den Freeze-Lock-Vorgang durch.
 * @param token - Das Authentifizierungs-Token, das zur Ermittlung der Session verwendet wird.
 * @returns Ein Objekt mit Erfolgsmeldung und Session-Informationen.
 */
export async function freezeLock(token: string): Promise<{ success: boolean; message: string}> {
  console.log("Pending Freeze...");
  
  const sessionInfo = await getSessionAuthData(token);
  const action: FreezeLockActionModel = {
    name: FreezeLockActionModelNameEnum.Freeze,
  };

  const result = await partnerExtensionsApi.doAction(
    sessionInfo.sessionId,
    { action: action },
    { headers: { Authorization: `Bearer ${sessionInfo.apiKey}` } }
  );
  return {
    success: true,
    message: "Freeze action successfully processed",
  };
}

/**
 * Führt den Unfreeze-Lock-Vorgang durch.
 * @param token - Das Authentifizierungs-Token, das zur Ermittlung der Session verwendet wird.
 * @returns Ein Objekt mit Erfolgsmeldung und Session-Informationen.
 */
export async function unfreezeLock(token: string): Promise<{ success: boolean; message: string }> {
  console.log("Pending Unfreeze...");
  
  const sessionInfo = await getSessionAuthData(token);
  const action: UnfreezeLockActionModel = {
    // Hier wird angenommen, dass der Enum einen entsprechenden Unfreeze-Wert hat.
    name: UnfreezeLockActionModelNameEnum.Unfreeze,
  };

  const result = await partnerExtensionsApi.doAction(
    sessionInfo.sessionId,
    { action: action },
    { headers: { Authorization: `Bearer ${sessionInfo.apiKey}` } }
  );

  return {
    success: true,
    message: "Unfreeze action successfully processed",
  };
}

/**
 * Führt den ToggleFreeze-Lock-Vorgang durch.
 * @param token - Das Authentifizierungs-Token, das zur Ermittlung der Session verwendet wird.
 * @returns Ein Objekt mit Erfolgsmeldung und Session-Informationen.
 */
export async function toggleFreezeLock(token: string): Promise<{ success: boolean; message: string }> {
    console.log("Pending toggle Freeze...");
    
    const sessionInfo = await getSessionAuthData(token);
    const action: ToggleFreezeLockActionModel = {
      // Hier wird angenommen, dass der Enum einen entsprechenden Unfreeze-Wert hat.
      name: ToggleFreezeLockActionModelNameEnum.ToggleFreeze,
    };
  
    await partnerExtensionsApi.doAction(
      sessionInfo.sessionId,
      { action: action },
      { headers: { Authorization: `Bearer ${sessionInfo.apiKey}` } }
    );
  
    return {
      success: true,
      message: "ToggleFreeze action successfully processed",
    };
  }
  
/**
 * Führt den Pillory-Lock-Vorgang durch.
 * @param token - Das Authentifizierungs-Token, das zur Ermittlung der Session verwendet wird.
 * @param duration - Die Dauer des Pillory-Locks.
 * @param reason - Der Grund für den Pillory-Lock.
 * @returns Ein Objekt mit Erfolgsmeldung und Session-Informationen.
 */
export async function pilloryLock(token: string, duration: number, reason: string): Promise<{ success: boolean; message: string }> {
    console.log("Pending Pillory...");
    
    const sessionInfo = await getSessionAuthData(token);

    const params: PilloryLockActionParamsModel = {
        duration,
        reason
    }

    const action: PilloryLockActionModel = {
      // Hier wird angenommen, dass der Enum einen entsprechenden Unfreeze-Wert hat.
      name: PilloryLockActionModelNameEnum.Pillory,
      params
    };
  
    await partnerExtensionsApi.doAction(
      sessionInfo.sessionId,
      { action: action },
      { headers: { Authorization: `Bearer ${sessionInfo.apiKey}` } }
    );
  
    return {
      success: true,
      message: "Pillory action successfully processed",
    };
  }

/**
 * Führt den Pillory-Lock-Vorgang durch.
 * @param token - Das Authentifizierungs-Token, das zur Ermittlung der Session verwendet wird.
 * @param duration - Die Zeit die hinzugefügt werden soll, in Sekunden.
 * @returns Ein Objekt mit Erfolgsmeldung und Session-Informationen.
 */
export async function addTimeLock(token: string, duration: number ): Promise<{ success: boolean; message: string }> {
  console.log("Pending add time...");
  
  const sessionInfo = await getSessionAuthData(token);

  const action: AddTimeLockActionModel = {
    // Hier wird angenommen, dass der Enum einen entsprechenden Unfreeze-Wert hat.
    name: AddTimeLockActionModelNameEnum.AddTime,
    params: duration
  };

  await partnerExtensionsApi.doAction(
    sessionInfo.sessionId,
    { action: action },
    { headers: { Authorization: `Bearer ${sessionInfo.apiKey}` } }
  );

  return {
    success: true,
    message: "Add Time action successfully processed",
  };
}

/**
 * Führt den Pillory-Lock-Vorgang durch.
 * @param token - Das Authentifizierungs-Token, das zur Ermittlung der Session verwendet wird.
 * @param duration - Die Zeit die hinzugefügt werden soll, in Sekunden.
 * @returns Ein Objekt mit Erfolgsmeldung und Session-Informationen.
 */
export async function removeTimeLock(token: string, duration: number ): Promise<{ success: boolean; message: string }> {
  console.log("Pending add time...");
  
  const sessionInfo = await getSessionAuthData(token);

  const action: RemoveTimeLockActionModel = {
    // Hier wird angenommen, dass der Enum einen entsprechenden Unfreeze-Wert hat.
    name: RemoveTimeLockActionModelNameEnum.RemoveTime,
    params: duration
  };

  await partnerExtensionsApi.doAction(
    sessionInfo.sessionId,
    { action: action },
    { headers: { Authorization: `Bearer ${sessionInfo.apiKey}` } }
  );

  return {
    success: true,
    message: "Remove Time action successfully processed",
  };
}