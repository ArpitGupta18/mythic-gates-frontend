export interface SkillResponse {
  publicId: string;
  name: string;
  type: 'BASIC' | 'SPECIAL';
  slot: number;
  damageMultiplier: number;
  manaCost: number;
}
