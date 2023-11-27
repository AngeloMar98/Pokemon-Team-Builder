// /*
// USER STORIES:
// - Come utente voglio poter ricercare qualsiasi pokèmon con i 4 filtri, più fully evolved toggle;
// - Come utente voglio vedere disposti tutti i pokèmon in una griglia;
// - Voglio che al click su un pokèmon nella griglia di ricerca, venga inserito nel mio team;
// - Voglio poter vedere il mio team, ogni pokèmon deve avere un nome, uno sprite e i tipi;
// - Con un menu a sidebar o semplicemente nella pagina per desktop voglio poter scegliere mosse e abilità tra quelle disponibili;
// - Completato il team voglio poter vedere le sue statistiche in termini di coverage e difesa;
// - Voglio poter assegnare un nome al team;

// - Voglio che il team sia salvato con tutte le sue info nella side bar in mobile e attraverso un menù con bottone su desktop;
// - Al click del team voglio sia disposto per intero nello suo slot nella pagina, magari con menu per le mosse aperte on mobile;

// FEATURES:
// - Tutto parte dal load della pagina, controlla il local storage e carica i team salvati nei preferiti;
// - Nessun pokèmon è disposto all'inizio, solo dopo una ricerca operiamo per la griglia;
// - La funzione di ricerca usa 3 filtri, più un toggle per il fully evolved. L'ordine di operazione va in questo modo: Prendi tutti quelli di una gen, carica TUTTE le forms (ci sono sempre), e carica TUTTE le variants che rispettano la gen.  Quindi è, per ogni pokèmon: GEN E FULLY EVO CHECK, CARICA OGNI FORM DOPO, CARICA OGNI VARIANTE CHE RISPETTA LA GEN. Poi FILTRA PER TIPO (questo è perché alcune varianti potrebbero essere filtrate con questo metodo), e si opera su questa lista per ricerca di nome, lettera per lettera;
// - Questa lista ci darà semplicemente una lista di ID, ID che usiamo per le immagini. Disponiamo in un una griglia tutti le entità che hanno passato il filtro;
// - Ogni immagine modifica l'URL col suo ID unico;
// - Alla modifica dell'url aggiungiamo il pokèmon nel team;
// - Nello slot del team il pokèmon viene disposto con sprite, nome, e tipo, più un menù toggle per mosse e abilità. Per due eccezioni, quali Silvally ed Arceus si può scegliere il tipo, la loro mossa peculiare rispecchia il tipo;
// - C'è un bottone per poter salvare il team e dargli un nome;
// - C'è un side menu che dispone i team salvati con icone da menu (se ce ne sono) E le statistiche del team corrente(coverage e difesa);
// - Al click di qualsiasi team salvato, viene disposto nello slot team nella pagina;

// QUERIES:
// 1-1017 forme basi
// 10_001-10_263 forme extra
// - Get every Pokèmon: https://pokeapi.co/api/v2/pokemon?limit=15000;
// - Get single pokèmon: https://pokeapi.co/api/v2/pokemon/{id or name}/
// - Get pokèmon move: https://pokeapi.co/api/v2/move/9/
// - Get pokèmon ability: https://pokeapi.co/api/v2/ability/{id or name}/
// - Get evolution chain, check if it's fully evolved or not: https://pokeapi.co/api/v2/evolution-chain/3/
//   The value "evolves_to" needs to be empty

// Prendi tipo, gen, name, evoluto o no

// // FIX WHEN DEPLOYING
import "core-js/stable";
// import "regenerator-runtime/runtime";

import * as model from "./model.js";
import { Type } from "./interfaces.js";

/* DARK/LIGHT MODE */
import toggleDarkModeView from "./Views/Views_Toggles/toggleDarkModeView.js";

/* SIDEMENU AND ITS SUBMENUS */
import sideMenuBtnView from "./Views/Views_Btns/sideMenuBtnView.js";
import filterMenusView from "./Views/Views_Btns/filterMenusView.js";
import statisticsBtnView from "./Views/Views_Btns/statisticsBtnView.js";
import savedTeamsBtnView from "./Views/Views_Btns/savedTeamsBtnView.js";

import favoriteTeamBtnView from "./Views/Views_Btns/favoriteTeamBtnView.js";
import savedTeamsView from "./Views/savedTeamsView.js";
import statisticsView from "./Views/statisticsView.js";

/* MOVESET AND SLOTS */
import movesetMenuBtnsView from "./Views/Views_Btns/movesetMenuBtnsView.js";
import slotSelectBtnView from "./Views/Views_Btns/slotSelectBtnView.js";
import teamMemberPickBtnsView from "./Views/Views_Btns/teamMemberPickBtnsView.js";
import slotInputView from "./Views/View_Inputs/slotInputView.js";
import slotSelectUlView from "./Views/slotSelectUlView.js";
import slotSelectNameView from "./Views/View_Inputs/slotSelectNameView.js";
import tooltipView from "./Views/tooltipView.js";

/* FILTERS */
import toggleFullEvoView from "./Views/Views_Toggles/toggleFullEvoView.js";
import filterContainerView from "./Views/Views_Btns/filterContainerView.js";

/* SEARCHES*/
import searchBtnView from "./Views/Views_Btns/searchBtnView.js";
import resultsContainerView from "./Views/resultsContainerView.js";

/* TEAM MEMBERS */
import teamNameInputView from "./Views/View_Inputs/teamNameInputView.js";

import teamMembersView from "./Views/teamMembersView.js";
import deleteMemberBtnsView from "./Views/Views_Btns/deleteMemberBtnsView.js";

let previousString = "";

const controlSearchResults = function () {
  const filterData = filterContainerView.getFilterData();

  model.filterAll(
    filterData.searchedTypes,
    filterData.searchedGens,
    filterData.toggledFullEvo,
    filterData.searchedName
  );

  resultsContainerView.render(model.state.searchResults);
};

const controlTeamMemberAdd = async function () {
  const windowHash = window.location.hash;
  const modifiedHash = windowHash.replace(previousString, "");
  const teamMembersId = modifiedHash
    .split("#")
    .slice(1)
    .filter((el) => !isNaN(Number(el)) && el !== "");

  if (teamMembersId.length === 0) return;
  previousString = windowHash;

  await Promise.all(
    teamMembersId.slice(-6).map(async (id) => {
      await model.addTeamMember(Number(id));
      teamMembersView.update(
        model.state.currentTeam.teamMembers[model.state.currentTeamAdd - 1],
        model.state.currentTeamAdd,
        controlTypeChange
      );
    })
  );

  await model.setCurrentTeamStats(model.state.currentTeam.teamMembers);

  statisticsView.updateStatistics(
    model.state.currentTeam.teamDefense,
    model.state.currentTeam.teamOffense
  );
};

const controlSavedTeams = function (id: number) {
  window.location.hash = "";
  clearAll();
  model.state.currentTeamSavedId = id;

  favoriteTeamBtnView.oldFav();
  model.retrieveSavedTeam();
  statisticsView.updateStatistics(
    model.state.currentTeam.teamDefense,
    model.state.currentTeam.teamOffense
  );
  teamNameInputView.updateName(model.state.currentTeam.teamName);
  teamMembersView.displayCurrentTeam(
    model.state.currentTeam,
    controlTypeChange
  );
};

const controlTeamSave = function (promptType: string) {
  sideMenuBtnView.closeAll();
  if (promptType === "yes") {
    if (model.state.currentTeam.teamMembers.length === 0) return;
    model.saveCurrentTeam();
    savedTeamsView.addNewSaved(
      model.state.currentTeam,
      model.state.teamIDstart - 1
    );
    clearAll();
  } else if (promptType === "upd") {
    favoriteTeamBtnView.newFav();
    if (model.state.currentTeam.teamMembers.length === 0) return;
    savedTeamsView.deleteSaved(model.state.currentTeamSavedId);
    savedTeamsView.addNewSaved(
      model.state.currentTeam,
      model.state.currentTeamSavedId
    );
    model.updateCurrentSavedTeam();
    clearAll();
  } else if (promptType === "unfav") {
    favoriteTeamBtnView.newFav();
    model.eliminateCurrentSavedTeam();
    savedTeamsView.deleteSaved(model.state.currentTeamSavedId);
  }
};

const controlTypeChange = async function (memberNum: number, type: Type) {
  await model.changeType(memberNum, type);
  statisticsView.updateStatistics(
    model.state.currentTeam.teamDefense,
    model.state.currentTeam.teamOffense
  );
};

const controlAddSlot = function (
  name: string,
  type: string,
  slotType: string,
  memberNum: number
) {
  model.updateTeamMember(name, type, slotType, memberNum);
  slotSelectNameView.updateSlot(name, type, slotType, memberNum);
};

const controlDeleteBtn = function (memberNum: string) {
  // first of all clear the member from the state and from view
  teamMembersView.clear(memberNum);
  model.eliminateTeamMember(memberNum);

  statisticsView.updateStatistics(
    model.state.currentTeam.teamDefense,
    model.state.currentTeam.teamOffense
  );

  // quit if there are no member in state to show OR we eliminated the last member
  if (
    model.state.currentTeam.teamMembers.length === 0 ||
    model.state.currentTeam.teamMembers.length + 1 === Number(memberNum)
  )
    return;

  // eliminate the last element we duplicated
  teamMembersView.clear(model.state.currentTeam.teamMembers.length + 1 + "");

  // and SHOW that member again
  teamMembersView.update(
    model.state.currentTeam.teamMembers[Number(memberNum) - 1] || null,
    Number(memberNum),
    controlTypeChange
  );
};

const clearAll = function () {
  statisticsView.clear();
  model.cleanCurrentTeam();
  teamMembersView.clearAll();
};

/* simple close and open menus */
const handleUIMenus = function () {
  toggleDarkModeView.addHandlerClick();

  toggleFullEvoView.addHandlerClick();
  filterMenusView.addHandlerClickMultiple();

  sideMenuBtnView.addHandlerClick();
  statisticsBtnView.addHandlerClick();
  savedTeamsBtnView.addHandlerClick();

  teamMemberPickBtnsView.addHandlerClick();
  movesetMenuBtnsView.addHandlerClickMultiple();

  slotSelectBtnView.addHandlerClickMultiple();
  slotSelectUlView.addHandlerHover();
  slotInputView.addHandlerKeyupMultiple();
  tooltipView.addHandlerHover();
};

/* handle data and fetching requests, modify UI as needed*/
const handleAppLogic = function () {
  searchBtnView.addHandlerClick(controlSearchResults);
  teamNameInputView.addHandlerNameChange(model.changeCurrentTeamName);
  teamMembersView.addHandlerLoad(controlTeamMemberAdd);
  deleteMemberBtnsView.addHandlerClick(controlDeleteBtn);
  slotSelectUlView.addHandlerClick(controlAddSlot);
  favoriteTeamBtnView.addHandlerClick(
    sideMenuBtnView.closeAll,
    controlTeamSave
  );
  savedTeamsView.addHandlerClick(controlSavedTeams);
};

const checkStorage = function () {
  model.getLocalStorage();
  model.state.savedTeams.forEach((savedTeam) => {
    savedTeamsView.addNewSaved(savedTeam, savedTeam.teamID || 0);
  });
};

const init = function () {
  handleUIMenus();
  handleAppLogic();
  checkStorage();
};

init();
