import { customRef, reactive } from "@vue/reactivity";
import { RxParam, PropCallback } from "./interfaces";


export default abstract class RxClass {
  [index: string]: any; // eslint-disable-line
  private _callbacks: Record<string, PropCallback> = {}; // eslint-disable-line
  private _state: Record<string, any> = {}; // eslint-disable-line

  constructor(state: Record<string, any | RxParam>) {// eslint-disable-line
    const instance = this; // eslint-disable-line
    for (const key of Object.keys(state)) {
      let val: any; // eslint-disable-line
      if ((state[key].callback !== undefined) && (state[key].value !== undefined)) {
        const param = state[key] as RxParam;
        val = param.value;
        this._callbacks[key] = param.callback;
      } else {
        val = state[key];
      }
      if (typeof val === 'object' && val !== null) {
        this._state[key] = reactive(val);
      } else {
        this._state[key] = val;
      }
      this[key] = customRef((track, trigger) => ({
        get() {
          track();
          return instance._state[key];
        },
        set: (value) => {
          instance._state[key] = value;
          trigger();
          if (key in instance._callbacks) {
            instance._callbacks[key](value);
          }
        }
      }));
    }
  }
}


/*
export default abstract class RxClass {
  [index: string]: any; // eslint-disable-line

  constructor(state: Record<string, any>) {// eslint-disable-line
    for (const key of Object.keys(state)) {
      this[key] = ref(state[key]);
    }
  }
}*/

/*
export default abstract class RxClass {
  [index: string]: any; // eslint-disable-line
  public state = reactive<Record<string, any>>({}); // eslint-disable-line

  constructor(state: Record<string, any>) {// eslint-disable-line
    this.state = reactive(state);
    for (const key of Object.keys(this.state)) {
      this[key] = computed(() => this.state[key])
    }
  }
}*/