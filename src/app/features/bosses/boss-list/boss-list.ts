import { Component, inject, OnInit, signal } from '@angular/core';
import { BossResponse } from '../../../core/models/bosses/boss-response';
import { BossService } from '../../../core/services/boss.service';
import { BossCard } from '../boss-card/boss-card';
import { BossDetailModal } from '../boss-detail-modal/boss-detail-modal';

@Component({
  selector: 'app-boss-list',
  imports: [BossCard, BossDetailModal],
  templateUrl: './boss-list.html',
  styleUrl: './boss-list.scss',
})
export class BossList implements OnInit {
  private bossService = inject(BossService);

  bosses = signal<BossResponse[]>([]);

  page = signal(0);
  size = signal(4);
  totalPages = signal(0);
  totalElements = signal(0);
  last = signal(false);

  selectedBoss = signal<BossResponse | null>(null);

  ngOnInit() {
    this.loadBosses(0);
  }

  loadBosses(page: number) {
    this.bossService.getBosses(page, this.size()).subscribe({
      next: (response) => {
        const data = response.data!;

        console.log(data);
        this.bosses.set(data.content);
        this.page.set(data.page);
        this.size.set(data.size);
        this.totalPages.set(data.totalPages);
        this.totalElements.set(data.totalElements);
        this.last.set(data.last);
      },
      error: (err) => console.error(err),
    });
  }

  openDetails(boss: BossResponse) {
    this.selectedBoss.set(boss);
  }

  closeDetails() {
    this.selectedBoss.set(null);
  }

  nextPage() {
    if (!this.last()) {
      this.loadBosses(this.page() + 1);
    }
  }

  previousPage() {
    if (this.page() > 0) {
      this.loadBosses(this.page() - 1);
    }
  }
}
