import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response';
import { SkillResponse } from '../models/skills/skill-response';

@Service()
export class SkillService {
  private readonly apiUrl = `${environment.apiUrl}`;

  private http = inject(HttpClient);

  getCharacterSkills(id: string) {
    return this.http.get<ApiResponse<SkillResponse[]>>(`${this.apiUrl}/characters/${id}/skills`);
  }
}
