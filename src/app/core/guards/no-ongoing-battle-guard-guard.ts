import { CanActivateFn, Router } from '@angular/router';
import { BattleService } from '../services/battle.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const noOngoingBattleGuardGuard: CanActivateFn = (route, state) => {
  const battleService = inject(BattleService);
  const router = inject(Router);

  return battleService.getOngoingBattle().pipe(
    map((response) => {
      router.navigate(['game/battles', response.data?.battleId]);

      return false;
    }),
    catchError((error) => {
      if (error.status === 404) {
        return of(true);
      }

      router.navigate(['game']);
      return of(false);
    }),
  );
};
