export interface BossResponse {
  publicId: string;
  name: string;
  rarity: string;
  baseHealth: number;
  attack: number;
  defense: number;
  critChance: number;
  dodgeChance: number;
  rageThreshold: number;
  rewardMin: number;
  rewardMax: number;
  healInterval: number;
  healPercentage: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
