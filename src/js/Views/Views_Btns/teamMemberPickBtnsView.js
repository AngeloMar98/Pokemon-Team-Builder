class teamMemberPickBtnsView {
    constructor() {
        this.smallPickBtns = Array.from(document.querySelector(".pick-container-1").querySelectorAll(".pick-btn"));
        this.bigPickBtns = Array.from(document.querySelector(".pick-container-2").querySelectorAll(".pick-btn"));
        this.sidemenuTeam = document.querySelector(".sidemenu-team");
        this.sidemenuMembers = Array.from(this.sidemenuTeam.querySelectorAll("article"));
        this.pickBtnsContainer = document.querySelector(".team-members-pick");
        this.allBtns = Array.from(document.querySelectorAll(".pick-btn"));
    }
    handler(pickBtn) {
        const tabsNum = pickBtn.dataset.id.split("-");
        this.handleMenus(tabsNum);
    }
    addHandlerClick() {
        var _a, _b;
        (_a = this.pickBtnsContainer) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
            if (!e.target.classList.contains("pick-btn"))
                return;
            const pickBtn = e.target;
            this.handler(pickBtn);
        });
        (_b = this.sidemenuTeam) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (e) => {
            if (!e.target.classList.contains("sidemenu-member"))
                return;
            const pickBtn = e.target;
            this.handler(pickBtn);
        });
    }
    handleMenus(tabsNum) {
        this._toggleMenus(tabsNum);
        this._closeEverythingElse(tabsNum);
    }
    _toggleMenus(tabsNum) {
        var _a, _b, _c, _d, _e, _f;
        this.smallPickBtns[Number(tabsNum[0]) - 1].classList.add("pick-btn-active");
        this.bigPickBtns[tabsNum.length === 2
            ? Number(tabsNum[1]) / 2 - 1
            : Math.ceil(Number(tabsNum[0]) / 2 - 1)].classList.add("pick-btn-active");
        //  hard active, uses !important meaning we want it to be present in the mobile-sized site
        // soft active, uses !important behind screen query we want to see it only from the tablet view point on
        // SWAP SOFT-HARD BETWEEN DUOS OF TABS
        (_a = document
            .querySelector(`.team-member-${Number(tabsNum[0])}`)) === null || _a === void 0 ? void 0 : _a.classList.remove("soft-active");
        this.sidemenuMembers[Number(tabsNum[0]) - 1].classList.add("soft-active-member");
        (_b = document
            .querySelector(`.team-member-${Number(tabsNum[0])}`)) === null || _b === void 0 ? void 0 : _b.classList.add("hard-active");
        this.sidemenuMembers[Number(tabsNum[0]) - 1].classList.add("hard-active-member");
        if (Number(tabsNum[0]) % 2 !== 0) {
            (_c = document
                .querySelector(`.team-member-${Number(tabsNum[0]) + 1}`)) === null || _c === void 0 ? void 0 : _c.classList.add("soft-active");
            this.sidemenuMembers[Number(tabsNum[0])].classList.add("soft-active-member");
            (_d = document
                .querySelector(`.team-member-${Number(tabsNum[0]) + 1}`)) === null || _d === void 0 ? void 0 : _d.classList.remove("hard-active");
            this.sidemenuMembers[Number(tabsNum[0])].classList.remove("hard-active-member");
        }
        else {
            (_e = document
                .querySelector(`.team-member-${Number(tabsNum[0]) - 1}`)) === null || _e === void 0 ? void 0 : _e.classList.add("soft-active");
            this.sidemenuMembers[Number(tabsNum[0]) - 2].classList.add("soft-active-member");
            (_f = document
                .querySelector(`.team-member-${Number(tabsNum[0]) - 1}`)) === null || _f === void 0 ? void 0 : _f.classList.remove("hard-active");
            this.sidemenuMembers[Number(tabsNum[0]) - 2].classList.remove("hard-active-member");
        }
    }
    _closeEverythingElse(tabsNum) {
        Array.from(document.querySelectorAll(".team-member")).forEach((teamMember) => teamMember.classList.add(".hide-moveset"));
        this.allBtns.forEach((otherBtn) => {
            var _a, _b;
            const otherTabs = otherBtn.dataset.id.split("-");
            if (!otherTabs.includes(tabsNum[0])) {
                this.smallPickBtns[Number(otherTabs[0]) - 1].classList.remove("pick-btn-active");
                if (otherTabs.length > 1) {
                    this.bigPickBtns[Math.ceil(Number(otherTabs[0]) / 2) - 1].classList.remove("pick-btn-active");
                }
                if ((Number(tabsNum[0]) % 2 === 0 &&
                    Number(otherTabs[0]) === Number(tabsNum[0]) - 1) ||
                    (Number(tabsNum[0]) % 2 !== 0 &&
                        Number(otherTabs[0]) === Number(tabsNum[0]) + 1))
                    return;
                (_a = document
                    .querySelector(`.team-member-${Number(otherTabs[0])}`)) === null || _a === void 0 ? void 0 : _a.classList.remove("hard-active");
                this.sidemenuMembers[Number(tabsNum[0]) - 1].classList.remove("hard-active-member");
                (_b = document
                    .querySelector(`.team-member-${Number(otherTabs[0])}`)) === null || _b === void 0 ? void 0 : _b.classList.remove("soft-active");
                this.sidemenuMembers[Number(tabsNum[0]) - 1].classList.remove("soft-active-member");
            }
        });
    }
}
export default new teamMemberPickBtnsView();
