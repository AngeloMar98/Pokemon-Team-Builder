class tooltipView {
  _tooltips = Array.from(document.querySelectorAll(".tooltip"));

  addHandlerHover() {
    this._tooltips.forEach((tooltip) => {
      tooltip.addEventListener("mouseout", (e: any) => {
        setTimeout(() => tooltip?.classList.remove("block"), 1500);
      });
    });
  }
}

export default new tooltipView();
