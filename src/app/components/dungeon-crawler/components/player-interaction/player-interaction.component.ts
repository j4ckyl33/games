import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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

  constructor(private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.sharedService.fieldArray$.subscribe(generatedBoard => {
      this.board = generatedBoard
    })
  }


  ngOnChanges(changes: SimpleChanges) {
    this.currentField = this.sharedService.findCurrentField(this.board, this.currentPlayerField)
    console.log('onchanges')
    console.log(this.board)
    console.log(this.currentField)
  }

  emitSelectedClass(classSelected: CharacterClass): void {
    this.classSelection.emit(classSelected)
  }
}
