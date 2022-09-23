import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Field} from "../../../../types/types.service";
import {SharedService} from "../../../../shared-services/shared-services.service";

@Component({
  selector: 'player-actions',
  templateUrl: './player-actions.component.html',
  styleUrls: ['./player-actions.component.css']
})
export class PlayerActionsComponent implements OnInit{

  @Input() currentPlayerField: number
  currentField: Field
  illegalRightIndex: number[] = [7, 15, 23, 31, 39, 47, 55, 63]
  board = []
  isEnemy: boolean = false

  constructor(private sharedService: SharedService) {

  }

  ngOnInit() {
    /*this.sharedService.fieldArray$.subscribe(generatedBoard => {
      this.board = generatedBoard
    })
    this.findCurrentField()*/
  }

  findCurrentField(): void {
    for(let i = 0; i < this.board.length; i++){
      for(let j = 0; j < this.board[i].length; j++){
        if(this.board[i][j].index === this.currentPlayerField){
          this.currentField = this.board[i][j]
          console.log(this.currentField)
          return
        }
      }
    }
  }

  playerMovement(movement: string) {
    switch (movement) {
      case 'up':
        if((this.currentPlayerField - 8) >= 0){
          this.currentPlayerField -= 8
          this.sharedService.chosenPlayerMovement(this.currentPlayerField)
        }else{
          // Error
        }
        break
      case 'down':
        if((this.currentPlayerField + 8) <= 63){
          this.currentPlayerField += 8
          this.sharedService.chosenPlayerMovement(this.currentPlayerField)
        }else{
          // Error
        }
        break
      case 'left':
        if( (this.currentPlayerField % 8) !== 0){
          this.currentPlayerField -= 1
          this.sharedService.chosenPlayerMovement(this.currentPlayerField)
        }else{
          // Error
        }
        break
      case 'right':
        if(!this.illegalRightIndex.includes(this.currentPlayerField)){
          this.currentPlayerField += 1
          this.sharedService.chosenPlayerMovement(this.currentPlayerField)
        }else{
          // Error
        }
        break
    }
    this.findCurrentField()
  }
}
