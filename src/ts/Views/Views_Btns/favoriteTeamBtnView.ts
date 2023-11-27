class favoriteTeamBtnView {
  btn = document.querySelector(".favorite-team-btn");
  promptTeam = document.querySelector(".prompt-team");

  addHandlerClick(
    closeSideMenu: () => void,
    handleTypeChoice: (promptType: string) => void
  ) {
    this.btn?.addEventListener("click", () => {
      closeSideMenu();
      this.promptTeam?.classList.remove("hidden");
      document.body.classList.add("pointer-events-none");
    });

    this.promptTeam?.addEventListener("click", (e: any) => {
      if (e.target.classList.contains("prompt_btn")) {
        const promptBtn = e.target;

        if (promptBtn.classList.contains("prompt_btn-yes")) {
          handleTypeChoice("yes");
        } else if (promptBtn.classList.contains("prompt_btn-no")) {
          handleTypeChoice("no");
        } else if (promptBtn.classList.contains("prompt_btn-upd")) {
          handleTypeChoice("upd");
        } else if (promptBtn.classList.contains("prompt_btn-unfav")) {
          handleTypeChoice("unfav");
        }

        this.promptTeam?.classList.add("hidden");
        document.body.classList.remove("pointer-events-none");
      }
    });
  }

  newFav() {
    this.btn?.classList.remove("fill-fighting");
    this.promptTeam?.classList.add("newfav");
    this.promptTeam?.classList.remove("oldfav");
  }

  oldFav() {
    this.btn?.classList.add("fill-fighting");
    this.promptTeam?.classList.remove("newfav");
    this.promptTeam?.classList.add("oldfav");
  }
}

export default new favoriteTeamBtnView();
