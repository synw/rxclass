import { computed, ref } from "@vue/reactivity";
import RxClass from "./base";

export default class RxRest extends RxClass {
  public objectDataset = ref<Record<string, any>>({}); // eslint-disable-line
  public arrayDataset = ref<Array<any>>([]); // eslint-disable-line
  public isLoading = ref<boolean>(false);
  public hasArrayData = computed<boolean>(() => this.arrayDataset.value.length > 0);
  public hasObjectData = computed<boolean>(() => this.objectDataset.value.length > 0);
  private credentials: string | null;

  public serverUrl: string;

  constructor(
    serverUrl?: string,
    state: Record<string, any | { value: any, callback: (value: any) => any }> = {},
    credentials?: string) {
    super(state)
    this.serverUrl = serverUrl ?? "";
    this.credentials = credentials ?? null;
  }

  private get getHeader(): RequestInit {
    const h = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      }
    } as RequestInit;
    if (this.credentials !== null) {
      h.credentials = this.credentials as RequestCredentials;
    }
    return h;
  }

  async fetchGetObject(url: string): Promise<Record<string, any>> { // eslint-disable-line
    this.isLoading.value = true;
    const uri = this.serverUrl + url;
    const response = await fetch(uri, this.getHeader);
    if (!response.ok) {
      this.isLoading.value = false;
      throw new Error(response.statusText);
    }
    const data = await response.json() as Record<string, any>; // eslint-disable-line
    this.objectDataset.value = data;
    this.isLoading.value = false;
    return data;
  }

  async fetchGetArray<T>(url: string): Promise<Array<T>> {
    this.isLoading.value = true;
    const uri = this.serverUrl + url;
    const response = await fetch(uri, this.getHeader);
    if (!response.ok) {
      this.isLoading.value = false;
      throw new Error(response.statusText);
    }
    const data = await response.json() as Array<T>;
    this.arrayDataset.value = data;
    this.isLoading.value = false;
    return data;
  }
}