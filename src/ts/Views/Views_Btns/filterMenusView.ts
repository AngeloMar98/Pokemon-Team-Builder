import ToggleMenus from "./ToggleMenu.js";

class filterMenusView extends ToggleMenus {
  _btns = Array.from(document.querySelectorAll(".filter-menu_btn"));

  toggleMenus(btn: HTMLButtonElement) {
    btn.closest(".filter-menu")?.classList.toggle("activated");
  }

  closeEverythingElse() {}
}

export default new filterMenusView();
