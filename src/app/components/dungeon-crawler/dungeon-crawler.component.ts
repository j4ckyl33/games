import { Component, OnInit } from '@angular/core';
import {Field} from "../../types/types.service";

@Component({
  selector: 'dungeon-crawler',
  templateUrl: './dungeon-crawler.component.html',
  styleUrls: ['./dungeon-crawler.component.css']
})
export class DungeonCrawlerComponent implements OnInit {

  field: Field | undefined
  fieldArray = []

  constructor() {
    this.generateFields()
  }

  ngOnInit(): void {
  }

  generateFields(): void{
    let tempArray: string[]
    let counter = 0
    for(let i = 0; i < 9; i++){
      tempArray = []
      for(let j = 0; j < 9; j++){
        tempArray.push('test' + counter)
        counter++
      }
      this.fieldArray.push(tempArray)
    }
  }

}
