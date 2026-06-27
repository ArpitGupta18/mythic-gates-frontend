import { Component, input, output } from '@angular/core';
import { BossResponse } from '../../../core/models/bosses/boss-response';

@Component({
  selector: 'app-boss-detail-modal',
  imports: [],
  templateUrl: './boss-detail-modal.html',
  styleUrl: './boss-detail-modal.scss',
})
export class BossDetailModal {
  boss = input.required<BossResponse>();

  close = output<void>();

  onClose() {
    this.close.emit();
  }
}
