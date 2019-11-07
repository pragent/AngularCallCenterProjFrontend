import { Injectable } from "@angular/core";
// import { User } from "../interfaces/common/users";
// import { Settings, SettingsData } from "../interfaces/common/settings";
// import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class McStore {
  // TODO: create interface
  private menuItems: any;
  
  // constructor(private settingsService: SettingsData) {}
  getMenuItems(): any {
    return this.menuItems;
  }
  setMenuItems(menuItems: any) {
    this.menuItems = menuItems;
  }
  // getRoles() {
  //   return this.roles;
  // }
  // setRoles(roles) {
  //   this.roles = roles;
  // }
  // setSetting(themeName: string): Observable<Settings> {
  //   if (this.user) {
  //     if (this.user.settings) {
  //       this.user.settings.themeName = themeName;
  //     } else {
  //       this.user.settings = { themeName: themeName };
  //     }
  //     return this.settingsService.updateCurrent(this.user.settings);
  //   } else {
  //     return of({ themeName: themeName });
  //   }
  // }
}
