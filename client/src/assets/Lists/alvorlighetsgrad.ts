import { Skade } from "../../api/yrkesskade";

const alvorlighetsgrad: {value: string; label: string}[] = Object.values(Skade.alvorlighetsgrad).map((val) => ({value: val, label: val}));
export default alvorlighetsgrad;
