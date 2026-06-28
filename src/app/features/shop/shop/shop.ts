import { Component, computed, inject, signal } from '@angular/core';
import { CharacterService } from '../../../core/services/character.service';
import { CharacterResponse } from '../../../core/models/characters/character-response';
import { CharacterDetailModal } from '../../characters/character-detail-modal/character-detail-modal';
import { Toast } from '../../../core/services/toast';
import { User } from '../../../core/services/user';

@Component({
  selector: 'app-shop',
  imports: [CharacterDetailModal],
  templateUrl: './shop.html',
  styleUrl: './shop.scss',
})
export class Shop {
  private characterService = inject(CharacterService);
  private userService = inject(User);

  characters = signal<CharacterResponse[]>([]);
  myCharacters = signal<CharacterResponse[]>([]);
  selectedCharacter = signal<CharacterResponse | null>(null);

  loading = signal<boolean>(false);
  unlockingId = signal<string | null>(null);

  page = signal(0);
  size = signal(100);
  totalPages = signal(0);
  last = signal(false);

  toastService = inject(Toast)
  ownedCharacterIds = computed(
    () => new Set(this.myCharacters().map((character) => character.publicId)),
  );

  ngOnInit() {
    this.loadStore();
  }

  loadStore() {
    this.loading.set(true);

    this.characterService.getAllCharacters(this.page(), this.size()).subscribe({
      next: (response) => {
        this.characters.set(response.data?.content ?? []);
        this.totalPages.set(response.data?.totalPages ?? 0);
        this.last.set(response.data?.last ?? false);

        this.loadMyCharacters();
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  loadMyCharacters() {
    this.characterService.getMyCharacters(0, 100).subscribe({
      next: (response) => {
        this.myCharacters.set(response.data?.content ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  unlockCharacter(character: CharacterResponse) {
    if (this.ownedCharacterIds().has(character.publicId)) return;

    this.unlockingId.set(character.publicId);

    this.characterService.unlockCharacter(character.publicId).subscribe({
      next: (response) => {
        this.toastService.success(
          `${character.name} unlocked successfully`,
        )
        this.loadMyCharacters();
        this.unlockingId.set(null);
        this.userService.getCurrentUser();
      },
      error: (error) => {
        this.toastService.error(error.error?.errors ?? error.error?.message ?? 'Failed to unlock character.');
        this.unlockingId.set(null);
      },
    });
  }

  openDetails(character: CharacterResponse) {
    this.selectedCharacter.set(character);
  }

  closeDetails() {
    this.selectedCharacter.set(null);
  }

  previousPage() {
    if (this.page() === 0) return;

    this.page.update((value) => value - 1);
    this.loadStore();
  }

  nextPage() {
    if (this.last()) return;

    this.page.update((value) => value + 1);
    this.loadStore();
  }
}
