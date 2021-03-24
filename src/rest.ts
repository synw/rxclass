import { reactive, computed, ComputedRef } from "@vue/reactivity";
import RxClass from "./base";

function baseHeader(method: string): RequestInit { // eslint-disable-line
  return {
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    }
  } as RequestInit;
}

export default abstract class RxRestClass extends RxClass {
  private _dataset = reactive<Record<string, Array<any> | Record<string, any>>>({ data: {} }); // eslint-disable-line
  public serverUrl: string;

  constructor(serverUrl?: string, state: Record<string, any> = {}) {// eslint-disable-line
    super(state)
    this.serverUrl = serverUrl ?? "";
  }

  get dataset(): ComputedRef<Array<any> | Record<string, any>> {// eslint-disable-line
    return computed(() => this._dataset.data)
  }

  async fetchData<T>(url: string) {
    const response = await fetch(url, baseHeader("get"));
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json() as T;
    this._dataset.data = data
  }

  async fetchArrayData(url: string) {
    await this.fetchData<Array<any>>(url); // eslint-disable-line
  }

  async fetchObjectData(url: string) {
    await this.fetchData<Record<string, any>>(url); // eslint-disable-line
  }
}