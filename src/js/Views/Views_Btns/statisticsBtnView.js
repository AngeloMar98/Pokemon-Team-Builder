import ToggleMenus from "./ToggleMenu.js";
class statisticsBtnView extends ToggleMenus {
    constructor() {
        super(...arguments);
        this._btn = document.querySelector(".statistics_btn");
        this._menu = document.querySelector(".teamsAndStats");
    }
    toggleMenus() {
        var _a, _b;
        (_a = this._menu) === null || _a === void 0 ? void 0 : _a.classList.toggle("show-stats");
        (_b = this._menu) === null || _b === void 0 ? void 0 : _b.classList.remove("hidden");
    }
    closeEverythingElse() { }
}
export default new statisticsBtnView();
