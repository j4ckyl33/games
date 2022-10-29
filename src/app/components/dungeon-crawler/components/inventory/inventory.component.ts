import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bag, Spell} from 'src/app/types/types.service';
import { DataGenerationServices } from '../../services/data-generation-service.service';
import {SharedServices} from "../../shared-services/shared-services.service";

@Component({
  selector: 'inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  bag: Bag[]
  currentItem: Bag = null
  itemType: string
  @Input() bagToggle: boolean
  @Output() bagToggleChange = new EventEmitter <boolean>()
  @Output() spellToggleChange = new EventEmitter <boolean>()

  constructor(
    private dataGenerationServices: DataGenerationServices,
    private sharedServices: SharedServices
  ) { }

  ngOnInit(): void {
    this.bag = this.dataGenerationServices.player.bag
  }

  showItemInformation(item: Bag){
    this.currentItem = item
    this.itemType = this.sharedServices.determineItemtype(this.currentItem)
  }



  backClick(): void {
    this.currentItem = null
  }

  itemEquip(): void {
    if('defense' in this.currentItem) { // Breastplate
      if(this.dataGenerationServices.player.equipment.breastplate !== undefined){
        this.dataGenerationServices.player.bag.push(this.dataGenerationServices.player.equipment.breastplate)
      }
      this.dataGenerationServices.player.equipment.breastplate = this.currentItem
    }else if('attack' in this.currentItem) { // Weapon
      if(this.dataGenerationServices.player.equipment.weapon !== undefined){
        this.dataGenerationServices.player.bag.push(this.dataGenerationServices.player.equipment.weapon)
      }
      this.dataGenerationServices.player.equipment.weapon = this.currentItem
    }else if('agility' in this.currentItem) { // Boots
      if(this.dataGenerationServices.player.equipment.boots !== undefined){
        this.dataGenerationServices.player.bag.push(this.dataGenerationServices.player.equipment.boots)
      }
      this.dataGenerationServices.player.equipment.boots = this.currentItem
    }else if('wisdom' in this.currentItem) { // Magic Item
      if(this.dataGenerationServices.player.equipment.magicItem !== undefined){
        this.dataGenerationServices.player.bag.push(this.dataGenerationServices.player.equipment.magicItem)
      }
      this.dataGenerationServices.player.equipment.magicItem = this.currentItem
    }
    console.log(this.dataGenerationServices.player.equipment)
    this.backClick()
  }

  useConsumable(): void {
    let stats = ['health', 'defense', 'attack', 'agility', 'critical', 'mana', 'wisdom']
    let chosenStat = stats[this.sharedServices.getRandomNumber(0, 6)]
    if(!('booststats' in this.currentItem)){return}
    this.dataGenerationServices.player.health += this.currentItem.heal
    this.dataGenerationServices.player[chosenStat] += this.currentItem.booststats
    if(chosenStat === 'health'){
      this.dataGenerationServices.playerFullHealth += this.currentItem.booststats
    }
  }

  spellEquip() {}

  showInteractionClick(): void {
    this.bagToggleChange.emit(false)
  }
}
