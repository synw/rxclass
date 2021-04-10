import { Ref, customRef } from "@vue/reactivity";
import RxClass from "./base";


export default class RxDebounced extends RxClass {
  private _debouncedState: Record<string, any> = {}; // eslint-disable-line
  private _drefs: Record<string, Ref<any>> = {}; // eslint-disable-line
  private _timeouts: Record<string, NodeJS.Timeout | null> = {}

  constructor(debouncedState: Record<string, any>, state: Record<string, any> = {}, delay: number = 400) {// eslint-disable-line
    super(state);
    this._debouncedState = debouncedState;
    const instance = this; // eslint-disable-line
    for (const key of Object.keys(debouncedState)) {
      this._timeouts[key] = null;
      this._drefs[key] = customRef((track, trigger) => ({
        get() {
          track();
          return instance._debouncedState[key];
        },
        set: (value) => {
          if (this._timeouts[key] !== null) {
            clearTimeout(this._timeouts[key] as NodeJS.Timeout);
          }
          this._timeouts[key] = setTimeout(() => {
            instance._debouncedState[key] = value;
            trigger();
            instance._timeouts[key] = null;
          }, delay);
        }
      }));
      this[key] = this._drefs[key];
    }
  }
}