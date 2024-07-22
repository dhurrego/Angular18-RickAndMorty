import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { AsyncPipe } from '@angular/common';
import { firstValueFrom, Observable } from 'rxjs';
import { Character } from '../../models/character.model';
import { CharacterCardComponent } from "./components/character-card/character-card.component";

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [AsyncPipe, CharacterCardComponent],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContainerComponent {
  private characterService: CharactersService = inject(CharactersService);
  characterInfo: Record<string, Character> = {};
  characters$: Observable<Character[]> = this.characterService.getCharacters();

  async makeApiCall(url: string): Promise<void> {
    let character = await firstValueFrom(this.characterService.getCharactersInformation(url))

    this.characterInfo[character.id] = character;
  }
}
