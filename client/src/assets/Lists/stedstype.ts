import { Hendelsesfakta } from "../../api/yrkesskade";

const stedstype: { value: string; label: string }[] = Object.values(Hendelsesfakta.stedsbeskrivelseTabellF).map((val) => ({value: val, label: val}));
export default stedstype;
