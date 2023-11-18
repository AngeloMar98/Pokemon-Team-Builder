"use strict";
/*
USER STORIES:
- Come utente voglio poter ricercare qualsiasi pokèmon con i 4 filtri, più fully evolved toggle;
- Come utente voglio vedere disposti tutti i pokèmon in una griglia;
- Voglio che al click su un pokèmon nella griglia di ricerca, venga inserito nel mio team;
- Voglio poter vedere il mio team, ogni pokèmon deve avere un nome, uno sprite e i tipi;
- Con un menu a sidebar o semplicemente nella pagina per desktop voglio poter scegliere mosse e abilità tra quelle disponibili;
- Completato il team voglio poter vedere le sue statistiche in termini di coverage e difesa;
- Voglio poter assegnare un nome al team;

- Voglio che il team sia salvato con tutte le sue info nella side bar in mobile e attraverso un menù con bottone su desktop;
- Al click del team voglio sia disposto per intero nello suo slot nella pagina, magari con menu per le mosse aperte on mobile;


FEATURES:
- Tutto parte dal load della pagina, controlla il local storage e carica i team salvati nei preferiti;
- Nessun pokèmon è disposto all'inizio, solo dopo una ricerca operiamo per la griglia;
- La funzione di ricerca usa 3 filtri, più un toggle per il fully evolved. L'ordine di operazione va in questo modo: Prendi tutti quelli di una gen, carica TUTTE le forms (ci sono sempre), e carica TUTTE le variants che rispettano la gen.  Quindi è, per ogni pokèmon: GEN E FULLY EVO CHECK, CARICA OGNI FORM DOPO, CARICA OGNI VARIANTE CHE RISPETTA LA GEN. Poi FILTRA PER TIPO (questo è perché alcune varianti potrebbero essere filtrate con questo metodo), e si opera su questa lista per ricerca di nome, lettera per lettera;
- Questa lista ci darà semplicemente una lista di ID, ID che usiamo per le immagini. Disponiamo in un una griglia tutti le entità che hanno passato il filtro;
- Ogni immagine modifica l'URL col suo ID unico;
- Alla modifica dell'url aggiungiamo il pokèmon nel team;
- Nello slot del team il pokèmon viene disposto con sprite, nome, e tipo, più un menù toggle per mosse e abilità. Per due eccezioni, quali Silvally ed Arceus si può scegliere il tipo, la loro mossa peculiare rispecchia il tipo;
- C'è un bottone per poter salvare il team e dargli un nome;
- C'è un side menu che dispone i team salvati con icone da menu (se ce ne sono) E le statistiche del team corrente(coverage e difesa);
- Al click di qualsiasi team salvato, viene disposto nello slot team nella pagina;





QUERIES:
1-1017 forme basi
10_001-10_263 forme extra
- Get every Pokèmon: https://pokeapi.co/api/v2/pokemon?limit=15000;
- Get single pokèmon: https://pokeapi.co/api/v2/pokemon/{id or name}/
- Get pokèmon move: https://pokeapi.co/api/v2/move/9/
- Get pokèmon ability: https://pokeapi.co/api/v2/ability/{id or name}/
- Get evolution chain, check if it's fully evolved or not: https://pokeapi.co/api/v2/evolution-chain/3/
  The value "evolves_to" needs to be empty


Prendi tipo, gen, name, evoluto o no

*/
// const createJSON = async function () {
//   let JSON = "{";
//   for (let i = 10_001; i < 10_267; i++) {
//     console.log(i);
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
//     const data = await response.json();
//     const name = `"name": "${data.name}"`;
//     const types = `"types": [
//      ${data.types.reduce(
//        (acc: string, obj: any) => (acc += `"${obj.type.name}"`),
//        ""
//      )}
//      ]`;
//     const pokèmon = `"${i}": {
//             "id": ${i},
//             ${name},
//             ${types},
//              "ful-evo": "empty",
//     },`;
//     JSON += pokèmon;
//   }
//   JSON += "}";
//   console.log(JSON);
// };
// createJSON();
const sidemenuBtn = document.querySelector(".sidemenu-btn");
const sidemenu = document.querySelector(".sidemenu");
const savedTeamsBtn = document.querySelector(".saved-teams_btn");
const savedTeams = document.querySelector(".saved-teams");
const statisticsBtn = document.querySelector(".statistics_btn");
const statistics = document.querySelector(".statistics");
const teamsAndStats = document.querySelector(".teamsAndStats");
savedTeamsBtn === null || savedTeamsBtn === void 0 ? void 0 : savedTeamsBtn.addEventListener("click", () => {
    teamsAndStats.classList.toggle("show-teams");
    teamsAndStats.classList.remove("hidden");
});
statisticsBtn === null || statisticsBtn === void 0 ? void 0 : statisticsBtn.addEventListener("click", () => {
    teamsAndStats.classList.toggle("show-stats");
    teamsAndStats.classList.remove("hidden");
});
sidemenuBtn === null || sidemenuBtn === void 0 ? void 0 : sidemenuBtn.addEventListener("click", () => {
    teamsAndStats.classList.remove("show-teams");
    teamsAndStats.classList.remove("show-stats");
    sidemenu === null || sidemenu === void 0 ? void 0 : sidemenu.classList.toggle("sidemenu-hidden");
    sidemenuBtn === null || sidemenuBtn === void 0 ? void 0 : sidemenuBtn.classList.toggle("lift-sidemenu-btn");
});
const movesetMenuBtns = Array.from(document.querySelectorAll(".moveset-menu-btn"));
movesetMenuBtns.forEach((movesetMenuBtn) => {
    const teamMember = movesetMenuBtn.closest(".team-member");
    movesetMenuBtn.addEventListener("click", () => {
        teamMember === null || teamMember === void 0 ? void 0 : teamMember.classList.toggle("hide-moveset");
        movesetMenuBtn.classList.toggle("moveset-menu-btn-open");
    });
});
const movesetMenus = Array.from(document.querySelectorAll(".moveset-menu"));
movesetMenus.forEach((movesetMenu) => {
    const slotSelect = Array.from(movesetMenu.querySelectorAll(".slot-select"));
    slotSelect.forEach((slot) => {
        const slotInput = slot.querySelector(".slot-select_input");
        const slotBtn = slot.querySelector(".slot-select_btn");
        slotBtn.addEventListener("click", () => {
            slot.classList.toggle("activated");
            slotSelect.forEach((otherSlot) => {
                console.log(slot !== otherSlot);
                if (slot !== otherSlot)
                    otherSlot.classList.remove("activated");
            });
        });
        slotInput.addEventListener("keyup", function () {
            const value = slotInput.value;
            const listOptions = slot.querySelectorAll("li");
            for (const li of Array.from(listOptions)) {
                const option = (li === null || li === void 0 ? void 0 : li.textContent) || (li === null || li === void 0 ? void 0 : li.innerText);
                li.style.display = option.toUpperCase().includes(value.toUpperCase())
                    ? ""
                    : "none";
            }
        });
    });
});
const teamMemberPicks = Array.from(document.querySelectorAll(".team-members-pick"));
teamMemberPicks.forEach((teamMemberPick) => {
    const teamNameLabel = teamMemberPick.querySelector(".team-name-label");
    const teamNameInput = teamMemberPick.querySelector(".team-name-input");
    teamNameInput.value = (teamNameLabel === null || teamNameLabel === void 0 ? void 0 : teamNameLabel.textContent) || "";
    console.log(teamNameInput.value);
    teamNameLabel === null || teamNameLabel === void 0 ? void 0 : teamNameLabel.addEventListener("click", () => {
        teamNameLabel.classList.add("hidden");
        teamNameInput.classList.remove("hidden");
    });
    teamNameInput === null || teamNameInput === void 0 ? void 0 : teamNameInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            teamNameLabel.textContent = teamNameInput.value || "Default Team Name";
            teamNameLabel.classList.remove("hidden");
            teamNameInput.classList.add("hidden");
        }
    });
});
const filterMenuBtns = Array.from(document.querySelectorAll(".filter-menu_btn"));
filterMenuBtns.forEach((filterMenuBtn) => {
    const filterMenu = filterMenuBtn.closest(".filter-menu");
    filterMenuBtn.addEventListener("click", () => filterMenu === null || filterMenu === void 0 ? void 0 : filterMenu.classList.toggle("activated"));
});
const filterFullyEvo = document.querySelector(".filter-fullyEvo");
const toggleFullyEvo = document.querySelector(".toggle-fully-evo");
filterFullyEvo === null || filterFullyEvo === void 0 ? void 0 : filterFullyEvo.addEventListener("click", () => {
    filterFullyEvo.classList.toggle("fullyEvo-only");
});
["hashchange", "load"].forEach((event) => window.addEventListener(event, (e) => {
    e.preventDefault();
    const pokemozzo = window.location.hash;
    console.log(`added ${pokemozzo}`);
}));
const teamMemberAdds = Array.from(document.querySelectorAll(".teamMember-add"));
teamMemberAdds.forEach((teamMemberAdd) => teamMemberAdd.addEventListener("click", () => (window.location.href =
    window.location + `#${teamMemberAdd.title} ` || "")));
//
