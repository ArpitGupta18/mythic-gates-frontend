import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BossSelectPage } from './boss-select-page';

describe('BossSelectPage', () => {
  let component: BossSelectPage;
  let fixture: ComponentFixture<BossSelectPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BossSelectPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BossSelectPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
