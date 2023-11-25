import ToggleMenus from "./ToggleMenu.js";
class slotSelectBtnView extends ToggleMenus {
    constructor() {
        super(...arguments);
        this._btns = Array.from(document.querySelectorAll(".moveset-menu")).flatMap((movesetMenu) => Array.from(movesetMenu.querySelectorAll(".slot-select_btn")));
    }
    toggleMenus(btn) {
        var _a;
        (_a = btn.closest(".slot-select")) === null || _a === void 0 ? void 0 : _a.classList.toggle("activated");
    }
    closeEverythingElse(btn) {
        this._btns.forEach((otherBtn) => {
            if (otherBtn !== btn) {
                otherBtn.closest(".slot-select").classList.remove("activated");
            }
        });
    }
}
export default new slotSelectBtnView();
