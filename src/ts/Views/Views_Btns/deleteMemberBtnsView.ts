class deleteMemberBtnsView {
  _deleteBtns = Array.from(document.querySelectorAll(".delete-member-btn"));

  addHandlerClick(handler: (memberNum: string) => void) {
    this._deleteBtns.forEach((deleteBtn) => {
      const memberNum = deleteBtn.closest(".team-member")?.id.split("-")[1];
      deleteBtn.addEventListener("click", () => {
        console.log(memberNum);
        deleteBtn.classList.add("hidden");
        handler(memberNum || "");
      });
    });
  }
}

export default new deleteMemberBtnsView();
