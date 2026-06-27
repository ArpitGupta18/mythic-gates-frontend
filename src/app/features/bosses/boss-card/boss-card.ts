import { Component, input, output } from '@angular/core';
import { BossResponse } from '../../../core/models/bosses/boss-response';

@Component({
  selector: 'app-boss-card',
  imports: [],
  templateUrl: './boss-card.html',
  styleUrl: './boss-card.scss',
})
export class BossCard {
  boss = input.required<BossResponse>();

  viewDetails = output<BossResponse>();

  onViewDetails() {
    this.viewDetails.emit(this.boss());
  }
}
