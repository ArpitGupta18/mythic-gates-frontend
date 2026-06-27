import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BossDetailModal } from './boss-detail-modal';

describe('BossDetailModal', () => {
  let component: BossDetailModal;
  let fixture: ComponentFixture<BossDetailModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BossDetailModal],
    }).compileComponents();

    fixture = TestBed.createComponent(BossDetailModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
