import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Character, CharacterInfo } from '../models/character.model';
import { CharacterAdapter } from '../adapters/character.adapter';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private readonly mainUrl: string = "https://rickandmortyapi.com/api/";
  private readonly charactersUrl: string = this.mainUrl + "character";

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<Character[]> {
    return this.http.get<CharacterInfo>(this.charactersUrl)
      .pipe(map(CharacterAdapter));
  }

  getCharactersInformation(url: string): Observable<Character> {
    return this.http.get<Character>(url);
  }
}
