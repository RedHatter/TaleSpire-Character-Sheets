import { debounce, mapObject } from '../utils'
import { writable, Subscriber, derived as derivedStore } from 'svelte/store'

export enum DiceType {
  D4,
  D6,
  D8,
  D10,
  D12,
}

export enum AbilityType {
  STR,
  DEX,
  CON,
  INT,
  WIS,
  CHA,
}

export class Attack {
  constructor(
    public name: string = '',
    public attackAbility: AbilityType = AbilityType.STR,
    public attackModifier: number = 0,
    public proficient: boolean = true,
    public range: string = '20/60 feet',

    public damageRoll: string = '',
    public damageAbility: AbilityType = AbilityType.STR,
    public damageModifier: number = 0,
    public damageType: string = ''
  ) {}
}

export enum ItemType {
  Item,
  Equipment,
}

export class Item {
  constructor(
    public name: string = '',
    public description: string = '',
    public count: number = 1,
    public weight: number = 0,
    public type: ItemType = ItemType.Item,
    public isEquipped: boolean = false
  ) {}
}

export enum ProficiencyType {
  Language,
  Weapon,
  Armor,
  Other,
}

export class Proficiency {
  constructor(
    public type: ProficiencyType = ProficiencyType.Language,
    public name: string = '',
    public source: string = ''
  ) {}
}

export class Feature {
  constructor(public name: string = '', public source: string = '', public description: string = '') {}
}

export class Tracker {
  constructor(public name: string = '', public max: number = 0, public current: number = 0) {}
}

export class DnD5eData {
  name: string = ''
  playerClass: string = ''
  level: number = 1
  background: string = ''
  race: string = ''
  alignment: string = ''
  exp: number = 0

  abilityScores = {
    [AbilityType.STR]: 10,
    [AbilityType.DEX]: 10,
    [AbilityType.CON]: 10,
    [AbilityType.INT]: 10,
    [AbilityType.WIS]: 10,
    [AbilityType.CHA]: 10,
  }

  proficiencies: Array<Proficiency> = []

  inspiration: boolean = false
  proficiency: number = 2

  savingThrows = {
    [AbilityType.STR]: false,
    [AbilityType.DEX]: false,
    [AbilityType.CON]: false,
    [AbilityType.INT]: false,
    [AbilityType.WIS]: false,
    [AbilityType.CHA]: false,
  }

  skills = {
    acrobatics: false,
    animalHandling: false,
    arcana: false,
    athletics: false,
    deception: false,
    history: false,
    insight: false,
    intimidation: false,
    investigation: false,
    medicine: false,
    nature: false,
    perception: false,
    performance: false,
    persuasion: false,
    religion: false,
    sleightOfHand: false,
    stealth: false,
    survival: false,
  }

  armorClass: number = 10
  speed: number = 30

  hp = {
    max: 10,
    current: 10,
    temp: 0,
  }

  hitDice = {
    max: 1,
    current: 1,
    type: DiceType.D6,
  }

  deathSaves = {
    success: 0,
    failure: 0,
  }

  attacks: Array<Attack> = []

  equipment: Array<Item> = []

  coin: number = 0

  traits: string = ''
  ideals: string = ''
  bonds: string = ''
  flaws: string = ''

  trackers: Array<Tracker> = [new Tracker('Class Resource'), new Tracker('Other Resource')]
  features: Array<Feature> = []
}

export const data = writable((JSON.parse(window.localStorage.getItem('data')) ?? new DnD5eData()) as DnD5eData)
data.subscribe(
  debounce(data => window.localStorage.setItem('$data', JSON.stringify(data)), 1000) as Subscriber<DnD5eData>
)

const abilityNames = {
  [AbilityType.STR]: 'Strength',
  [AbilityType.DEX]: 'Dexterity',
  [AbilityType.CON]: 'Constitution',
  [AbilityType.INT]: 'Intelligence',
  [AbilityType.WIS]: 'Wisdom',
  [AbilityType.CHA]: 'Charisma',
}

export const derived = derivedStore(data, data => {
  const abilityScores = mapObject(data.abilityScores, (base: number, type: AbilityType) => ({
    modifier: Math.floor((base - 10) / 2),
    name: abilityNames[type],
  }))

  let copper = data.coin

  let platinum = Math.floor(copper / 1000)
  copper = copper % 1000

  let gold = Math.floor(copper / 100)
  copper = copper % 100

  let electrum = Math.floor(copper / 50)
  copper = copper % 50

  let silver = Math.floor(copper / 10)
  copper = copper % 10

  return {
    abilityScores,

    savingThrows: mapObject(data.savingThrows, (proficient: boolean, type: AbilityType) => ({
      modifier: abilityScores[type].modifier + (proficient ? data.proficiency : 0),
      name: abilityNames[type],
    })),

    skills: {
      acrobatics: {
        name: 'Acrobatics (Dex)',
        modifier: abilityScores[AbilityType.DEX].modifier + (data.skills.acrobatics ? data.proficiency : 0),
      },
      animalHandling: {
        name: 'Animal Handling (Wis)',
        modifier: abilityScores[AbilityType.WIS].modifier + (data.skills.animalHandling ? data.proficiency : 0),
      },
      arcana: {
        name: 'Arcana (Int)',
        modifier: abilityScores[AbilityType.INT].modifier + (data.skills.arcana ? data.proficiency : 0),
      },
      athletics: {
        name: 'Athletics (Str)',
        modifier: abilityScores[AbilityType.STR].modifier + (data.skills.athletics ? data.proficiency : 0),
      },
      deception: {
        name: 'Deception (Cha)',
        modifier: abilityScores[AbilityType.CHA].modifier + (data.skills.deception ? data.proficiency : 0),
      },
      history: {
        name: 'History (Int)',
        modifier: abilityScores[AbilityType.INT].modifier + (data.skills.history ? data.proficiency : 0),
      },
      insight: {
        name: 'Insight (Wis)',
        modifier: abilityScores[AbilityType.WIS].modifier + (data.skills.insight ? data.proficiency : 0),
      },
      intimidation: {
        name: 'Medicine (Wis)',
        modifier: abilityScores[AbilityType.WIS].modifier + (data.skills.intimidation ? data.proficiency : 0),
      },
      investigation: {
        name: 'Investigation (Int)',
        modifier: abilityScores[AbilityType.INT].modifier + (data.skills.investigation ? data.proficiency : 0),
      },
      medicine: {
        name: 'Medicine (Wis)',
        modifier: abilityScores[AbilityType.WIS].modifier + (data.skills.medicine ? data.proficiency : 0),
      },
      nature: {
        name: 'Nature (Int)',
        modifier: abilityScores[AbilityType.INT].modifier + (data.skills.nature ? data.proficiency : 0),
      },
      perception: {
        name: 'Perception (Wis)',
        modifier: abilityScores[AbilityType.WIS].modifier + (data.skills.perception ? data.proficiency : 0),
      },
      performance: {
        name: 'Performance (Cha)',
        modifier: abilityScores[AbilityType.CHA].modifier + (data.skills.performance ? data.proficiency : 0),
      },
      persuasion: {
        name: 'Persuasion (Cha)',
        modifier: abilityScores[AbilityType.CHA].modifier + (data.skills.persuasion ? data.proficiency : 0),
      },
      religion: {
        name: 'Religion (Int)',
        modifier: abilityScores[AbilityType.INT].modifier + (data.skills.religion ? data.proficiency : 0),
      },
      sleightOfHand: {
        name: 'Sleight of Hand (Dex)',
        modifier: abilityScores[AbilityType.DEX].modifier + (data.skills.sleightOfHand ? data.proficiency : 0),
      },
      stealth: {
        name: 'Stealth (Dex)',
        modifier: abilityScores[AbilityType.DEX].modifier + (data.skills.stealth ? data.proficiency : 0),
      },
      survival: {
        name: 'Survival (Wis)',
        modifier: abilityScores[AbilityType.WIS].modifier + (data.skills.survival ? data.proficiency : 0),
      },
    },

    attacks: data.attacks.map(attack => ({
      attackModifier:
        abilityScores[attack.attackAbility].modifier +
        attack.attackModifier +
        (attack.proficient ? data.proficiency : 0),
      fullDamageRoll: `${attack.damageRoll}+${abilityScores[attack.damageAbility].modifier + attack.damageModifier}`,
    })),

    coin: {
      copper,
      silver,
      electrum,
      gold,
      platinum,
    },

    totalWeight: data.equipment.reduce((val, item) => val + item.weight, 0),
  }
})
