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
    // getMenu(): Subscription {
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

    const featuresMenu: NbMenuItem[] = [
      {
        title: "FEATURES",
        group: true,
      },
      {
        title: "Layout",
        icon: "layout-outline",
        children: [
          {
            title: "Stepper",
            link: "/template-pages/layout/stepper",
          },
          {
            title: "List",
            link: "/template-pages/layout/list",
          },
          {
            title: "Infinite List",
            link: "/template-pages/layout/infinite-list",
          },
          {
            title: "Accordion",
            link: "/template-pages/layout/accordion",
          },
          {
            title: "Tabs",
            pathMatch: "prefix",
            link: "/template-pages/layout/tabs",
          },
        ],
      },
      {
        title: "Forms",
        icon: "edit-2-outline",
        children: [
          {
            title: "Form Inputs",
            link: "/template-pages/forms/inputs",
          },
          {
            title: "Form Layouts",
            link: "/template-pages/forms/layouts",
          },
          {
            title: "Buttons",
            link: "/template-pages/forms/buttons",
          },
          {
            title: "Datepicker",
            link: "/template-pages/forms/datepicker",
          },
        ],
      },
      {
        title: "UI Features",
        icon: "keypad-outline",
        link: "/template-pages/ui-features",
        children: [
          {
            title: "Grid",
            link: "/template-pages/ui-features/grid",
          },
          {
            title: "Icons",
            link: "/template-pages/ui-features/icons",
          },
          {
            title: "Typography",
            link: "/template-pages/ui-features/typography",
          },
          {
            title: "Animated Searches",
            link: "/template-pages/ui-features/search-fields",
          },
        ],
      },
      {
        title: "Modal & Overlays",
        icon: "browser-outline",
        children: [
          {
            title: "Dialog",
            link: "/template-pages/modal-overlays/dialog",
          },
          {
            title: "Window",
            link: "/template-pages/modal-overlays/window",
          },
          {
            title: "Popover",
            link: "/template-pages/modal-overlays/popover",
          },
          {
            title: "Toastr",
            link: "/template-pages/modal-overlays/toastr",
          },
          {
            title: "Tooltip",
            link: "/template-pages/modal-overlays/tooltip",
          },
        ],
      },
      {
        title: "Extra Components",
        icon: "message-circle-outline",
        children: [
          {
            title: "Calendar",
            link: "/template-pages/extra-components/calendar",
          },
          {
            title: "Progress Bar",
            link: "/template-pages/extra-components/progress-bar",
          },
          {
            title: "Spinner",
            link: "/template-pages/extra-components/spinner",
          },
          {
            title: "Alert",
            link: "/template-pages/extra-components/alert",
          },
          {
            title: "Calendar Kit",
            link: "/template-pages/extra-components/calendar-kit",
          },
          {
            title: "Chat",
            link: "/template-pages/extra-components/chat",
          },
        ],
      },
      {
        title: "Maps",
        icon: "map-outline",
        children: [
          {
            title: "Google Maps",
            link: "/template-pages/maps/gmaps",
          },
          {
            title: "Leaflet Maps",
            link: "/template-pages/maps/leaflet",
          },
          {
            title: "Bubble Maps",
            link: "/template-pages/maps/bubble",
          },
          {
            title: "Search Maps",
            link: "/template-pages/maps/searchmap",
          },
        ],
      },
      {
        title: "Charts",
        icon: "pie-chart-outline",
        children: [
          {
            title: "Echarts",
            link: "/template-pages/charts/echarts",
          },
          {
            title: "Charts.js",
            link: "/template-pages/charts/chartjs",
          },
          {
            title: "D3",
            link: "/template-pages/charts/d3",
          },
        ],
      },
      {
        title: "Editors",
        icon: "text-outline",
        children: [
          {
            title: "TinyMCE",
            link: "/template-pages/editors/tinymce",
          },
          {
            title: "CKEditor",
            link: "/template-pages/editors/ckeditor",
          },
        ],
      },
      {
        title: "Tables & Data",
        icon: "grid-outline",
        children: [
          {
            title: "Smart Table",
            link: "/template-pages/tables/smart-table",
          },
          {
            title: "Tree Grid",
            link: "/template-pages/tables/tree-grid",
          },
        ],
      },
      {
        title: "Miscellaneous",
        icon: "shuffle-2-outline",
        children: [
          {
            title: "404",
            link: "/template-pages/miscellaneous/404",
          },
        ],
      },
      {
        title: "Auth",
        icon: "lock-outline",
        children: [
          {
            title: "Login",
            link: "/auth/login",
          },
          {
            title: "Register",
            link: "/auth/register",
          },
          {
            title: "Request Password",
            link: "/auth/request-password",
          },
          {
            title: "Reset Password",
            link: "/auth/reset-password",
          },
        ],
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
                    link: el.path,
                  };
                }),
            ],
          },
        ];
        return [...loadedMenu, ...featuresMenu];
      }),
    );
  }
}
