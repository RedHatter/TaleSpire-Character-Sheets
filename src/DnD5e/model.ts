import { mapObject } from '../utils'
import { nanoid as uid } from 'nanoid'
import { Parser } from 'expr-eval'

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

export enum SkillProficiencyType {
  None,
  Proficient,
  Expertise,
  JackOfAllTrades,
}

export class Attack {
  constructor(
    public name: string = 'Unnamed Attack',
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
    public name: string = 'Unnamed Item',
    public description: string = '',
    public count: number = 1,
    public weight: number = 0,
    public type: ItemType = ItemType.Item,
    public isEquipped: boolean = false
  ) {}
}

export class CustomSkill {
  constructor(
    public name: string = 'Unnamed Skill',
    public proficient: SkillProficiencyType = SkillProficiencyType.Proficient,
    public ability: AbilityType = AbilityType.STR,
    public modifier: number = 0,
    public description: string = ''
  ) {}
}

export enum OtherProficiencyType {
  Language,
  Weapon,
  Armor,
  Other,
}

export class OtherProficiency {
  constructor(
    public type: OtherProficiencyType = OtherProficiencyType.Language,
    public name: string = '',
    public source: string = ''
  ) {}
}

export class Feature {
  constructor(public name: string = 'Unnamed Feature', public source: string = '', public description: string = '') {}
}

export class Tracker {
  constructor(public name: string = 'Unnamed Tracker', public max: number = 0, public current: number = 0) {}
}

export class Effect {
  constructor(
    public name: string = 'Unnamed Effect',
    public source: string = '',
    public duration: string = '',
    public description: string = '',
    public modifiers: Array<EffectModifier> = []
  ) {}
}

export class EffectModifier {
  constructor(public stat: AbilityType | OtherStats = AbilityType.STR, public expr: string = '') {}
}

export enum OtherStats {
  AC = 6,
  SPEED = 7,
}

export class DnD5eData {
  uid: string = uid(9)

  name: string = 'Unnamed Character'
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

  tools: Array<CustomSkill> = []

  proficiencies: Array<OtherProficiency> = []

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
    acrobatics: SkillProficiencyType.None,
    animalHandling: SkillProficiencyType.None,
    arcana: SkillProficiencyType.None,
    athletics: SkillProficiencyType.None,
    deception: SkillProficiencyType.None,
    history: SkillProficiencyType.None,
    insight: SkillProficiencyType.None,
    intimidation: SkillProficiencyType.None,
    investigation: SkillProficiencyType.None,
    medicine: SkillProficiencyType.None,
    nature: SkillProficiencyType.None,
    perception: SkillProficiencyType.None,
    performance: SkillProficiencyType.None,
    persuasion: SkillProficiencyType.None,
    religion: SkillProficiencyType.None,
    sleightOfHand: SkillProficiencyType.None,
    stealth: SkillProficiencyType.None,
    survival: SkillProficiencyType.None,
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

  effects: Array<Effect> = []
}

export interface DnD5eDerivedData {
  abilityScores: { [key in AbilityType]: { name: string; modifier: number } }
  savingThrows: { [key in AbilityType]: { name: string; modifier: number } }
  tools: Array<{ ability: string; modifier: number }>
  skills: { [key: string]: { name: string; modifier: number } }
  armorClass: number
  speed: number
  attacks: Array<{ attackModifier: number; fullDamageRoll: string }>
  coin: {
    copper: number
    silver: number
    electrum: number
    gold: number
    platinum: number
  }
  totalWeight: number
}

const abilityNames = {
  [AbilityType.STR]: 'Strength',
  [AbilityType.DEX]: 'Dexterity',
  [AbilityType.CON]: 'Constitution',
  [AbilityType.INT]: 'Intelligence',
  [AbilityType.WIS]: 'Wisdom',
  [AbilityType.CHA]: 'Charisma',
}

export function deriveData(data: DnD5eData): DnD5eDerivedData {
  const derived = {
    abilityScores: mapObject(data.abilityScores, (base: number, type: AbilityType) => ({
      modifier: Math.floor((base - 10) / 2),
      name: abilityNames[type],
    })),
    armorClass: data.armorClass,
    speed: data.speed,
  } as Partial<DnD5eDerivedData>

  for (const modifier of data.effects.flatMap(o => o.modifiers))
    try {
      // TODO Define modifier order
      const value = Parser.evaluate(modifier.expr.toUpperCase(), {
        STR: derived.abilityScores[AbilityType.STR].modifier,
        DEX: derived.abilityScores[AbilityType.DEX].modifier,
        CON: derived.abilityScores[AbilityType.CON].modifier,
        INT: derived.abilityScores[AbilityType.INT].modifier,
        WIS: derived.abilityScores[AbilityType.WIS].modifier,
        CHA: derived.abilityScores[AbilityType.CHA].modifier,
        AC: derived.armorClass,
        SPEED: derived.speed,
      })

      switch (modifier.stat) {
        case OtherStats.AC:
          derived.armorClass = value
          break
        case OtherStats.SPEED:
          derived.speed = value
          break
        default:
          derived.abilityScores[modifier.stat].modifier = value
          break
      }
    } catch (e) {
      // TODO display errors to user
    }

  function getSkillModifier(ability: AbilityType, type: SkillProficiencyType) {
    return (
      derived.abilityScores[ability].modifier +
      (type == SkillProficiencyType.Proficient
        ? data.proficiency
        : type == SkillProficiencyType.Expertise
        ? data.proficiency * 2
        : type == SkillProficiencyType.JackOfAllTrades
        ? Math.floor(data.proficiency / 2)
        : 0)
    )
  }

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
    ...derived,

    savingThrows: mapObject(data.savingThrows, (proficient: boolean, type: AbilityType) => ({
      modifier: derived.abilityScores[type].modifier + (proficient ? data.proficiency : 0),
      name: abilityNames[type],
    })),

    tools: data.tools.map(tool => ({
      ability: abilityNames[tool.ability],
      modifier: getSkillModifier(tool.ability, tool.proficient),
    })),

    skills: {
      acrobatics: {
        name: 'Acrobatics (Dex)',
        modifier: getSkillModifier(AbilityType.DEX, data.skills.acrobatics),
      },
      animalHandling: {
        name: 'Animal Handling (Wis)',
        modifier: getSkillModifier(AbilityType.WIS, data.skills.animalHandling),
      },
      arcana: {
        name: 'Arcana (Int)',
        modifier: getSkillModifier(AbilityType.INT, data.skills.arcana),
      },
      athletics: {
        name: 'Athletics (Str)',
        modifier: getSkillModifier(AbilityType.STR, data.skills.athletics),
      },
      deception: {
        name: 'Deception (Cha)',
        modifier: getSkillModifier(AbilityType.CHA, data.skills.deception),
      },
      history: {
        name: 'History (Int)',
        modifier: getSkillModifier(AbilityType.INT, data.skills.history),
      },
      insight: {
        name: 'Insight (Wis)',
        modifier: getSkillModifier(AbilityType.WIS, data.skills.insight),
      },
      intimidation: {
        name: 'Medicine (Wis)',
        modifier: getSkillModifier(AbilityType.WIS, data.skills.intimidation),
      },
      investigation: {
        name: 'Investigation (Int)',
        modifier: getSkillModifier(AbilityType.INT, data.skills.investigation),
      },
      medicine: {
        name: 'Medicine (Wis)',
        modifier: getSkillModifier(AbilityType.WIS, data.skills.medicine),
      },
      nature: {
        name: 'Nature (Int)',
        modifier: getSkillModifier(AbilityType.INT, data.skills.nature),
      },
      perception: {
        name: 'Perception (Wis)',
        modifier: getSkillModifier(AbilityType.WIS, data.skills.perception),
      },
      performance: {
        name: 'Performance (Cha)',
        modifier: getSkillModifier(AbilityType.CHA, data.skills.performance),
      },
      persuasion: {
        name: 'Persuasion (Cha)',
        modifier: getSkillModifier(AbilityType.CHA, data.skills.persuasion),
      },
      religion: {
        name: 'Religion (Int)',
        modifier: getSkillModifier(AbilityType.INT, data.skills.religion),
      },
      sleightOfHand: {
        name: 'Sleight of Hand (Dex)',
        modifier: getSkillModifier(AbilityType.DEX, data.skills.sleightOfHand),
      },
      stealth: {
        name: 'Stealth (Dex)',
        modifier: getSkillModifier(AbilityType.DEX, data.skills.stealth),
      },
      survival: {
        name: 'Survival (Wis)',
        modifier: getSkillModifier(AbilityType.WIS, data.skills.survival),
      },
    },

    attacks: data.attacks.map(attack => ({
      attackModifier:
        derived.abilityScores[attack.attackAbility].modifier +
        attack.attackModifier +
        (attack.proficient ? data.proficiency : 0),
      fullDamageRoll: `${attack.damageRoll}+${
        derived.abilityScores[attack.damageAbility].modifier + attack.damageModifier
      }`,
    })),

    coin: {
      copper,
      silver,
      electrum,
      gold,
      platinum,
    },

    totalWeight: data.equipment.reduce((val, item) => val + item.weight, 0),
  } as DnD5eDerivedData
}
