import { reactive, computed } from "@vue/reactivity";

export default abstract class ReactiveDataClass {
  [index: string]: any; // eslint-disable-line
  public state = reactive<Record<string, any>>({}); // eslint-disable-line

  constructor(state: Record<string, any>) {// eslint-disable-line
    this.state = reactive(state);
    for (const key of Object.keys(this.state)) {
      this[key] = computed(() => this.state[key])
    }
  }

  prop(key: string, value: any) {// eslint-disable-line
    this.state[key] = value;
  }

  delete(prop: string) {
    delete this.state[prop]
  }
}