import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDetailModal } from './character-detail-modal';

describe('CharacterDetailModal', () => {
  let component: CharacterDetailModal;
  let fixture: ComponentFixture<CharacterDetailModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterDetailModal],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterDetailModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
