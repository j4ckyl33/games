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
      bag: {
        spells: [<Spell>{}],
        item: [<ConsumableItem>{}],
        breastplate: [<Breastplate>{}],
        weapon: [<Weapon>{}],
        boots: [<Boots>{}],
        magicItems: [<MagicItem>{}]
      },
      equipment: {},
    }
    this.currentField = null
  }

  currentFieldChange(event: any): void {
    this.currentField = event
    this.reward = <Breastplate | Weapon | Boots | MagicItem | ConsumableItem | Spell>{}
    if(this.currentField?.reward === null) { return }
    this.reward = this.currentField.reward

    if('defense' in this.currentField.reward) { // Breastplate
    }else if('attack' in this.currentField.reward) { // Weapon
      this.dataGenerationServices.player.bag.weapon.push(this.currentField.reward)
    }else if('agility' in this.currentField.reward) { // Boots
      this.dataGenerationServices.player.bag.boots.push(this.currentField.reward)
    }else if('wisdom' in this.currentField.reward) { // Magic Item
      this.dataGenerationServices.player.bag.magicItems.push(this.currentField.reward)
    }else if(('mana' in this.currentField.reward && 'damage' in this.currentField.reward) || 
              ('mana' in this.currentField.reward && 'heal' in this.currentField.reward)
            ) { // Spell
      this.dataGenerationServices.player.bag.spells.push(this.currentField.reward)
    }else{ // Consumable Item
      this.dataGenerationServices.player.bag.item.push(this.currentField.reward)
    }

     /* for (let i = 0; i < this.dataGenerationServices.board.length; i++) {
      for (let j = 0; j < this.dataGenerationServices.board[i].length; j++) {
        if (this.dataGenerationServices.board[i][j].index === this.currentField.index) {
          this.currentField.reward = null;
        }
      }
    } */
    this.currentField.reward = null;
    console.log(this.dataGenerationServices.board)
    console.log(this.dataGenerationServices.player)
  } 

  isRewardEmpty(): boolean {
    if(Object.keys(this.reward).length === 0) {
      return false
    }
    return true
  }
}
