class TeamNameInputView {
  _teamNameLabel = document.querySelector(".team-name-label");
  _teamNameInput: HTMLInputElement | null =
    document.querySelector(".team-name-input");

  addHandlerNameChange() {
    this._teamNameInput!.value = this._teamNameLabel?.textContent || "";

    this._teamNameLabel?.addEventListener("click", () => {
      this._teamNameLabel!.classList.add("hidden");
      this._teamNameInput!.classList.remove("hidden");
    });

    this._teamNameInput?.addEventListener(
      "keypress",
      (e: KeyboardEventInit) => {
        if (e.key === "Enter") {
          this._teamNameLabel!.textContent =
            this._teamNameInput!.value || "Default Team Name";

          this._teamNameLabel!.classList.remove("hidden");
          this._teamNameInput!.classList.add("hidden");
        }
      }
    );
  }
}

export default new TeamNameInputView();
