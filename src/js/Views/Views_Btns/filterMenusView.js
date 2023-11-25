import ToggleMenus from "./ToggleMenu.js";
class filterMenusView extends ToggleMenus {
    constructor() {
        super(...arguments);
        this._btns = Array.from(document.querySelectorAll(".filter-menu_btn"));
    }
    toggleMenus(btn) {
        var _a;
        (_a = btn.closest(".filter-menu")) === null || _a === void 0 ? void 0 : _a.classList.toggle("activated");
    }
    closeEverythingElse() { }
}
export default new filterMenusView();
