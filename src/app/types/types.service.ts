export type Field = {
  index: number,
  danger?: Danger,
  reward?: Character | Item,
  visited: boolean
}

export type Character = {
  level: number,
  health: number,
  defense: number,
  attack: number,
  agility: number,
  critical: number,
  mana: number,
  wisdom: number,
  spells: [Spell?, Spell?, Spell?],
  currentField?: number,
  nextField?: number,
  item: Item
}

type Item = {
  breastplate: Breastplate,
  weapon: Weapon,
  boots: Boots,
  magicItem: MagicItem
}

type Breastplate = {
  health: number,
  defense: number
}

type Weapon = {
  attack: number,
  critical: number
}

type Boots = {
  agility: number,
  critical: number
}

type MagicItem = {
  mana: number,
  wisdom: number
}

type Spell = {
  name: string,
  damage: number,
  heal: number,
  mana: number
}

type Danger = {
  enemy?: Character,
  trap?: number
}



