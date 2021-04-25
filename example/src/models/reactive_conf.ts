import { RxClass } from "../rxclass";

export default class ReactiveConf extends RxClass {
  constructor() {
    const state = {
      prop1: true,
      prop2: "foo",
      prop3: 45,
      prop4: {
        subprop1: "bar"
      },
      prop5: {
        value: "val",
        callback: (v: string) => console.log("Prop 5 changed to", v)
      }
    };
    super(state);
  }
}