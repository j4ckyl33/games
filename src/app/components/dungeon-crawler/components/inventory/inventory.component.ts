import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bag, Field, Spell} from 'src/app/types/types.service';
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
    }else { // Spell
      return 'Spell'
    }
  }

  backClick(): void {
    this.currentItem = null
  }

  showInteractionClick(): void {
    this.bagToggleChange.emit(true)
  }
}
