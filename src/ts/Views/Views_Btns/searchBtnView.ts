class searchBntView {
  _btn = document.querySelector(".search-btn");

  addHandlerClick(handler: () => void) {
    this._btn?.addEventListener("click", handler);
  }
}

export default new searchBntView();
