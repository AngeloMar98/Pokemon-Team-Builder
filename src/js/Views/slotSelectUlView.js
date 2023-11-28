class slotSelectUlView {
    constructor() {
        this._slotsSelects = Array.from(document.querySelectorAll(".slots-select"));
        this._timeoutTooltip = null;
    }
    _startTimeout(tooltip) {
        clearTimeout(this._timeoutTooltip || "");
        this._timeoutTooltip = setTimeout(() => {
            tooltip === null || tooltip === void 0 ? void 0 : tooltip.classList.remove("block");
        }, 200);
    }
    _interruptTimeout() {
        clearTimeout(this._timeoutTooltip || "");
    }
    addHandlerHover() {
        this._slotsSelects.forEach((slotSelect) => {
            var _a;
            const tooltip = (_a = slotSelect
                .closest(".moveset-menu-inner")) === null || _a === void 0 ? void 0 : _a.querySelector(".tooltip");
            tooltip.addEventListener("mouseout", (e) => {
                if (e.target.closest(".tooltip"))
                    return;
                this._startTimeout(tooltip);
            });
            tooltip.addEventListener("mouseover", (e) => {
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
    addHandlerClick(handler) {
        this._slotsSelects.forEach((slotSelect) => {
            slotSelect.addEventListener("click", (e) => {
                var _a, _b;
                const li = e.target.closest(".slot-select_li");
                if (li) {
                    const name = li.dataset.name || "";
                    const type = li.dataset.type || "";
                    const slotType = ((_a = li.closest(".slot-select")) === null || _a === void 0 ? void 0 : _a.classList[2].split("-")[2]) || "";
                    const memberNum = Number((_b = li.closest(".team-member")) === null || _b === void 0 ? void 0 : _b.classList[2].split("-")[2]) || 1;
                    handler(name, type, slotType, memberNum);
                }
            });
        });
    }
}
export default new slotSelectUlView();
