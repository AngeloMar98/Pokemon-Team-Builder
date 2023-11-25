import ToggleMenus from "./ToggleMenu.js";

class statisticsBtnView extends ToggleMenus {
  _btn = document.querySelector(".statistics_btn");
  _menu = document.querySelector(".teamsAndStats");

  toggleMenus() {
    this._menu?.classList.toggle("show-stats");
    this._menu?.classList.remove("hidden");
  }

  closeEverythingElse() {}
}

export default new statisticsBtnView();
