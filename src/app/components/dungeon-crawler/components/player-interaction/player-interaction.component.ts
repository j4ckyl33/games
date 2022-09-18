import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Character, CharacterClass} from "../../../../types/types.service";

@Component({
  selector: 'player-interaction',
  templateUrl: './player-interaction.component.html',
  styleUrls: ['./player-interaction.component.css']
})
export class PlayerInteractionComponent implements OnInit {

  @Input() player: Character
  @Output() classSelection = new EventEmitter<CharacterClass>()
  constructor() { }

  ngOnInit(): void {
  }

  emitSelectedClass(classSelected: CharacterClass): void {
    this.classSelection.emit(classSelected)
  }
}
