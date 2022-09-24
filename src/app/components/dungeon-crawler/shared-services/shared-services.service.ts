import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Field} from "../../../types/types.service";

@Injectable({
  providedIn: 'root'
})
export class SharedServices {
  private playerMovement = new BehaviorSubject<number>(-1)
  constructor() { }

  playerMovement$ = this.playerMovement.asObservable();

  chosenPlayerMovement(direction: number) {
    this.playerMovement.next(direction)
  }

  findCurrentField(board: any[], currentPlayerField: number): Field {
    for(let i = 0; i < board.length; i++){
      for(let j = 0; j < board[i].length; j++){
        if(board[i][j].index === currentPlayerField){
          return board[i][j]
        }
      }
    }
    return null
  }

  getRandomNumber(min: number, max: number): number{
    return Math.floor(Math.random() * max) + min
  }
}
