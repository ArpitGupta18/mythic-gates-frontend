import { Component, input, output } from '@angular/core';
import { BattleResponse } from '../../../../core/models/battle/battle-response';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-battle-detail-modal',
  imports: [DatePipe],
  templateUrl: './battle-detail-modal.html',
  styleUrl: './battle-detail-modal.scss',
})
export class BattleDetailModal {
  battle = input.required<BattleResponse>();

  close = output<void>();

  onClose() {
    this.close.emit();
  }

  healthPercent(current: number, max: number) {
    if (!max) return 0;
    return Math.max(0, Math.min(100, (current / max) * 100));
  }

  manaPercent(current: number, max: number) {
    if (!max) return 0;
    return Math.max(0, Math.min(100, (current / max) * 100));
  }
}
