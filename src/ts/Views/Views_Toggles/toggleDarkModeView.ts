class toggleDarkModeView {
  _btnToggle = document.querySelector(`.toggle-darkMode`);
  _btnToggleIcon = this._btnToggle!.querySelector("img");

  _iconSolrock = "src/img/icons_ui/solrock.png";
  _iconLunrock = "src/img/icons_ui/lunrock.png";

  addHandlerClick() {
    this._btnToggle?.addEventListener("click", () => {
      this._btnToggleIcon!.src = this._btnToggleIcon!.src.split("/")
        .at(-1)
        ?.includes("solrock")
        ? this._iconLunrock
        : this._iconSolrock;
      document.documentElement.classList.toggle("dark");
    });
  }
}

export default new toggleDarkModeView();
