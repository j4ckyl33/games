import {EventEmitter, Injectable} from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import {Character} from "../../../types/types.service";
import {SharedServices} from "../shared-services/shared-services.service";

@Injectable({
  providedIn: 'root'
})
export class DataGenerationServices {

  player: Character
  board = []
  floor = 1
  nextLevel = false
  resetBoard$ = new BehaviorSubject(false)
  playerFullHealth: number

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
      bag: [],
      equipment: {},
    }
  }

}
