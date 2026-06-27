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

  getMyCharacters(page = 0, size = 2) {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<PageResponse<CharacterResponse>>>(
      `${this.apiUrl}/users/me/characters`,
      { params },
    );
  }


}
