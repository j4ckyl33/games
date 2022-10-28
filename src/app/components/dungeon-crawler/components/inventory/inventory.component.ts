import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bag, Spell} from 'src/app/types/types.service';
import { DataGenerationServices } from '../../services/data-generation-service.service';

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

  constructor(private dataGenerationServices: DataGenerationServices) { }

  ngOnInit(): void {
    this.bag = this.dataGenerationServices.player.bag
  }

  showItemInformation(item: Bag){
    this.currentItem = item
    this.itemType = this.determineItemtype()
  }

  determineItemtype(): string {
    if('defense' in this.currentItem) { // Breastplate
      return 'Breastplate'
    }else if('attack' in this.currentItem) { // Weapon
      return 'Weapon'
    }else if('agility' in this.currentItem) { // Boots
      return 'Boots'
    }else if('wisdom' in this.currentItem) { // Magic Item
      return 'MagicItem'
    }else if('booststats' in this.currentItem){ // Consumable Item
      return 'ConsumableItem'
    }else{ // Spell
      return 'Spell'
    }
  }

  backClick(): void {
    this.currentItem = null
  }

  equip(): void {
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
  }

  showInteractionClick(): void {
    this.bagToggleChange.emit(false)
  }
}
