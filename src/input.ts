import { customRef } from "@vue/reactivity";
import RxClass from "./base";

export default class RxInput<T> extends RxClass {
  public id: string;
  public validator: (value: T) => boolean | null;
  private _timeout: NodeJS.Timeout | null = null;

  constructor({ id, value, validator, validationDelay = 400 }: {
    id: string,
    value: T,
    validator: (value: T) => boolean | null,
    validationDelay?: number
  }) {
    super({ isValid: null, _value: value });
    this.id = id;
    this.validator = validator;
    const instance = this;  // eslint-disable-line
    this.inputValue = customRef<T>((track, trigger) => ({
      get() {
        track();
        return instance._value.value;
      },
      set: (value: T) => {
        if (this._timeout !== null) {
          clearTimeout(this._timeout as NodeJS.Timeout);
        }
        this._timeout = setTimeout(() => {
          instance._value.value = value;
          trigger();
          instance.isValid.value = instance.validator(value)
          instance._timeout = null;
        }, validationDelay);
      }
    }));
  }
}