import {
  Pokemon,
  Team,
  Move,
  Ability,
  MoveCategory,
  Generation,
  Type,
} from "../interfaces";

class teamMembersView {
  _parentElement = document.querySelector(".team-members-container");

  clear(uniqueid: number, position?: number) {
    const currentMember: HTMLElement = position
      ? this._parentElement?.querySelector(`.team-member-${position}`)!
      : this._parentElement?.querySelector(`[data-uniqueid="${uniqueid}"]`)!;
    /* REMOVE NAME */
    currentMember!.querySelector("h2")!.innerHTML = "";

    /* REMOVE ID */

    currentMember.dataset.uniqueid = "";

    /* HIDE BUTTON */
    currentMember?.querySelector(".delete-member-btn")?.classList.add("hidden");

    /* REMOVE IMG  */
    const pokemonImg = currentMember!.querySelector("img");
    pokemonImg!.src = "#";
    pokemonImg!.alt = "";
    pokemonImg!.classList.add("hidden");

    /* REMOVE TYPES */

    currentMember!.querySelector(".types-flex-inner")!.innerHTML = `<img
                      class="h-[25px] w-[92px] hidden"
                      alt="type icon"
                      src="#"
                    />
                    <img
                      class="h-[25px] w-[92px] hidden"
                      alt="type icon"
                      src="#"
                    />`;

    /* REMOVE SLOTS */
    Array.from(currentMember!.querySelectorAll(`.slot-select_li`)).forEach(
      (li) => li.remove()
    );

    Array.from(currentMember!.querySelectorAll(`.slot`)).forEach(
      (slot) => (slot.innerHTML = "")
    );
  }

  clearAll() {
    Array.from(document.querySelectorAll(".team-member")).forEach((_, i) => {
      this.clear(0, i + 1);
    });
  }

  addAll(
    teamMembers: Pokemon[],
    handleTypeChoice: (memberNum: number, type: Type) => void
  ) {
    teamMembers.forEach((pokemon, i) =>
      this.update(pokemon, i + 1, handleTypeChoice)
    );
  }

  addHandlerLoad(handler: () => void) {
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, (e) => {
        e.preventDefault();
        handler();
      })
    );
  }

  _createTeachableMoves(teachableMoves: Move[]) {
    return teachableMoves!.reduce(
      (acc, move) =>
        acc +
        `<li class="slot-select_li"
                       data-name="${move.name}"
                        data-type="${move.type}">
                 <span class="select-none">${move.name} </span>
            <p class="hidden">
            <b class="pointer-events-none">Type:</b> ${move.type} <br />
            <b class="pointer-events-none">Power: </b> ${
              move.power !== null ? move.power : "-"
            } <br />
            <b class="pointer-events-none">Accuracy: </b> ${
              move.accuracy !== null ? move.accuracy : "-"
            } <br />
            <b class="pointer-events-none">Category: </b> ${
              move.category
            } <br />
            
            <b class="pointer-events-none"> Effect: </b> ${move.effect}
            </p>
          </li>
          `,
      ""
    );
  }

  _createPossibleAbilites(possibleAbilities: Ability[]) {
    return possibleAbilities!.reduce(
      (acc, ability) =>
        acc +
        `<li class="slot-select_li group"
                        data-name="${ability.name}"
                        data-type="ability">
                    <span class="select-none">${ability.name}</span>
            <p class="hidden">
            <b class="pointer-events-none">Effect: </b> ${ability.effect} <br /> 
            </p>
           
          </li>`,
      ""
    );
  }

  _createTypes(typeChoice: boolean, types: Type[]) {
    return typeChoice
      ? `
                    <img class="h-[25px] w-[90px]" alt="bug type icon" src="img/types_labels/${types[0]}.png">
                    <button
                  class="filter-menu_btn h-[25px] w-[90px] font-medium text-xs rounded-full bg-lightM-lightBismark text-lightM-blackPearl dark:text-darkM-whiteIndigo dark:bg-darkM-lightIndigo3 px-1 flex items-center justify-center"
                >
                  <span>TYPE </span>
                  <svg
                    class="carret-down dark:fill-darkM-whiteIndigo rotate-180 group-[.activated]:rotate-0 inline-block transition-all duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 256 256"
                  >
                    <path
                      d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"
                    ></path>
                  </svg>
                </button>
                
                <ul
                  class="filter-menu_ul top-[60px] custom-type_ul mt-2 w-[120px] group-[.activated]:flex z-20"
                >
                  <li class="flex" data-type="fire">
                    <input
                      class="ml-2"
                      type="radio"
                      name="custom-type"
                      id="type-fire"
                    />
                    <label class="hover:cursor-pointer ml-2" for="type-fire"
                      >Fire</label
                    >
                  </li>
                  <li class="flex" data-type="water">
                    <input
                      class="ml-2"
                      type="radio"
                      name="custom-type"
                      id="type-water"
                    />
                    <label class="hover:cursor-pointer ml-2" for="type-water"
                      >Water</label
                    >
                  </li>
                  <li class="flex" data-type="grass">
                    <input
                      class="ml-2"
                      type="radio"
                      name="custom-type"
                      id="type-grass"
                    />
                    <label class="hover:cursor-pointer ml-2" for="type-grass"
                      >Grass</label
                    >
                  </li>
                  <li class="flex" data-type="bug">
                    <input
                      class="ml-2"
                      type="radio"
                      name="custom-type"
                      id="type-bug"
                    />
                    <label class="hover:cursor-pointer ml-2" for="type-bug"
                      >Bug</label
                    >
                  </li>
                  <li class="flex" data-type="dark">
                    <input
                      class="ml-2"
                      type="radio"
                      name="custom-type"
                      id="type-dark"
                    />
                    <label class="hover:cursor-pointer ml-2" for="type-dark"
                      >Dark</label
                    >
                  </li>
                  <li class="flex" data-type="dragon">
                    <input
                      class="ml-2"
                      type="radio"
                      name="custom-type"
                      id="type-dragon"
                    />
                    <label class="hover:cursor-pointer ml-2" for="type-dragon"
                      >Dragon</label
                    >
                  </li>
                  <li class="flex" data-type="flying">
                    <input
                      class="ml-2"
                      type="radio"
                      name="custom-type"
                      id="type-flying"
                    />
                    <label class="hover:cursor-pointer ml-2" for="type-flying"
                      >Flying</label
                    >
                  </li>
                  <li class="flex" data-type="electric">
                    <input
                      class="ml-2"
                      type="radio"
                      name="custom-type"
                      id="type-electric"
                    />
                    <label class="hover:cursor-pointer ml-2" for="type-eletric"
                      >Electric</label
                    >
                  </li>
                  <li class="flex" data-type="fairy">
                    <input
                      class="ml-2"
                      type="radio"
                      name="custom-type"
                      id="type-fairy"
                    />
                    <label class="hover:cursor-pointer ml-2" for="type-fairy"
                      >Fairy</label
                    >
                  </li>
                  <li class="flex" data-type="fighting">
                    <input
                      class="ml-2"
                      type="radio"
                      name="custom-type"
                      id="type-fighting"
                    />
                    <label class="hover:cursor-pointer ml-2" for="type-fighting"
                      >Fighting</label
                    >
                  </li>
                  <li class="flex" data-type="ghost">
                    <input
                      class="ml-2"
                      type="radio"
                      name="custom-type"
                      id="type-ghost"
                    />
                    <label class="hover:cursor-pointer ml-2" for="type-ghost"
                      >Ghost</label
                    >
                  </li>
                  <li class="flex" data-type="ground">
                    <input
                      class="ml-2"
                      type="radio"
                      name="custom-type"
                      id="type-ground"
                    />
                    <label class="hover:cursor-pointer ml-2" for="type-ground"
                      >Ground</label
                    >
                  </li>
                  <li class="flex" data-type="ice">
                    <input
                      class="ml-2"
                      type="radio"
                      name="custom-type"
                      id="type-ice"
                    />
                    <label class="hover:cursor-pointer ml-2" for="type-ice"
                      >Ice</label
                    >
                  </li>
                  <li class="flex" data-type="normal">
                    <input
                      class="ml-2"
                      type="radio"
                      name="custom-type"
                      id="type-normal"
                    />
                    <label class="hover:cursor-pointer ml-2" for="type-normal"
                      >Normal</label
                    >
                  </li>
                  <li class="flex" data-type="poison">
                    <input
                      class="ml-2"
                      type="radio"
                      name="custom-type"
                      id="type-poison"
                    />
                    <label class="hover:cursor-pointer ml-2" for="type-poison"
                      >Poison</label
                    >
                  </li>
                  <li class="flex" data-type="psychic">
                    <input
                      class="ml-2"
                      type="radio"
                      name="custom-type"
                      id="type-psychic"
                    />
                    <label class="hover:cursor-pointer ml-2" for="type-psychic"
                      >Psychic</label
                    >
                  </li>
                  <li class="flex" data-type="rock">
                    <input
                      class="ml-2"
                      type="radio"
                      name="custom-type"
                      id="type-rock"
                    />
                    <label class="hover:cursor-pointer ml-2" for="type-rock"
                      >Rock</label
                    >
                  </li>
                  <li class="flex" data-type="steel">
                    <input
                      class="ml-2"
                      type="radio"
                      name="custom-type"
                      id="type-steel"
                    />
                    <label class="hover:cursor-pointer ml-2" for="type-steel"
                      >Steel</label
                    >
                  </li>
                       </ul>`
      : `${types.reduce(
          (acc, type) =>
            acc +
            `<img class="h-[25px] w-[92px]" alt="${type} type icon" 
                        src="img/types_labels/${type}.png">`,
          ""
        )}`;
  }

  _generateMarkup(pokemon: Pokemon, num: number) {
    const teachableMovesUl = this._createTeachableMoves(
      pokemon.teachableMoves || []
    );

    const possibleAbilitiesUl = this._createPossibleAbilites(
      pokemon.possibleAbilities || []
    );

    return `<article id="member-${num}"
     data-uniqueid="${
       pokemon.uniqueid
     }" class="team-member team-member-${num} group hide-moveset" >
              <div class="team-member-${num}-inner relative">
              <svg
                class="delete-member-btn hidden absolute top-1 right-1 p-1 fill-darkM-whiteIndigo hover:cursor-pointer rounded-full dark:bg-darkM-lightIndigo1 bg-lightM-bismark"
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 256 256"
              >
                <path
                  d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"
                ></path>
              </svg>
       <h2 class="text-center rounded-t-[0.3rem]
       laptop:group-[:not(.hide-moveset)]:rounded-tr-none dark:text-darkM-whiteIndigo py-1 border-b
        dark:border-darkM-lightIndigo3 bg-white dark:bg-darkM-lightIndigo3"
              id="${pokemon.id}"
              alt="${pokemon.name}"
            >
              ${
                pokemon.name.split("-")[1] === "mega"
                  ? pokemon.name.replaceAll("-", " ")
                  : pokemon.name
              }
            </h2>
            <div class="flex min-h-[112px] justify-center py-2">
              <img
                alt="${pokemon.name} icon"
                class="hover:cursor-pointer custom-shadow w-[96px] h-[96px]"
                src="img/pokemon_sprites/${pokemon.id}.png"
              />
            </div>
            <div class="filter-menu group">
              <div
                class="types-flex min-h-[71px] group-[.hide-moveset]:rounded-b-md laptop:group-[:not(.hide-moveset)]:rounded-bl-md"
              >
               <div class="types-flex-inner group">    
                ${this._createTypes(pokemon.typeChoice || false, pokemon.types)}
              </div>            
                <button class="moveset-menu-btn"  title="Toggle moveset menu">
                  <svg
                    class="dark:fill-darkM-whiteIndigo"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 256 256"
                  >
                    <path
                      d="M213.66,122.34a8,8,0,0,1,0,11.32l-80,80a8,8,0,0,1-11.32,0l-80-80a8,8,0,0,1,11.32-11.32L128,196.69l74.34-74.35A8,8,0,0,1,213.66,122.34Zm-91.32,11.32a8,8,0,0,0,11.32,0l80-80a8,8,0,0,0-11.32-11.32L128,116.69,53.66,42.34A8,8,0,0,0,42.34,53.66Z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
           </div>

            <div class="moveset-menu group-[.hide-moveset]:moveset-hidden">
              <div class="grid grid-cols-2 gap-2 h-full">
                <div class="slots-select">
                  <div class="slot-select slot-select-1 group">
                    <button class="slot-select_btn">
                      <span>Move 1</span>
                      <svg
                        class="carret-down dark:fill-darkM-whiteIndigo rotate-180 inline-block transition-all duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 256 256"
                      >
                        <path
                          d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"
                        ></path>
                      </svg>
                    </button>
                    <ul
                      class="slot-select_ul slot-select-1_ul group-[.activated]:flex"
                    >
                      <input
                        class="slot-select_input"
                        type="text"
                        placeholder="Pick a move"
                      />
                        ${teachableMovesUl}
                    </ul>
                  </div>
                  <div class="slot-select slot-select-2 group">
                    <button class="slot-select_btn">
                      <span>Move 2</span>
                      <svg
                        class="carret-down dark:fill-darkM-whiteIndigo rotate-180 inline-block transition-all duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 256 256"
                      >
                        <path
                          d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"
                        ></path>
                      </svg>
                    </button>
                    <ul
                      class="slot-select_ul slot-select-2_ul group-[.activated]:flex"
                    >
                      <input
                        class="slot-select_input"
                        type="text"
                        placeholder="Pick a move"
                      />
                      ${teachableMovesUl}
                    </ul>
                  </div>
                  <div class="slot-select slot-select-3 group">
                    <button class="slot-select_btn">
                      <span>Move 3</span>
                      <svg
                        class="carret-down dark:fill-darkM-whiteIndigo rotate-180 inline-block transition-all duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 256 256"
                      >
                        <path
                          d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"
                        ></path>
                      </svg>
                    </button>
                    <ul
                      class="slot-select_ul slot-select-3_ul group-[.activated]:flex"
                    >
                      <input
                        class="slot-select_input"
                        type="text"
                        placeholder="Pick a move"
                      />
                      ${teachableMovesUl}
                    </ul>
                  </div>
                  <div class="slot-select slot-select-4 group">
                    <button class="slot-select_btn">
                      <span>Move 4</span>
                      <svg
                        class="carret-down dark:fill-darkM-whiteIndigo rotate-180 inline-block transition-all duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 256 256"
                      >
                        <path
                          d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"
                        ></path>
                      </svg>
                    </button>
                    <ul
                      class="slot-select_ul slot-select-4_ul group-[.activated]:flex"
                    >
                      <input
                        class="slot-select_input"
                        type="text"
                        placeholder="Pick a move"
                      />
                      ${teachableMovesUl}
                    </ul>
                  </div>
                  <div class="slot-select slot-select-ability group">
                    <button class="slot-select_btn">
                      <span>Ability</span>
                      <svg
                        class="carret-down dark:fill-darkM-whiteIndigo rotate-180 inline-block transition-all duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 256 256"
                      >
                        <path
                          d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"
                        ></path>
                      </svg>
                    </button>
                    <ul
                      class="slot-select_ul slot-select-ability_ul group-[.activated]:flex"
                    >
                      <input
                        class="slot-select_input"
                        type="text"
                        placeholder="Pick a move"
                      />
                      ${possibleAbilitiesUl}
                    </ul>
                  </div>
                </div>
                <div class="slots mr-3 leading-5">
                  <div class="slot slot-move-1 dark:bg-darkM-whiteIndigo bg-lightM-darkBismark dark:text-lightM-blackPearl text-darkM-whiteIndigo">
                    ${pokemon.move1!.name || ""}
                  </div>
                  <div class="slot slot-move-2 dark:bg-darkM-whiteIndigo bg-lightM-darkBismark dark:text-lightM-blackPearl text-darkM-whiteIndigo">
                    ${pokemon.move2!.name || ""}
                  </div>
                  <div class="slot slot-move-3 dark:bg-darkM-whiteIndigo bg-lightM-darkBismark dark:text-lightM-blackPearl text-darkM-whiteIndigo">
                    ${pokemon.move3!.name || ""}
                  </div>
                  <div class="slot slot-move-4 dark:bg-darkM-whiteIndigo bg-lightM-darkBismark dark:text-lightM-blackPearl text-darkM-whiteIndigo">
                    ${pokemon.move4!.name || ""}
                  </div>
                  <div class="slot slot-ability bg-darkM-lightIndigo3">
                    ${pokemon.ability!.name || ""}
                  </div>
                </div>
              </div>
            </div>
        </article>`;
  }

  update(
    pokemon: Pokemon | null,
    num: number,
    handleTypeChoice: (uniqueid: number, type: Type) => void
  ) {
    if (pokemon === null) return;
    const newMarkup = this._generateMarkup(pokemon, num);
    console.log(newMarkup);
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const currentMember: HTMLElement = this._parentElement!.querySelector(
      `.team-member-${num}`
    )!;

    /* UPDATE ID */

    currentMember.dataset.uniqueid =
      newDOM.querySelector("article")?.dataset.uniqueid;

    console.log(newDOM.querySelector("article"));
    /* UPDATE NAME */
    currentMember!.querySelector("h2")!.innerHTML =
      newDOM.querySelector("h2")?.innerHTML || "";

    /* REVEAL DELETE BUTTON */

    currentMember
      ?.querySelector(".delete-member-btn")
      ?.classList.remove("hidden");

    /* UPDATE IMG  */

    Array.from(newDOM!.querySelector("img")!.attributes).forEach((attr) =>
      currentMember!.querySelector("img")!.setAttribute(attr.name, attr.value)
    );

    /* UPDATE TYPES */
    const typesFlexInner = this._parentElement!.querySelector(
      `.team-member-${num}-inner .types-flex-inner`
    );

    typesFlexInner!.innerHTML =
      newDOM.querySelector(".types-flex-inner")?.innerHTML || "";

    /* UPDATE SLOTS CHOICES */
    const allSlotSelectChoice = Array.from(
      currentMember!.querySelectorAll(`.slot-select_ul`)
    );

    const updatedSlotSlectChoice = Array.from(
      newDOM!.querySelectorAll(`.team-member-${num} .slot-select_ul`)
    );

    allSlotSelectChoice.forEach((slotSelect, i: number) => {
      const slotsChoices = Array.from(
        updatedSlotSlectChoice[i].querySelectorAll("li")
      );
      slotsChoices.forEach((slotChoice) => slotSelect.append(slotChoice));

      if (num === 6) {
        console.log(slotSelect);
        console.log(slotsChoices);
        console.log(allSlotSelectChoice);
        console.log(updatedSlotSlectChoice);
      }
    });

    /* UPDATE SLOTS */

    const allSlots = Array.from(currentMember!.querySelectorAll(".slot"));

    const allUpdatedSlots = Array.from(newDOM!.querySelectorAll(`.slot`));

    allSlots.forEach((slot, i) => {
      slot.textContent = allUpdatedSlots[i].textContent || "";
    });

    if (pokemon.typeChoice) {
      typesFlexInner
        ?.querySelector(".filter-menu_btn")
        ?.addEventListener("click", function () {
          typesFlexInner.classList.toggle("activated");
        });

      typesFlexInner
        ?.querySelector(".filter-menu_ul")
        ?.addEventListener("click", (e: any) => {
          const li = e.target.closest("li");
          if (li) {
            const currUniqueid: number = Number(
              li.closest(".team-member").dataset.uniqueid
            );
            handleTypeChoice(currUniqueid, li.dataset.type);
            typesFlexInner.querySelector(
              "img"
            )!.src = `img/types_labels/${li.dataset.type}.png`;
          }
        });
    }
  }
}
export default new teamMembersView();
