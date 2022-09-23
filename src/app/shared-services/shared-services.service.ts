import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Field} from "../types/types.service";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private playerMovement = new BehaviorSubject<number>(-1)
  private fieldArray = new BehaviorSubject<Field[]>([])
  constructor() { }



  playerMovement$ = this.playerMovement.asObservable();
  fieldArray$ = this.fieldArray.asObservable();

  chosenPlayerMovement(direction: number) {
    this.playerMovement.next(direction)
  }

  initializedFieldArray(initializedFields: Field[]){
    this.fieldArray.next(initializedFields)
  }

  getRandomNumber(min: number, max: number): number{
    return Math.floor(Math.random() * max) + min
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
}
