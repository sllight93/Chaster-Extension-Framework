/**
 * DTO für die Konfiguration.
 * 
 * Enthält die eigentlichen Konfigurationseinstellungen unter `config`, sowie
 * zusätzliche Metadaten (`metadata`), weitere Daten (`data`) und Sperrinformationen (`lock`).
 */
export interface SetConfigDto {
  /**
   * Konfigurationseinstellungen.
   * Hier werden die wesentlichen Einstellungen gespeichert, die unter anderem die Schwierigkeit, das Stimmenziel,
   * ob nur angemeldete User gezählt werden, die Aufteilung, das tägliche Kontingent und den Strafmultiplikator umfassen.
   */
  config: {
    /**
     * Schwierigkeitsgrade, die als Array von DifficultyDto definiert sind.
     */
    difficulty: DifficultyDto[];
    /**
     * Zielwert der Stimmen.
     */
    votes_target: number;
    /**
     * Gibt an, ob nur für angemeldete User Stimmen gezählt werden.
     */
    count_only_loggedin: boolean;
    /**
     * Aufteilung der Konfiguration (konkrete Bedeutung eventuell projektspezifisch).
     */
    split: number;
    /**
     * Das tägliche Stimm-Kontingent.
     */
    daily_quota: number;
    /**
     * Multiplikator für Strafpunkte.
     */
    punish_mult: number;
  };
  /**
   * Metadaten zur Konfiguration.
   */
  metadata: {
    /**
     * Eine Liste von Gründen, die das Entsperren verhindern.
     */
    reasonsPreventingUnlocking: string[];
    /**
     * Aktionen für die Startseite.
     */
    homeActions: Array<{
      slug: string;
      title: string;
      description: string;
      icon: string;
      badge?: string;
    }>;
  };
  /**
   * Zusätzliche Daten.
   */
  data: {
    /**
     * Informationen zu den abgegebenen Stimmen.
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
  lock?: {
    keyholder?: {
      username?: string;
      avatarUrl?: string;
      online?: boolean;
    };
    user?: {
      username?: string;
      avatarUrl?: string;
      online?: boolean;
    };
    _id?: string;
    status?: string;
    canBeUnlocked?: boolean;
    totalDuration?: number;
    hideTimeLogs?: boolean;
    isAllowedToViewTimeLogs?: boolean;
    isFrozen?: boolean;
    frozenAt?: string; // oder Date, je nach Gebrauch
    startDate?: Date; // oder Date
    endDate?: Date; // oder Date
    displayRemainingTime?: boolean;
    title?: string;
    lastVerificationPicture?: string;
    extensionAllowUnlocking?: boolean;
  };
}

/**
 * DTO für die Aktualisierung der Konfiguration.
 *
 * Alle Felder sind optional, sodass nur Teilwerte übermittelt werden können.
 */
export type UpdateConfigDto = Partial<SetConfigDto>;

/**
 * DTO zur Definition einer Schwierigkeitseinstellung.
 */
export interface DifficultyDto {
  /**
   * Typ der Schwierigkeit.
   */
  type: string;
  /**
   * Gewichtung der Schwierigkeit.
   */
  weight: number;
}
