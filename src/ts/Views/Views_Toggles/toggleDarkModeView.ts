import solrock from "./../../../img/icons_ui/solrock.png";
import lunrock from "./../../../img/icons_ui/lunrock.png";

class toggleDarkModeView {
  _btnToggle = document.querySelector(`.toggle-darkMode`);
  _btnToggleIcon = this._btnToggle!.querySelector("img");

  addHandlerClick() {
    this._btnToggleIcon!.src = document.documentElement.classList.contains(
      "dark"
    )
      ? lunrock
      : solrock;
    this._btnToggle?.addEventListener("click", () => {
      this._btnToggleIcon!.src = this._btnToggleIcon!.src.split("/")
        .at(-1)
        ?.includes("solrock")
        ? lunrock
        : solrock;
      document.documentElement.classList.toggle("dark");
    });
  }
}

export default new toggleDarkModeView();
