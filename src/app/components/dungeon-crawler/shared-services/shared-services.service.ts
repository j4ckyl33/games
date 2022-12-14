import { Injectable } from '@angular/core';
import {Bag, Field} from '../../../types/types.service';
import {DataGenerationServices} from "../services/data-generation-service.service";

@Injectable({
  providedIn: 'root',
})
export class SharedServices {
  constructor() {}

  findCurrentField(board: any[], currentPlayerField: number): Field {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].index === currentPlayerField) {
          return board[i][j];
        }
      }
    }
    return null;
  }

  getRandomNumber(min: number, max: number): number {
    min = Math.floor(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * max) + min;
  }

  determineItemtype(item: Bag): string {
    if('defense' in item) { // Breastplate
      return 'breastplate'
    }else if('attack' in item) { // Weapon
      return 'weapon'
    }else if('agility' in item) { // Boots
      return 'boots'
    }else if('wisdom' in item) { // Magic Item
      return 'magicItem'
    }else if('booststats' in item){ // Consumable Item
      return 'consumableItem'
    }else{ // Spell
      return 'spell'
    }
  }
}
