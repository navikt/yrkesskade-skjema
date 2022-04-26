import { Dekningsforhold } from "../../api/yrkesskade";

const dekningsforhold: { value: string; label: string }[] = Object.values(Dekningsforhold.rolletype).map((val) => ({value: val, label: val}));
export default dekningsforhold;
