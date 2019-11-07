import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

import { Observable, throwError } from "rxjs";

const CORS_ANYWHERE = "https://cors-anywhere.herokuapp.com/";
const GET_USER_ID_API_PATH = "http://crm.kastika.com.ua/api/portal/createuser";
const GET_USER_ROLES_API_PATH = "http://crm.kastika.com.ua/api/portal/createuser";
// const GET_USER_ID_API_PATH = "https://jsonplaceholder.typicode.com/todos/1";

function getRoles(email) {
  const httpOptions = {
    headers: new HttpHeaders({
      Test: "Y"
    })
  };
  const fullUrl = CORS_ANYWHERE + GET_USER_ID_API_PATH;
  
  return (
    this.http
      .post(fullUrl, { clientId: "100020" }, httpOptions)
      // .post(fullUrl, { email: "example@gmail.com" }, httpOptions)
      .pipe(catchError(this.handleError))
  );
}

@Injectable()
export class RegisterService {
  constructor(private http: HttpClient) {}

  getUserId(email) {
    const httpOptions = {
      headers: new HttpHeaders({
        Test: "Y"
      })
    };
    const fullUrl = CORS_ANYWHERE + GET_USER_ID_API_PATH;
    
    return (
      this.http
        .post(fullUrl, { email }, httpOptions)
        // .post(fullUrl, { email: "example@gmail.com" }, httpOptions)
        .pipe(catchError(this.handleError))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("CLIENT-SIDE error:", error.error.message);
    } else {
      console.error(
        `BACKEND ERROR: code ${error.status}, ` + `body was: ${error.error}`
      );
      console.log(error);
    }
    // TODO: change this text
    return throwError("I fucked it up");
  }
}
