class sidemenuTeamView {
    constructor() {
        this.sidemenuMembers = Array.from(document.querySelectorAll(".sidemenu-member"));
    }
    clearAll() {
        this.sidemenuMembers.forEach((member) => {
            const img = member.querySelector("img");
            img.src = "#";
            img === null || img === void 0 ? void 0 : img.classList.add("hidden");
        });
    }
    update(pokemon, i) {
        if (pokemon === null)
            return;
        const img = this.sidemenuMembers[i].querySelector("img");
        img.src = `img/pokemon_icons/${pokemon.id}.png`;
        img === null || img === void 0 ? void 0 : img.classList.remove("hidden");
    }
    addAll(teamMembers) {
        teamMembers.forEach((pokemon, i) => {
            this.update(pokemon, i);
        });
    }
}
export default new sidemenuTeamView();
