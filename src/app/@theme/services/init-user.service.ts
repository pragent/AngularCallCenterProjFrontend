/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Observable } from "rxjs";
import { User, UserData } from "../../@core/interfaces/common/users";
import { tap } from "rxjs/operators";
import { UserStore } from "../../@core/stores/user.store";
import { Injectable } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { MicroservicesService } from "../../microservices/microservices.service";

@Injectable()
export class InitUserService {
  constructor(
    protected userStore: UserStore,
    protected usersService: UserData,
    protected themeService: NbThemeService,
    protected mcService: MicroservicesService,
  ) {}

  initCurrentUserRoles(): Observable<any> {
    return this.mcService.getUserRoles(this.userStore.getUser().clientId).pipe(
      tap(roles => {
        if (roles) {
          // this.userStore.setRoles(roles);
          // TODO: delete this after testing
          this.userStore.setRoles({
            ...roles,
            EVT: [...roles.EVT, "A0"],
          });
        }
      }),
    );
  }

  initCurrentUser(): Observable<User> {
    return this.usersService.getCurrentUser().pipe(
      tap((user: User) => {
        if (user) {
          this.userStore.setUser(user);
          this.initCurrentUserRoles().subscribe();
          if (user.settings && user.settings.themeName) {
            this.themeService.changeTheme(user.settings.themeName);
          }
        }
      }),
    );
  }
}
