class searchBntView {
    constructor() {
        this._btn = document.querySelector(".search-btn");
    }
    addHandlerClick(handler) {
        var _a;
        (_a = this._btn) === null || _a === void 0 ? void 0 : _a.addEventListener("click", handler);
    }
}
export default new searchBntView();
