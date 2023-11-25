export default class ToggleMenus {
    // _btn
    // _menu
    // _everythingElse
    addHandlerClick() {
        var _a;
        (_a = this._btn) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
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
