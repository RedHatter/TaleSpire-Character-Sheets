export enum DiceType {
  D4, D6, D8, D10, D12
}

export class Feature {
  name: String
  origin: String
  description: String
}

export class Tracker {
  name: String
  max: number
  current: number
}

export class DnD5eData {
  name: string = ""
  playerClass: string = ""
  level: number = 1
  background: string = ""
  race: string = ""
  alignment: string = ""
  exp: number = 0

  strength: number = 10
  dexterity: number = 10
  constitution: number = 10
  intelligence: number = 10
  wisdom: number = 10
  charisma: number = 10

  inspiration: boolean = false 
  proficiency: number = 2

  savingThrows = {
    strength: false,
    dexterity: false,
    constitution: false,
    intelligence: false,
    wisdom: false,
    charisma: false,
  }

  skills = {
    acrobatics: false,
    animalHandling:false,
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

  traits: string = ''
  ideals: string = ''
  bonds: string = ''
  flaws: string = ''

  trackers: Array<Tracker> = []
  features: Array<Feature> = []
}