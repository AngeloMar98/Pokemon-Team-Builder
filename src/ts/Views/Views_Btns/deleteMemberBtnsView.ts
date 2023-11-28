class deleteMemberBtnsView {
  _deleteBtns = Array.from(document.querySelectorAll(".delete-member-btn"));

  addHandlerClick(handler: (uniqueID: number) => void) {
    this._deleteBtns.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", () => {
        const teamMember: HTMLElement = deleteBtn.closest(".team-member")!;
        const uniqueID: number = Number(teamMember.dataset.uniqueID);
        deleteBtn.classList.add("hidden");
        handler(uniqueID);
      });
    });
  }
}

export default new deleteMemberBtnsView();
