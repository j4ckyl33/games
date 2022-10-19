import {Component} from '@angular/core';
import {Boots, Breastplate, ConsumableItem, Field, MagicItem, Spell, Weapon} from "../../../../types/types.service";
import {DataGenerationServices} from "../../services/data-generation-service.service";

@Component({
  selector: 'player-interaction',
  templateUrl: './player-interaction.component.html',
  styleUrls: ['./player-interaction.component.css']
})
export class PlayerInteractionComponent {

  currentField: Field
  reward: Breastplate | Weapon | Boots | MagicItem | ConsumableItem | Spell

  constructor(public dataGenerationServices: DataGenerationServices) {
    this.reward = <Breastplate | Weapon | Boots | MagicItem | ConsumableItem | Spell>{}
    console.log(this.dataGenerationServices.board)  
  }

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
      bag: [],
      equipment: {},
    }
    this.currentField = null
  }

  currentFieldChange(event: any): void {
    this.currentField = event
    if(this.currentField.end === true){
      this.dataGenerationServices.resetBoard$.next(true)
    }
    this.reward = <Breastplate | Weapon | Boots | MagicItem | ConsumableItem | Spell>{}
    if(this.currentField.reward === null) { return }
    this.reward = this.currentField.reward
    this.dataGenerationServices.player.bag.push(this.currentField.reward)
    console.log(this.dataGenerationServices.player.bag)
    this.currentField.reward = null;
  } 

  isRewardEmpty(): boolean {
    if(Object.keys(this.reward).length === 0) {
      return false
    }
    return true
  }
}
