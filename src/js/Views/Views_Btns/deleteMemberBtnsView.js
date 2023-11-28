class deleteMemberBtnsView {
    constructor() {
        this._deleteBtns = Array.from(document.querySelectorAll(".delete-member-btn"));
    }
    addHandlerClick(handler) {
        this._deleteBtns.forEach((deleteBtn) => {
            deleteBtn.addEventListener("click", () => {
                const teamMember = deleteBtn.closest(".team-member");
                const uniqueID = Number(teamMember.dataset.uniqueID);
                deleteBtn.classList.add("hidden");
                handler(uniqueID);
            });
        });
    }
}
export default new deleteMemberBtnsView();
