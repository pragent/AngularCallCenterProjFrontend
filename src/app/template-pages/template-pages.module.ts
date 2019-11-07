/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from "@angular/core";

import { TemplatePagesComponent } from "./template-pages.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { TeamplatePagesRoutingModule } from "./template-pages-routing.module";
import { ThemeModule } from "../@theme/theme.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { PagesMenu } from "./template-pages-menu";
import { ECommerceModule } from "./e-commerce/e-commerce.module";
import { NbMenuModule } from "@nebular/theme";
import { AuthModule } from "../@auth/auth.module";

const PAGES_COMPONENTS = [TemplatePagesComponent];

@NgModule({
  imports: [
    TeamplatePagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    NbMenuModule,
    MiscellaneousModule,
    AuthModule.forRoot(),
  ],
  declarations: [...PAGES_COMPONENTS],
  providers: [PagesMenu],
})
export class TemplatePagesModule {}
