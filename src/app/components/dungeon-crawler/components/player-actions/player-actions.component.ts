import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Character, Field} from "../../../../types/types.service";
import {SharedServices} from "../../shared-services/shared-services.service";
import {DataGenerationServices} from "../../services/data-generation-service.service";

@Component({
  selector: 'player-actions',
  templateUrl: './player-actions.component.html',
  styleUrls: ['./player-actions.component.css']
})
export class PlayerActionsComponent {

  @Input() currentField: Field
  @Output() currentFieldChange = new EventEmitter <Field>()

  illegalRightMovementIndex: number[] = [7, 15, 23, 31, 39, 47, 55, 63]

  constructor(
    private sharedService: SharedServices,
    private dataGenerationServices: DataGenerationServices
  ) {}

  playerMovement(movement: string) {
    switch (movement) {
      case 'up':
        if( this.dataGenerationServices.player.currentField - 8  >= 0 ){
          this.dataGenerationServices.player.currentField  -= 8
          this.currentFieldChange.emit(this.sharedService.findCurrentField(this.dataGenerationServices.board,
            this.dataGenerationServices.player.currentField))
        }else{
          // Error
        }
        break
      case 'down':
        if( this.dataGenerationServices.player.currentField  + 8 <= 63){
          this.dataGenerationServices.player.currentField  += 8
          this.currentFieldChange.emit(this.sharedService.findCurrentField(this.dataGenerationServices.board,
            this.dataGenerationServices.player.currentField))
        }else{
          // Error
        }
        break
      case 'left':
        if( this.dataGenerationServices.player.currentField  % 8 !== 0){
          this.dataGenerationServices.player.currentField  -= 1
          this.currentFieldChange.emit(this.sharedService.findCurrentField(this.dataGenerationServices.board,
            this.dataGenerationServices.player.currentField))
        }else{
          // Error
        }
        break
      case 'right':
        if( !this.illegalRightMovementIndex.includes(this.dataGenerationServices.player.currentField )){
          this.dataGenerationServices.player.currentField  += 1
          this.currentFieldChange.emit(this.sharedService.findCurrentField(this.dataGenerationServices.board,
            this.dataGenerationServices.player.currentField))
        }else{
          // Error
        }
        break
    }
    this.currentField = this.sharedService.findCurrentField(this.dataGenerationServices.board, this.dataGenerationServices.player.currentField )
  }

  battleOptions(action: string){
    switch (action){
      case 'attack':
        console.log(this.dataGenerationServices.player.health)
        console.log(this.currentField.danger.enemy.health)
        this.currentField.danger.enemy.health -= this.battleLogic(this.dataGenerationServices.player,
          this.currentField.danger.enemy)
        break
    }
  }

  battleLogic(attacker: Character, defender: Character): number{
    let randomNumber = this.sharedService.getRandomNumber(0, 1000)
    //dodged only relevant till 1000 need to think about another solution
    if(defender.agility > randomNumber){
      return 0
    }
    return attacker.attack - defender.defense
  }
}
