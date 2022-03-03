import { Hendelsesfakta } from "../../api/yrkesskade";

const ulykkestid: {value: string; label: string}[] = Object.values(Hendelsesfakta.naarSkjeddeUlykken).map((val) => ({value: val, label: val}));
export default ulykkestid;
