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

  addHandlerLoad(handler: () => void) {
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, (e) => {
        e.preventDefault();
        handler();
      })
    );
  }

  _generateMarkup(pokemon: Pokemon, num: number) {
    const teachableMovesUl = pokemon.teachableMoves!.reduce(
      (acc, move) =>
        acc +
        `<li class="slot-select_li"
                       alt="${move.name}">
                        ${move.name}
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
          </li>`,
      ""
    );

    const possibleAbilitiesUl = pokemon.possibleAbilities!.reduce(
      (acc, ability) =>
        acc +
        `<li class="slot-select_li group"
                        alt="${ability.name}">
                        ${ability.name}
            <p class="hidden">
            <b class="pointer-events-none">Effect: </b> ${ability.effect} <br /> 
            </p>
           
          </li>`,
      ""
    );

    return `<article class="team-member team-member-${num} group hide-moveset">
    <div class="team-member-${num}-inner">
       <h2 class="text-center rounded-t-[0.3rem]
       laptop:group-[:not(.hide-moveset)]:rounded-tr-none dark:text-darkM-whiteIndigo py-1 border-b
        dark:border-darkM-lightIndigo3 bg-white dark:bg-darkM-lightIndigo3"
              id="${pokemon.id}"
              alt="${pokemon.name}"
            >
              ${pokemon.name}
            </h2>
            <div class="flex min-h-[112px] justify-center py-2">
              <img
                alt="${pokemon.name} icon"
                class="hover:cursor-pointer custom-shadow w-[96px] h-[96px]"
                src="static/img/pokemon_sprites/${pokemon.id}.png"
              />
            </div>
            <div class="filter-menu group">
              <div
                class="types-flex min-h-[71px] group-[.hide-moveset]:rounded-b-md laptop:group-[:not(.hide-moveset)]:rounded-bl-md"
              >
               <div class="types-flex-inner">    
                ${
                  pokemon.typeChoice
                    ? `<button
                  class="filter-menu_btn h-[25px] w-[120px] bg-lightM-lightBismark text-lightM-blackPearl dark:text-darkM-whiteIndigo dark:bg-darkM-lightIndigo3 px-1 rounded-lg"
                >
                  <span>Type </span>
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
                  class="filter-menu_ul custom-type_ul mt-2 w-[120px] group-[.activated]:flex z-20"
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
                    : `${pokemon.types.reduce(
                        (acc, type) =>
                          acc +
                          `<img class="h-[25px] w-[92px]" alt="${type} type icon" 
                        src="static/img/types_labels/${type}.png">`,
                        ""
                      )}`
                }
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
                  <div class="slot slot-move-1 bg-fire">
                    
                  </div>
                  <div class="slot slot-move-2 bg-fire">
                    
                  </div>
                  <div class="slot slot-move-3 bg-fire">
                    
                  </div>
                  <div class="slot slot-move-4 bg-fire">
                    
                  </div>
                  <div class="slot slot-ability bg-darkM-lightIndigo3">
                    Pressure
                  </div>
                </div>
              </div>
            </div>
        </article>`;
  }

  render() {}

  update(pokemon: Pokemon, num: number) {
    const newMarkup = this._generateMarkup(pokemon, num);
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const currentMember = this._parentElement!.querySelector(
      `.team-member-${num}`
    );

    /* UPDATE NAME */
    currentMember!.querySelector("h2")!.innerHTML =
      newDOM.querySelector("h2")?.innerHTML || "";

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

    /* UPDATE SLOTS */
    const allSlotSelect = Array.from(
      currentMember!.querySelectorAll(`.slot-select_ul`)
    );

    const updatedSlotSlect = Array.from(
      newDOM!.querySelectorAll(`.team-member-${num} .slot-select_ul`)
    );

    allSlotSelect.forEach((slotSelect, i: number) => {
      const slotsChoices = Array.from(
        updatedSlotSlect[i].querySelectorAll("li")
      );
      slotsChoices.forEach((slotChoice) => slotSelect.append(slotChoice));
    });
  }
}
export default new teamMembersView();
