class slotSelectNameView {
    constructor() {
        this.teamMembers = Array.from(document.querySelectorAll(".team-member"));
    }
    updateSlot(name, type, slotType, memberNum) {
        const slot = slotType === "ability" ? ".slot-ability" : `.slot-move-${slotType}`;
        this.teamMembers[memberNum - 1].querySelector(slot).textContent = name;
    }
}
export default new slotSelectNameView();
