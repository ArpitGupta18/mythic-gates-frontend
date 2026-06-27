import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleDetailModal } from './battle-detail-modal';

describe('BattleDetailModal', () => {
  let component: BattleDetailModal;
  let fixture: ComponentFixture<BattleDetailModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleDetailModal],
    }).compileComponents();

    fixture = TestBed.createComponent(BattleDetailModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
