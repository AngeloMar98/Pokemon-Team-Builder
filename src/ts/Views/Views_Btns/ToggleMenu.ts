export default class ToggleMenus {
  // _btn
  // _menu
  // _everythingElse

  addHandlerClick() {
    this._btn?.addEventListener("click", () => {
      this.toggleMenus();
      this.closeEverythingElse();
    });
  }

  addHandlerClickMultiple() {
    this._btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.toggleMenus(btn);
        this.closeEverythingElse(btn);
      });
    });
  }
}
