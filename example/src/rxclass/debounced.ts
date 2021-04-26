import { Ref, customRef, reactive } from "@vue/reactivity";
import RxClass from "./base";
import { PropCallback } from "./interfaces";


export default class RxDebounced extends RxClass {
  private _debounced: Record<string, any> = {}; // eslint-disable-line
  private _timeouts: Record<string, NodeJS.Timeout | null> = {};
  private _dcallbacks: Record<string, PropCallback> = {}; // eslint-disable-line
  public debounced: Record<string, Ref<any>> = {}; // eslint-disable-line

  constructor(
    debounced: Record<string, any | { value: any, callback: (value: any) => any }>, // eslint-disable-line
    state: Record<string, any | { value: any, callback: (value: any) => any }> = {}, // eslint-disable-line
    delay = 400) {
    super(state);
    const instance = this; // eslint-disable-line
    for (const key of Object.keys(debounced)) {
      this._timeouts[key] = null;
      let val: any; // eslint-disable-line
      if ((debounced[key] !== null) && (debounced[key].callback !== undefined) && (debounced[key].value !== undefined)) {
        const param = debounced[key] as { value: any, callback: (value: any) => any }; // eslint-disable-line
        val = param.value;
        this._dcallbacks[key] = param.callback as PropCallback;
      } else {
        val = debounced[key];
      }
      if (typeof val === 'object' && val !== null) {
        this._debounced[key] = reactive(val);
      } else {
        this._debounced[key] = val;
      }
      this.debounced[key] = customRef((track, trigger) => ({
        get() {
          track();
          return instance._debounced[key];
        },
        set: (value) => {
          if (this._timeouts[key] !== null) {
            clearTimeout(this._timeouts[key] as NodeJS.Timeout);
          }
          this._timeouts[key] = setTimeout(() => {
            instance._debounced[key] = value;
            trigger();
            instance._timeouts[key] = null;
            if (key in instance._dcallbacks) {
              instance._dcallbacks[key](value);
            }
          }, delay);
        }
      }));
      //this[key] = this._debounced[key];
    }
  }
}