class slotSelectNameView {
  teamMembers = Array.from(document.querySelectorAll(".team-member"));

  updateSlot(name: string, type: string, slotType: string, memberNum: number) {
    const slot =
      slotType === "ability" ? ".slot-ability" : `.slot-move-${slotType}`;

    Array.from(
      this.teamMembers[memberNum - 1].querySelectorAll(".slot")
    ).forEach((slotName) => {
      console.log(slotName.textContent, name);
      console.log(slotName.textContent === name);
      if (slotName.textContent?.trim() === name) {
        slotName.textContent = "";
      }
    });
    console.log(this.teamMembers);
    console.log(slot);
    this.teamMembers[memberNum - 1].querySelector(slot)!.textContent = name;
  }
}

export default new slotSelectNameView();
