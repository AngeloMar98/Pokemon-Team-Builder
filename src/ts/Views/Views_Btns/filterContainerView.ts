import {
  Type,
  MoveCategory,
  Generation,
  GenerationNum,
  Move,
  Ability,
  Pokemon,
  Team,
} from "./../../interfaces.js";

class filterContainerView {
  _filterGenUl = Array.from(
    document.querySelector(".filter-menu-gen_ul")!.querySelectorAll("input")
  );
  _filterTypeUl = Array.from(
    document.querySelector(".filter-menu-type_ul")!.querySelectorAll("input")
  );

  _filterName: HTMLInputElement | null = document.querySelector(".filter-name");
  _toggleFullEvo = document.querySelector(".filter-fullyEvo");

  getFilterData() {
    const searchedGens = this._filterGenUl.reduce(
      (arr: GenerationNum[], input) => {
        input.checked ? arr.push(input.dataset.gen as GenerationNum) : "";
        return arr;
      },
      []
    );

    const searchedTypes = this._filterTypeUl.reduce((arr: Type[], input) => {
      input.checked ? arr.push(input.dataset.type as Type) : "";
      return arr;
    }, []);

    const searchedName: string = this._filterName?.value || "";

    const toggledFullEvo =
      this._toggleFullEvo?.classList.contains("fullyEvo-only") || false;

    return { searchedTypes, searchedGens, toggledFullEvo, searchedName };
  }
}

export default new filterContainerView();
