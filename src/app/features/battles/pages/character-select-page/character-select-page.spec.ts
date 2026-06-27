import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSelectPage } from './character-select-page';

describe('CharacterSelectPage', () => {
  let component: CharacterSelectPage;
  let fixture: ComponentFixture<CharacterSelectPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterSelectPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterSelectPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
