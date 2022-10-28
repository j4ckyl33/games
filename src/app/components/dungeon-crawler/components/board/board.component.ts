import { Component, OnInit } from '@angular/core';
import {
  Boots,
  Breastplate,
  Character,
  CharacterClass,
  Field,
  ConsumableItem,
  MagicItem,
  Weapon,
  Spell,
} from '../../../../types/types.service';
import { SharedServices } from '../../shared-services/shared-services.service';
import { DataGenerationServices } from '../../services/data-generation-service.service';

const enemyNames: string[] = [
  'Reckless Branch',
  'Bright Hornet',
  'Focused Blossom',
  'Honored Sunlight',
  'Leaping Edge',
  'Majestic Magpie',
  'Pouncing Thorn',
  'Nimble Meteor',
  'Living Bug',
  'Flying Blow',
  'Dark Fox',
  'Golden Dust',
  'Honored Scorpion',
  'Crazed Elephant',
  'Reckless Fire',
  'Punching Bane',
  'Spring Soul',
  'Hidden Illusion',
  'Summer Surge',
  'Last Blizzard',
  'Clouded Wraiths',
  'Shocking Wraiths',
  'Hell Myrmidons',
  'Blood Leapers',
  'Gray Medusas',
  'Mud Cyborgs',
  'Snow Werewolves',
  'Jade Biters',
  'Platinum Chupacabra',
  'Bright Dwarves',
  'Chaos Hippogriffs',
  'Proud Reptilians',
  'Fuzzy Satyrs',
  'Marine Succubi',
  'Mirror Pixies',
  'Tundra Hagravens',
  'Creeping Ancients',
  'Tundra Draugr',
  'Paradise Atranochs',
  'Cloaked Walkers',
  'Dusk Vampires',
  'Green Wendigos',
  'Wetland Wisps',
  'Icy Giants',
  'Sapphire Rocs',
  'Assassin Ghosts',
  'Violet Oxbeast',
  'Night Titans',
  'Dire Hagravens',
  'Emperor Sirens',
  'Gloomhood',
  'Taintbeing',
  'Stinkmonster',
  'Hauntwings',
  'The Brown Witch',
  'The Gross Vermin',
  'The Rotten Corpse',
  'The Red-Eyed Cavern Cobra',
  'The Raging Venom Deer',
  'The Feathered Sun Monster',
  'Frostmutant',
  'Germbug',
  'Terrorbrute',
  'Duskboy',
  'The White Gnoll',
  'The Dreary Guardian',
  'The Undead Abomination',
  'The Iron Berserker Scorpion',
  'The Monstrous Corpse Cobra',
  'The Masked Hunting Buffalo',
  'Cavernsnare',
  'Tombbody',
  'Auradeviation',
  'Plagueling',
  'The Feline Demon',
  'The Wild Miscreation',
  'The Faint Guardian',
  'The Grisly Assassin Owl',
  'The Ravaging Grieve Monster',
  'The Furry Predator Ape',
  'Coffinsnake',
  'Umbrabody',
  'Spiritmonster',
  'Phasegirl',
  'The Delirious Troglodyte',
  'The Blind Entity',
  'The Defiant Fiend',
  'The Iron-Scaled Mountain Panther',
  'The Titanium Berserker Cobra',
  'The Aquatic Frost Lizard',
];

const spellNames = [
  'Thunder Rocket',
  'Mystic Flash',
  'Thunder Arrow',
  'Spellsteal',
  'Summon Elemental',
  'Call of Hope',
  'Rune of Venom',
  'Evocation of Magic',
  'Vision Rune',
  'Mutation of Immortality',
  'Holy Ray',
  'Hellfire Rupture',
  'Spirit Explosion',
  'Torrent',
  'Misery',
  'Spellshield of Precision',
  'Bolt of Guardian Spirits',
  'Ferocity of the Moon',
  'Corruption of Blessings',
  'Alteration of Honesty',
  'Blazing Explosion',
  'Unholy Spike',
  'Blazing Orb',
  'Bane',
  'Suffering',
  'Beam of Twilight',
  'Rune of the Arcane',
  'Imitation of Life',
  'Solitude of Death',
  'Serenity of Light',
  'Lunar Shower',
  'Death Tempest',
  'Hellfire Burn',
  'Nightmare',
  'Nature Attunement',
  'Hymn of Dispersion',
  'Flare of Soul Fire',
  'Extortion of Doom',
  'Distortion of Hysteria',
  'Eruption of Failures',
  'Spirit Explosion',
  'Lunar Salvo',
  'Thunder Blaze',
  'Fire Defence',
  'Ice Defence',
  'Orb of Healing',
  'Blast of Exhaustion',
  'Reprisal Burst',
  'Void of Seals',
  'Metamorphosis of Vitality',
  'Soul Barrage',
  'Fire Missiles',
  'Soul Rocket',
  'Genesis',
  'Fissure',
  'Blast of Rage',
  'Ball of Devouring',
  'Virtue of the Stars',
  'Indignation of the Spirit',
  'Incantation Gift',
  'Spirit Missiles',
  'Esoteric Rain',
  'Mind Rage',
  'Ecstasy',
  'Tremor',
  'Flash of Ancestors',
  'Ceremony of Decimation',
  'Mutation Curse',
  'Incantation Hex',
  'Delusion Curse',
  'Fire Torrent',
  'Air Wrath',
  'Lunar Flash',
  'Enhance',
  'Conjure Clone',
  'Ring of Chaos',
  'Hymn of Frost',
  'Decimation of Perfection',
  'Virtue Spellshield',
  'Justice of the Nether',
];

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {

  bossExist = false

  constructor(
    private sharedServices: SharedServices,
    public dataGenerationServices: DataGenerationServices
  ) {}

  ngOnInit() {
    this.generateFields();
    this.dataGenerationServices.resetBoard$.subscribe(val => {
      if(val === true){
        this.generateFields();
        this.dataGenerationServices.player.currentField = 0
        this.dataGenerationServices.nextLevel = true
        this.dataGenerationServices.floor++
        this.dataGenerationServices.player.health = this.dataGenerationServices.playerFullHealth
      }
    })
  }

  generateDanger(
    currField: Field,
    character: Character,
  ): boolean {
    let randNumber = this.sharedServices.getRandomNumber(0, 75);
    let damage = this.sharedServices.getRandomNumber(
      0,
      this.dataGenerationServices.player.health / 3
    );
    if (randNumber === 1 && !this.bossExist) {
      this.generateEnemy(currField, character, true);
      return true;
    } else if (randNumber >= 0 && randNumber < 25) {
      currField.danger = {
        trap: damage,
        enemy: null,
      };
      return false;
    } else {
      this.generateEnemy(currField, character, false);
      return false;
    }
  }

  generateEnemy(currField: Field, character: Character, createBoss: boolean): void {
    let characterClasses: CharacterClass[] = [
      'Assassin',
      'Barbarian',
      'Mage',
      'Warrior',
    ];
    let characterRandNumber = this.sharedServices.getRandomNumber(0, 4);
    if (!this.bossExist && createBoss) {
      currField.danger = {
        trap: null,
        enemy: this.generateClassBasedCharacter(
          characterClasses[characterRandNumber],
          true,
          character
        ),
      };
      this.bossExist = true
    } else {
      currField.danger = {
        trap: null,
        enemy: this.generateClassBasedCharacter(
          characterClasses[characterRandNumber],
          false,
          character
        ),
      };
    }
  }

  characterGrowth(): void {}

  generateItems():
    | Breastplate
    | Weapon
    | Boots
    | MagicItem
    | ConsumableItem
    | Spell {
    let randomNumber = this.sharedServices.getRandomNumber(0, 6);
    let itemOptions = [
      'breastplate',
      'weapon',
      'boots',
      'magicItem',
      'item',
      'spell',
      'gold'
    ];
    return this.generateSpecificItems(itemOptions[randomNumber]);
  }

  generateSpecificItems(
    specification: string
  ): Breastplate | Weapon | Boots | MagicItem | ConsumableItem | Spell {
    let item:
      | Breastplate
      | Weapon
      | Boots
      | MagicItem
      | ConsumableItem
      | Spell = <Breastplate | Weapon | Boots | MagicItem | ConsumableItem | Spell>{};
    let scalingFactor = this.determineRarity(item);

    switch (specification) {
      case 'breastplate':
        item = {
          name: 'Breastplate',
          health: this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.health / (scalingFactor * 2),
            this.dataGenerationServices.player.health / scalingFactor
          ),
          defense: this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.defense / (scalingFactor * 2),
            this.dataGenerationServices.player.defense / scalingFactor
          ),
          rarity: item.rarity,
        };
        return item;
      case 'weapon':
        item = {
          name: 'Weapon',
          attack: this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.attack / (scalingFactor * 2),
            this.dataGenerationServices.player.attack / scalingFactor
          ),
          critical: this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.critical / (scalingFactor * 2),
            this.dataGenerationServices.player.critical / scalingFactor
          ),
          rarity: item.rarity,
        };
        return item;
      case 'boots':
        item = {
          name: 'Boots',
          agility: this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.agility / (scalingFactor * 2),
            this.dataGenerationServices.player.agility / scalingFactor
          ),
          critical: this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.critical / (scalingFactor * 2),
            this.dataGenerationServices.player.critical / scalingFactor
          ),
          rarity: item.rarity,
        };
        return item;
      case 'magicItem':
        item = {
          name: 'Magic Item',
          mana: this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.mana / (scalingFactor * 2),
            this.dataGenerationServices.player.mana / scalingFactor
          ),
          wisdom: this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.wisdom / (scalingFactor * 2),
            this.dataGenerationServices.player.wisdom / scalingFactor
          ),
          rarity: item.rarity,
        };
        return item;
      case 'item':
        item = {
          name: 'Consumable',
          booststats: null,
          heal: null,
          damage: null,
          rarity: item.rarity,
        };
        item = this.generateConsumableItem(item, scalingFactor);
        return item;
        break;
      case 'spell':
        item = {
          name: 'Spell',
          mana: null,
          heal: null,
          damage: null,
          rarity: item.rarity,
        };
        item = this.generateSpell(item, scalingFactor);
        break;
    }
    return item;
  }

  generateSpell(spell: Spell, scalingFactor: number): Spell {
    let tempSpell = spell;
    let odds = this.sharedServices.getRandomNumber(0, 100);
    let randNumber = this.sharedServices.getRandomNumber(0, spellNames.length);

    tempSpell.name = spellNames[randNumber];

    if (odds >= 0 && odds < 50) {
      tempSpell.damage = this.sharedServices.getRandomNumber(
        this.dataGenerationServices.player.wisdom / (scalingFactor * 2),
        this.dataGenerationServices.player.wisdom / scalingFactor
      );
    } else if (odds >= 50 && odds < 85) {
      tempSpell.heal = this.sharedServices.getRandomNumber(
        this.dataGenerationServices.player.health / (scalingFactor * 2),
        this.dataGenerationServices.player.health / scalingFactor
      );
    } else {
      tempSpell.damage = this.sharedServices.getRandomNumber(
        this.dataGenerationServices.player.wisdom / (scalingFactor * 2),
        this.dataGenerationServices.player.wisdom / scalingFactor
      );
      tempSpell.heal = this.sharedServices.getRandomNumber(
        this.dataGenerationServices.player.health / (scalingFactor * 2),
        this.dataGenerationServices.player.health / scalingFactor
      );
    }

    tempSpell.mana = this.sharedServices.getRandomNumber(
      0,
      this.dataGenerationServices.player.mana
    );

    return tempSpell;
  }

  generateConsumableItem(
    consumableItem: ConsumableItem,
    scalingFactor: number
  ): ConsumableItem {
    let tempConsumableItem = consumableItem;
    let randNumber = this.sharedServices.getRandomNumber(1, 6);

    switch (scalingFactor) {
      case 1: // Everything Consumable
        tempConsumableItem.name = 'All Mighty Consumable';
        tempConsumableItem.booststats = randNumber;
        tempConsumableItem.heal = this.sharedServices.getRandomNumber(
          this.dataGenerationServices.player.health / 3,
          this.dataGenerationServices.player.health
        );
        if (this.dataGenerationServices.player.class === 'Mage') {
          tempConsumableItem.damage = this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.wisdom,
            this.dataGenerationServices.player.wisdom * 1.5
          );
        } else {
          tempConsumableItem.damage = this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.attack,
            this.dataGenerationServices.player.attack * 1.5
          );
        }
        break;
      case 2: // Elixier Consumable
        tempConsumableItem.name = 'Elixier Consumable';
        tempConsumableItem.booststats = randNumber;
        break;
      case 3: // Heal Consumable
        tempConsumableItem.name = 'Heal Consumable';
        tempConsumableItem.heal = this.sharedServices.getRandomNumber(
          this.dataGenerationServices.player.health / 3,
          this.dataGenerationServices.player.health
        );
        break;
      case 4: // Damage Consumable
        tempConsumableItem.name = 'Damage Consumable';
        if (this.dataGenerationServices.player.class === 'Mage') {
          tempConsumableItem.damage = this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.wisdom,
            this.dataGenerationServices.player.wisdom * 1.5
          );
        } else {
          tempConsumableItem.damage = this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.attack,
            this.dataGenerationServices.player.attack * 1.5
          );
        }
        break;
    }
    return consumableItem;
  }

  determineRarity(
    item: Breastplate | Weapon | Boots | MagicItem | ConsumableItem | Spell
  ): number {
    let randomNumber = this.sharedServices.getRandomNumber(0, 100);
    if (randomNumber >= 0 && randomNumber < 50) {
      // Common
      item.rarity = 'Common';
      return 4;
    } else if (randomNumber >= 50 && randomNumber < 85) {
      // Rare
      item.rarity = 'Rare';
      return 3;
    } else if (randomNumber >= 85 && randomNumber < 95) {
      // Epic
      item.rarity = 'Epic';
      return 2;
    } else {
      // Legendary
      item.rarity = 'Legendary';
      return 1;
    }
  }

  generateFields(): void {
    this.dataGenerationServices.board = [];
    this.bossExist = false
    let counter = 0;
    for (let i = 0; i < 8; i++) {
      let tempArray = [];
      for (let j = 0; j < 8; j++) {
        //fill the field property
        let field: Field = <Field>{};
        let randNumber = this.sharedServices.getRandomNumber(0, 100);
        // Generates possible Danger
        if ((j === 0 && i === 0) || (randNumber >= 0 && randNumber < 50)) {
          // Generate Nothing
          field.danger = null;
          field.reward = null;
        } else if (randNumber >= 50 && randNumber < 75) {
          // Generate Enemies
          this.bossExist = this.generateDanger(
            field,
            this.dataGenerationServices.player
          );
          field.reward = null
        } else {
          // Generate Hidden Rewards
          field.danger = null;
          field.reward = this.generateItems();
        }
        field.index = counter;
        field.visited = false;
        tempArray.push(field);
        counter++;
      }
      this.dataGenerationServices.board.push(tempArray);
    }
    let randNumberX = this.sharedServices.getRandomNumber(1, 7)
    let randNumberY = this.sharedServices.getRandomNumber(1, 7)
    this.dataGenerationServices.board[randNumberY][randNumberX].danger = null
    this.dataGenerationServices.board[randNumberY][randNumberX].reward = null
    this.dataGenerationServices.board[randNumberY][randNumberX].end = true
    this.dataGenerationServices.board[0][0].visited = true;
    console.log(this.dataGenerationServices.board)
  }

  generateClassBasedCharacter(
    characterClass: CharacterClass,
    isBoss: boolean,
    character: Character
  ): Character {
    character = {
      name: enemyNames[Math.trunc(Math.random() * enemyNames.length)],
      class: characterClass,
      agility: 0,
      attack: 0,
      critical: 0,
      defense: 0,
      health: 0,
      mana: 0,
      wisdom: 0,
      bag: [],
      equipment: {},
    };
    switch (character.class) {
      case 'Barbarian':
        //Buff
        character.health =
          this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.health / 3,
            this.dataGenerationServices.player.health / 2
          ) + this.dataGenerationServices.player.level;
        character.attack =
          this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.attack / 3,
            this.dataGenerationServices.player.attack / 2
          ) + this.dataGenerationServices.player.level;
        character.agility =
          this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.agility / 3,
            this.dataGenerationServices.player.agility / 2
          ) + this.dataGenerationServices.player.level;

        //Nerf
        character.defense =
          this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.defense / 4,
            this.dataGenerationServices.player.defense / 3
          ) - this.dataGenerationServices.player.level;
        character.wisdom =
          this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.wisdom / 4,
            this.dataGenerationServices.player.wisdom / 3
          ) - this.dataGenerationServices.player.level;

        //Normal
        character.critical = this.sharedServices.getRandomNumber(
          this.dataGenerationServices.player.critical / 3,
          this.dataGenerationServices.player.critical / 2
        );
        character.mana = this.sharedServices.getRandomNumber(
          this.dataGenerationServices.player.mana / 3,
          this.dataGenerationServices.player.mana / 2
        );
        break;
      case 'Assassin':
        //Buff
        character.agility =
          this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.agility / 3,
            this.dataGenerationServices.player.agility / 2
          ) + this.dataGenerationServices.player.level;
        character.critical =
          this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.critical / 3,
            this.dataGenerationServices.player.critical / 2
          ) + this.dataGenerationServices.player.level;
        character.attack =
          this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.attack / 3,
            this.dataGenerationServices.player.attack / 2
          ) + this.dataGenerationServices.player.level;

        //Nerf
        character.health =
          this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.health / 4,
            this.dataGenerationServices.player.health / 3
          ) - this.dataGenerationServices.player.level;
        character.defense =
          this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.defense / 4,
            this.dataGenerationServices.player.defense / 3
          ) - this.dataGenerationServices.player.level;

        //Normal
        character.wisdom = this.sharedServices.getRandomNumber(
          this.dataGenerationServices.player.wisdom / 3,
          this.dataGenerationServices.player.wisdom / 2
        );
        character.mana = this.sharedServices.getRandomNumber(
          this.dataGenerationServices.player.mana / 3,
          this.dataGenerationServices.player.mana / 2
        );
        break;
      case 'Mage':
        //Buff
        character.mana =
          this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.mana / 3,
            this.dataGenerationServices.player.mana / 2
          ) + this.dataGenerationServices.player.level;
        character.wisdom =
          this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.wisdom / 3,
            this.dataGenerationServices.player.wisdom / 2
          ) + this.dataGenerationServices.player.level;

        //Nerf
        character.attack =
          this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.attack / 4,
            this.dataGenerationServices.player.attack / 3
          ) - this.dataGenerationServices.player.level;
        character.defense =
          this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.defense / 4,
            this.dataGenerationServices.player.defense / 3
          ) - this.dataGenerationServices.player.level;
        character.health =
          this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.health / 4,
            this.dataGenerationServices.player.health / 3
          ) - this.dataGenerationServices.player.health;

        //Normal
        character.critical = this.sharedServices.getRandomNumber(
          this.dataGenerationServices.player.critical / 3,
          this.dataGenerationServices.player.critical / 2
        );
        character.agility = this.sharedServices.getRandomNumber(
          this.dataGenerationServices.player.agility / 3,
          this.dataGenerationServices.player.agility / 2
        );
        break;
      case 'Warrior':
        //Buff
        character.attack =
          this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.attack / 3,
            this.dataGenerationServices.player.attack / 2
          ) + this.dataGenerationServices.player.level;
        character.defense =
          this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.defense / 3,
            this.dataGenerationServices.player.defense / 2
          ) + this.dataGenerationServices.player.level;
        character.health =
          this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.health / 3,
            this.dataGenerationServices.player.health / 2
          ) + this.dataGenerationServices.player.level;

        //Nerf
        character.agility =
          this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.agility / 4,
            this.dataGenerationServices.player.agility / 3
          ) - this.dataGenerationServices.player.level;
        character.critical =
          this.sharedServices.getRandomNumber(
            this.dataGenerationServices.player.critical / 4,
            this.dataGenerationServices.player.critical / 3
          ) - this.dataGenerationServices.player.level;

        //Normal
        character.mana = this.sharedServices.getRandomNumber(
          this.dataGenerationServices.player.mana / 3,
          this.dataGenerationServices.player.mana / 2
        );
        character.wisdom = this.sharedServices.getRandomNumber(
          this.dataGenerationServices.player.wisdom / 3,
          this.dataGenerationServices.player.wisdom / 2
        );
        break;
    }

    if (isBoss) {
      character.name = 'BOSS'
      character.attack =
        this.sharedServices.getRandomNumber(
          this.dataGenerationServices.player.attack / 2,
          this.dataGenerationServices.player.attack
        ) + this.dataGenerationServices.player.level;
      character.defense =
        this.sharedServices.getRandomNumber(
          this.dataGenerationServices.player.defense / 2,
          this.dataGenerationServices.player.defense
        ) + this.dataGenerationServices.player.level;
      character.health =
        this.sharedServices.getRandomNumber(
          this.dataGenerationServices.player.health / 2,
          this.dataGenerationServices.player.health
        ) + this.dataGenerationServices.player.level;
      character.agility =
        this.sharedServices.getRandomNumber(
          this.dataGenerationServices.player.agility / 2,
          this.dataGenerationServices.player.agility
        ) + this.dataGenerationServices.player.level;
      character.critical =
        this.sharedServices.getRandomNumber(
          this.dataGenerationServices.player.critical / 2,
          this.dataGenerationServices.player.critical
        ) + this.dataGenerationServices.player.level;
      character.mana =
        this.sharedServices.getRandomNumber(
          this.dataGenerationServices.player.mana / 2,
          this.dataGenerationServices.player.mana
        ) + this.dataGenerationServices.player.level;
      character.wisdom =
        this.sharedServices.getRandomNumber(
          this.dataGenerationServices.player.wisdom / 2,
          this.dataGenerationServices.player.wisdom
        ) + this.dataGenerationServices.player.level;
    }

    // Set stats to one if its below 0
    if(character.attack <= 0){
      character.attack = 1
    }
    if(character.defense <= 0){
      character.defense = 1
    }
    if(character.health <= 0){
      character.health = 1
    }
    if(character.agility <= 0){
      character.agility = 1
    }
    if(character.critical <= 0){
      character.critical = 1
    }
    if(character.mana <= 0){
      character.mana = 1
    }
    if (character.wisdom <= 0) {
      character.wisdom = 1
    }
    return character;
  }
}
