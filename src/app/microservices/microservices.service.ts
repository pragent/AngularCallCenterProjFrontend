import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, retry, map } from "rxjs/operators";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { MsResponse } from "./microservices";

import { Observable, throwError } from "rxjs";
import { McStore } from "./stores/mc.store";

@Injectable({
  providedIn: "root",
})
export class MicroservicesService {
  constructor(private http: HttpClient, private mcStore: McStore) {}

  getMenuData() {
    return this.http
      .post(`${environment.microservicesApiUrl}/portal/geteventformenu`, {})
      .pipe(
        map(res => {
          // console.log(res);
          return res;
        }),
      )
      .pipe(
        map((menuItemsResp: MsResponse) => {
          let menuItems: Object[] = menuItemsResp.data;
          menuItems = menuItems.map((el, idx) => {
            return {
              ...el,
              // @ts-ignore
              title: `${el.evt}(${el.cnt}) - ${el.evtname}`,
              // @ts-ignore
              path: `/pages/call-panel/${el.evt}`,
            };
          });

          this.mcStore.setMenuItems(menuItems);

          return menuItems;
        }),
        catchError(this.handleError),
      );
  }

  getUserRoles(clientId: string) {
    return this.http
      .post(`${environment.microservicesApiUrl}/portal/getuserrole`, {
        clientid: clientId,
      })
      .pipe(catchError(this.handleError));
  }

  getEventByRef(ref: string) {
    return this.http
      .post(`${environment.microservicesApiUrl}/contact/getevent`, { ref })
      .pipe(catchError(this.handleError));
  }

  getEventTemplate(evt: string) {
    return this.http
      .post(`${environment.microservicesApiUrl}/contact/geteventtempl`, {
        evt,
      })
      .pipe(catchError(this.handleError));
  }

  getFAQ(evt: string) {
    return this.http
      .post(`${environment.microservicesApiUrl}/contact/geteventfaq`, {
        evt,
      })
      .pipe(catchError(this.handleError));
  }

  createCall(evt: string, clientid: string) {
    return this.http
      .post(`${environment.microservicesApiUrl}/worker/createcall`, {
        evt,
        clientid,
      })
      .pipe(catchError(this.handleError));
  }

  callClient(ref: string, clientid: string) {
    return this.http
      .post(`${environment.microservicesApiUrl}/portal/callclient`, {
        ref,
        clientid,
      })
      .pipe(catchError(this.handleError));
  }

  modifyEvent(params: Object) {
    return this.http
      .post(`${environment.microservicesApiUrl}/contact/modifyevent`, {
        ...params,
      })
      .pipe(catchError(this.handleError));
  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("CLIENT-SIDE error:", error.error.message);
    } else {
      console.error(
        `BACKEND ERROR: code ${error.status}, ` + `body was: ${error.error}`,
      );
      console.log(error);
    }
    return throwError("I fucked it up");
  }
}
