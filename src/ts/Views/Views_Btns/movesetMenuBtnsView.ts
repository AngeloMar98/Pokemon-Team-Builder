import ToggleMenus from "./ToggleMenu.js";

class movesetMenuBtnsView extends ToggleMenus {
  _btns = Array.from(document.querySelectorAll(".moveset-menu-btn"));

  toggleMenus(btn: HTMLButtonElement) {
    btn.closest(".team-member")!.classList.toggle("hide-moveset");
    btn.classList.toggle("moveset-menu-btn-open");
  }

  closeEverythingElse(btn: HTMLButtonElement) {
    this._btns.forEach((otherBtn) => {
      if (otherBtn !== btn) {
        otherBtn.closest(".team-member")!.classList.add("hide-moveset");
        otherBtn.classList.remove("moveset-menu-btn-open");
      }
    });
  }
}

export default new movesetMenuBtnsView();
