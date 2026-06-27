import { Component, inject, OnInit, signal } from '@angular/core';
import { CharacterService } from '../../../core/services/character.service';
import { CharacterResponse } from '../../../core/models/characters/character-response';
import { NgOptimizedImage } from '@angular/common';
import { CharacterCard } from '../character-card/character-card';
import { CharacterDetailModal } from '../character-detail-modal/character-detail-modal';

@Component({
  selector: 'app-character-list',
  imports: [NgOptimizedImage, CharacterCard, CharacterDetailModal],
  templateUrl: './character-list.html',
  styleUrl: './character-list.scss',
})
export class CharacterList implements OnInit {
  private characterService = inject(CharacterService);

  characters = signal<CharacterResponse[]>([]);

  page = signal(0);
  size = signal(5);
  totalPages = signal(0);
  totalElements = signal(0);
  last = signal(false);

  selectedCharacter = signal<CharacterResponse | null>(null);

  ngOnInit() {
    this.loadCharacters(0);
  }

  loadCharacters(page: number) {
    this.characterService.getMyCharacters(page, this.size()).subscribe({
      next: (response) => {
        const data = response.data!;

        console.log(response.data);
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

  openDetails(character: CharacterResponse) {
    console.log("Open details triggered", character);
    this.selectedCharacter.set(character);
  }

  closeDetails() {
    this.selectedCharacter.set(null);
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
