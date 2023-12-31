import { Pokemon } from "../interfaces";

class resultsContainerView {
  _parentElement = document.querySelector(".results-container");
  _data: Pokemon[] = [];
  _clear() {
    this._parentElement!.innerHTML = "";
  }

  render(data: Pokemon[]) {
    this._data = data;
    this._clear();
    this._data.forEach((pokemon) => {
      this._parentElement!.insertAdjacentHTML(
        "beforeend",
        this._generateMarkup(pokemon)
      );
    });

    Array.from(
      document.querySelectorAll<HTMLElement>(".teamMember-add")
    ).forEach((teamMemberAdd) => this._addHandlerClick(teamMemberAdd));
  }

  _generateMarkup(pokemon: Pokemon) {
    return `<div class="teamMember-add-container inline-block h-pick">
              <a
                class="teamMember-add hover:cursor-pointer h-pick inline-block"
                title="${pokemon.name}"
                data-id="${pokemon.id}"
                data-name="${pokemon.name}"
                data-fullevo="true"
                data-type1="${pokemon.types[0]}"
                data-type="${pokemon.types[1]}"
                ><div
                  class="teamMember-add-inner"
                >
                  <img loading="lazy"
                    alt="${pokemon.name}"
                    src="img/pokemon_sprites/${pokemon.id}.png"
                    class="custom-shadow-sm w-[60px] h-[60px]"
                  /></div
              ></a>
            </div>`;
  }

  _addHandlerClick(teamMemberAdd: HTMLElement) {
    teamMemberAdd.addEventListener(
      "click",
      () =>
        (window.location.href =
          window.location + `#${teamMemberAdd.dataset.id}` || "")
    );
  }
}

export default new resultsContainerView();
