import { Injectable } from "@angular/core";
import { User } from "../@core/interfaces/common/users";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { MicroservicesService } from "../microservices/microservices.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private mcService: MicroservicesService
  ) {
  }

  checkAuthorization(roles: string[], allowedRoles: string[]): boolean {
    if (!roles) {
      console.error("MINE: no roles providen")
      return false;
    }
    
    if (this.isAdmin(roles)) return true;
    for (const allowedRole of allowedRoles) {
      if (roles.includes(allowedRole)) {
        return true;
      }
    }
    return false;
  }

  isAdmin(roles: string[]) {
    return roles.includes("A0");
  }

}
