import { Component, inject, signal } from '@angular/core';
import { CharacterService } from '../../../core/services/character.service';
import { CharacterResponse } from '../../../core/models/characters/character-response';

@Component({
  selector: 'app-character-list',
  imports: [],
  templateUrl: './character-list.html',
  styleUrl: './character-list.scss',
})
export class CharacterList {
  private characterService = inject(CharacterService);

  characters = signal<CharacterResponse[]>([]);

  page = signal(0);
  size = signal(3);
  totalPages = signal(0);
  totalElements = signal(0);
  last = signal(false);

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters(page = 0) {
    this.characterService.getCharacters(page, this.size()).subscribe({
      next: (response) => {
        const data = response.data!;

        this.characters.set(data.content);
        this.page.set(data.page);
        this.size.set(data.size);
        this.totalPages.set(data.totalPages);
        this.totalElements.set(data.totalElements);
        this.last.set(data.last);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  nextPage() {
    if (!this.last()) {
      this.loadCharacters(this.page() + 1);
    }
  }

  previousPage() {
    if (this.page() > 0) {
      this.loadCharacters(this.page() - 1);
    }
  }
}
