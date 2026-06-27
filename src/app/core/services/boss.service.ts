import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse } from '../models/api-response';
import { PageResponse } from '../models/page-response';
import { BossResponse } from '../models/bosses/boss-response';

@Service()
export class BossService {
  private readonly apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  getBosses(page = 0, size = 8) {
    const params = new HttpParams().set('page', page).set('size', size);

    return this.http.get<ApiResponse<PageResponse<BossResponse>>>(`${this.apiUrl}/bosses`, { params });
  }
}
