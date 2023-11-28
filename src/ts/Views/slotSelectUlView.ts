import { Type } from "../interfaces";
class slotSelectUlView {
  _slotsSelects = Array.from(document.querySelectorAll(".slots-select"));
  _timeoutTooltip: ReturnType<typeof setTimeout> | null = null;

  _startTimeout(tooltip: HTMLElement) {
    clearTimeout(this._timeoutTooltip || "");
    this._timeoutTooltip = setTimeout(() => {
      tooltip?.classList.remove("block");
    }, 200);
  }

  _interruptTimeout() {
    clearTimeout(this._timeoutTooltip || "");
  }

  addHandlerHover() {
    this._slotsSelects.forEach((slotSelect) => {
      const tooltip: HTMLElement = slotSelect
        .closest(".moveset-menu-inner")
        ?.querySelector(".tooltip")!;
      tooltip!.addEventListener("mouseout", (e: any) => {
        if (e.target.closest(".tooltip")) return;

        this._startTimeout(tooltip);
      });
      tooltip!.addEventListener("mouseover", (e: any) => {
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

  addHandlerClick(
    handler: (
      name: string,
      type: string,
      slotType: string,
      memberNum: number
    ) => void
  ) {
    this._slotsSelects.forEach((slotSelect) => {
      slotSelect.addEventListener("click", (e: any) => {
        const li: HTMLElement = e.target.closest(".slot-select_li");

        if (li) {
          const name: string = li.dataset.name || "";
          const type: string = li.dataset.type || "";

          const slotType: string =
            li.closest(".slot-select")?.classList[2]!.split("-")[2] || "";
          const memberNum: number =
            Number(li.closest(".team-member")?.id.split("-")[1]) || 1;

          handler(name, type, slotType, memberNum);
        }
      });
    });
  }
}

export default new slotSelectUlView();
