import { BattleResponse } from './battle-response';

export interface BattleActionResponse {
  battle: BattleResponse;
  playerActionMessage: string;
  bossActionMessage: string;
  battleEnded: boolean;
  result: 'ONGOING' | 'WON' | 'LOST';
}
