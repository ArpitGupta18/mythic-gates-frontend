import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { noOngoingBattleGuardGuard } from './no-ongoing-battle-guard-guard';

describe('noOngoingBattleGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => noOngoingBattleGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
