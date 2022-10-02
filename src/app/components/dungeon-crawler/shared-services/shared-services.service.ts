import { Injectable } from '@angular/core';
import { Field } from '../../../types/types.service';

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
}
