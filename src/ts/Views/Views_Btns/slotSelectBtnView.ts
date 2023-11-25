import ToggleMenus from "./ToggleMenu.js";

class slotSelectBtnView extends ToggleMenus {
  _btns = Array.from(document.querySelectorAll(".moveset-menu")).flatMap(
    (movesetMenu) =>
      Array.from(movesetMenu.querySelectorAll(".slot-select_btn"))
  );

  toggleMenus(btn: HTMLButtonElement) {
    btn.closest(".slot-select")?.classList.toggle("activated");
  }

  closeEverythingElse(btn: HTMLButtonElement) {
    this._btns.forEach((otherBtn) => {
      if (otherBtn !== btn) {
        otherBtn.closest(".slot-select")!.classList.remove("activated");
      }
    });
  }
}

export default new slotSelectBtnView();
