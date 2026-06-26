import { Component, input, output } from '@angular/core';
import { CharacterResponse } from '../../../core/models/characters/character-response';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-character-card',
  imports: [NgOptimizedImage],
  templateUrl: './character-card.html',
  styleUrl: './character-card.scss',
})
export class CharacterCard {
  character = input.required<CharacterResponse>();

  viewDetails = output<CharacterResponse>();

  onViewDetails() {
    this.viewDetails.emit(this.character())
  }
}
