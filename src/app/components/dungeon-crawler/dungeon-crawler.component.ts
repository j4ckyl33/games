import {Component} from '@angular/core';
import {Character} from "../../types/types.service";
import {DataGenerationServices} from "./services/data-generation-service.service";

@Component({
  selector: 'dungeon-crawler',
  templateUrl: './dungeon-crawler.component.html',
  styleUrls: ['./dungeon-crawler.component.css']
})
export class DungeonCrawlerComponent {

  player: Character

  constructor(public dataGenerationServices: DataGenerationServices) {

  }


  /*generateItem(character: Character): void {
    }
    generateEquipment():void{}
  */
}
