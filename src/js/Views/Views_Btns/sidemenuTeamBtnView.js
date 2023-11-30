class sidemenuTeamBtnView {
    constructor() {
        this._btn = document.querySelector(".sidemenu-team_btn ");
        this._menu = document.querySelector(".sidemenu-team");
    }
    addHandlerClick() {
        var _a;
        (_a = this._btn) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            var _a, _b;
            (_a = this._btn) === null || _a === void 0 ? void 0 : _a.classList.toggle("moved");
            (_b = this._menu) === null || _b === void 0 ? void 0 : _b.classList.toggle("moved");
        });
    }
}
export default new sidemenuTeamBtnView();
