import { Hendelsesfakta } from "../../api/yrkesskade";

const ulykkessted: {value: string; label: string}[] = Object.values(Hendelsesfakta.hvorSkjeddeUlykken).map((val) => ({value: val, label: val}));
export default ulykkessted;
