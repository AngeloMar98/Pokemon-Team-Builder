import { Stat, Type } from "../interfaces";
import bug from "../../img/types_icons/bug.svg";
import dark from "../../img/types_icons/dark.svg";
import dragon from "../../img/types_icons/dragon.svg";
import electric from "../../img/types_icons/electric.svg";
import fairy from "../../img/types_icons/fairy.svg";
import fighting from "../../img/types_icons/fighting.svg";
import fire from "../../img/types_icons/fire.svg";
import flying from "../../img/types_icons/flying.svg";
import ghost from "../../img/types_icons/ghost.svg";
import grass from "../../img/types_icons/grass.svg";
import ground from "../../img/types_icons/ground.svg";
import ice from "../../img/types_icons/ice.svg";
import normal from "../../img/types_icons/normal.svg";
import poison from "../../img/types_icons/poison.svg";
import psychic from "../../img/types_icons/psychic.svg";
import rock from "../../img/types_icons/rock.svg";
import steel from "../../img/types_icons/steel.svg";
import water from "../../img/types_icons/water.svg";

class statisticsView {
  _defense: HTMLElement | null = document.querySelector(".defense_ul");
  _offensive: HTMLElement | null = document.querySelector(".offensive_ul");

  _generateMarkup(teamStats: Array<Stat[]>, offensive: boolean = false) {
    if (!teamStats) return;
    const mapTypes: Map<string, string[]> = new Map([
      ["bug", []],
      ["dark", []],
      ["dragon", []],
      ["electric", []],
      ["fairy", []],
      ["fighting", []],
      ["fire", []],
      ["flying", []],
      ["ghost", []],
      ["grass", []],
      ["ground", []],
      ["ice", []],
      ["normal", []],
      ["poison", []],
      ["psychic", []],
      ["rock", []],
      ["steel", []],
      ["water", []],
    ]);

    if (offensive) {
      teamStats.forEach((offenseArr) => {
        offenseArr.forEach((type: any) => {
          const currentType = type.type;
          if (type.value === 2) {
            mapTypes.get(currentType)?.push("eff");
          }
        });
      });
    } else {
      teamStats.forEach((defenseArr) => {
        defenseArr.forEach((type: any) => {
          const currentType = type.type;
          if (type.value === 0) {
            mapTypes.get(currentType)?.push("immune");
          } else if (type.value < 1) {
            mapTypes.get(currentType)?.push("resist");
          }
        });
      });
    }

    return `<li
              class="stat-bug grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="bug"
                alt="bug"
                src="${bug}"
                class="inline w-[30px] rounded-full bg-bug p-1"
              />

              <div
                class="stat-bug_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 bar-${
                    mapTypes.get("bug")![0]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("bug")![1]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("bug")![2]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("bug")![3]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("bug")![4]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("bug")![5]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              class="stat-dark grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="dark"
                alt="dark"
                src="${dark}"
                class="inline w-[30px] rounded-full bg-dark p-1"
              />

              <div
                class="stat-dark_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 bar-${
                    mapTypes.get("dark")![0]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("dark")![1]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("dark")![2]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("dark")![3]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("dark")![4]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("dark")![5]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              class="stat-dragon grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="dragon"
                alt="dragon"
                src="${dragon}"
                class="inline w-[30px] rounded-full bg-dragon p-1"
              />

              <div
                class="stat-dragon_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 bar-${
                    mapTypes.get("dragon")![0]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("dragon")![1]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("dragon")![2]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("dragon")![3]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("dragon")![4]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("dragon")![5]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              class="stat-electric grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="electric"
                alt="electric"
                src="${electric}"
                class="inline w-[30px] rounded-full bg-electric p-1"
              />

             <div
                class="stat-electric_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 bar-${
                    mapTypes.get("electric")![0]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("electric")![1]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("electric")![2]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("electric")![3]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("electric")![4]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("electric")![5]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              class="stat-fairy grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="fairy"
                alt="fairy"
                src="${fairy}"
                class="inline w-[30px] rounded-full bg-fairy p-1"
              />

             <div
                class="stat-fairy_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 bar-${
                    mapTypes.get("fairy")![0]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("fairy")![1]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("fairy")![2]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("fairy")![3]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("fairy")![4]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("fairy")![5]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              class="stat-fighting grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="fighting"
                alt="fighting"
                src="${fighting}"
                class="inline w-[30px] rounded-full bg-fighting p-1"
              />

              <div
                class="stat-fighting_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 bar-${
                    mapTypes.get("fighting")![0]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("fighting")![1]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("fighting")![2]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("fighting")![3]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("fighting")![4]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("fighting")![5]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              class="stat-fire grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="fire"
                alt="fire"
                src="${fire}"
                class="inline w-[30px] rounded-full bg-fire p-1"
              />
             <div
                class="stat-fire_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 bar-${
                    mapTypes.get("fire")![0]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("fire")![1]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("fire")![2]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("fire")![3]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("fire")![4]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("fire")![5]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
              
            </li>
            <li
              class="stat-flying grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="flying"
                alt="flying"
                src="${flying}"
                class="inline w-[30px] rounded-full bg-flying p-1"
              />
<div
                class="stat-flying_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 bar-${
                    mapTypes.get("flying")![0]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("flying")![1]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("flying")![2]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("flying")![3]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("flying")![4]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("flying")![5]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
             
            </li>
            <li
              title="ghost"
              alt="ghost"
              class="stat-ghost grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                src="${ghost}"
                class="inline w-[30px] rounded-full bg-ghost p-1"
              />
<div
                class="stat-ghost_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 bar-${
                    mapTypes.get("ghost")![0]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("ghost")![1]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("ghost")![2]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("ghost")![3]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("ghost")![4]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("ghost")![5]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
             
            </li>
            <li
              title="grass"
              alt="grass"
              class="stat-grass grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                src="${grass}"
                class="inline w-[30px] rounded-full bg-grass p-1"
              />

             <div
                class="stat-grass_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 bar-${
                    mapTypes.get("grass")![0]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("grass")![1]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("grass")![2]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("grass")![3]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("grass")![4]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("grass")![5]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              title="ground"
              alt="ground"
              class="stat-ground grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                src="${ground}"
                class="inline w-[30px] rounded-full bg-ground p-1"
              />

           <div
                class="stat-ground_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 bar-${
                    mapTypes.get("ground")![0]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("ground")![1]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("ground")![2]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("ground")![3]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("ground")![4]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("ground")![5]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              title="ice"
              alt="ice"
              class="stat-ice grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                src="${ice}"
                class="inline w-[30px] rounded-full bg-ice p-1"
              />
<div
                class="stat-ice_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 bar-${
                    mapTypes.get("ice")![0]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("ice")![1]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("ice")![2]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("ice")![3]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("ice")![4]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("ice")![5]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
             
            </li>
            <li
              title="normal"
              alt="normal"
              class="stat-normal grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                src="${normal}"
                class="inline w-[30px] rounded-full bg-normal p-1"
              />

             <div
                class="stat-normal_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 bar-${
                    mapTypes.get("normal")![0]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("normal")![1]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("normal")![2]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("normal")![3]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("normal")![4]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("normal")![5]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              class="stat-poison grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="poison"
                alt="poison"
                src="${poison}"
                class="inline w-[30px] rounded-full bg-poison p-1"
              />

              <div
                class="stat-poison_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 bar-${
                    mapTypes.get("poison")![0]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("poison")![1]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("poison")![2]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("poison")![3]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("poison")![4]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("poison")![5]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              class="stat-psychic grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="psychic"
                alt="psychic"
                src="${psychic}"
                class="inline w-[30px] rounded-full bg-psychic p-1"
              />

              <div
                class="stat-bug_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 bar-${
                    mapTypes.get("psychic")![0]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("psychic")![1]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("psychic")![2]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("psychic")![3]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("psychic")![4]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("psychic")![5]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              class="stat-rock grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="rock"
                alt="rock"
                src="${rock}"
                class="inline w-[30px] rounded-full bg-rock p-1"
              />

             <div
                class="stat-rock_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 bar-${
                    mapTypes.get("rock")![0]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("rock")![1]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("rock")![2]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("rock")![3]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("rock")![4]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("rock")![5]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              class="stat-steel grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="steel"
                alt="steel"
                src="${steel}"
                class="inline w-[30px] rounded-full bg-steel p-1"
              />

             <div
                class="stat-steel_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 bar-${
                    mapTypes.get("steel")![0]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("steel")![1]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("steel")![2]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("steel")![3]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("steel")![4]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("steel")![5]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              class="stat-water grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="water"
                alt="water"
                src="${water}"
                class="inline w-[30px] rounded-full bg-water p-1"
              />

             <div
                class="stat-water_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 bar-${
                    mapTypes.get("water")![0]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("water")![1]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("water")![2]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("water")![3]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("water")![4]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 bar-${
                    mapTypes.get("water")![5]
                  } dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
    </li>`;
  }

  clear() {
    const emptyGrid = `<li
              class="stat-bug grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="bug"
                alt="bug"
                src="${bug}"
                class="inline w-[30px] rounded-full bg-bug p-1"
              />

              <div
                class="stat-bug_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 
                   dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
                   dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2
                   dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
                   dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              class="stat-dark grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="dark"
                alt="dark"
                src="${dark}"
                class="inline w-[30px] rounded-full bg-dark p-1"
              />

              <div
                class="stat-dark_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              class="stat-dragon grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="dragon"
                alt="dragon"
                src="${dragon}"
                class="inline w-[30px] rounded-full bg-dragon p-1"
              />

              <div
                class="stat-dragon_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              class="stat-electric grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="electric"
                alt="electric"
                src="${electric}"
                class="inline w-[30px] rounded-full bg-electric p-1"
              />

             <div
                class="stat-electric_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              class="stat-fairy grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="fairy"
                alt="fairy"
                src="${fairy}"
                class="inline w-[30px] rounded-full bg-fairy p-1"
              />

             <div
                class="stat-fairy_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              class="stat-fighting grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="fighting"
                alt="fighting"
                src="${fighting}"
                class="inline w-[30px] rounded-full bg-fighting p-1"
              />

              <div
                class="stat-fighting_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              class="stat-fire grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="fire"
                alt="fire"
                src="${fire}"
                class="inline w-[30px] rounded-full bg-fire p-1"
              />
             <div
                class="stat-fire_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
              
            </li>
            <li
              class="stat-flying grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="flying"
                alt="flying"
                src="${flying}"
                class="inline w-[30px] rounded-full bg-flying p-1"
              />
<div
                class="stat-flying_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2  dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
             
            </li>
            <li
              title="ghost"
              alt="ghost"
              class="stat-ghost grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                src="${ghost}"
                class="inline w-[30px] rounded-full bg-ghost p-1"
              />
<div
                class="stat-ghost_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
             
            </li>
            <li
              title="grass"
              alt="grass"
              class="stat-grass grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                src="${grass}"
                class="inline w-[30px] rounded-full bg-grass p-1"
              />

             <div
                class="stat-grass_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              title="ground"
              alt="ground"
              class="stat-ground grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                src="${ground}"
                class="inline w-[30px] rounded-full bg-ground p-1"
              />

           <div
                class="stat-ground_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 
                 dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
                 dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
                 dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
                 dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
                 dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
                 dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              title="ice"
              alt="ice"
              class="stat-ice grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                src="${ice}"
                class="inline w-[30px] rounded-full bg-ice p-1"
              />
<div
                class="stat-ice_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 
           dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
           dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
           dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
           dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
           dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
           dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
             
            </li>
            <li
              title="normal"
              alt="normal"
              class="stat-normal grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                src="${normal}"
                class="inline w-[30px] rounded-full bg-normal p-1"
              />

             <div
                class="stat-normal_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 
                 dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
                 dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
                 dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
                 dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
                 dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
                 dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              class="stat-poison grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="poison"
                alt="poison"
                src="${poison}"
                class="inline w-[30px] rounded-full bg-poison p-1"
              />

              <div
                class="stat-poison_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 
                 dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
                 dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
                 dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
                 dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
                 dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
                 dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              class="stat-psychic grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="psychic"
                alt="psychic"
                src="${psychic}"
                class="inline w-[30px] rounded-full bg-psychic p-1"
              />

              <div
                class="stat-bug_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 
                   dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
                   dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
                   dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
                   dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
                   dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
                   dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              class="stat-rock grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="rock"
                alt="rock"
                src="${rock}"
                class="inline w-[30px] rounded-full bg-rock p-1"
              />

             <div
                class="stat-rock_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 
             dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
             dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
             dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
             dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
             dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
             dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              class="stat-steel grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="steel"
                alt="steel"
                src="${steel}"
                class="inline w-[30px] rounded-full bg-steel p-1"
              />

             <div
                class="stat-steel_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
            </li>
            <li
              class="stat-water grid gap-4"
              style="grid-template-columns: 30px auto"
            >
              <img
                title="water"
                alt="water"
                src="${water}"
                class="inline w-[30px] rounded-full bg-water p-1"
              />

             <div
                class="stat-water_inner grid gap-1 h-[30px]"
                style="grid-template-columns: repeat(auto-fill, 11px)"
              >
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
                <div
                  class="border-2 
               dark:border-darkM-whiteBlue rounded-md"
                ></div>
              </div>
    </li>`;
    if (this._defense && this._offensive) {
      this._defense.innerHTML = "";
      this._offensive.innerHTML = "";
      this._defense.insertAdjacentHTML("beforeend", emptyGrid);
      this._offensive.insertAdjacentHTML("beforeend", emptyGrid);
    }
  }

  updateStatistics(teamDefenses: Array<Stat[]>, teamOffenses: Array<Stat[]>) {
    if (this._defense) {
      this._defense.innerHTML = "";

      this._defense.insertAdjacentHTML(
        "beforeend",
        this._generateMarkup(teamDefenses) || ""
      );
    }
    if (this._offensive) {
      this._offensive.innerHTML = "";

      this._offensive.insertAdjacentHTML(
        "beforeend",
        this._generateMarkup(teamOffenses, true) || ""
      );
    }
  }
}

export default new statisticsView();
