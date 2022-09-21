import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Character, CharacterClass, Field} from "../../../../types/types.service";

@Component({
  selector: 'player-interaction',
  templateUrl: './player-interaction.component.html',
  styleUrls: ['./player-interaction.component.css']
})
export class PlayerInteractionComponent implements OnInit {

  @Input() player: Character
  @Input() currentField: number
  @Input() fieldArray: Field[]
  @Output() classSelection = new EventEmitter<CharacterClass>()
  constructor() { }

  ngOnInit(): void {
  }

  emitSelectedClass(classSelected: CharacterClass): void {
    this.classSelection.emit(classSelected)
  }

  test(){
    console.log(this.fieldArray)
  }

}
