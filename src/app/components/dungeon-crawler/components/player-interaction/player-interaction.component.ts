import {Component} from '@angular/core';
import {Field} from "../../../../types/types.service";
import {DataGenerationServices} from "../../services/data-generation-service.service";

@Component({
  selector: 'player-interaction',
  templateUrl: './player-interaction.component.html',
  styleUrls: ['./player-interaction.component.css']
})
export class PlayerInteractionComponent {

  currentField: Field

  constructor(public dataGenerationServices: DataGenerationServices) {}

  ngOnInit() {

  }

}
