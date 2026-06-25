import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Battles } from './battles';

describe('Battles', () => {
  let component: Battles;
  let fixture: ComponentFixture<Battles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Battles],
    }).compileComponents();

    fixture = TestBed.createComponent(Battles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
