class favoriteTeamBtnView {
    constructor() {
        this.btn = document.querySelector(".favorite-team-btn");
        this.promptTeam = document.querySelector(".prompt-team");
    }
    addHandlerClick(closeSideMenu, handleTypeChoice) {
        var _a, _b;
        (_a = this.btn) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            var _a;
            closeSideMenu();
            (_a = this.promptTeam) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
            document.body.classList.add("pointer-events-none");
        });
        (_b = this.promptTeam) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (e) => {
            var _a;
            if (e.target.classList.contains("prompt_btn")) {
                const promptBtn = e.target;
                if (promptBtn.classList.contains("prompt_btn-yes")) {
                    handleTypeChoice("yes");
                }
                else if (promptBtn.classList.contains("prompt_btn-no")) {
                    handleTypeChoice("no");
                }
                else if (promptBtn.classList.contains("prompt_btn-upd")) {
                    handleTypeChoice("upd");
                }
                else if (promptBtn.classList.contains("prompt_btn-unfav")) {
                    handleTypeChoice("unfav");
                }
                (_a = this.promptTeam) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
                document.body.classList.remove("pointer-events-none");
            }
        });
    }
    newFav() {
        var _a, _b, _c;
        (_a = this.btn) === null || _a === void 0 ? void 0 : _a.classList.remove("fill-fighting");
        (_b = this.promptTeam) === null || _b === void 0 ? void 0 : _b.classList.add("newfav");
        (_c = this.promptTeam) === null || _c === void 0 ? void 0 : _c.classList.remove("oldfav");
    }
    oldFav() {
        var _a, _b, _c;
        (_a = this.btn) === null || _a === void 0 ? void 0 : _a.classList.add("fill-fighting");
        (_b = this.promptTeam) === null || _b === void 0 ? void 0 : _b.classList.remove("newfav");
        (_c = this.promptTeam) === null || _c === void 0 ? void 0 : _c.classList.add("oldfav");
    }
}
export default new favoriteTeamBtnView();
