class slotInputView {
    constructor() {
        this._inputs = Array.from(document.querySelectorAll(".moveset-menu")).flatMap((movesetMenu) => Array.from(movesetMenu.querySelectorAll(".slot-select_input")));
    }
    addHandlerKeyupMultiple() {
        this._inputs.forEach((input) => this._addHandlerKeyup(input));
    }
    _addHandlerKeyup(input) {
        input.addEventListener("keyup", function () {
            const value = input.value;
            const listOptions = input
                .closest(".slot-select_ul")
                .querySelectorAll("li");
            console.log(listOptions);
            for (const li of Array.from(listOptions)) {
                const option = (li === null || li === void 0 ? void 0 : li.textContent) || (li === null || li === void 0 ? void 0 : li.innerText);
                li.style.display = option.toUpperCase().includes(value.toUpperCase())
                    ? ""
                    : "none";
            }
        });
    }
}
export default new slotInputView();
