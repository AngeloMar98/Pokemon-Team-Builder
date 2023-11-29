import {
  Type,
  MoveCategory,
  Generation,
  GenerationNum,
  Move,
  Ability,
  Pokemon,
  Team,
  Stat,
} from "./interfaces.js";

import * as pokedex from "./pokèdex/pokedex.js";
import forms from "./pokèdex/forms.js";
import megas from "./pokèdex/megas.js";
import variants from "./pokèdex/variants.js";
import { async } from "regenerator-runtime";

const formsId: (Number | undefined)[] = forms
  .map((formPokemon) => formPokemon.originId)
  .filter((id) => id !== undefined);
const megasId: (Number | undefined)[] = megas
  .map((megaPokemon) => megaPokemon.originId)
  .filter((id) => id !== undefined);

const teamDefense: Array<Stat[]> = [];
const teamOffense: Array<Stat[]> = [];

const searchResults: Pokemon[] = [];
const savedTeams: Team[] = [];
const currentTeam: Team = {
  teamName: "Team name",
  teamMembers: [],
  teamID: 0,
  teamDefense: [],
  teamOffense: [],
};

let cycleCount = 0;

let currentTeamSavedId: number = 0;
let teamIDstart: number = 0;
let uniqueid: number = 0;
export const state = {
  searchResults,
  savedTeams,
  currentTeam,
  cycleCount,

  currentTeamSavedId,
  teamIDstart,
  uniqueid,
};

const fetchPokemon = async function (id: number) {
  try {
    const pokemon = await fetchData(`https://pokeapi.co/api/v2/pokemon/${id}`);

    const moves = await fetchMoves(pokemon.moves);

    const abilities = await fetchAbilities(pokemon.abilities);

    const fullPokemon: Pokemon = {
      name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
      id: pokemon.id,
      types: pokemon.types.map((type: any) => type.type.name),
      teachableMoves: moves,
      possibleAbilities: abilities,
      typeChoice:
        pokemon.name === "arceus" || pokemon.name === "silvally" || false,
      move1: {
        name: "",
        type: "",
      },
      move2: {
        name: "",
        type: "",
      },
      move3: {
        name: "",
        type: "",
      },
      move4: {
        name: "",
        type: "",
      },
      ability: {
        name: "",
      },
      uniqueid: state.uniqueid,
    };
    state.uniqueid++;
    return fullPokemon;
  } catch (error) {
    console.error("Failed pokèmon fetching");
    throw error;
  }
};

const fetchData = async function (url: string) {
  try {
    const data = await fetch(url);

    const result = await data.json();

    return result;
  } catch (error) {
    throw new Error("Failed fetching");
  }
};

const fetchAbilities = async function (abilities: Array<any> = []) {
  try {
    const abilitiesFull = await Promise.all(
      abilities.map(async (ability) => await fetchData(ability.ability.url))
    );

    const abilitiesDetailed: Ability[] = abilitiesFull.map(
      (abilityFull): Ability => {
        return {
          effect:
            abilityFull.effect_entries.length > 0
              ? abilityFull
                  .effect_entries!.find(
                    (entry: any) => entry.language.name === "en"
                  )
                  .short_effect.replaceAll("\n", " ")
              : "",
          name:
            abilityFull.name.charAt(0).toUpperCase() +
              abilityFull.name.replaceAll("-", " ").slice(1) || "",
        };
      }
    );
    return abilitiesDetailed;
  } catch (error) {
    console.error("Failed abilities fetching");
    return [];
  }
};

const fetchMoves = async function (moves: Array<any> = []) {
  try {
    const movesFull = await Promise.all(
      moves.map(async (move) => await fetchData(move.move.url))
    );

    const movesDetailed: Move[] = movesFull.map((moveFull): Move => {
      return {
        category: moveFull.damage_class.name,
        effect:
          moveFull.effect_entries.length > 0
            ? moveFull
                .effect_entries!.find(
                  (entry: any) => entry.language.name === "en"
                )
                .short_effect.replaceAll("\n", " ")
                .replace("$effect_chance%", moveFull.effect_chance + "%")
            : "",
        name:
          moveFull.name.charAt(0).toUpperCase() +
            moveFull.name.replaceAll("-", " ").slice(1) || "",
        accuracy: moveFull.accuracy,
        power: moveFull.power,
        type: moveFull.type.name,
      };
    });

    return movesDetailed;
  } catch (error) {
    console.error("Failed moves fetching");
    return [];
  }
};

class PokedexFilter {
  filterAll(
    pokedex: any,
    megas: any,
    megasId: (Number | undefined)[],
    forms: any,
    formsId: (Number | undefined)[],
    types: Type[],
    variants: any,
    generations: GenerationNum[],
    fullEvo: boolean,
    name: string
  ) {
    const filteredGens = generations.flatMap((gen) => pokedex[gen].list);
    const filteredEvo = fullEvo
      ? this.filterFullEvo(filteredGens)
      : filteredGens;
    const addedMega = generations.includes("vi")
      ? this.addMega(filteredEvo, megasId, megas)
      : filteredEvo;
    const addedForms = this.addForms(addedMega, formsId, forms);
    const addedVariants = this.addVariants(
      addedForms,
      variants,
      generations,
      fullEvo
    );
    const filteredTypes = this.filterTypes(addedVariants, types);
    const filteredNames = this.filterNames(
      filteredTypes,
      name.replace(/\s/g, "")
    );

    return filteredNames;
  }

  filterGens(pokemonList: Pokemon[], generations: GenerationNum[]) {
    return pokemonList
      .filter(
        (pokemon) =>
          pokemon.gen !== undefined && generations.includes(pokemon.gen)
      )
      .slice();
  }

  filterFullEvo(pokemonList: Pokemon[]) {
    return pokemonList.filter((pokemon) => pokemon.fullEvo === true).slice();
  }

  filterTypes(pokemonList: Pokemon[], types: Type[]) {
    return pokemonList
      .slice()
      .filter(
        (pokemon) =>
          types.includes(pokemon.types[0]) ||
          (pokemon.types[1] !== undefined && types.includes(pokemon.types[1]))
      )
      .slice();
  }

  filterNames(pokemonList: Pokemon[], name: string) {
    return pokemonList
      .filter((pokemon) =>
        pokemon.name.toLowerCase().includes(name.toLowerCase())
      )
      .slice();
  }

  addExtra(
    originalPokemonList: Pokemon[],
    extrasId: (Number | undefined)[],
    extraPokemonList: Pokemon[]
  ) {
    const pokemonList = originalPokemonList.slice();

    originalPokemonList.forEach((pokemon) => {
      const currentId = pokemon.id;

      if (extraPokemonList.length === 0) return;

      if (pokemon.forms === true && extrasId.includes(currentId)) {
        //store the extras
        let currentPokemonExtras = extraPokemonList.filter(
          (formPokemon) => formPokemon.originId === currentId
        );

        // find current pokèmon array index
        const pokemonIndex = pokemonList.findIndex(
          (pokemon) => pokemon.id === currentId
        );

        currentPokemonExtras.forEach((form) => {
          form !== undefined && pokemonList.splice(pokemonIndex + 1, 0, form);
        });
      }
    });

    return pokemonList.slice();
  }

  addForms(
    pokemonList: Pokemon[],
    formsId: (Number | undefined)[],
    formsPokemonList: Pokemon[]
  ) {
    return this.addExtra(pokemonList.slice(), formsId, formsPokemonList);
  }

  addVariants(
    originalPokemonList: Pokemon[],
    originalVariantsPokemonList: Pokemon[],
    generations: GenerationNum[] = [],
    fullEvo: boolean = false
  ) {
    let pokemonList = originalPokemonList.slice();
    let variantsPokemonList = this.filterGens(
      originalVariantsPokemonList.slice(),
      generations
    );

    if (fullEvo) variantsPokemonList = this.filterFullEvo(variantsPokemonList);

    if (variantsPokemonList.length === 0) return pokemonList.slice();

    const variantsOriginId: (Number | undefined)[] = variantsPokemonList.map(
      (variantPokemon) => variantPokemon.originId
    );

    const variantsId: (Number | undefined)[] = variantsPokemonList.map(
      (variantPokemon) => variantPokemon.id
    );

    const pokemonListId: (Number | undefined)[] = pokemonList.map(
      (pokemon) => pokemon.id
    );

    variantsOriginId.forEach((variantOriginId) => {
      // if the original ID of the variant is there, you put it after, like mega and forms

      if (pokemonListId.includes(variantOriginId)) {
        pokemonList = this.addExtra(
          pokemonList,
          [variantOriginId],
          variantsPokemonList
        );
      }
      // instead if there is no original ID in the list, we just add it as last entry in the gen
      else {
        const variantToAdd = variantsPokemonList.find(
          (pokemon) => pokemon.originId === variantOriginId
        );
        if (variantToAdd!.gen !== undefined && variantToAdd !== undefined) {
          const index = this.findLastGenIndex(pokemonList, variantToAdd.gen);
          if (index === -1) return;
          pokemonList.splice(index + 1, 0, variantToAdd);
        }
      }
    });

    return pokemonList.slice();
  }

  addMega(
    pokemonList: Pokemon[],
    megasId: (Number | undefined)[],
    megasPokemonList: Pokemon[]
  ) {
    return this.addExtra(pokemonList.slice(), megasId, megasPokemonList);
  }

  findLastGenIndex(originalPokemonList: Pokemon[], gen: string) {
    return originalPokemonList.findIndex(
      (pokemon) =>
        pokemon.name ===
        originalPokemonList
          .slice()
          .reverse()
          .find((pokemon) => pokemon.gen === gen)!.name
    );
  }
}

const pokedexFilter = new PokedexFilter();

const calcTeamStats = async function (teamMembers: Pokemon[]) {
  const teamDefense: Array<Stat[]> = [];
  const teamOffense: Array<Stat[]> = [];
  for await (const pokemon of teamMembers) {
    const stats = await calcStats(pokemon.types);
    teamDefense.push(stats.defencePokemon);
    teamOffense.push(stats.offensePokemon);
  }

  return { teamDefense, teamOffense };
};

const calcStats = async function (types: Type[]) {
  const defencePokemon: Stat[] = [];
  const offensePokemon: Stat[] = [];
  try {
    for await (const type of types) {
      const data = await fetchData(`https://pokeapi.co/api/v2/type/${type}/`);
      const typeInfo = data.damage_relations;

      typeInfo.double_damage_from.forEach((dmgCheck: any) => {
        const defType = defencePokemon.find(
          (el: Stat) => el.type === dmgCheck.name
        );

        defType
          ? (defType.value = defType.value * 2)
          : defencePokemon.push({
              type: dmgCheck.name,
              value: 2,
            });
      });

      typeInfo.half_damage_from.forEach((dmgCheck: any) => {
        const defType = defencePokemon.find(
          (el: Stat) => el.type === dmgCheck.name
        );

        defType
          ? (defType.value = defType.value / 2)
          : defencePokemon.push({
              type: dmgCheck.name,
              value: 0.5,
            });
      });

      typeInfo.no_damage_from.forEach((dmgCheck: any) => {
        const defType = defencePokemon.find(
          (el: Stat) => el.type === dmgCheck.name
        );

        defType
          ? (defType.value = defType.value * 0)
          : defencePokemon.push({
              type: dmgCheck.name,
              value: 0,
            });
      });

      typeInfo.double_damage_to.forEach((dmgCheck: any) => {
        const offType = offensePokemon.find(
          (el: Stat) => el.type === dmgCheck.name
        );

        if (!offType) {
          offensePokemon.push({
            type: dmgCheck.name,
            value: 2,
          });
        }
      });
    }
  } catch (error) {
    console.error("Failed type chart fetching");
  }
  return { defencePokemon, offensePokemon };
};

const setLocalStorage = function () {
  if (state.savedTeams.length === 0) state.uniqueid = 0;
  localStorage.setItem("savedTeams", JSON.stringify([...state.savedTeams]));
  localStorage.setItem("teamIDstart", JSON.stringify(state.teamIDstart));
  localStorage.setItem("uniqueid", JSON.stringify(state.uniqueid));
};

export const addTeamMember = async function (id: number) {
  try {
    const fullPokemon = await fetchPokemon(id);

    // when max lenght is reached, find oldest member and filter it out
    if (state.currentTeam.teamMembers?.length === 6) {
      state.currentTeam.teamMembers = state.currentTeam.teamMembers.filter(
        (teamMember) =>
          teamMember.uniqueid !==
          Math.min(
            ...state.currentTeam.teamMembers.map(
              (teamMember) => teamMember.uniqueid
            )
          )
      );
    }

    state.currentTeam.teamMembers?.push(fullPokemon);
  } catch (error) {
    console.error("Failed pokèmon fetching");
  }
};

export const getLocalStorage = function () {
  const previousSavedTeams = localStorage.getItem("savedTeams");
  const previousTeamIDstart = localStorage.getItem("teamIDstart") || "";
  const previousUniqueid = localStorage.getItem("uniqueid") || "";

  if (previousSavedTeams && previousTeamIDstart && previousUniqueid) {
    state.savedTeams = JSON.parse(previousSavedTeams);
    state.teamIDstart = Number(JSON.parse(previousTeamIDstart));
    state.uniqueid = Number(JSON.parse(previousUniqueid));
  }
};

export const saveCurrentTeam = function () {
  state.currentTeam.teamID = state.teamIDstart;
  // change id for next saving
  state.teamIDstart++;
  state.savedTeams.push(state.currentTeam);
  setLocalStorage();
};

export const cleanCurrentTeam = function () {
  state.currentTeam = {
    teamName: "Team name",
    teamMembers: [],
    teamDefense: [],
    teamOffense: [],
  };
};

export const updateTeamMember = function (
  name: string,
  type: string,
  slotType: string,
  memberNum: number
) {
  const slot = slotType === "ability" ? "ability" : `move${slotType}`;
  const teamMember = state.currentTeam.teamMembers[Number(memberNum) - 1];

  if (
    slot === "move1" ||
    slot === "move2" ||
    slot === "move3" ||
    slot === "move4"
  ) {
    for (let i = 1; i < 5; i++) {
      const move: string = `move${i}`;
      if (
        move === "move1" ||
        move === "move2" ||
        move === "move3" ||
        move === "move4"
      ) {
        if (teamMember[move]!.name.trim() === name) {
          teamMember[move]!.name = "";
          teamMember[move]!.type = "";
        }
      }
    }

    teamMember[slot] = {
      name: name,
      type: type,
    };
  }
  if (slot === "ability") {
    teamMember[slot] = {
      name: name,
    };
  }

  return { name, type, slotType, memberNum };
};

export const changeType = async function (currUniqueid: number, type: Type) {
  const pos = state.currentTeam.teamMembers.findIndex(
    (teamMember) => teamMember.uniqueid === currUniqueid
  );
  state.currentTeam.teamMembers[pos].types[0] = type;
  const stats = await calcStats([type]);
  state.currentTeam.teamOffense[pos] = stats.offensePokemon;
  state.currentTeam.teamDefense[pos] = stats.defencePokemon;
};

export const eliminateTeamMember = function (eliUniqueid: number) {
  const delPosNum = state.currentTeam.teamMembers.findIndex(
    (teamMember) => teamMember.uniqueid === eliUniqueid
  );

  state.currentTeam.teamMembers.splice(delPosNum, 1);
  state.currentTeam.teamDefense.splice(delPosNum, 1);
  state.currentTeam.teamOffense.splice(delPosNum, 1);
};

export const changeCurrentTeamName = function (newName: string) {
  state.currentTeam.teamName = newName;
};

export const setCurrentTeamStats = async function (teamMembers: Pokemon[]) {
  const stats = await calcTeamStats(teamMembers);

  state.currentTeam.teamDefense = stats.teamDefense;
  state.currentTeam.teamOffense = stats.teamOffense;
};

export const retrieveSavedTeam = function () {
  state.currentTeam = state.savedTeams.find(
    (savedTeam: Team) =>
      Number(savedTeam.teamID) === Number(state.currentTeamSavedId)
  ) || {
    teamName: "Team name",
    teamMembers: [],
    teamID: 0,
    teamDefense: [],
    teamOffense: [],
  };
};

export const updateCurrentSavedTeam = function () {
  let team = state.savedTeams.find(
    (savedTeam: Team) =>
      Number(savedTeam.teamID) === Number(state.currentTeamSavedId)
  );
  team = state.currentTeam;
  setLocalStorage();
};

export const eliminateCurrentSavedTeam = function () {
  state.savedTeams = state.savedTeams.filter(
    (savedTeam: Team) =>
      Number(savedTeam.teamID) !== Number(state.currentTeamSavedId)
  );

  setLocalStorage();
};

export const filterAll = function (
  types: Type[],
  generations: GenerationNum[],
  fullEvo: boolean,
  name: string
) {
  state.searchResults = pokedexFilter.filterAll(
    pokedex,
    megas,
    megasId,
    forms,
    formsId,
    types,
    variants,
    generations,
    fullEvo,
    name
  );
};
