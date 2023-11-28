import solrock from "./../../../img/icons_ui/solrock.png";
import lunrock from "./../../../img/icons_ui/lunrock.png";

class toggleDarkModeView {
  constructor() {
    this._btnToggle = document.querySelector(`.toggle-darkMode`);
    this._btnToggleIcon = this._btnToggle.querySelector("img");
  }
  addHandlerClick() {
    var _a;
    this._btnToggleIcon.src = document.documentElement.classList.contains(
      "dark"
    )
      ? lunrock
      : solrock;
    (_a = this._btnToggle) === null || _a === void 0
      ? void 0
      : _a.addEventListener("click", () => {
          var _a;
          this._btnToggleIcon.src = (
            (_a = this._btnToggleIcon.src.split("/").at(-1)) === null ||
            _a === void 0
              ? void 0
              : _a.includes("solrock")
          )
            ? lunrock
            : solrock;
          document.documentElement.classList.toggle("dark");
        });
  }
}
export default new toggleDarkModeView();
