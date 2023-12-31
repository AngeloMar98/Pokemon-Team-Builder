export type Type =
  | "bug"
  | "dark"
  | "dragon"
  | "electric"
  | "fairy"
  | "fighting"
  | "fire"
  | "flying"
  | "ghost"
  | "grass"
  | "ground"
  | "ice"
  | "normal"
  | "poison"
  | "psychic"
  | "rock"
  | "steel"
  | "water";

export type MoveCategory = "physical" | "special" | "status";

export type GenerationNum =
  | "i"
  | "ii"
  | "iii"
  | "iv"
  | "v"
  | "vi"
  | "vii"
  | "viii"
  | "ix";

export interface Move {
  name: String;
  type: String;
  power?: Number | null;
  accuracy?: Number | null;
  category?: MoveCategory;
  effect?: String;
}

export interface Ability {
  effect?: String;
  name: String;
}

export interface Pokemon {
  name: String;
  originId?: Number;
  id: Number;
  gen?: GenerationNum;
  types: Type[];
  fullEvo?: boolean;
  forms?: boolean;
  typeChoice?: boolean;
  uniqueid: number;

  teachableMoves?: Move[];
  possibleAbilities?: Ability[];
  move1?: Move;
  move2?: Move;
  move3?: Move;
  move4?: Move;
  ability?: Ability;
}

export interface Generation {
  gen: GenerationNum;
  list: Pokemon[];
}
export interface Stat {
  type: string;
  value: number;
}

export interface Team {
  teamName: String;
  teamMembers: Pokemon[];
  teamID?: number;
  teamDefense: Array<Stat[]>;
  teamOffense: Array<Stat[]>;
}
