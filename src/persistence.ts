import ReactiveDataClass from "./base";

export default abstract class ReactivePersistentDataClass extends ReactiveDataClass {
  private key: string;

  constructor(state: Record<string, any>, key: string) {// eslint-disable-line
    super(state)
    this.key = key
  }

  load() {
    for (const key of Object.keys(this.state)) {
      const item = localStorage.getItem(`${this.key}_${key}`);
      if (item !== null) {
        if (item.startsWith("[") || item.startsWith("{")) {
          this.state[key] = JSON.parse(item);
        } else {
          this.state[key] = item;
        }
      }
    }
  }

  prop(key: string, value: any) {// eslint-disable-line
    super.prop(key, value)
    if (typeof value === "object") {
      localStorage.setItem(`${this.key}_${key}`, JSON.stringify(value));
    } else {
      localStorage.setItem(`${this.key}_${key}`, value);
    }
  }

  delete(prop: string) {
    super.delete(prop)
    const key = this.state[prop];
    localStorage.removeItem(key);
  }
}