class slotInputView {
  _inputs: HTMLInputElement[] = Array.from(
    document.querySelectorAll(".moveset-menu")
  ).flatMap((movesetMenu) =>
    Array.from(movesetMenu.querySelectorAll(".slot-select_input"))
  );
  
  addHandlerKeyupMultiple() {
    this._inputs.forEach((input) => this._addHandlerKeyup(input));
  }

  _addHandlerKeyup(input: HTMLInputElement) {
    input.addEventListener("keyup", function () {
      const value: string = input!.value;
      const listOptions = input
        .closest(".slot-select_ul")!
        .querySelectorAll("li");

      console.log(listOptions);
      for (const li of Array.from(listOptions)) {
        const option = li?.textContent || li?.innerText;
        li.style.display = option.toUpperCase().includes(value.toUpperCase())
          ? ""
          : "none";
      }
    });
  }
}

export default new slotInputView();
