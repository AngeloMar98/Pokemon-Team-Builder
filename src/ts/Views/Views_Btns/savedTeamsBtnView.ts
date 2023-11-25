import ToggleMenus from "./ToggleMenu.js";

class savedTeamsBtnView extends ToggleMenus {
  _btn = document.querySelector(".saved-teams_btn");
  _menu = document.querySelector(".teamsAndStats");

  toggleMenus() {
    this._menu?.classList.toggle("show-teams");
    this._menu?.classList.remove("hidden");
  }

  closeEverythingElse() {}
}

export default new savedTeamsBtnView();
