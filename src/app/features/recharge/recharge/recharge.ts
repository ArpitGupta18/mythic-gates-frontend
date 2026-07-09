import { Component, inject, signal } from '@angular/core';
import { PaymentService } from '../../../core/services/payment.service';
import { GoldPackageResponse } from '../../../core/models/goldPackage/gold-package-response';
import { GoldPackageService } from '../../../core/services/gold-package.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast } from '../../../core/services/toast';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recharge',
  imports: [MatIconModule],
  templateUrl: './recharge.html',
  styleUrl: './recharge.scss',
})
export class Recharge {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toast = inject(Toast);
  private paymentService = inject(PaymentService);
  private goldPackageService = inject(GoldPackageService);

  packages = signal<GoldPackageResponse[]>([]);
  loadingPackages = signal(false);
  checkoutLoading = signal(false);
  selectedPackageId = signal<string | null>(null);

  ngOnInit() {
    this.loadGoldPackages();
    this.handlePaymentCancelRedirect();
  }

  handlePaymentCancelRedirect() {
    this.route.queryParams.subscribe((params) => {
      if (params['payment'] === 'cancelled') {
        this.toast.error('Payment cancelled.');

        this.router.navigate([], {
          queryParams: {
            payment: null,
          },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });
      }
    });
  }

  loadGoldPackages() {
    this.loadingPackages.set(true);

    this.goldPackageService.getGoldPackages().subscribe({
      next: (res) => {
        this.packages.set(res.data ?? []);
        this.loadingPackages.set(false);
      },
      error: (err) => {
        console.error(err);
        this.toast.error('Could not load gold packages.');
        this.loadingPackages.set(false);
      },
    });
  }

  buyPackage(pkg: GoldPackageResponse) {
    if (this.checkoutLoading()) return;

    this.checkoutLoading.set(true);
    this.selectedPackageId.set(pkg.packageId);

    this.paymentService
      .checkout({
        packageId: pkg.packageId,
        name: pkg.name,
        amount: pkg.priceAmount,
        quantity: 1,
        currency: !!pkg.currency ? pkg.currency : 'USD',
      })
      .subscribe({
        next: (res) => {
          const checkoutUrl = res.data?.sessionUrl;

          if (checkoutUrl) {
            setTimeout(() => {
              window.location.href = checkoutUrl;
            }, 200);

            return;
          }

          this.toast.error('Checkout URL was not returned.');
          this.checkoutLoading.set(false);
          this.selectedPackageId.set(null);
        },
        error: (err) => {
          console.error(err);
          this.toast.error('Could not start checkout.');
          this.checkoutLoading.set(false);
          this.selectedPackageId.set(null);
        },
      });
  }

  formatPrice(pkg: GoldPackageResponse) {
    return `$${(pkg.priceAmount / 100).toFixed(2)}`;
  }
}
