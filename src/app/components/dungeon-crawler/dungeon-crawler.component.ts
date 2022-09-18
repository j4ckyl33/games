import { Component, OnInit } from '@angular/core';
import {Character, CharacterClass, Field} from "../../types/types.service";
import {SharedService} from "../../shared-services/shared-services.service";

@Component({
  selector: 'dungeon-crawler',
  templateUrl: './dungeon-crawler.component.html',
  styleUrls: ['./dungeon-crawler.component.css']
})
export class DungeonCrawlerComponent implements OnInit {

  player: Character
  fieldArray = []

  constructor(private sharedServices: SharedService) {
    this.player = {
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
      nextField: null,
    }
  }

  ngOnInit(): void {
  }

  createPlayer(characterClass: CharacterClass): void {
    this.player = {
      name: 'testPlayer',
      class: characterClass,
      level: 1,
      health: this.sharedServices.getRandomNumber(10, 15),
      defense: this.sharedServices.getRandomNumber(0, 5),
      attack: this.sharedServices.getRandomNumber(10, 20),
      agility: this.sharedServices.getRandomNumber(0, 5),
      critical: this.sharedServices.getRandomNumber(0, 5),
      mana: this.sharedServices.getRandomNumber(0, 5),
      wisdom: this.sharedServices.getRandomNumber(0, 5),
      currentField: 0,
      nextField: null,
    }

    switch (characterClass){
      case "Assassin":
        this.player = {
          name: 'testPlayer',
          class: characterClass,
          level: 1,
          health: this.sharedServices.getRandomNumber(10, 15),
          defense: this.sharedServices.getRandomNumber(0, 5),
          attack: this.sharedServices.getRandomNumber(10, 20),
          agility: this.sharedServices.getRandomNumber(0, 5),
          critical: this.sharedServices.getRandomNumber(0, 5),
          mana: this.sharedServices.getRandomNumber(0, 5),
          wisdom: this.sharedServices.getRandomNumber(0, 5),
          currentField: 0,
          nextField: null,
        }
        break
      case "Barbarian":
        this.player = {
          name: 'testPlayer',
          class: characterClass,
          level: 1,
          health: this.sharedServices.getRandomNumber(10, 15),
          defense: this.sharedServices.getRandomNumber(0, 5),
          attack: this.sharedServices.getRandomNumber(10, 20),
          agility: this.sharedServices.getRandomNumber(0, 5),
          critical: this.sharedServices.getRandomNumber(0, 5),
          mana: this.sharedServices.getRandomNumber(0, 5),
          wisdom: this.sharedServices.getRandomNumber(0, 5),
          currentField: 0,
          nextField: null,
        }
        break
      case "Mage":
        this.player = {
          name: 'testPlayer',
          class: characterClass,
          level: 1,
          health: this.sharedServices.getRandomNumber(10, 15),
          defense: this.sharedServices.getRandomNumber(0, 5),
          attack: this.sharedServices.getRandomNumber(10, 20),
          agility: this.sharedServices.getRandomNumber(0, 5),
          critical: this.sharedServices.getRandomNumber(0, 5),
          mana: this.sharedServices.getRandomNumber(0, 5),
          wisdom: this.sharedServices.getRandomNumber(0, 5),
          currentField: 0,
          nextField: null,
        }
        break
      case "Warrior":
        this.player = {
          name: 'testPlayer',
          class: characterClass,
          level: 1,
          health: this.sharedServices.getRandomNumber(10, 15),
          defense: this.sharedServices.getRandomNumber(0, 5),
          attack: this.sharedServices.getRandomNumber(10, 20),
          agility: this.sharedServices.getRandomNumber(0, 5),
          critical: this.sharedServices.getRandomNumber(0, 5),
          mana: this.sharedServices.getRandomNumber(0, 5),
          wisdom: this.sharedServices.getRandomNumber(0, 5),
          currentField: 0,
          nextField: null,
        }
        break
    }
  }
  /*generateItem(character: Character): void {
    }
    generateEquipment():void{}
  */
}
