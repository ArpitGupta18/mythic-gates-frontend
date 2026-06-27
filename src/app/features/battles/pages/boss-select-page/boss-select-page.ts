import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BossService } from '../../../../core/services/boss.service';
import { BossResponse } from '../../../../core/models/bosses/boss-response';

@Component({
  selector: 'app-boss-select-page',
  imports: [],
  templateUrl: './boss-select-page.html',
  styleUrl: './boss-select-page.scss',
})
export class BossSelectPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bossService = inject(BossService);

  characterId = this.route.snapshot.paramMap.get('characterId');

  bosses = signal<BossResponse[]>([]);
  loading = signal<boolean>(false);

  page = signal(0);
  size = signal(100);

  ngOnInit() {
    this.loadBosses()
  }

  loadBosses() {
    this.loading.set(true);

    this.bossService.getBosses(this.page(), this.size()).subscribe({
      next: (response) => {
        this.bosses.set(response.data?.content ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  selectBoss(bossId: string) {
    this.router.navigate(['game/battle/loading/', this.characterId, bossId]);
  }

  selectRandomBoss() {
    const bosses = this.bosses();

    if (!bosses.length) return;

    const randomIndex = Math.floor(Math.random() * bosses.length);
    const randomBoss = bosses[randomIndex];

    this.selectBoss(randomBoss.publicId);
  }
}
