import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleLoadingPage } from './battle-loading-page';

describe('BattleLoadingPage', () => {
  let component: BattleLoadingPage;
  let fixture: ComponentFixture<BattleLoadingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleLoadingPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BattleLoadingPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
