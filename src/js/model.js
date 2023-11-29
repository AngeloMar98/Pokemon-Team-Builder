var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import * as pokedex from "./pokèdex/pokedex.js";
import forms from "./pokèdex/forms.js";
import megas from "./pokèdex/megas.js";
import variants from "./pokèdex/variants.js";
const formsId = forms
    .map((formPokemon) => formPokemon.originId)
    .filter((id) => id !== undefined);
const megasId = megas
    .map((megaPokemon) => megaPokemon.originId)
    .filter((id) => id !== undefined);
const teamDefense = [];
const teamOffense = [];
const searchResults = [];
const savedTeams = [];
const currentTeam = {
    teamName: "Team name",
    teamMembers: [],
    teamID: 0,
    teamDefense: [],
    teamOffense: [],
};
let cycleCount = 0;
let currentTeamSavedId = 0;
let teamIDstart = 0;
let uniqueid = 0;
export const state = {
    searchResults,
    savedTeams,
    currentTeam,
    cycleCount,
    currentTeamSavedId,
    teamIDstart,
    uniqueid,
};
const cleanString = function (word) {
    return word
        .toLowerCase()
        .replaceAll(" ", "")
        .replaceAll(".", "")
        .replaceAll("-", " ")
        .trim();
};
const fetchPokemon = function (id) {
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
        }
        catch (error) {
            console.error("Failed pokèmon fetching");
            throw error;
        }
    });
};
const fetchData = function (url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fetch(url);
            const result = yield data.json();
            return result;
        }
        catch (error) {
            throw new Error("Failed fetching");
        }
    });
};
const fetchAbilities = function (abilities = []) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const abilitiesFull = yield Promise.all(abilities.map((ability) => __awaiter(this, void 0, void 0, function* () { return yield fetchData(ability.ability.url); })));
            const abilitiesDetailed = abilitiesFull.map((abilityFull) => {
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
            return abilitiesDetailed;
        }
        catch (error) {
            console.error("Failed abilities fetching");
            return [];
        }
    });
};
const fetchMoves = function (moves = []) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
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
        }
        catch (error) {
            console.error("Failed moves fetching");
            return [];
        }
    });
};
class PokedexFilter {
    filterAll(pokedex, megas, megasId, forms, formsId, types, variants, generations, fullEvo, name) {
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
        const filteredNames = this.filterNames(filteredTypes, name);
        return filteredNames;
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
        return pokemonList
            .filter((pokemon) => cleanString(pokemon.name).includes(cleanString(name)))
            .slice();
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
const pokedexFilter = new PokedexFilter();
const calcTeamStats = function (teamMembers) {
    var _a, teamMembers_1, teamMembers_1_1;
    var _b, e_1, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        const teamDefense = [];
        const teamOffense = [];
        try {
            for (_a = true, teamMembers_1 = __asyncValues(teamMembers); teamMembers_1_1 = yield teamMembers_1.next(), _b = teamMembers_1_1.done, !_b; _a = true) {
                _d = teamMembers_1_1.value;
                _a = false;
                const pokemon = _d;
                const stats = yield calcStats(pokemon.types);
                teamDefense.push(stats.defencePokemon);
                teamOffense.push(stats.offensePokemon);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_a && !_b && (_c = teamMembers_1.return)) yield _c.call(teamMembers_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return { teamDefense, teamOffense };
    });
};
const calcStats = function (types) {
    var _a, types_1, types_1_1;
    var _b, e_2, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        const defencePokemon = [];
        const offensePokemon = [];
        try {
            try {
                for (_a = true, types_1 = __asyncValues(types); types_1_1 = yield types_1.next(), _b = types_1_1.done, !_b; _a = true) {
                    _d = types_1_1.value;
                    _a = false;
                    const type = _d;
                    const data = yield fetchData(`https://pokeapi.co/api/v2/type/${type}/`);
                    const typeInfo = data.damage_relations;
                    typeInfo.double_damage_from.forEach((dmgCheck) => {
                        const defType = defencePokemon.find((el) => el.type === dmgCheck.name);
                        defType
                            ? (defType.value = defType.value * 2)
                            : defencePokemon.push({
                                type: dmgCheck.name,
                                value: 2,
                            });
                    });
                    typeInfo.half_damage_from.forEach((dmgCheck) => {
                        const defType = defencePokemon.find((el) => el.type === dmgCheck.name);
                        defType
                            ? (defType.value = defType.value / 2)
                            : defencePokemon.push({
                                type: dmgCheck.name,
                                value: 0.5,
                            });
                    });
                    typeInfo.no_damage_from.forEach((dmgCheck) => {
                        const defType = defencePokemon.find((el) => el.type === dmgCheck.name);
                        defType
                            ? (defType.value = defType.value * 0)
                            : defencePokemon.push({
                                type: dmgCheck.name,
                                value: 0,
                            });
                    });
                    typeInfo.double_damage_to.forEach((dmgCheck) => {
                        const offType = offensePokemon.find((el) => el.type === dmgCheck.name);
                        if (!offType) {
                            offensePokemon.push({
                                type: dmgCheck.name,
                                value: 2,
                            });
                        }
                    });
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_a && !_b && (_c = types_1.return)) yield _c.call(types_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        catch (error) {
            console.error("Failed type chart fetching");
        }
        return { defencePokemon, offensePokemon };
    });
};
const setLocalStorage = function () {
    if (state.savedTeams.length === 0)
        state.uniqueid = 0;
    localStorage.setItem("savedTeams", JSON.stringify([...state.savedTeams]));
    localStorage.setItem("teamIDstart", JSON.stringify(state.teamIDstart));
    localStorage.setItem("uniqueid", JSON.stringify(state.uniqueid));
};
export const addTeamMember = function (id) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fullPokemon = yield fetchPokemon(id);
            // when max lenght is reached, find oldest member and filter it out
            if (((_a = state.currentTeam.teamMembers) === null || _a === void 0 ? void 0 : _a.length) === 6) {
                state.currentTeam.teamMembers = state.currentTeam.teamMembers.filter((teamMember) => teamMember.uniqueid !==
                    Math.min(...state.currentTeam.teamMembers.map((teamMember) => teamMember.uniqueid)));
            }
            (_b = state.currentTeam.teamMembers) === null || _b === void 0 ? void 0 : _b.push(fullPokemon);
        }
        catch (error) {
            console.error("Failed pokèmon fetching");
        }
    });
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
export const updateTeamMember = function (name, type, slotType, memberNum) {
    const slot = slotType === "ability" ? "ability" : `move${slotType}`;
    const teamMember = state.currentTeam.teamMembers[Number(memberNum) - 1];
    if (slot === "move1" ||
        slot === "move2" ||
        slot === "move3" ||
        slot === "move4") {
        for (let i = 1; i < 5; i++) {
            const move = `move${i}`;
            if (move === "move1" ||
                move === "move2" ||
                move === "move3" ||
                move === "move4") {
                if (teamMember[move].name.trim() === name) {
                    teamMember[move].name = "";
                    teamMember[move].type = "";
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
export const changeType = function (currUniqueid, type) {
    return __awaiter(this, void 0, void 0, function* () {
        const pos = state.currentTeam.teamMembers.findIndex((teamMember) => teamMember.uniqueid === currUniqueid);
        state.currentTeam.teamMembers[pos].types[0] = type;
        const stats = yield calcStats([type]);
        state.currentTeam.teamOffense[pos] = stats.offensePokemon;
        state.currentTeam.teamDefense[pos] = stats.defencePokemon;
    });
};
export const eliminateTeamMember = function (eliUniqueid) {
    const delPosNum = state.currentTeam.teamMembers.findIndex((teamMember) => teamMember.uniqueid === eliUniqueid);
    state.currentTeam.teamMembers.splice(delPosNum, 1);
    state.currentTeam.teamDefense.splice(delPosNum, 1);
    state.currentTeam.teamOffense.splice(delPosNum, 1);
};
export const changeCurrentTeamName = function (newName) {
    state.currentTeam.teamName = newName;
};
export const setCurrentTeamStats = function (teamMembers) {
    return __awaiter(this, void 0, void 0, function* () {
        const stats = yield calcTeamStats(teamMembers);
        state.currentTeam.teamDefense = stats.teamDefense;
        state.currentTeam.teamOffense = stats.teamOffense;
    });
};
export const retrieveSavedTeam = function () {
    state.currentTeam = state.savedTeams.find((savedTeam) => Number(savedTeam.teamID) === Number(state.currentTeamSavedId)) || {
        teamName: "Team name",
        teamMembers: [],
        teamID: 0,
        teamDefense: [],
        teamOffense: [],
    };
};
export const updateCurrentSavedTeam = function () {
    let team = state.savedTeams.find((savedTeam) => Number(savedTeam.teamID) === Number(state.currentTeamSavedId));
    team = state.currentTeam;
    setLocalStorage();
};
export const eliminateCurrentSavedTeam = function () {
    state.savedTeams = state.savedTeams.filter((savedTeam) => Number(savedTeam.teamID) !== Number(state.currentTeamSavedId));
    setLocalStorage();
};
export const filterAll = function (types, generations, fullEvo, name) {
    state.searchResults = pokedexFilter.filterAll(pokedex, megas, megasId, forms, formsId, types, variants, generations, fullEvo, name);
};
