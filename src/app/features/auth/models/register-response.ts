import { Role } from '../../../core/models/role';

export interface RegisterResponse {
  username: string;
  email: string;
  role: Role;
  gold: number;
  bossDefeated: number;
}
