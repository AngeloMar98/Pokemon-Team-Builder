import { time } from "console";

class slotSelectUlView {
  _slotsSelects = Array.from(document.querySelectorAll(".slots-select"));
  _timeoutTooltip: ReturnType<typeof setTimeout> | null = null;

  _startTimeout(tooltip: HTMLElement) {
    console.log(`started timeout`);
    clearTimeout(this._timeoutTooltip || "");
    this._timeoutTooltip = setTimeout(() => {
      console.log(`executing`);
      tooltip?.classList.remove("block");
    }, 1500);
  }

  _interruptTimeout() {
    clearTimeout(this._timeoutTooltip || "");
    console.log("interrupted timeout");
  }

  addHandlerHover() {
    this._slotsSelects.forEach((slotSelect) => {
      const tooltip: HTMLElement = slotSelect
        .closest(".moveset-menu-inner")
        ?.querySelector(".tooltip")!;

      console.log(tooltip);
      tooltip!.addEventListener("mouseout", (e: any) => {
        console.log(`mouseout1`);
        if (e.target.closest(".tooltip")) return;
        console.log(`mouseout2`);
        console.log(`out toolptip`);
        this._startTimeout(tooltip);
      });
      tooltip!.addEventListener("mouseover", (e: any) => {
        console.log(`in toolptip`);
        this._interruptTimeout();
      });

      Array.from(slotSelect.querySelectorAll(".slot-select_ul")).forEach(
        (slotSelectUl) => {
          slotSelectUl.addEventListener("mouseout", (e: any) => {
            this._startTimeout(tooltip);
          });
          slotSelectUl.addEventListener("mouseover", (e: Event) => {
            const li = e.target;
            tooltip?.classList.add("block");

            this._interruptTimeout();
            if (
              li instanceof Element &&
              li!.classList[0] === "slot-select_li"
            ) {
              tooltip
                ? (tooltip.innerHTML = li.querySelector("p")?.innerHTML || "")
                : "";
            }
          });
        }
      );
    });
  }
}

export default new slotSelectUlView();
