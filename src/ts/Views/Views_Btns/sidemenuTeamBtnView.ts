class sidemenuTeamBtnView {
  _btn = document.querySelector(".sidemenu-team_btn ");
  _menu = document.querySelector(".sidemenu-team");

  addHandlerClick() {
    this._btn?.addEventListener("click", () => {
      this._btn?.classList.toggle("moved");
      this._menu?.classList.toggle("moved");
    });
  }
}

export default new sidemenuTeamBtnView();
