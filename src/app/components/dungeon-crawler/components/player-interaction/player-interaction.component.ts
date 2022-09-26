import {Component} from '@angular/core';
import {Field} from "../../../../types/types.service";
import {DataGenerationServices} from "../../services/data-generation-service.service";

@Component({
  selector: 'player-interaction',
  templateUrl: './player-interaction.component.html',
  styleUrls: ['./player-interaction.component.css']
})
export class PlayerInteractionComponent {

  currentField: Field

  constructor(public dataGenerationServices: DataGenerationServices) {}

  resetCharacter(): void {
    this.dataGenerationServices.player = {
      name: 'testPlayer',
      class: 'NoClass',
      level: 1,
      health: 0,
      defense: 0,
      attack: 0,
      agility: 0,
      critical: 0,
      mana: 0,
      wisdom: 0,
      currentField: 0,
    }
  }
}
