import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response';
import { GoldPackageResponse } from '../models/goldPackage/gold-package-response';

@Service()
export class GoldPackageService {
  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}`;

  getGoldPackages() {
    return this.http.get<ApiResponse<GoldPackageResponse[]>>(`${this.apiUrl}/golds`);
  }
}
