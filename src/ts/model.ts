import {
  Type,
  MoveCategory,
  Generation,
  GenerationNum,
  Move,
  Ability,
  Pokemon,
  Team,
} from "./interfaces.js";

import * as pokedex from "./pokèdex/pokedex.js";
import forms from "./pokèdex/forms.js";
import megas from "./pokèdex/megas.js";
import variants from "./pokèdex/variants.js";

console.log(forms);
console.log(megas);
console.log(variants);
const searchResults: Pokemon[] = [];
const savedTeams: Team[] = [];
const currentTeam: Team = {
  teamName: "Team name",
  teamMembers: [],
};

let cycleCount = 0;
let currentTeamAdd = 0;
export const state = {
  searchResults,
  savedTeams,
  currentTeam,
  cycleCount,
  currentTeamAdd,
};

const addTeamMember = function (pokemon: Pokemon) {
  if (state.currentTeam.teamMembers?.length === 6) {
    state.currentTeam.teamMembers[state.cycleCount] = pokemon;
    state.cycleCount = state.cycleCount >= 5 ? 0 : state.cycleCount + 1;

    return;
  }

  state.currentTeam.teamMembers?.push(pokemon);
};

const fetchData = async function (url: string) {
  const data = await fetch(url);

  const result = await data.json();

  return result;
};

export const fetchPokemon = async function (id: number) {
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
    };

    addTeamMember(fullPokemon);
    state.currentTeamAdd =
      state.currentTeamAdd > 5 ? 1 : state.currentTeamAdd + 1;
  } catch (error) {
    console.error(error);
  }
};

const fetchAbilities = async function (abilities: Array<any> = []) {
  const abilitiesFull = await Promise.all(
    abilities.map(async (ability) => await fetchData(ability.ability.url))
  );

  const abilitiesDetailed: Ability[] = abilitiesFull.map(
    (abilityFull): Ability => {
      console.log(abilityFull);
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
  console.log(abilitiesDetailed);
  return abilitiesDetailed;
};

const fetchMoves = async function (moves: Array<any> = []) {
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
};

class PokedexFilter {
  formsId: (Number | undefined)[];
  megasId: (Number | undefined)[];

  constructor() {
    this.formsId = forms.map((formPokemon) => formPokemon.originId);
    this.megasId = megas.map((megaPokemon) => megaPokemon.originId);
  }

  filterAll(
    types: Type[],
    generations: GenerationNum[],
    fullEvo: boolean,
    name: string
  ) {
    const filteredGens = generations.flatMap((gen) => pokedex[gen].list);
    const filteredEvo = fullEvo
      ? this.filterFullEvo(filteredGens)
      : filteredGens;
    const addedMega = generations.includes("vi")
      ? this.addMega(filteredEvo, this.megasId, megas)
      : filteredEvo;
    const addedForms = this.addForms(addedMega, this.formsId, forms);
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

    state.searchResults = filteredNames;
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
    return pokemonList.filter((pokemon) => pokemon.name.includes(name)).slice();
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

export const pokedeFilter = new PokedexFilter();

export const loadPokemon = async function (id: number) {};
