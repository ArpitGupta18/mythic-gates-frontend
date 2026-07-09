export interface ProductRequest {
  packageId: string;
  name: string;
  amount: number;
  quantity: number;
  currency?: string;
}
