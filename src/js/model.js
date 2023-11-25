var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as pokedex from "./pokèdex/pokedex.js";
import forms from "./pokèdex/forms.js";
import megas from "./pokèdex/megas.js";
import variants from "./pokèdex/variants.js";
const formsId = forms.map((formPokemon) => formPokemon.originId);
const megasId = megas.map((megaPokemon) => megaPokemon.originId);
const searchResults = [];
const savedTeams = [];
const currentTeam = {
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
const addTeamMember = function (pokemon) {
    var _a, _b;
    if (((_a = state.currentTeam.teamMembers) === null || _a === void 0 ? void 0 : _a.length) === 6) {
        state.currentTeam.teamMembers[state.cycleCount] = pokemon;
        state.cycleCount = state.cycleCount >= 5 ? 0 : state.cycleCount + 1;
        return;
    }
    (_b = state.currentTeam.teamMembers) === null || _b === void 0 ? void 0 : _b.push(pokemon);
};
const fetchData = function (url) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetch(url);
        const result = yield data.json();
        return result;
    });
};
export const fetchPokemon = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pokemon = yield fetchData(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const moves = yield fetchMoves(pokemon.moves);
            const abilities = yield fetchAbilities(pokemon.abilities);
            const fullPokemon = {
                name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
                id: pokemon.id,
                types: pokemon.types.map((type) => type.type.name),
                teachableMoves: moves,
                possibleAbilities: abilities,
                typeChoice: pokemon.name === "arceus" || pokemon.name === "silvally" || false,
            };
            addTeamMember(fullPokemon);
            state.currentTeamAdd =
                state.currentTeamAdd > 5 ? 1 : state.currentTeamAdd + 1;
        }
        catch (error) {
            console.error(error);
        }
    });
};
const fetchAbilities = function (abilities = []) {
    return __awaiter(this, void 0, void 0, function* () {
        const abilitiesFull = yield Promise.all(abilities.map((ability) => __awaiter(this, void 0, void 0, function* () { return yield fetchData(ability.ability.url); })));
        const abilitiesDetailed = abilitiesFull.map((abilityFull) => {
            console.log(abilityFull);
            return {
                effect: abilityFull.effect_entries.length > 0
                    ? abilityFull
                        .effect_entries.find((entry) => entry.language.name === "en")
                        .short_effect.replaceAll("\n", " ")
                    : "",
                name: abilityFull.name.charAt(0).toUpperCase() +
                    abilityFull.name.replaceAll("-", " ").slice(1) || "",
            };
        });
        console.log(abilitiesDetailed);
        return abilitiesDetailed;
    });
};
const fetchMoves = function (moves = []) {
    return __awaiter(this, void 0, void 0, function* () {
        const movesFull = yield Promise.all(moves.map((move) => __awaiter(this, void 0, void 0, function* () { return yield fetchData(move.move.url); })));
        const movesDetailed = movesFull.map((moveFull) => {
            return {
                category: moveFull.damage_class.name,
                effect: moveFull.effect_entries.length > 0
                    ? moveFull
                        .effect_entries.find((entry) => entry.language.name === "en")
                        .short_effect.replaceAll("\n", " ")
                        .replace("$effect_chance%", moveFull.effect_chance + "%")
                    : "",
                name: moveFull.name.charAt(0).toUpperCase() +
                    moveFull.name.replaceAll("-", " ").slice(1) || "",
                accuracy: moveFull.accuracy,
                power: moveFull.power,
                type: moveFull.type.name,
            };
        });
        return movesDetailed;
    });
};
class PokedexFilter {
    filterAll(types, generations, fullEvo, name) {
        const filteredGens = generations.flatMap((gen) => pokedex[gen].list);
        const filteredEvo = fullEvo
            ? this.filterFullEvo(filteredGens)
            : filteredGens;
        const addedMega = generations.includes("vi")
            ? this.addMega(filteredEvo, megasId, megas)
            : filteredEvo;
        const addedForms = this.addForms(addedMega, formsId, forms);
        const addedVariants = this.addVariants(addedForms, variants, generations, fullEvo);
        const filteredTypes = this.filterTypes(addedVariants, types);
        const filteredNames = this.filterNames(filteredTypes, name.replace(/\s/g, ""));
        state.searchResults = filteredNames;
    }
    filterGens(pokemonList, generations) {
        return pokemonList
            .filter((pokemon) => pokemon.gen !== undefined && generations.includes(pokemon.gen))
            .slice();
    }
    filterFullEvo(pokemonList) {
        return pokemonList.filter((pokemon) => pokemon.fullEvo === true).slice();
    }
    filterTypes(pokemonList, types) {
        return pokemonList
            .slice()
            .filter((pokemon) => types.includes(pokemon.types[0]) ||
            (pokemon.types[1] !== undefined && types.includes(pokemon.types[1])))
            .slice();
    }
    filterNames(pokemonList, name) {
        return pokemonList.filter((pokemon) => pokemon.name.includes(name)).slice();
    }
    addExtra(originalPokemonList, extrasId, extraPokemonList) {
        const pokemonList = originalPokemonList.slice();
        originalPokemonList.forEach((pokemon) => {
            const currentId = pokemon.id;
            if (extraPokemonList.length === 0)
                return;
            if (pokemon.forms === true && extrasId.includes(currentId)) {
                //store the extras
                let currentPokemonExtras = extraPokemonList.filter((formPokemon) => formPokemon.originId === currentId);
                // find current pokèmon array index
                const pokemonIndex = pokemonList.findIndex((pokemon) => pokemon.id === currentId);
                currentPokemonExtras.forEach((form) => {
                    form !== undefined && pokemonList.splice(pokemonIndex + 1, 0, form);
                });
            }
        });
        return pokemonList.slice();
    }
    addForms(pokemonList, formsId, formsPokemonList) {
        return this.addExtra(pokemonList.slice(), formsId, formsPokemonList);
    }
    addVariants(originalPokemonList, originalVariantsPokemonList, generations = [], fullEvo = false) {
        let pokemonList = originalPokemonList.slice();
        let variantsPokemonList = this.filterGens(originalVariantsPokemonList.slice(), generations);
        if (fullEvo)
            variantsPokemonList = this.filterFullEvo(variantsPokemonList);
        if (variantsPokemonList.length === 0)
            return pokemonList.slice();
        const variantsOriginId = variantsPokemonList.map((variantPokemon) => variantPokemon.originId);
        const variantsId = variantsPokemonList.map((variantPokemon) => variantPokemon.id);
        const pokemonListId = pokemonList.map((pokemon) => pokemon.id);
        variantsOriginId.forEach((variantOriginId) => {
            // if the original ID of the variant is there, you put it after, like mega and forms
            if (pokemonListId.includes(variantOriginId)) {
                pokemonList = this.addExtra(pokemonList, [variantOriginId], variantsPokemonList);
            }
            // instead if there is no original ID in the list, we just add it as last entry in the gen
            else {
                const variantToAdd = variantsPokemonList.find((pokemon) => pokemon.originId === variantOriginId);
                if (variantToAdd.gen !== undefined && variantToAdd !== undefined) {
                    const index = this.findLastGenIndex(pokemonList, variantToAdd.gen);
                    if (index === -1)
                        return;
                    pokemonList.splice(index + 1, 0, variantToAdd);
                }
            }
        });
        return pokemonList.slice();
    }
    addMega(pokemonList, megasId, megasPokemonList) {
        return this.addExtra(pokemonList.slice(), megasId, megasPokemonList);
    }
    findLastGenIndex(originalPokemonList, gen) {
        return originalPokemonList.findIndex((pokemon) => pokemon.name ===
            originalPokemonList
                .slice()
                .reverse()
                .find((pokemon) => pokemon.gen === gen).name);
    }
}
export const pokedeFilter = new PokedexFilter();
export const loadPokemon = function (id) {
    return __awaiter(this, void 0, void 0, function* () { });
};
