import { Pokemon } from "../interfaces";

const forms: Pokemon[] = [
  {
    gen: "iii",
    originId: 386,
    id: 10001,

    name: "deoxys-attack",
    types: ["psychic"],
  },
  {
    gen: "iii",
    originId: 386,
    id: 10002,

    name: "deoxys-defense",
    types: ["psychic"],
  },
  {
    gen: "iii",
    originId: 386,
    id: 10003,

    name: "deoxys-speed",
    types: ["psychic"],
  },
  {
    gen: "iv",
    originId: 413,
    id: 10004,

    name: "wormadam-sandy",
    types: ["bug", "ground"],
  },
  {
    gen: "iv",
    originId: 413,
    id: 10005,

    name: "wormadam-trash",
    types: ["bug", "steel"],
  },
  {
    gen: "iv",
    originId: 492,
    id: 10006,

    name: "shaymin-sky",
    types: ["grass", "flying"],
  },
  {
    gen: "iv",
    originId: 487,
    id: 10007,

    name: "giratina-origin",
    types: ["ghost", "dragon"],
  },
  {
    gen: "iv",
    originId: 479,
    id: 10008,
    name: "rotom-heat",

    types: ["electric", "fire"],
  },
  {
    gen: "iv",
    originId: 479,
    id: 10009,
    name: "rotom-wash",

    types: ["electric", "water"],
  },
  {
    gen: "iv",
    originId: 479,
    id: 10010,
    name: "rotom-frost",

    types: ["electric", "ice"],
  },
  {
    gen: "iv",
    originId: 479,
    id: 10011,
    name: "rotom-fan",

    types: ["electric", "flying"],
  },
  {
    gen: "iv",
    originId: 479,
    id: 10012,
    name: "rotom-mow",

    types: ["electric", "grass"],
  },
  {
    gen: "v",
    originId: 648,
    id: 10018,
    name: "meloetta-pirouette",

    types: ["normal", "fighting"],
  },
  {
    gen: "v",
    originId: 641,
    id: 10019,
    name: "tornadus-therian",

    types: ["flying"],
  },
  {
    gen: "v",
    id: 10020,
    name: "thundurus-therian",

    types: ["electric", "flying"],
  },
  {
    gen: "v",
    originId: 645,
    id: 10021,
    name: "landorus-therian",

    types: ["ground", "flying"],
  },
  {
    gen: "v",
    originId: 646,
    id: 10022,
    name: "kyurem-black",

    types: ["dragon", "ice"],
  },
  {
    gen: "v",
    originId: 646,
    id: 10023,
    name: "kyurem-white",
    types: ["dragon", "ice"],
  },
  {
    gen: "v",
    originId: 647,
    id: 10024,
    name: "keldeo-resolute",
    types: ["water", "fighting"],
  },
  {
    gen: "vi",
    originId: 678,
    id: 10025,
    name: "meowstic-female",
    types: ["psychic"],
  },
  {
    gen: "vi",
    originId: 720,
    id: 10086,
    name: "hoopa-unbound",
    types: ["psychic", "dark"],
  },

  {
    gen: "vii",
    originId: 741,
    id: 10123,
    name: "oricorio-pom-pom",
    types: ["electric", "flying"],
  },
  {
    gen: "vii",
    originId: 741,
    id: 10124,
    name: "oricorio-pau",
    types: ["psychic", "flying"],
  },
  {
    gen: "vii",
    originId: 741,
    id: 10125,
    name: "oricorio-sensu",
    types: ["ghost", "flying"],
  },
  {
    gen: "vii",
    originId: 745,
    id: 10126,
    name: "lycanroc-midnight",
    types: ["rock"],
  },
  {
    gen: "vii",
    originId: 745,
    id: 10152,
    name: "lycanroc-dusk",
    types: ["rock"],
  },
  {
    gen: "vii",
    originId: 800,
    id: 10155,
    name: "necrozma-dusk",
    types: ["psychic", "steel"],
  },
  {
    gen: "vii",
    originId: 800,
    id: 10156,
    name: "necrozma-dawn",
    types: ["psychic", "ghost"],
  },
  {
    gen: "viii",
    originId: 849,
    id: 10184,
    name: "toxtricity-low-key",
    types: ["electric", "poison"],
  },
  {
    gen: "viii",
    originId: 876,
    id: 10186,
    name: "indeedee-female",
    types: ["psychic", "normal"],
  },
  {
    gen: "viii",
    originId: 888,
    id: 10188,
    name: "zacian-crowned",
    types: ["fairy", "steel"],
  },
  {
    gen: "viii",
    originId: 889,
    id: 10189,
    name: "zamazenta-crowned",
    types: ["fighting", "steel"],
  },
  {
    gen: "viii",
    originId: 892,
    id: 10191,
    name: "urshifu-rapid-strike",
    types: ["fighting", "water"],
  },
  {
    gen: "viii",
    originId: 898,
    id: 10193,
    name: "calyrex-ice",
    types: ["psychic", "ice"],
  },
  {
    gen: "viii",
    originId: 898,
    id: 10194,
    name: "calyrex-shadow",
    types: ["psychic", "ghost"],
  },
  {
    gen: "viii",
    originId: 902,
    id: 10248,
    name: "basculegion-female",
    types: ["water", "ghost"],
  },
  {
    gen: "viii",
    originId: 905,
    id: 10249,
    name: "enamorus-therian",
    types: ["fairy", "flying"],
  },
  {
    gen: "ix",
    originId: 916,
    id: 10254,
    name: "oinkologne-female",
    types: ["normal"],
  },
  {
    gen: "ix",
    originId: 925,
    id: 10257,
    name: "maushold-family-of-three",
    types: ["normal"],
  },
  {
    gen: "ix",
    originId: 999,
    id: 10263,
    name: "gimmighoul-roaming",
    types: ["ghost"],
  },
  {
    gen: "ix",
    originId: 901,
    id: 10272,
    name: "ursaluna-bloodmoon",

    types: ["ground", "normal"],
  },
  {
    gen: "ix",
    originId: 1017,
    id: 10273,
    name: "ogerpon-wellspring-mask",

    types: ["grass", "water"],
  },
  {
    gen: "ix",
    originId: 1017,
    id: 10274,
    name: "ogerpon-hearthflame-mask",

    types: ["grass", "fire"],
  },
  {
    gen: "ix",
    originId: 1017,
    id: 10275,
    name: "ogerpon-cornerstone-mask",

    types: ["grass", "rock"],
  },
];

export default forms;
