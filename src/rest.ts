import { reactive, ref } from "@vue/reactivity";
import RxClass from "./base";


export default abstract class RxRestClass extends RxClass {
  public objectDataset = reactive<Record<string, any>>({}); // eslint-disable-line
  public arrayDataset = reactive<Array<any>>([]); // eslint-disable-line
  private _isLoading = ref<boolean>(false)

  public serverUrl: string;

  constructor(serverUrl?: string, state: Record<string, any> = {}) { // eslint-disable-line
    super(state)
    this.serverUrl = serverUrl ?? "";
  }

  get isLoading() {
    return this._isLoading;
  }

  private get getHeader(): RequestInit {
    return {
      method: "get",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    } as RequestInit;
  }

  async fetchGetObject(url: string): Promise<Record<string, any>> { // eslint-disable-line
    this._isLoading = ref<boolean>(true);
    const uri = this.serverUrl + url;
    const response = await fetch(uri, this.getHeader);
    //console.log("DATA", response)
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json() as Record<string, any>; // eslint-disable-line
    this.objectDataset = data;
    this._isLoading = ref<boolean>(false);
    return data;
  }

  async fetchGetArray<T>(url: string): Promise<Array<T>> {
    this._isLoading = ref<boolean>(true);
    const uri = this.serverUrl + url;
    const response = await fetch(uri, this.getHeader);
    //console.log("DATA", response)
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json() as Array<T>; // eslint-disable-line
    this.arrayDataset = data;
    this._isLoading = ref<boolean>(false);
    return data;
  }
}