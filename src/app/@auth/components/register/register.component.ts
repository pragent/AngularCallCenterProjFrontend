/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  NB_AUTH_OPTIONS,
  NbAuthSocialLink,
  NbAuthService,
  NbAuthResult,
} from "@nebular/auth";

import { getDeepFromObject } from "../../helpers";
import { EMAIL_PATTERN } from "../constants";
import { RegisterService } from "./register.service";
import { AppStore } from "../../../app.store";

@Component({
  selector: "ngx-register",
  styleUrls: ["./register.component.scss"],
  templateUrl: "./register.component.html",
  providers: [RegisterService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxRegisterComponent implements OnInit {
  minLength: number = this.getConfigValue(
    "forms.validation.password.minLength",
  );
  maxLength: number = this.getConfigValue(
    "forms.validation.password.maxLength",
  );
  isFullNameRequired: boolean = this.getConfigValue(
    "forms.validation.fullName.required",
  );
  isEmailRequired: boolean = this.getConfigValue(
    "forms.validation.email.required",
  );
  isPasswordRequired: boolean = this.getConfigValue(
    "forms.validation.password.required",
  );
  redirectDelay: number = this.getConfigValue("forms.register.redirectDelay");
  showMessages: any = this.getConfigValue("forms.register.showMessages");
  strategy: string = this.getConfigValue("forms.register.strategy");
  socialLinks: NbAuthSocialLink[] = this.getConfigValue(
    "forms.login.socialLinks",
  );

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  registerForm: FormGroup;
  constructor(
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected service: NbAuthService,
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private fb: FormBuilder,
    private appStore: AppStore,
  ) {}

  get fullName() {
    return this.registerForm.get("fullName");
  }
  get email() {
    return this.registerForm.get("email");
  }
  get password() {
    return this.registerForm.get("password");
  }
  get confirmPassword() {
    return this.registerForm.get("confirmPassword");
  }
  get terms() {
    return this.registerForm.get("terms");
  }

  ngOnInit(): void {
    const fullNameValidators = [];
    this.isFullNameRequired && fullNameValidators.push(Validators.required);

    const emailValidators = [Validators.pattern(EMAIL_PATTERN)];
    this.isEmailRequired && emailValidators.push(Validators.required);

    const passwordValidators = [
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
    ];
    this.isPasswordRequired && passwordValidators.push(Validators.required);

    this.registerForm = this.fb.group({
      fullName: this.fb.control("", [...fullNameValidators]),
      email: this.fb.control("", [...emailValidators]),
      password: this.fb.control("", [...passwordValidators]),
      confirmPassword: this.fb.control("", [...passwordValidators]),
      terms: this.fb.control(""),
    });
  }

  register(): void {
    this.user = this.registerForm.value;
    this.errors = this.messages = [];
    this.submitted = true;

    this.appStore.setLoadingState(true);
    this.service
      .register(this.strategy, this.user)
      .subscribe((result: NbAuthResult) => {
        this.appStore.setLoadingState(false);
        this.submitted = false;
        if (result.isSuccess()) {
          this.messages = result.getMessages();
        } else {
          this.errors = result.getErrors();
        }

        const redirect = result.getRedirect();
        if (redirect) {
          setTimeout(() => {
            return this.router.navigateByUrl(redirect);
          }, this.redirectDelay);
        }
        this.cd.detectChanges();
      });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
