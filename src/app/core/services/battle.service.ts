import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse } from '../models/api-response';
import { PageResponse } from '../models/page-response';
import { BattleResponse } from '../models/battle/battle-response';

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

  forfeitBattle(battleId: string) {
    return this.http.post<ApiResponse<BattleResponse>>(`${this.apiUrl}/${battleId}/forfeit`, {});
  }
}
