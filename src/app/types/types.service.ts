export type Field = {
  index: number;
  danger?: Danger;
  reward?: Breastplate | Weapon | Boots | MagicItem | ConsumableItem | Spell;
  visited: boolean;
  end?: boolean;
};

export type Character = {
  name: string;
  level?: number;
  experience?: number;
  experienceNextLevel?: number;
  class: CharacterClass;
  health: number;
  defense: number;
  attack: number;
  agility: number;
  critical: number;
  mana: number;
  wisdom: number;
  spells?: [Spell?, Spell?, Spell?];
  currentField?: number;
  bag: Bag[];
  equipment: Equipment;
};

export type Bag = Spell | ConsumableItem | Breastplate | Weapon | Boots | MagicItem

type Equipment = {
  breastplate?: Breastplate;
  weapon?: Weapon;
  boots?: Boots;
  magicItem?: MagicItem;
};

export type ConsumableItem = {
  name: string;
  heal: number;
  booststats: number;
  damage: number;
  rarity: Rarity;
};

export type Breastplate = {
  name: string;
  health: number;
  defense: number;
  rarity: Rarity;
};

export type Weapon = {
  name: string;
  attack: number;
  critical: number;
  rarity: Rarity;
};

export type Boots = {
  name: string;
  agility: number;
  critical: number;
  rarity: Rarity;
};

export type MagicItem = {
  name: string;
  mana: number;
  wisdom: number;
  rarity: Rarity;
};

export type Spell = {
  name: string;
  damage: number;
  heal: number;
  mana: number;
  rarity: Rarity;
};

type Danger = {
  enemy?: Character;
  trap?: number;
};

export type CharacterClass =
  | 'Assassin'
  | 'Barbarian'
  | 'Mage'
  | 'Warrior'
  | 'NoClass';

type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';
