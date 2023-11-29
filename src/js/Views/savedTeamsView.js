class savedTeamsView {
    constructor() {
        this.savedTeamsContainer = document.querySelector(".saved-teams");
    }
    addNewSaved(team, id) {
        var _a;
        (_a = this.savedTeamsContainer) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("beforeend", `<div
          class="saved-team grid grid-cols-6 desktop:grid-cols-3 desktop:min-h-[145px] rounded-md bg-lightM-lightBismark dark:bg-darkM-lightIndigo3 mb-2 pb-2 hover:cursor-pointer"
          data-teamid="${id}"
        >
          <h3
            class="col-span-6 desktop:col-span-3 block text-center text-lightM-blackPearl dark:text-darkM-whiteBlue border-b border-darkM-whiteBlue";
          >
            ${team.teamName}
          </h3>

          
          ${team.teamMembers.reduce((acc, pokemon) => acc +
            `<img class="mx-auto mt-auto col-span-1" src="img/pokemon_icons/${pokemon.id}.png" />`, "")}     
              
        </div>`);
    }
    deleteSaved(id) {
        var _a, _b;
        (_b = (_a = this.savedTeamsContainer) === null || _a === void 0 ? void 0 : _a.querySelector(`[data-teamid="${id}"]`)) === null || _b === void 0 ? void 0 : _b.remove();
    }
    addHandlerClick(hanlder) {
        var _a;
        (_a = this.savedTeamsContainer) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
            if (e.target.closest(".saved-team")) {
                const savedTeam = e.target.closest(".saved-team");
                hanlder(savedTeam.dataset.teamid);
            }
        });
    }
}
export default new savedTeamsView();
