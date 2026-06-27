import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleGamePage } from './battle-game-page';

describe('BattleGamePage', () => {
  let component: BattleGamePage;
  let fixture: ComponentFixture<BattleGamePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleGamePage],
    }).compileComponents();

    fixture = TestBed.createComponent(BattleGamePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
