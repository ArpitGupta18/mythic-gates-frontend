import { Component, inject, OnInit, signal } from '@angular/core';
import { CharacterService } from '../../../../core/services/character.service';
import { Router } from '@angular/router';
import { CharacterResponse } from '../../../../core/models/characters/character-response';

@Component({
  selector: 'app-character-select-page',
  imports: [],
  templateUrl: './character-select-page.html',
  styleUrl: './character-select-page.scss',
})
export class CharacterSelectPage implements OnInit {
  private characterService = inject(CharacterService);
  private router = inject(Router);

  characters = signal<CharacterResponse[]>([]);
  loading = signal<boolean>(false);

  page = signal(0);
  size = signal(100);

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.loading.set(true);

    this.characterService.getMyCharacters(this.page(), this.size()).subscribe({
      next: (response) => {
        this.characters.set(response.data?.content ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  selectCharacter(characterId: string) {
    this.router.navigate(['game/battle/start/bosses', characterId]);
  }

  selectRandomCharacter() {
    const characters = this.characters();

    if (!characters.length) return;

    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomCharacter = characters[randomIndex];

    this.selectCharacter(randomCharacter.publicId);
  }
}
