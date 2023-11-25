class toggleDarkModeView {
    constructor() {
        this._btnToggle = document.querySelector(`.toggle-darkMode`);
        this._btnToggleIcon = this._btnToggle.querySelector("img");
        this._iconSolrock = "src/img/icons_ui/solrock.png";
        this._iconLunrock = "src/img/icons_ui/lunrock.png";
    }
    addHandlerClick() {
        var _a;
        (_a = this._btnToggle) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            var _a;
            this._btnToggleIcon.src = ((_a = this._btnToggleIcon.src.split("/")
                .at(-1)) === null || _a === void 0 ? void 0 : _a.includes("solrock"))
                ? this._iconLunrock
                : this._iconSolrock;
            document.documentElement.classList.toggle("dark");
        });
    }
}
export default new toggleDarkModeView();
