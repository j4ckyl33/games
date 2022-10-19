import { Component, OnInit } from '@angular/core';
import { Bag } from 'src/app/types/types.service';
import { DataGenerationServices } from '../../services/data-generation-service.service';

@Component({
  selector: 'inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  bag: Bag[]
  currentItem: Bag = null

  constructor(private dataGenerationServices: DataGenerationServices) { }

  ngOnInit(): void {
    this.bag = this.dataGenerationServices.player.bag
    console.log(this.dataGenerationServices.player.bag)
  }

  showItemInformation(item: Bag){
    this.currentItem = item
  }
}
