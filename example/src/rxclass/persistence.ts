import { Ref, customRef, reactive } from "@vue/reactivity";
import RxClass from "./base";
import { RxParam, PropCallback } from "./interfaces";

export default abstract class RxStorage extends RxClass {
  private _key: string;
  private _store: Record<string, any> = {}; // eslint-disable-line
  private _scallbacks: Record<string, PropCallback> = {}; // eslint-disable-line
  public store: Record<string, Ref<any>> = {}; // eslint-disable-line

  constructor(key: string, store: Record<string, any | RxParam>, state: Record<string, any | RxParam> = {}) {// eslint-disable-line
    super(state)
    this._key = key;
    const instance = this; // eslint-disable-line
    for (const key of Object.keys(store)) {
      let val: any; // eslint-disable-line
      if ((store[key] !== null) && (store[key].callback !== undefined) && (store[key].value !== undefined)) {
        const param = store[key] as RxParam;
        val = param.value;
        this._scallbacks[key] = param.callback;
      } else {
        val = store[key];
      }
      if (typeof val === 'object' && val !== null) {
        this._store[key] = reactive(val);
      } else {
        this._store[key] = val;
      }
      this.store[key] = customRef((track, trigger) => ({
        get() {
          track();
          return instance._store[key];
        },
        set: (value) => {
          instance._store[key] = value;
          trigger();
          instance._save(key, value);
          if (key in instance._scallbacks) {
            instance._scallbacks[key](value);
          }
        }
      }));
    }
    //console.log("STORE", JSON.stringify(this._store, null, "  "))
    this.loadInitialStoreData();
  }

  private _save(key: string, value: any) { // eslint-disable-line
    if (typeof value === "object") {
      localStorage.setItem(`${this._key}_${key}`, JSON.stringify(value));
    } else {
      localStorage.setItem(`${this._key}_${key}`, `${value}`);
    }
  }

  private loadInitialStoreData() {
    for (const key of Object.keys(this._store)) {
      const item = localStorage.getItem(`${this._key}_${key}`);
      if (item !== null) {
        // object or array
        if (item.startsWith("[") || item.startsWith("{")) {
          this._store[key] = JSON.parse(item);
        } else {
          const n = Number(item);
          // boolean
          if (item === "false" || item === "true") {
            this._store[key] = item === "true";
          }
          // numeric
          else if (!isNaN(n)) {
            this._store[key] = n;
          }
          // string
          else {
            this._store[key] = item;
          }
        }
      }
    }
  }
}