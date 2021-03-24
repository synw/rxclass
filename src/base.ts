import { reactive, computed } from "@vue/reactivity";

export default abstract class RxClass {
  [index: string]: any; // eslint-disable-line
  public state = reactive<Record<string, any>>({}); // eslint-disable-line

  constructor(state: Record<string, any>) {// eslint-disable-line
    this.state = reactive(state);
    for (const key of Object.keys(this.state)) {
      this[key] = computed(() => this.state[key])
    }
  }
}