import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Field} from "../../../../types/types.service";
import {SharedService} from "../../../../shared-services/shared-services.service";

@Component({
  selector: 'player-actions',
  templateUrl: './player-actions.component.html',
  styleUrls: ['./player-actions.component.css']
})
export class PlayerActionsComponent implements OnInit {

  @Input() currentField: number
  illegalRightIndex: number[] = [7, 15, 23, 31, 39, 47, 55, 63]
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  playerMovement(movement: string){
    switch (movement) {
      case 'up':
        if((this.currentField - 8) >= 0){
          this.currentField -= 8
          this.sharedService.chosenPlayerMovement(this.currentField)
        }else{
          // Error
        }
        break
      case 'down':
        if((this.currentField + 8) <= 63){
          this.currentField += 8
          this.sharedService.chosenPlayerMovement(this.currentField)
        }else{
          // Error
        }
        break
      case 'left':
        if( (this.currentField % 8) !== 0){
          this.currentField -= 1
          this.sharedService.chosenPlayerMovement(this.currentField)
        }else{
          // Error
        }
        break
      case 'right':
        if(!this.illegalRightIndex.includes(this.currentField)){
          this.currentField += 1
          this.sharedService.chosenPlayerMovement(this.currentField)
        }else{
          // Error
        }
        break
    }
  }
}
