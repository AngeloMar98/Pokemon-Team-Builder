class toggleDarkModeView {
    constructor() {
        this._btnToggle = document.querySelector(`.filter-fullyEvo`);
    }
    addHandlerClick() {
        var _a;
        (_a = this._btnToggle) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            var _a;
            (_a = this._btnToggle) === null || _a === void 0 ? void 0 : _a.classList.toggle("fullyEvo-only");
        });
    }
}
export default new toggleDarkModeView();
