// config.dto.ts
/**
 * DTO für die Konfiguration.
 * 
 * Diese Schnittstelle definiert die Struktur der Konfiguration, die vom System erwartet wird.
 */
export interface GetConfigDto {
  /**
   * Konfigurationseinstellungen.
   */
  config: {
    /**
     * Eine Liste von Difficulty-Objekten, die die Schwierigkeit definieren.
     */
    difficulty: DifficultyDto[];
    /**
     * Zielwert der Stimmen.
     */
    votes_target: number;
    /**
     * Gibt an, ob nur für eingeloggte Benutzer gezählt wird.
     */
    count_only_loggedin: boolean;
    /**
     * Anteil der Verteilung.
     */
    split: number;
    /**
     * Tägliches Kontingent.
     */
    daily_quota: number;
    /**
     * Strafmultiplikator.
     */
    punish_mult: number;
  };
  /**
   * Metadaten zur Konfiguration.
   */
  metadata: {
    /**
     * Gründe, die ein Unlock verhindern.
     */
    reasonsPreventingUnlocking: string[];
    /**
     * Eine Liste von Aktionen, die auf der Homepage angezeigt werden können.
     */
    homeActions: Array<{
      /**
       * Eindeutiger Identifikator der Aktion.
       */
      slug: string;
      /**
       * Titel der Aktion.
       */
      title: string;
      /**
       * Beschreibung der Aktion.
       */
      description: string;
      /**
       * Icon zur Darstellung der Aktion.
       */
      icon: string;
      /**
       * Optionales Badge zur Hervorhebung.
       */
      badge?: string;
    }>;
  };
  /**
   * Daten, die zusätzlich zur Konfiguration gespeichert werden.
   */
  data: {
    /**
     * Informationen zu den Stimmen.
     */
    votes: {
      /**
       * Gesamtsumme der Stimmen.
       */
      total: number;
      /**
       * Stimmen, die als berechtigt gezählt werden.
       */
      eligible: number;
      /**
       * Stimmen, die heute eingegangen sind.
       */
      today: number;
    };
  };
  lock: {
    keyholder: {
      username: string;
      avatarUrl: string;
      online: boolean;
    };
    user: {
      username: string;
      avatarUrl: string;
      online: boolean;
    };
    _id: string;
    status: string;
    canBeUnlocked: boolean;
    totalDuration: number;
    hideTimeLogs: boolean;
    isAllowedToViewTimeLogs: boolean;
    isFrozen: boolean;
    frozenAt?: string; // oder Date, je nach Gebrauch
    startDate: Date; // oder Date
    endDate: Date; // oder Date
    displayRemainingTime: boolean;
    title: string;
    lastVerificationPicture?: string;
    extensionAllowUnlocking: boolean;
  };
}

/**
 * DTO für die Initial Konfiguration.
 *
 * Dieses Interface definiert ausschließlich die Konfigurationseinstellungen,
 * die das System zwingend benötigt. Es enthält weder zusätzliche Sperrinformationen (lock)
 * noch Metadaten oder weitere Daten.
 */
export interface InitConfigDto {
  /**
   * Konfigurationseinstellungen.
   */
  config: {
    /**
     * Eine Liste von Difficulty-Objekten, die die Schwierigkeit definieren.
     */
    difficulty: DifficultyDto[];
    /**
     * Zielwert der Stimmen.
     */
    votes_target: number;
    /**
     * Gibt an, ob nur für eingeloggte Benutzer gezählt wird.
     */
    count_only_loggedin: boolean;
    /**
     * Anteil der Verteilung.
     */
    split: number;
    /**
     * Tägliches Kontingent.
     */
    daily_quota: number;
    /**
     * Strafmultiplikator.
     */
    punish_mult: number;
  };
}

  
/**
 * DTO für die Aktualisierung der Konfiguration.
 * Alle Felder sind optional, sodass nur Teilwerte übermittelt werden können.
 */
export type UpdateConfigDto = Partial<Omit<GetConfigDto, "lock">>;


export interface DifficultyDto {
  type: string;
  weight: number;
}
