import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse } from '../models/api-response';
import { PageResponse } from '../models/page-response';
import { BattleResponse } from '../models/battle/battle-response';
import { BattleActionResponse } from '../models/battle/battle-action-response';

@Service()
export class BattleService {
  private readonly apiUrl = `${environment.apiUrl}/battles`;

  private http = inject(HttpClient);

  getMyBattles(page = 0, size = 8, sortBy = 'createdAt', sortDir: 'asc' | 'desc' = 'desc') {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    return this.http.get<ApiResponse<PageResponse<BattleResponse>>>(`${this.apiUrl}/me`, {
      params,
    });
  }

  getBattle(battleId: string) {
    return this.http.get<ApiResponse<BattleResponse>>(`${this.apiUrl}/${battleId}`);
  }

  attack(battleId: string, skillId: string) {
    return this.http.post<ApiResponse<BattleActionResponse>>(`${this.apiUrl}/${battleId}/attack`, {
      skillId,
    });
  }

  heal(battleId: string) {
    return this.http.post<ApiResponse<BattleActionResponse>>(`${this.apiUrl}/${battleId}/heal`, {});
  }

  restoreMana(battleId: string) {
    return this.http.post<ApiResponse<BattleActionResponse>>(`${this.apiUrl}/${battleId}/restore-mana`, {});

  }
  forfeitBattle(battleId: string) {
    return this.http.post<ApiResponse<BattleActionResponse>>(`${this.apiUrl}/${battleId}/forfeit`, {});
  }

  startBattle(characterId: string, bossId: string) {
    return this.http.post<ApiResponse<BattleResponse>>(`${this.apiUrl}/start`, {
      characterId,
      bossId,
    });
  }

  getOngoingBattle() {
    return this.http.get<ApiResponse<BattleResponse>>(`${this.apiUrl}/ongoing`);
  }
}
