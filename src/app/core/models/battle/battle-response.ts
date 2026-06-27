export interface BattleResponse {
  battleId: string;
  characterName: string;
  characterImageUrl: string;
  bossName: string;
  bossImageUrl: string;
  playerMaxHealth: number;
  playerCurrentHealth: number;
  playerMaxMana: number;
  playerCurrentMana: number;
  bossMaxHealth: number;
  bossCurrentHealth: number;
  turnCount: number;
  damageDealt: number;
  goldEarned: number;
  status: 'ONGOING' | 'WON' | 'LOST';
  createdAt: string;
  updatedAt: string;
}
