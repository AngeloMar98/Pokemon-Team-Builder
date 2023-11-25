import { CLIENT_RENEG_LIMIT } from "tls";

class teamMemberPickBtnsView {
  smallPickBtns = Array.from(
    document.querySelector(".pick-container-1")!.querySelectorAll(".pick-btn")
  );
  bigPickBtns = Array.from(
    document.querySelector(".pick-container-2")!.querySelectorAll(".pick-btn")
  );
  pickBtnsContainer = document.querySelector(".team-members-pick");
  allBtns = Array.from(document.querySelectorAll(".pick-btn"));

  addHandlerClick() {
    this.pickBtnsContainer?.addEventListener("click", (e: any) => {
      if (!e.target.classList.contains("pick-btn")) return;
      const pickBtn = e.target;
      const tabsNum: string[] = pickBtn.classList[0].split("-").slice(1);
      this.toggleMenus(tabsNum);
      this.closeEverythingElse(tabsNum);
    });
  }

  toggleMenus(tabsNum: string[]) {
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
    document
      .querySelector(`.team-member-${Number(tabsNum[0])}`)
      ?.classList.add("hard-active");

    if (Number(tabsNum[0]) % 2 !== 0) {
      document
        .querySelector(`.team-member-${Number(tabsNum[0]) + 1}`)
        ?.classList.add("soft-active");
      document
        .querySelector(`.team-member-${Number(tabsNum[0]) + 1}`)
        ?.classList.remove("hard-active");
    } else {
      document
        .querySelector(`.team-member-${Number(tabsNum[0]) - 1}`)
        ?.classList.add("soft-active");
      document
        .querySelector(`.team-member-${Number(tabsNum[0]) - 1}`)
        ?.classList.remove("hard-active");
    }
  }

  closeEverythingElse(tabsNum: string[]) {
    Array.from(document.querySelectorAll(".team-member")).forEach(
      (teamMember) => teamMember.classList.add(".hide-moveset")
    );
    this.allBtns.forEach((otherBtn) => {
      const otherTabs = otherBtn.classList[0].split("-").slice(1);
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
        document
          .querySelector(`.team-member-${Number(otherTabs[0])}`)
          ?.classList.remove("soft-active");
      }
    });
  }
}
export default new teamMemberPickBtnsView();
