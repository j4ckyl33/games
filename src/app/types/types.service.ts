export type Field = {
  index: number,
  danger?: Danger,
  reward?: Character,
  visited: boolean
}

export type Character = {
  name: string,
  level?: number,
  experience?: number,
  experienceNextLevel?: number,
  class: CharacterClass,
  health: number,
  defense: number,
  attack: number,
  agility: number,
  critical: number,
  mana: number,
  wisdom: number,
  spells?: [Spell?, Spell?, Spell?],
  currentField?: number,
}
/*
type Equipment = {
  breastplate: Breastplate,
  weapon: Weapon,
  boots: Boots,
  magicItem: MagicItem
}

type Item = {
  name: string,
  damage?: number,
  heal?: number,
  boostStat?: number,
  rarity: Rarity
}

type Breastplate = {
  name: string,
  health: number,
  defense: number,
  rarity: Rarity
}

type Weapon = {
  name: string,
  attack: number,
  critical: number,
  rarity: Rarity
}

type Boots = {
  name: string,
  agility: number,
  critical: number,
  rarity: Rarity
}

type MagicItem = {
  name: string,
  mana: number,
  wisdom: number,
  rarity: Rarity
}*/

type Spell = {
  name: string,
  damage: number,
  heal: number,
  mana: number,
  rarity: Rarity
}

type Danger = {
  enemy?: Character,
  trap?: number
}

export type CharacterClass = 'Assassin' | 'Barbarian' | 'Mage' | 'Warrior' |'NoClass'

type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary'




