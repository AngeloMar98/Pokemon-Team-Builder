class slotSelectNameView {
    constructor() {
        this.teamMembers = Array.from(document.querySelectorAll(".team-member"));
    }
    updateSlot(name, type, slotType, memberNum) {
        const slot = slotType === "ability" ? ".slot-ability" : `.slot-move-${slotType}`;
        Array.from(this.teamMembers[memberNum - 1].querySelectorAll(".slot")).forEach((slotName) => {
            var _a;
            console.log(slotName.textContent, name);
            console.log(slotName.textContent === name);
            if (((_a = slotName.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === name) {
                slotName.textContent = "";
            }
        });
        console.log(this.teamMembers);
        console.log(slot);
        this.teamMembers[memberNum - 1].querySelector(slot).textContent = name;
    }
}
export default new slotSelectNameView();
