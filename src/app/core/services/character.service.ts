import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse } from '../models/api-response';
import { PageResponse } from '../models/page-response';
import { CharacterResponse } from '../models/characters/character-response';

@Service()
export class CharacterService {
  private readonly apiUrl = `${environment.apiUrl}`;

  private http = inject(HttpClient);

  getCharacters(page = 0, size = 8, sortBy = 'name', sortDir: 'asc' | 'desc' = 'asc') {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);
    return this.http.get<ApiResponse<PageResponse<CharacterResponse>>>(`${this.apiUrl}/characters`, { params });
  }
}
