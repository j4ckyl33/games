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
    let tempField: Field

    switch (movement) {
      case 'up':
        if( this.dataGenerationServices.player.currentField - 8  >= 0 ){
          this.dataGenerationServices.player.currentField  -= 8
          tempField = this.sharedService.findCurrentField(this.dataGenerationServices.board,
            this.dataGenerationServices.player.currentField)
          tempField.visited = true
          this.currentFieldChange.emit(tempField)
        }else{
          // Error
        }
        break
      case 'down':
        if( this.dataGenerationServices.player.currentField  + 8 <= 63){
          this.dataGenerationServices.player.currentField  += 8
          tempField = this.sharedService.findCurrentField(this.dataGenerationServices.board,
            this.dataGenerationServices.player.currentField)
          tempField.visited = true
          this.currentFieldChange.emit(tempField)
        }else{
          // Error
        }
        break
      case 'left':
        if( this.dataGenerationServices.player.currentField  % 8 !== 0){
          this.dataGenerationServices.player.currentField  -= 1
          tempField = this.sharedService.findCurrentField(this.dataGenerationServices.board,
            this.dataGenerationServices.player.currentField)
          tempField.visited = true
          this.currentFieldChange.emit(tempField)
        }else{
          // Error
        }
        break
      case 'right':
        if( !this.illegalRightMovementIndex.includes(this.dataGenerationServices.player.currentField )){
          this.dataGenerationServices.player.currentField  += 1
          tempField = this.sharedService.findCurrentField(this.dataGenerationServices.board,
            this.dataGenerationServices.player.currentField)
          tempField.visited = true
          this.currentFieldChange.emit(tempField)

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
        if(this.currentField.danger.enemy.agility > this.dataGenerationServices.player.agility){
          //Enemy Attack
          this.dataGenerationServices.player.health -= this.battleLogic(this.currentField.danger.enemy,
            this.dataGenerationServices.player)
          if(this.dataGenerationServices.player.health <= 0) {break}
          //Player Attack
          this.currentField.danger.enemy.health -= this.battleLogic(this.dataGenerationServices.player,
            this.currentField.danger.enemy)
        }else{
          //Player Attack
          this.currentField.danger.enemy.health -= this.battleLogic(this.dataGenerationServices.player,
            this.currentField.danger.enemy)
          if(this.currentField.danger.enemy.health <= 0) {break}
          //Enemy Attack
          this.dataGenerationServices.player.health -= this.battleLogic(this.currentField.danger.enemy,
            this.dataGenerationServices.player)
        }

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
