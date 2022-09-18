import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Character, CharacterClass} from "../../../../types/types.service";

@Component({
  selector: 'player-creation',
  templateUrl: './player-creation.component.html',
  styleUrls: ['./player-creation.component.css']
})
export class PlayerCreationComponent implements OnInit {

  @Output() classSelection = new EventEmitter<CharacterClass>()

  constructor() { }

  ngOnInit(): void {
  }

  selectClass(characterClass: CharacterClass) {
    this.classSelection.emit(characterClass)
  }
}
