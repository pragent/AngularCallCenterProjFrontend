/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NbMenuItem } from "@nebular/theme";
import { Observable, of, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { MicroservicesService } from "../microservices/microservices.service";
import { AuthService } from "../@auth/auth.service";
import { UserStore } from "../@core/stores/user.store";

@Injectable()
export class PagesMenu {
  constructor(
    private mcService: MicroservicesService,
    private userStore: UserStore,
    private authService: AuthService,
  ) {}

  getMenu(): Observable<NbMenuItem[]> {
    const dashboardMenu: NbMenuItem[] = [
      {
        title: "E-commerce",
        icon: "shopping-cart-outline",
        link: "/template-pages/dashboard",
        home: true,
        children: undefined,
      },
      {
        title: "IoT Dashboard",
        icon: "home-outline",
        link: "/template-pages/iot-dashboard",
        children: undefined,
      },
    ];

    let loadedMenu: NbMenuItem[] = [];

    return this.mcService.getMenuData().pipe(
      map(menuItems => {
        loadedMenu = [
          {
            title: "DEVELOPED",
            group: true,
          },
          {
            title: "Roles check",
            icon: "layout-outline",
            children: [
              // @ts-ignore
              ...menuItems
                .filter((el: any) =>
                  this.authService.checkAuthorization(
                    this.userStore.getRoles().EVT,
                    // @ts-ignore
                    [el.role],
                  ),
                )
                .map(el => {
                  return {
                    // @ts-ignore
                    title: el.title,
                    // @ts-ignore
                    // link: `/pages/call-panel/${el.evt}`,
                    link: el.path,
                  };
                }),
            ],
          },
        ];
        return [...loadedMenu, ...dashboardMenu];
      }),
    );
  }
}
