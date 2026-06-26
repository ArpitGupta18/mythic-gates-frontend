import { Component, inject, input, output, signal } from '@angular/core';
import { CharacterResponse } from '../../../core/models/characters/character-response';
import { SkillService } from '../../../core/services/skill.service';
import { SkillResponse } from '../../../core/models/skills/skill-response';
import { catchError, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-character-detail-modal',
  imports: [],
  templateUrl: './character-detail-modal.html',
  styleUrl: './character-detail-modal.scss',
})
export class CharacterDetailModal {
  skillService = inject(SkillService);
  character = input.required<CharacterResponse>();

  close = output<void>();

  skills = signal<SkillResponse[]>([]);
  loadingSkills = signal<boolean>(false);

  ngOnInit() {
    this.loadSkills();
  }

  onClose() {
    this.close.emit();
  }

  loadSkills() {
    this.loadingSkills.set(true);

    this.skillService
      .getCharacterSkills(this.character().publicId)
      .pipe(
        tap((response) => {
          this.skills.set(response.data ?? []);
        }),
        finalize(() => {
          this.loadingSkills.set(false);
        }),
      )
      .subscribe({
        error: (err) => console.error(err),
      });
  }
}
