import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private playerMovement = new Subject<number>()
  constructor() { }

  getRandomNumber(min: number, max: number): number{
    return Math.floor(Math.random() * max) + min
  }

  playerMovement$ = this.playerMovement.asObservable();

  chosenPlayerMovement(direction: number) {
    this.playerMovement.next(direction);
  }
}
