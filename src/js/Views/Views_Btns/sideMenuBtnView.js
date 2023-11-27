import ToggleMenus from "./ToggleMenu.js";
class sidemenuBtnView extends ToggleMenus {
    constructor() {
        super(...arguments);
        this._btn = document.querySelector(".sidemenu-btn");
        this._menu = document.querySelector(".sidemenu");
        this._everythingELse = document.querySelector(".teamsAndStats");
    }
    toggleMenus() {
        var _a, _b;
        (_a = this._menu) === null || _a === void 0 ? void 0 : _a.classList.toggle("sidemenu-hidden");
        (_b = this._btn) === null || _b === void 0 ? void 0 : _b.classList.toggle("sidemenu-btn-lifted");
    }
    closeEverythingElse() {
        var _a, _b;
        (_a = this._everythingELse) === null || _a === void 0 ? void 0 : _a.classList.remove("show-teams");
        (_b = this._everythingELse) === null || _b === void 0 ? void 0 : _b.classList.remove("show-stats");
    }
    closeAll() {
        var _a, _b;
        document.querySelector(".sidemenu").classList.add("sidemenu-hidden");
        document
            .querySelector(".sidemenu-btn")
            .classList.remove("sidemenu-btn-lifted");
        (_a = document.querySelector(".teamsAndStats")) === null || _a === void 0 ? void 0 : _a.classList.remove("show-teams");
        (_b = document.querySelector(".teamsAndStats")) === null || _b === void 0 ? void 0 : _b.classList.remove("show-stats");
    }
}
export default new sidemenuBtnView();
