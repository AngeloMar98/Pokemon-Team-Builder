class filterContainerView {
    constructor() {
        this._filterGenUl = Array.from(document.querySelector(".filter-menu-gen_ul").querySelectorAll("input"));
        this._filterTypeUl = Array.from(document.querySelector(".filter-menu-type_ul").querySelectorAll("input"));
        this._filterName = document.querySelector(".filter-name");
        this._toggleFullEvo = document.querySelector(".filter-fullyEvo");
    }
    getFilterData() {
        var _a, _b;
        const searchedGens = this._filterGenUl.reduce((arr, input) => {
            input.checked ? arr.push(input.dataset.gen) : "";
            return arr;
        }, []);
        const searchedTypes = this._filterTypeUl.reduce((arr, input) => {
            input.checked ? arr.push(input.dataset.type) : "";
            return arr;
        }, []);
        const searchedName = ((_a = this._filterName) === null || _a === void 0 ? void 0 : _a.value) || "";
        const toggledFullEvo = ((_b = this._toggleFullEvo) === null || _b === void 0 ? void 0 : _b.classList.contains("fullyEvo-only")) || false;
        return { searchedTypes, searchedGens, toggledFullEvo, searchedName };
    }
}
export default new filterContainerView();
