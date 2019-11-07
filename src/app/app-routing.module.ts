/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "./@auth/auth.guard";
import { RolesGuard } from "./@auth/roles.guard";

const routes: Routes = [
  {
    path: "pages",
    canActivate: [AuthGuard, RolesGuard],
    loadChildren: () =>
      import("app/pages/pages.module").then(m => m.PagesModule),
  },
  {
    path: "template-pages",
    canActivate: [AuthGuard, RolesGuard],
    loadChildren: () =>
      import("app/template-pages/template-pages.module").then(
        m => m.TemplatePagesModule,
      ),
  },
  {
    path: "auth",
    loadChildren: () => import("app/@auth/auth.module").then(m => m.AuthModule),
  },
  { path: "", redirectTo: "template-pages", pathMatch: "full" },
  { path: "**", redirectTo: "template-pages" },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
