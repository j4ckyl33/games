import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Character, CharacterClass, Field} from "../../../../types/types.service";
import {SharedService} from "../../../../shared-services/shared-services.service";

@Component({
  selector: 'player-interaction',
  templateUrl: './player-interaction.component.html',
  styleUrls: ['./player-interaction.component.css']
})
export class PlayerInteractionComponent implements OnInit {

  @Input() player: Character
  @Input() currentPlayerField: number
  @Output() classSelection = new EventEmitter<CharacterClass>()
  currentField: Field
  board = []

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.fieldArray$.subscribe(generatedBoard => {
      this.board = generatedBoard
    })
    this.findCurrentField()
    console.log(this.currentField)
  }

  /*ngOnChanges(changes: SimpleChanges) {
    this.findCurrentField()
    console.log('onchanges')
    console.log(this.currentField)
  }*/

  emitSelectedClass(classSelected: CharacterClass): void {
    this.classSelection.emit(classSelected)
  }

  findCurrentField(): void {
    for(let i = 0; i < this.board.length; i++){
      for(let j = 0; j < this.board[i].length; j++){
        if(this.board[i][j].index === this.currentPlayerField){
          this.currentField = this.board[i][j]
          return
        }
      }
    }
  }
}
