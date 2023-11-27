class TeamNameInputView {
  _teamNameLabel = document.querySelector(".team-name-label");
  _teamNameInput: HTMLInputElement | null =
    document.querySelector(".team-name-input");

  addHandlerNameChange(handler: (newName: string) => void) {
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
            this._teamNameInput!.value || "Team Name";
          handler(this._teamNameLabel!.textContent);
          this._teamNameLabel!.classList.remove("hidden");
          this._teamNameInput!.classList.add("hidden");
        }
      }
    );
  }

  updateName(newName: String) {
    this._teamNameLabel!.textContent = String(newName) || "";
  }
}

export default new TeamNameInputView();
