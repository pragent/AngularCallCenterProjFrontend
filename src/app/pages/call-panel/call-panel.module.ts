import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  NbButtonModule,
  NbAccordionModule,
  NbCardModule,
  NbStepperModule,
  NbDatepickerModule,
  NbInputModule,
  NbSpinnerModule,
} from "@nebular/theme";

// import { NbDateFnsDateModule } from "@nebular/date-fns";
import { NbMomentDateModule } from "@nebular/moment";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ThemeModule } from "../../@theme/theme.module";
import { CallStepperComponent } from "./call-stepper/call-stepper.component";
import { CallPanelComponent } from "./call-panel.component";
import { PanelAccordionComponent } from "./panel-accordion/panel-accordion.component";
import { TrimTimeFromDatePipe } from "../../helpers/trim-time-from-date.pipe";

@NgModule({
  declarations: [
    CallStepperComponent,
    CallPanelComponent,
    PanelAccordionComponent,
    TrimTimeFromDatePipe,
  ],

  imports: [
    CommonModule,
    NbButtonModule,
    NbAccordionModule,
    NbCardModule,
    NbStepperModule,
    NbDatepickerModule,
    // NbDateFnsDateModule,
    NbMomentDateModule,
    NbSpinnerModule,
    NgbModule,
    NbInputModule,
    // NgxMaterialTimepickerModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
  ],
})
export class CallPanelModule {}
