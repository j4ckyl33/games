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
      class: 'Barbarian',
      level: 1,
      health: this.sharedServices.getRandomNumber(10, 20),
      defense: this.sharedServices.getRandomNumber(0, 5),
      attack: this.sharedServices.getRandomNumber(10, 20),
      agility: this.sharedServices.getRandomNumber(0, 5),
      critical: this.sharedServices.getRandomNumber(0, 5),
      mana: this.sharedServices.getRandomNumber(0, 5),
      wisdom: this.sharedServices.getRandomNumber(0, 5),
      currentField: 0,
      nextField: null,
    }
  }

  ngOnInit(): void {
  }

  /*generateItem(character: Character): void {
    }
    generateEquipment():void{}
  */
}
