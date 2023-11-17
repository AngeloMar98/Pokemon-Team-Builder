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
const sidemenuContainer = document.querySelector(".sidemenu-container");

sidemenuBtn?.addEventListener("click", () =>
  sidemenuContainer?.classList.toggle("sidemenu-hidden")
);

const movesetMenuBtns = Array.from(
  document.querySelectorAll(".moveset-menu-btn")
);

movesetMenuBtns.forEach((movesetMenuBtn) => {
  const teamMember = movesetMenuBtn.closest(".team-member");
  const movesetMenu = teamMember?.querySelector(".moveset-menu");

  movesetMenuBtn.addEventListener("click", () => {
    movesetMenu?.classList.toggle("moveset-hidden");
    movesetMenu?.classList.toggle("grid");
    teamMember?.classList.toggle("cut-rounded");

    movesetMenuBtn.classList.toggle("moveset-menu-btn-open");
  });
});

const movesetMenus = Array.from(document.querySelectorAll(".moveset-menu"));

movesetMenus.forEach((movesetMenu) => {
  const slotSelect = Array.from(movesetMenu.querySelectorAll(".slot-select"));

  slotSelect.forEach((slot) => {
    const slotInput: HTMLInputElement | null =
      slot.querySelector(".slot-select_input");

    const slotBtn: HTMLElement | null = slot.querySelector(".slot-select_btn");

    slotBtn!.addEventListener("click", () => {
      slot.classList.toggle("activated");
      slotSelect.forEach((otherSlot) => {
        console.log(slot !== otherSlot);
        if (slot !== otherSlot) otherSlot.classList.remove("activated");
      });
    });

    slotInput!.addEventListener("keyup", function () {
      const value: string = slotInput!.value;
      const listOptions: NodeListOf<HTMLElement> = slot.querySelectorAll("li");

      for (const li of Array.from(listOptions)) {
        const option = li?.textContent || li?.innerText;
        li.style.display = option.toUpperCase().includes(value.toUpperCase())
          ? ""
          : "none";
      }
    });
  });
});

const teamMemberPicks = Array.from(
  document.querySelectorAll(".team-members-pick")
);

teamMemberPicks.forEach((teamMemberPick) => {
  const teamNameLabel = teamMemberPick.querySelector(".team-name-label");
  const teamNameInput: HTMLInputElement | null =
    teamMemberPick.querySelector(".team-name-input");

  teamNameInput!.value = teamNameLabel?.textContent || "";
  console.log(teamNameInput!.value);
  teamNameLabel?.addEventListener("click", () => {
    teamNameLabel.classList.add("hidden");
    teamNameInput!.classList.remove("hidden");
  });

  teamNameInput?.addEventListener("keypress", (e: KeyboardEventInit) => {
    if (e.key === "Enter") {
      teamNameLabel!.textContent = teamNameInput.value || "Default Team Name";

      teamNameLabel!.classList.remove("hidden");
      teamNameInput!.classList.add("hidden");
    }
  });
});

const filterMenuBtns = Array.from(
  document.querySelectorAll(".filter-menu_btn")
);

filterMenuBtns.forEach((filterMenuBtn) => {
  const filterMenu = filterMenuBtn.closest(".filter-menu");

  filterMenuBtn.addEventListener("click", () =>
    filterMenu?.classList.toggle("activated")
  );
});

const filterFullyEvo = document.querySelector(".filter-fullyEvo");
const toggleFullyEvo = document.querySelector(".toggle-fully-evo");

filterFullyEvo?.addEventListener("click", () => {
  filterFullyEvo.classList.toggle("fullyEvo-only");
});

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, (e) => {
    e.preventDefault();

    const pokemozzo = window.location.hash;
    console.log(`added ${pokemozzo}`);
  })
);

const teamMemberAdds = Array.from(document.querySelectorAll(".teamMember-add"));

teamMemberAdds.forEach((teamMemberAdd: any) =>
  teamMemberAdd.addEventListener(
    "click",
    () =>
      (window.location.href =
        window.location + `#${teamMemberAdd.title} ` || "")
  )
);

// <menu class="grid grid-cols-2 dark:bg-darkM-darkBlue transition-all duration-200 sidemenu-container w-full absolute bottom-0 z-50 hidden h-[130px]">
//   <div class="hover:cursor-pointer dark:text-darkM-whiteBlue flex flex-col items-center border-r dark:border-darkM-whiteBlue pt-2">
//     <svg
//       class="dark:fill-darkM-whiteBlue w-[35%] mb-2"
//       id="Layer_1"
//       data-name="Layer 1"
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 980 978.94"
//     >
//       <path
//         d="M770,1224.85H732c-1.49-1-3.21-.74-4.85-.82-43.27-1.91-85.66-9.09-126.64-23.08-151.15-51.57-254.79-152.44-311.12-301.58-14.9-39.48-23.16-80.65-26.63-122.76-.55-6.76-.06-13.62-1.76-20.28v-43a58.81,58.81,0,0,0,.89-5.86,461,461,0,0,1,17.86-106.37q47-160.89,181.91-260.55C529.06,290.81,604.73,261,687.76,250a479.9,479.9,0,0,1,103.69-2.35c37.6,3.17,74.47,9.93,110.19,22q208.55,70.45,299,271.14c21.87,48.51,34.17,99.72,38.6,152.8.58,6.92.1,13.95,1.8,20.77v42c-.3,2.1-.78,4.2-.88,6.31A464.49,464.49,0,0,1,1222.35,869q-43.32,149.69-164.66,247.69Q941,1210.57,791.31,1223.07C784.21,1223.67,777,1223.05,770,1224.85ZM438.72,766.6h-96c-7.34,0-7.35,0-6.51,7.5a455.59,455.59,0,0,0,7.62,48.7q32.9,148.47,153,241.88c65.33,50.8,139.8,79.07,222.48,85.42,48.25,3.71,96,.07,142.34-13.67,136.22-40.33,229.87-127.25,281-259.63,12.92-33.47,19.88-68.48,23.33-104.17.33-3.46.83-6.17-4.62-6.16q-98,.3-196,0c-3.42,0-4.7,1.17-5.18,4.31-.71,4.59-1.53,9.17-2.63,13.68-27.08,111-135,180.24-247.43,158.68-85.94-16.48-153.58-85.58-168.15-171.85-.58-3.44-1.83-4.87-5.73-4.85C503.71,766.68,471.21,766.6,438.72,766.6Zm165.37-31.32C604.13,815.92,670.26,882,751,882s146.87-66,146.94-146.66S831.91,588.73,751,588.69,604.05,654.66,604.09,735.28Z"
//         transform="translate(-261 -245.91)"
//       />
//     </svg>
//     <p>Saved teams</p>
//   </div>
//   <div class="hover:cursor-pointer dark:text-darkM-whiteBlue flex flex-col items-center border-l dark:border-darkM-whiteBlue pt-2">
//     <svg
//       class="dark:fill-darkM-whiteBlue w-[35%] mb-2"
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 256 256"
//     >
//       <path d="M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16ZM160,48h40V200H160ZM104,96h40V200H104ZM56,144H88v56H56Z"></path>
//     </svg>
//     <p>Statics</p>
//   </div>
// </menu>;
