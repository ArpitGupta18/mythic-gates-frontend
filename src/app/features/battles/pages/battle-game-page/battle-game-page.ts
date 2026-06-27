import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BattleService } from '../../../../core/services/battle.service';
import { BattleResponse } from '../../../../core/models/battle/battle-response';
import { SkillResponse } from '../../../../core/models/skills/skill-response';
import { SkillService } from '../../../../core/services/skill.service';
import { BattleActionResponse } from '../../../../core/models/battle/battle-action-response';
import { Toast } from '../../../../core/services/toast';
import { User } from '../../../../core/services/user';

@Component({
  selector: 'app-battle-game-page',
  imports: [],
  templateUrl: './battle-game-page.html',
  styleUrl: './battle-game-page.scss',
})
export class BattleGamePage {
  private route = inject(ActivatedRoute);
  private battleService = inject(BattleService);
  private skillService = inject(SkillService);
  private toastService = inject(Toast);
  private router = inject(Router);
  private userService = inject(User)

  battle = signal<BattleResponse | null>(null);
  loading = signal<boolean>(false);
  actionLoading = signal(false);

  battleLog = signal<string[]>(['The battle begins...']);
  battleResultModal = signal<BattleActionResponse | null>(null);

  skills = signal<SkillResponse[]>([]);

  basicSkills = computed(() =>
    this.skills()
      .filter((skill) => skill.type === 'BASIC')
      .sort((a, b) => a.slot - b.slot),
  );

  specialSkills = computed(() =>
    this.skills()
      .filter((skill) => skill.type === 'SPECIAL')
      .sort((a, b) => a.slot - b.slot),
  );

  battleId = this.route.snapshot.paramMap.get('battleId')!;

  private getStartMessage(status: string): string {
    switch (status) {
      case 'ONGOING':
        return 'The battle begins...';

      case 'WON':
        return 'Victory! The battle has already been won.';

      case 'LOST':
        return 'Defeat... This battle has already ended.';

      default:
        return '';
    }
  }

  ngOnInit() {
    this.loadBattle();
  }

  loadBattle() {
    this.loading.set(true);

    this.battleService.getBattle(this.battleId).subscribe({
      next: (response) => {
        this.battle.set(response.data);
        this.battleLog.set([this.getStartMessage(response.data?.status!)]);
        this.skillService.getCharacterSkills(response.data?.characterId!).subscribe({
          next: (skillRes) => {
            this.skills.set(skillRes.data!);
            this.loading.set(false);
          },
        });
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  attack(skillId: string) {
    if (this.actionLoading()) return;

    this.actionLoading.set(true);

    this.battleService.attack(this.battleId, skillId).subscribe({
      next: (response) => this.handleBattleUpdate(response.data!),
      error: (err) => {
        this.handleActionError(err);
        this.actionLoading.set(false);
      },
    });
  }

  heal() {
    if (this.actionLoading()) return;

    this.actionLoading.set(true);

    this.battleService.heal(this.battleId).subscribe({
      next: (response) => this.handleBattleUpdate(response.data!),
      error: (err) => {
        this.handleActionError(err);
        this.actionLoading.set(false);
      },
    });
  }

  restoreMana() {
    if (this.actionLoading()) return;

    this.actionLoading.set(true);

    this.battleService.restoreMana(this.battleId).subscribe({
      next: (response) => this.handleBattleUpdate(response.data!),
      error: (err) => {
        this.handleActionError(err);
        this.actionLoading.set(false);
      },
    });
  }

  forfeit() {
    if (this.actionLoading()) return;

    this.actionLoading.set(true);

    this.battleService.forfeitBattle(this.battleId).subscribe({
      next: (response) => this.handleBattleUpdate(response.data!),
      error: (err) => {
        this.handleActionError(err);
        this.actionLoading.set(false);
      },
    });
  }

  private handleBattleUpdate(action: BattleActionResponse) {
    this.battle.set(action.battle);

    const messages = [action.playerActionMessage, action.bossActionMessage, action.result].filter(
      Boolean,
    ) as string[];

    this.battleLog.set(messages.length ? messages : ['Battle Updated']);

    if (action.battleEnded) {
      this.battleResultModal.set(action);
      this.userService.getCurrentUser();
    }

    this.actionLoading.set(false);
  }

  private handleActionError(error: any) {
    const message = error?.error?.errors || error?.error?.message || 'Something went wrong.';

    this.toastService.error(message);
    this.actionLoading.set(false);
  }

  goToHistory() {

    this.router.navigate(['/game']);
  }
}
