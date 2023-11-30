class teamMemberPickBtnsView {
  smallPickBtns = Array.from(
    document.querySelector(".pick-container-1")!.querySelectorAll(".pick-btn")
  );
  bigPickBtns = Array.from(
    document.querySelector(".pick-container-2")!.querySelectorAll(".pick-btn")
  );

  sidemenuTeam = document.querySelector(".sidemenu-team");
  sidemenuMembers = Array.from(this.sidemenuTeam!.querySelectorAll("article"));
  pickBtnsContainer = document.querySelector(".team-members-pick");
  allBtns: HTMLElement[] = Array.from(document.querySelectorAll(".pick-btn"));

  handler(pickBtn: HTMLElement) {
    const tabsNum: string[] = pickBtn.dataset.id!.split("-");
    this.handleMenus(tabsNum);
  }

  addHandlerClick() {
    this.pickBtnsContainer?.addEventListener("click", (e: any) => {
      if (!e.target.classList.contains("pick-btn")) return;
      const pickBtn = e.target;
      this.handler(pickBtn);
    });
    this.sidemenuTeam?.addEventListener("click", (e: any) => {
      if (!e.target.classList.contains("sidemenu-member")) return;
      const pickBtn = e.target;
      this.handler(pickBtn);
    });
  }

  handleMenus(tabsNum: string[]) {
    this._toggleMenus(tabsNum);
    this._closeEverythingElse(tabsNum);
  }

  _toggleMenus(tabsNum: string[]) {
    this.smallPickBtns[Number(tabsNum[0]) - 1].classList.add("pick-btn-active");

    this.bigPickBtns[
      tabsNum.length === 2
        ? Number(tabsNum[1]) / 2 - 1
        : Math.ceil(Number(tabsNum[0]) / 2 - 1)
    ].classList.add("pick-btn-active");

    //  hard active, uses !important meaning we want it to be present in the mobile-sized site
    // soft active, uses !important behind screen query we want to see it only from the tablet view point on

    // SWAP SOFT-HARD BETWEEN DUOS OF TABS
    document
      .querySelector(`.team-member-${Number(tabsNum[0])}`)
      ?.classList.remove("soft-active");
    this.sidemenuMembers[Number(tabsNum[0]) - 1].classList.add(
      "soft-active-member"
    );

    document
      .querySelector(`.team-member-${Number(tabsNum[0])}`)
      ?.classList.add("hard-active");
    this.sidemenuMembers[Number(tabsNum[0]) - 1].classList.add(
      "hard-active-member"
    );

    if (Number(tabsNum[0]) % 2 !== 0) {
      document
        .querySelector(`.team-member-${Number(tabsNum[0]) + 1}`)
        ?.classList.add("soft-active");

      this.sidemenuMembers[Number(tabsNum[0])].classList.add(
        "soft-active-member"
      );

      document
        .querySelector(`.team-member-${Number(tabsNum[0]) + 1}`)
        ?.classList.remove("hard-active");

      this.sidemenuMembers[Number(tabsNum[0])].classList.remove(
        "hard-active-member"
      );
    } else {
      document
        .querySelector(`.team-member-${Number(tabsNum[0]) - 1}`)
        ?.classList.add("soft-active");
      this.sidemenuMembers[Number(tabsNum[0]) - 2].classList.add(
        "soft-active-member"
      );
      document
        .querySelector(`.team-member-${Number(tabsNum[0]) - 1}`)
        ?.classList.remove("hard-active");
      this.sidemenuMembers[Number(tabsNum[0]) - 2].classList.remove(
        "hard-active-member"
      );
    }
  }

  _closeEverythingElse(tabsNum: string[]) {
    Array.from(document.querySelectorAll(".team-member")).forEach(
      (teamMember) => teamMember.classList.add(".hide-moveset")
    );
    this.allBtns.forEach((otherBtn: HTMLElement) => {
      const otherTabs = otherBtn.dataset.id!.split("-");
      if (!otherTabs.includes(tabsNum[0])) {
        this.smallPickBtns[Number(otherTabs[0]) - 1].classList.remove(
          "pick-btn-active"
        );
        if (otherTabs.length > 1) {
          this.bigPickBtns[
            Math.ceil(Number(otherTabs[0]) / 2) - 1
          ].classList.remove("pick-btn-active");
        }

        if (
          (Number(tabsNum[0]) % 2 === 0 &&
            Number(otherTabs[0]) === Number(tabsNum[0]) - 1) ||
          (Number(tabsNum[0]) % 2 !== 0 &&
            Number(otherTabs[0]) === Number(tabsNum[0]) + 1)
        )
          return;

        document
          .querySelector(`.team-member-${Number(otherTabs[0])}`)
          ?.classList.remove("hard-active");
        this.sidemenuMembers[Number(tabsNum[0]) - 1].classList.remove(
          "hard-active-member"
        );
        document
          .querySelector(`.team-member-${Number(otherTabs[0])}`)
          ?.classList.remove("soft-active");
        this.sidemenuMembers[Number(tabsNum[0])].classList.remove(
          "soft-active-member"
        );
      }
    });
  }
}
export default new teamMemberPickBtnsView();
