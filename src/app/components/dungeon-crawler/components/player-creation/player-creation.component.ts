import { Component } from '@angular/core';
import { CharacterClass } from "../../../../types/types.service";
import { DataGenerationServices } from "../../services/data-generation-service.service";
import { SharedServices } from "../../shared-services/shared-services.service";

@Component({
  selector: 'player-creation',
  templateUrl: './player-creation.component.html',
  styleUrls: ['./player-creation.component.css']
})
export class PlayerCreationComponent {

  constructor(private sharedServices: SharedServices,
              public dataGenerationServices: DataGenerationServices) { }


  selectClass(characterClass: CharacterClass) {
    this.createPlayer(characterClass)
  }

  createPlayer(characterClass: CharacterClass): void {
    this.dataGenerationServices.player = {
      name: 'testPlayer',
      class: characterClass,
      level: 1,
      health: this.sharedServices.getRandomNumber(10, 15),
      defense: this.sharedServices.getRandomNumber(1, 5),
      attack: this.sharedServices.getRandomNumber(10, 20),
      agility: this.sharedServices.getRandomNumber(1, 5),
      critical: this.sharedServices.getRandomNumber(1, 5),
      mana: this.sharedServices.getRandomNumber(1, 5),
      wisdom: this.sharedServices.getRandomNumber(1, 5),
      bag: {},
      equipment: {},
      currentField: 0,
    }

    switch (characterClass){
      case "Assassin":
        this.dataGenerationServices.player = {
          name: 'testPlayer',
          class: characterClass,
          level: 1,
          health: this.sharedServices.getRandomNumber(10, 15),
          defense: this.sharedServices.getRandomNumber(1, 5),
          attack: this.sharedServices.getRandomNumber(5, 10),
          agility: this.sharedServices.getRandomNumber(1, 5),
          critical: this.sharedServices.getRandomNumber(1, 5),
          mana: this.sharedServices.getRandomNumber(1, 5),
          wisdom: this.sharedServices.getRandomNumber(1, 5),
          bag: {},
          equipment: {},
          currentField: 0,
        }
        break
      case "Barbarian":
        this.dataGenerationServices.player = {
          name: 'testPlayer',
          class: characterClass,
          level: 1,
          health: this.sharedServices.getRandomNumber(10, 15),
          defense: this.sharedServices.getRandomNumber(1, 5),
          attack: this.sharedServices.getRandomNumber(5, 10),
          agility: this.sharedServices.getRandomNumber(1, 5),
          critical: this.sharedServices.getRandomNumber(1, 5),
          mana: this.sharedServices.getRandomNumber(1, 5),
          wisdom: this.sharedServices.getRandomNumber(1, 5),
          bag: {},
          equipment: {},
          currentField: 0,
        }
        break
      case "Mage":
        this.dataGenerationServices.player = {
          name: 'testPlayer',
          class: characterClass,
          level: 1,
          health: this.sharedServices.getRandomNumber(10, 15),
          defense: this.sharedServices.getRandomNumber(1, 5),
          attack: this.sharedServices.getRandomNumber(5, 10),
          agility: this.sharedServices.getRandomNumber(1, 5),
          critical: this.sharedServices.getRandomNumber(1, 5),
          mana: this.sharedServices.getRandomNumber(1, 5),
          wisdom: this.sharedServices.getRandomNumber(1, 5),
          bag: {},
          equipment: {},
          currentField: 0,
        }
        break
      case "Warrior":
        this.dataGenerationServices.player = {
          name: 'testPlayer',
          class: characterClass,
          level: 1,
          health: this.sharedServices.getRandomNumber(10, 15),
          defense: this.sharedServices.getRandomNumber(1, 5),
          attack: this.sharedServices.getRandomNumber(5, 10),
          agility: this.sharedServices.getRandomNumber(1, 5),
          critical: this.sharedServices.getRandomNumber(1, 5),
          mana: this.sharedServices.getRandomNumber(1, 5),
          wisdom: this.sharedServices.getRandomNumber(1, 5),
          bag: {},
          equipment: {},
          currentField: 0,
        }
        break
    }
  }
}
