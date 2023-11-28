class deleteMemberBtnsView {
    constructor() {
        this._deleteBtns = Array.from(document.querySelectorAll(".delete-member-btn"));
    }
    addHandlerClick(handler) {
        this._deleteBtns.forEach((deleteBtn) => {
            deleteBtn.addEventListener("click", () => {
                const teamMember = deleteBtn.closest(".team-member");
                const uniqueid = Number(teamMember.dataset.uniqueid);
                deleteBtn.classList.add("hidden");
                handler(uniqueid);
            });
        });
    }
}
export default new deleteMemberBtnsView();
