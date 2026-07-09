import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ProductRequest } from '../models/payment/product-request';
import { ApiResponse } from '../models/api-response';
import { StripeResponse } from '../models/payment/stripe-response';

@Service()
export class PaymentService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}`;

  checkout(product: ProductRequest) {
    return this.http.post<ApiResponse<StripeResponse>>(`${this.apiUrl}/product/checkout`, product);
  }
}
