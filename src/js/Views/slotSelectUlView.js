class slotSelectUlView {
    constructor() {
        this._slotsSelects = Array.from(document.querySelectorAll(".slots-select"));
        this._timeoutTooltip = null;
    }
    _startTimeout(tooltip) {
        console.log(`started timeout`);
        clearTimeout(this._timeoutTooltip || "");
        this._timeoutTooltip = setTimeout(() => {
            console.log(`executing`);
            tooltip === null || tooltip === void 0 ? void 0 : tooltip.classList.remove("block");
        }, 1500);
    }
    _interruptTimeout() {
        clearTimeout(this._timeoutTooltip || "");
        console.log("interrupted timeout");
    }
    addHandlerHover() {
        this._slotsSelects.forEach((slotSelect) => {
            var _a;
            const tooltip = (_a = slotSelect
                .closest(".moveset-menu-inner")) === null || _a === void 0 ? void 0 : _a.querySelector(".tooltip");
            console.log(tooltip);
            tooltip.addEventListener("mouseout", (e) => {
                console.log(`mouseout1`);
                if (e.target.closest(".tooltip"))
                    return;
                console.log(`mouseout2`);
                console.log(`out toolptip`);
                this._startTimeout(tooltip);
            });
            tooltip.addEventListener("mouseover", (e) => {
                console.log(`in toolptip`);
                this._interruptTimeout();
            });
            Array.from(slotSelect.querySelectorAll(".slot-select_ul")).forEach((slotSelectUl) => {
                slotSelectUl.addEventListener("mouseout", (e) => {
                    this._startTimeout(tooltip);
                });
                slotSelectUl.addEventListener("mouseover", (e) => {
                    var _a;
                    const li = e.target;
                    tooltip === null || tooltip === void 0 ? void 0 : tooltip.classList.add("block");
                    this._interruptTimeout();
                    if (li instanceof Element &&
                        li.classList[0] === "slot-select_li") {
                        tooltip
                            ? (tooltip.innerHTML = ((_a = li.querySelector("p")) === null || _a === void 0 ? void 0 : _a.innerHTML) || "")
                            : "";
                    }
                });
            });
        });
    }
}
export default new slotSelectUlView();
