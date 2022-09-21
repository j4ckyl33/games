import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Character, CharacterClass, Field} from "../../../../types/types.service";
import {SharedService} from "../../../../shared-services/shared-services.service";

const enemyNames: string[] = ['Reckless Branch', 'Bright Hornet', 'Focused Blossom', 'Honored Sunlight',
  'Leaping Edge', 'Majestic Magpie', 'Pouncing Thorn', 'Nimble Meteor', 'Living Bug', 'Flying Blow',
  'Dark Fox', 'Golden Dust', 'Honored Scorpion', 'Crazed Elephant', 'Reckless Fire', 'Punching Bane',
  'Spring Soul', 'Hidden Illusion', 'Summer Surge', 'Last Blizzard', 'Clouded Wraiths', 'Shocking Wraiths',
  'Hell Myrmidons', 'Blood Leapers', 'Gray Medusas', 'Mud Cyborgs', 'Snow Werewolves', 'Jade Biters',
  'Platinum Chupacabra', 'Bright Dwarves', 'Chaos Hippogriffs', 'Proud Reptilians', 'Fuzzy Satyrs',
  'Marine Succubi', 'Mirror Pixies', 'Tundra Hagravens', 'Creeping Ancients', 'Tundra Draugr', 'Paradise Atranochs',
  'Cloaked Walkers', 'Dusk Vampires', 'Green Wendigos', 'Wetland Wisps', 'Icy Giants', 'Sapphire Rocs',
  'Assassin Ghosts', 'Violet Oxbeast', 'Night Titans', 'Dire Hagravens', 'Emperor Sirens',
  'Gloomhood', 'Taintbeing', 'Stinkmonster', 'Hauntwings', 'The Brown Witch', 'The Gross Vermin',
  'The Rotten Corpse', 'The Red-Eyed Cavern Cobra', 'The Raging Venom Deer', 'The Feathered Sun Monster',
  'Frostmutant', 'Germbug', 'Terrorbrute', 'Duskboy', 'The White Gnoll', 'The Dreary Guardian',
  'The Undead Abomination', 'The Iron Berserker Scorpion', 'The Monstrous Corpse Cobra',
  'The Masked Hunting Buffalo', 'Cavernsnare', 'Tombbody', 'Auradeviation', 'Plagueling',
  'The Feline Demon', 'The Wild Miscreation', 'The Faint Guardian', 'The Grisly Assassin Owl',
  'The Ravaging Grieve Monster', 'The Furry Predator Ape', 'Coffinsnake', 'Umbrabody', 'Spiritmonster',
  'Phasegirl', 'The Delirious Troglodyte', 'The Blind Entity', 'The Defiant Fiend',
  'The Iron-Scaled Mountain Panther', 'The Titanium Berserker Cobra', 'The Aquatic Frost Lizard']

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})


export class BoardComponent implements OnInit {

  @Input() player: Character
  @Output() fieldArrayEmitter = new EventEmitter<Field[]>()

  fieldArray = []

  constructor(private sharedServices: SharedService) {
  }

  ngOnInit(): void {
    this.generateFields()
    this.fieldArrayEmitter.emit(this.fieldArray)
  }

  generateDanger(currField: Field, character: Character, bossExist: boolean): boolean {
    let randNumber = this.sharedServices.getRandomNumber(0, 75)
    let damage = this.sharedServices.getRandomNumber(0, this.player.health / 3)
    if(randNumber === 1 && !bossExist) {
      this.generateEnemy(currField, character, bossExist)
      return true
    }else if(randNumber >= 0 && randNumber < 25){
      currField.danger = {
        trap: damage,
        enemy: null,
      }
      return false
    }else{
      this.generateEnemy(currField, character, bossExist)
      return false
    }
  }



  generateEnemy(currField: Field, character: Character, boss: boolean): void {
    let characterClasses: CharacterClass[] = ['Assassin', 'Barbarian', 'Mage', 'Warrior']
    let characterRandNumber = this.sharedServices.getRandomNumber(0, 4)
    if(!boss){
      currField.danger = {
        trap: null,
        enemy: this.generateClassBasedCharacter(characterClasses[characterRandNumber], true, character)
      }
    }else{
      currField.danger = {
        trap: null,
        enemy: this.generateClassBasedCharacter(characterClasses[characterRandNumber], false, character)
      }
    }
  }

  generateSpell():void {}
  characterGrowth(): void {}

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
          bossExist = this.generateDanger(field, this.player, bossExist)
        }else if(randNumber >= 25 && randNumber < 50){ // Generate Hidden Rewards
          field.danger = null
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
    }
  }

  generateClassBasedCharacter(characterClass: CharacterClass, isBoss: boolean, character: Character): Character {
    character = {
      name: enemyNames[Math.trunc(Math.random() * enemyNames.length)],
      class: characterClass,
      agility: 0,
      attack: 0,
      critical: 0,
      defense: 0,
      health: 0,
      mana: 0,
      wisdom: 0
    }
    switch (character.class){
      case 'Barbarian':
        //Buff
        //character.health = this.sharedServices.getRandomNumber(this.player.health / 3, this.player.health / 2) + this.player.level
        character.attack = this.sharedServices.getRandomNumber(this.player.attack / 3, this.player.attack / 2) + this.player.level
        character.agility = this.sharedServices.getRandomNumber(this.player.agility / 3, this.player.agility / 2) + this.player.level

        //Nerf
        character.defense = this.sharedServices.getRandomNumber(this.player.defense / 4, this.player.defense / 3) - this.player.level
        character.wisdom = this.sharedServices.getRandomNumber(this.player.wisdom / 4, this.player.wisdom / 3) - this.player.level

        //Normal
        character.critical = this.sharedServices.getRandomNumber(this.player.critical / 3, this.player.critical / 2)
        character.mana = this.sharedServices.getRandomNumber(this.player.mana / 3, this.player.mana / 2)
        break;
      case 'Assassin':
        //Buff
        character.agility = this.sharedServices.getRandomNumber(this.player.agility / 3, this.player.agility / 2) + this.player.level
        character.critical = this.sharedServices.getRandomNumber(this.player.critical / 3, this.player.critical / 2) + this.player.level
        character.attack = this.sharedServices.getRandomNumber(this.player.attack / 3, this.player.attack / 2) + this.player.level

        //Nerf
        character.health = this.sharedServices.getRandomNumber(this.player.health / 4, this.player.health / 3) - this.player.level
        character.defense = this.sharedServices.getRandomNumber(this.player.defense / 4, this.player.defense / 3) - this.player.level

        //Normal
        character.wisdom = this.sharedServices.getRandomNumber(this.player.wisdom / 3, this.player.wisdom / 2)
        character.mana = this.sharedServices.getRandomNumber(this.player.mana / 3, this.player.mana / 2)
        break;
      case 'Mage':
        //Buff
        character.mana = this.sharedServices.getRandomNumber(this.player.mana / 3, this.player.mana / 2) + this.player.level
        character.wisdom = this.sharedServices.getRandomNumber(this.player.wisdom / 3, character.wisdom / 2) + this.player.level

        //Nerf
        character.attack = this.sharedServices.getRandomNumber(this.player.attack / 4, this.player.attack / 3) - this.player.level
        character.defense = this.sharedServices.getRandomNumber(this.player.defense / 4, this.player.defense / 3) - this.player.level
        character.health = this.sharedServices.getRandomNumber(this.player.health / 4, this.player.health / 3) - this.player.health

        //Normal
        character.critical = this.sharedServices.getRandomNumber(this.player.critical / 3, this.player.critical / 2)
        character.agility = this.sharedServices.getRandomNumber(this.player.agility / 3, this.player.agility / 2)
        break;
      case 'Warrior':
        //Buff
        character.attack = this.sharedServices.getRandomNumber(this.player.attack / 3, this.player.attack / 2) + this.player.level
        character.defense = this.sharedServices.getRandomNumber(this.player.defense / 3, this.player.defense / 2) + this.player.level
        character.health = this.sharedServices.getRandomNumber(this.player.health / 3, this.player.health / 2) + this.player.level

        //Nerf
        character.agility = this.sharedServices.getRandomNumber(this.player.agility / 4, this.player.agility / 3) - this.player.level
        character.critical = this.sharedServices.getRandomNumber(this.player.critical / 4, this.player.critical / 3) - this.player.level

        //Normal
        character.mana = this.sharedServices.getRandomNumber(this.player.mana / 3, this.player.mana / 2)
        character.wisdom = this.sharedServices.getRandomNumber(this.player.wisdom / 3, this.player.wisdom / 2)
        break;
    }

    if(isBoss){
      character.attack = this.sharedServices.getRandomNumber(this.player.attack / 2, this.player.attack) + this.player.level
      character.defense = this.sharedServices.getRandomNumber(this.player.defense / 2, this.player.defense) + this.player.level
      character.health = this.sharedServices.getRandomNumber(this.player.health /2, this.player.health) + this.player.level
      character.agility = this.sharedServices.getRandomNumber(this.player.agility /2, this.player.agility) + this.player.level
      character.critical = this.sharedServices.getRandomNumber(this.player.critical /2, this.player.critical) + this.player.level
      character.mana = this.sharedServices.getRandomNumber(this.player.mana /2, this.player.mana) + this.player.level
      character.wisdom = this.sharedServices.getRandomNumber(this.player.wisdom /2, this.player.wisdom) + this.player.level
    }

    character.health = Math.floor(character.health)
    character.defense = Math.floor(character.defense)
    character.attack = Math.floor(character.attack)
    character.agility = Math.floor(character.agility)
    character.critical = Math.floor(character.critical)
    character.mana = Math.floor(character.mana)
    character.wisdom = Math.floor(character.wisdom)

    return character
  }
}
