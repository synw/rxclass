import { reactive, computed } from "@vue/reactivity";
import RxClass from "./base";

export default abstract class RxStorageClass extends RxClass {
  private key: string;
  public store = reactive<Record<string, any>>({}); // eslint-disable-line

  constructor(key: string, store: Record<string, any>, state: Record<string, any> = {}) {// eslint-disable-line
    super(state)
    this.key = key;
    this.store = reactive(store);
    for (const key of Object.keys(this.store)) {
      this[key] = computed(() => this.store[key]);
    }
    this.loadIntialStoreData();
  }

  mutate(key: string, value: any) {// eslint-disable-line
    this.store[key] = value;
    if (typeof value === "object") {
      localStorage.setItem(`${this.key}_${key}`, JSON.stringify(value));
    } else {
      localStorage.setItem(`${this.key}_${key}`, value);
    }
  }

  private loadIntialStoreData() {
    for (const key of Object.keys(this.store)) {
      const item = localStorage.getItem(`${this.key}_${key}`);
      if (item !== null) {
        if (item.startsWith("[") || item.startsWith("{")) {
          this.store[key] = JSON.parse(item);
        } else {
          this.store[key] = item;
        }
      }
    }
  }
}