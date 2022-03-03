import { Skade } from "../../api/yrkesskade";

const antattSykefravaerTabellH: {value: string; label: string}[] = Object.values(Skade.antattSykefravaerTabellH).map((val) => ({value: val, label: val}));
export default antattSykefravaerTabellH;
