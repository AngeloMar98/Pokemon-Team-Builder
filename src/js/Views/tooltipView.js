class tooltipView {
    constructor() {
        this._tooltips = Array.from(document.querySelectorAll(".tooltip"));
    }
    addHandlerHover() {
        this._tooltips.forEach((tooltip) => {
            tooltip.addEventListener("mouseout", (e) => {
                setTimeout(() => tooltip === null || tooltip === void 0 ? void 0 : tooltip.classList.remove("block"), 1500);
            });
        });
    }
}
export default new tooltipView();
