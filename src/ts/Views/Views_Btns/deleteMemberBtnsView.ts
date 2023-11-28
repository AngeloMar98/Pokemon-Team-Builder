class deleteMemberBtnsView {
  _deleteBtns = Array.from(document.querySelectorAll(".delete-member-btn"));

  addHandlerClick(handler: (uniqueID: number) => void) {
    this._deleteBtns.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", () => {
        const teamMember: HTMLElement = deleteBtn.closest(".team-member")!;
        const uniqueid: number = Number(teamMember.dataset.uniqueid);
        deleteBtn.classList.add("hidden");
        handler(uniqueid);
      });
    });
  }
}

export default new deleteMemberBtnsView();
