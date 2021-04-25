import { customRef, reactive } from "@vue/reactivity";
import { PropCallback } from "./interfaces";


export default abstract class RxClass {
  [index: string]: any; // eslint-disable-line
  private _callbacks: Record<string, PropCallback> = {}; // eslint-disable-line
  private _state: Record<string, any> = {}; // eslint-disable-line

  constructor(state: Record<string, any | { value: any, callback: (value: any) => any }>) {// eslint-disable-line
    const instance = this; // eslint-disable-line
    for (const key of Object.keys(state)) {
      let val: any; // eslint-disable-line
      if ((state[key] !== null) && (state[key].callback !== undefined) && (state[key].value !== undefined)) {
        const param = state[key];
        val = param.value;
        this._callbacks[key] = param.callback as PropCallback;
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