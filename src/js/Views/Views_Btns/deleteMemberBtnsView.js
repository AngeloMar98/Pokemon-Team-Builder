class deleteMemberBtnsView {
    constructor() {
        this._deleteBtns = Array.from(document.querySelectorAll(".delete-member-btn"));
    }
    addHandlerClick(handler) {
        this._deleteBtns.forEach((deleteBtn) => {
            var _a;
            const memberNum = (_a = deleteBtn
                .closest(".team-member")) === null || _a === void 0 ? void 0 : _a.classList[1].split("-")[2];
            deleteBtn.addEventListener("click", () => {
                console.log(memberNum);
                deleteBtn.classList.add("hidden");
                handler(memberNum || "");
            });
        });
    }
}
export default new deleteMemberBtnsView();
