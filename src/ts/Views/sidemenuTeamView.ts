import { Pokemon } from "../interfaces";

class sidemenuTeamView {
  sidemenuMembers: HTMLElement[] = Array.from(
    document.querySelectorAll(".sidemenu-member")
  );

  clearAll() {
    this.sidemenuMembers.forEach((member) => {
      const img = member.querySelector("img");
      img!.src = "#";
      img?.classList.add("hidden");
    });
  }

  update(pokemon: Pokemon | null, i: number) {
    if (pokemon === null) return;
    const img = this.sidemenuMembers[i].querySelector("img");

    img!.src = `img/pokemon_icons/${pokemon.id}.png`;
    img?.classList.remove("hidden");
  }

  addAll(teamMembers: Pokemon[]) {
    teamMembers.forEach((pokemon, i) => {
      this.update(pokemon, i);
    });
  }
}

export default new sidemenuTeamView();
