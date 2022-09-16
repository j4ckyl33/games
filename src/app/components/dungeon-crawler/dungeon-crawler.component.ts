import { Component, OnInit } from '@angular/core';
import {Character, Field} from "../../types/types.service";
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
      health: this.sharedServices.getRandomNumber(10, 20),
      defense: this.sharedServices.getRandomNumber(0, 5),
      attack: this.sharedServices.getRandomNumber(10, 20),
      agility: this.sharedServices.getRandomNumber(0, 5),
      critical: this.sharedServices.getRandomNumber(0, 5),
      currentField: 0,
      nextField: null,
      item: null
    }
    this.generateFields()
  }

  ngOnInit(): void {
  }

  generateDanger(currField: Field, character: Character, bossExist: boolean): void {
    let randNumber = this.sharedServices.getRandomNumber(0, 100)
    let damage = this.sharedServices.getRandomNumber(0, character.health / 3)
    if(randNumber > 0 && randNumber < 25){
      currField.danger = {
        trap: damage,
        enemy: null,
      }
    }else if(randNumber === 1 && !bossExist) {
      this.generateEnemy(currField, character, bossExist)
    }else{
      this.generateEnemy(currField, character, bossExist)
    }
  }

  generateItem(character: Character): void {
  }

  generateEnemy(currField: Field, character: Character, boss: boolean): void {
    let randNumber = this.sharedServices.getRandomNumber(0, 2)
    if(!boss){
      currField.danger = {
        trap: null,
        enemy: {
          health: this.sharedServices.getRandomNumber(character.health, character.health * 2),
          defense: this.sharedServices.getRandomNumber(character.defense, character.defense * 1.5),
          attack: this.sharedServices.getRandomNumber(character.attack, character.attack * 1.5),
          agility: this.sharedServices.getRandomNumber(0, character.agility / 2),
          critical: this.sharedServices.getRandomNumber(0, character.critical / 2),
          currentField: null,
          nextField: null,
          item: null
        }
      }
      this.generateItem(character)
    }else{
      currField.danger = {
        trap: null,
        enemy: {
          health: this.sharedServices.getRandomNumber(1, character.health / 2),
          defense: this.sharedServices.getRandomNumber(1, character.defense / 2),
          attack: this.sharedServices.getRandomNumber(1, character.attack / 2),
          agility: this.sharedServices.getRandomNumber(1, character.agility / 2),
          critical: this.sharedServices.getRandomNumber(1 , character.critical / 2),
          currentField: null,
          nextField: null,
          item: null
        }
      }
      if(randNumber === 0 && !boss){
        this.generateItem(character)
      }
    }

  }

  generateFields(): void {
    let counter = 0
    let bossExist = false
    for(let i = 0; i < 8; i++){
      let tempArray = []
      for(let j = 0; j < 8; j++){
        //fill the field property
        let field: Field = <Field>{}
        let randNumber = this.sharedServices.getRandomNumber(0, 100)
        // Generates possible Danger
        if(randNumber >= 0 && randNumber < 25){
          this.generateDanger(field, this.player, bossExist)
        }else if(randNumber >= 25 && randNumber < 50){ // Generate Items
          this.generateItem(this.player)
        }else{ // Generate Nothing
          field.danger = null
          field.reward = null
        }
        field.index = counter
        field.visited = false
        tempArray.push(field)
        counter++
      }
      this.fieldArray.push(tempArray)
      console.log(this.fieldArray)
    }
  }

}
