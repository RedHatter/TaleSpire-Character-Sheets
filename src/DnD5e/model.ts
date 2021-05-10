import { debounce } from '../utils'
import { writable, Writable, Subscriber } from 'svelte/store'

export enum DiceType {
  D4,
  D6,
  D8,
  D10,
  D12,
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

  traits: string = ''
  ideals: string = ''
  bonds: string = ''
  flaws: string = ''

  trackers: Array<Tracker> = [new Tracker('Class Resource'), new Tracker('Other Resource')]
  trackers: Array<Tracker> = []
  features: Array<Feature> = []
}

export const data = writable((JSON.parse(window.localStorage.getItem('data')) ?? new DnD5eData()) as DnD5eData)
data.subscribe(
  debounce(data => window.localStorage.setItem('$data', JSON.stringify(data)), 1000) as Subscriber<DnD5eData>
)
