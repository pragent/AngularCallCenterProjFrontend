import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { UserStore } from "../@core/stores/user.store";
import { MicroservicesService } from "../microservices/microservices.service";
import { AuthService } from "./auth.service";
import { McStore } from "../microservices/stores/mc.store";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RolesGuard implements CanActivate {
  constructor(
    private userStore: UserStore,
    private msStore: McStore,
    private msService: MicroservicesService,
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const url = state.url;

    return this.msService.getMenuData().pipe(
      map(menuItems => {
        // @ts-ignore
        const currentMenuItem = menuItems.find(el => el.path === url);
        
        if (!currentMenuItem) return true;

        const hasAuthorization = this.authService.checkAuthorization(
          this.userStore.getRoles().EVT,
          // @ts-ignore
          [currentMenuItem.role],
        );
        
        return (
          hasAuthorization || this.router.createUrlTree(["/template-pages/404"])
        );
      }),
    );
  }
}
