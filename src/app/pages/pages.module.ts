// import { NgModule } from "@angular/core";
// import { CommonModule } from "@angular/common";
// import { CallPanelComponent } from "./call-panel/call-panel.component";
// import { PagesRoutingModule } from "./pages-routing.module";
// import { PagesComponent } from "./pages.component";

// const PAGES_COMPONENTS = [PagesComponent];

// @NgModule({
//   declarations: [CallPanelComponent, ...PAGES_COMPONENTS],
//   imports: [CommonModule, PagesRoutingModule],
// })
// export class PagesModule {}

/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { ThemeModule } from "../@theme/theme.module";
// import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { PagesMenu } from "./pages-menu";
import { NbMenuModule } from "@nebular/theme";
import { AuthModule } from "../@auth/auth.module";
import { CallPanelComponent } from "./call-panel/call-panel.component";
import { CallStepperComponent } from "./call-panel/call-stepper/call-stepper.component";
import { CallPanelModule } from "./call-panel/call-panel.module";

const PAGES_COMPONENTS = [PagesComponent];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    CallPanelModule,
    // MiscellaneousModule,
    AuthModule.forRoot(),
  ],
  declarations: [...PAGES_COMPONENTS],
  // declarations: [...PAGES_COMPONENTS, CallPanelComponent, CallStepperComponent],
  providers: [PagesMenu],
})
export class PagesModule {}
