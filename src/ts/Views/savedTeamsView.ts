import { Team } from "../interfaces";

class savedTeamsView {
  savedTeamsContainer = document.querySelector(".saved-teams");

  addNewSaved(team: Team, id: number) {
    this.savedTeamsContainer?.insertAdjacentHTML(
      "beforeend",
      `<div
          class="saved-team grid grid-cols-6 desktop:grid-cols-3 desktop:min-h-[145px] rounded-md bg-lightM-lightBismark dark:bg-darkM-lightIndigo3 mb-2 pb-2 hover:cursor-pointer"
          data-teamid="${id}"
        >
          <h3
            class="col-span-6 desktop:col-span-3 block text-center text-lightM-blackPearl dark:text-darkM-whiteBlue border-b border-darkM-whiteBlue";
          >
            ${team.teamName}
          </h3>

          
          ${team.teamMembers.reduce(
            (acc, pokemon) =>
              acc +
              `<img class="mx-auto mt-auto col-span-1" src="img/pokemon_icons/${pokemon.id}.png" />`,
            ""
          )}     
              
        </div>`
    );
  }

  deleteSaved(id: number) {
    this.savedTeamsContainer?.querySelector(`[data-teamid="${id}"]`)?.remove();
  }

  addHandlerClick(hanlder: (id: number) => void) {
    this.savedTeamsContainer?.addEventListener("click", (e: any) => {
      if (e.target.closest(".saved-team")) {
        const savedTeam = e.target.closest(".saved-team");

        hanlder(savedTeam.dataset.teamid);
      }
    });
  }
}

export default new savedTeamsView();
