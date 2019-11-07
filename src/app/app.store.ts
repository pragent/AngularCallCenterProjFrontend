import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AppStore {
  private loadingState: boolean;

  constructor() {}

  getLoadingState(): boolean {
    return this.loadingState;
  }

  setLoadingState(loadingState: boolean) {
    this.loadingState = loadingState;
  }
}
