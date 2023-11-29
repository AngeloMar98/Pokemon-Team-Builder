class TeamNameInputView {
    constructor() {
        this._teamNameLabel = document.querySelector(".team-name-label");
        this._teamNameInput = document.querySelector(".team-name-input");
    }
    addHandlerNameChange(handler) {
        var _a, _b, _c;
        this._teamNameInput.value = ((_a = this._teamNameLabel) === null || _a === void 0 ? void 0 : _a.textContent) || "";
        (_b = this._teamNameLabel) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            this._teamNameLabel.classList.add("hidden");
            this._teamNameInput.classList.remove("hidden");
        });
        (_c = this._teamNameInput) === null || _c === void 0 ? void 0 : _c.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                this._teamNameLabel.textContent =
                    this._teamNameInput.value || "Team Name";
                handler(this._teamNameLabel.textContent);
                this._teamNameLabel.classList.remove("hidden");
                this._teamNameInput.classList.add("hidden");
            }
        });
    }
    updateName(newName = "Team name") {
        this._teamNameLabel.textContent = String(newName);
    }
}
export default new TeamNameInputView();
