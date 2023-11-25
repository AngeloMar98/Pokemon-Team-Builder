import ToggleMenus from "./ToggleMenu.js";

class sidemenuBtnView extends ToggleMenus {
  _btn = document.querySelector(".sidemenu-btn");
  _menu = document.querySelector(".sidemenu");
  _everythingELse = document.querySelector(".teamsAndStats");

  toggleMenus() {
    this._menu?.classList.toggle("sidemenu-hidden");
    this._btn?.classList.toggle("sidemenu-btn-lifted");
  }

  closeEverythingElse() {
    this._everythingELse?.classList.remove("show-teams");
    this._everythingELse?.classList.remove("show-stats");
  }
}
export default new sidemenuBtnView();
