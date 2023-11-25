class toggleDarkModeView {
  _btnToggle = document.querySelector(`.filter-fullyEvo`);

  addHandlerClick() {
    this._btnToggle?.addEventListener("click", () => {
      this._btnToggle?.classList.toggle("fullyEvo-only");
    });
  }
}

export default new toggleDarkModeView();
