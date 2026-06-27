import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleHistoryRow } from './battle-history-row';

describe('BattleHistoryRow', () => {
  let component: BattleHistoryRow;
  let fixture: ComponentFixture<BattleHistoryRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleHistoryRow],
    }).compileComponents();

    fixture = TestBed.createComponent(BattleHistoryRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
