import {Injectable, OnInit} from '@angular/core';
import {Character, CharacterClass, Field} from "../../../types/types.service";
import {SharedServices} from "../shared-services/shared-services.service";




@Injectable({
  providedIn: 'root'
})
export class DataGenerationServices {

  player: Character
  board = []

  constructor(private sharedServices: SharedServices) {
    this.player = {
      name: 'testPlayer',
      class: 'NoClass',
      level: 1,
      health: 0,
      defense: 0,
      attack: 0,
      agility: 0,
      critical: 0,
      mana: 0,
      wisdom: 0,
      currentField: 0,
    }
  }

}
