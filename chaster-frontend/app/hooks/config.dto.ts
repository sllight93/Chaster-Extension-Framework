// config.dto.ts
export interface SetConfigDto {
    config: {
      difficulty: DifficultyDto[];
      votes_target: number;
      count_only_loggedin: boolean;
      split: number;
      daily_quota: number;
      punish_mult: number;
    };
    metadata: {
      reasonsPreventingUnlocking: string[];
      homeActions: Array<{
        slug: string;
        title: string;
        description: string;
        icon: string;
        badge?: string;
      }>;
    };
    data: {
      votes: {
        total: number;
        eligible: number;
        today: number;
      };
    };
  }
  
/**
 * DTO für die Aktualisierung der Konfiguration.
 * Alle Felder sind optional, sodass nur Teilwerte übermittelt werden können.
 */
export type UpdateConfigDto = Partial<SetConfigDto>;


export interface DifficultyDto {
  type: string;
  weight: number;
}
