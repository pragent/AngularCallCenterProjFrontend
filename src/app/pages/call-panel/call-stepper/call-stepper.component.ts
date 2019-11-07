import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  SimpleChanges,
} from "@angular/core";

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from "@angular/forms";
import { NbStepperComponent } from "@nebular/theme";
import { MicroservicesService } from "../../../microservices/microservices.service";
import {
  convertJsonToTime,
  convertDateTimeToStr,
  convertStringToDate,
  clearObject,
} from "../../../helpers/helper-funcs";

@Component({
  selector: "ngx-call-stepper",
  templateUrl: "./call-stepper.component.html",
  styleUrls: ["./call-stepper.component.scss"],
})
export class CallStepperComponent implements OnInit {
  // @ts-ignore
  @ViewChild("stepper") stepperComponent: NbStepperComponent;

  @Input()
  fromStart: boolean;

  @Input()
  startTab: number;

  @Input()
  panels: any[];

  @Output()
  onStartClickEvent: EventEmitter<boolean> = new EventEmitter();

  time = null;
  formControls = [];

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  infoInputs: Object;
  tabInteractionUpdated: boolean = false;
  stepperUpdateInterval;

  constructor(
    private fb: FormBuilder,
    private micService: MicroservicesService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    // TODO: this may be inefficient. Consider changeing this.
    this.initInputs();

    if (
      this.panels.length &&
      this.panels.findIndex(el => el.name === "panel-0") === -1
    ) {
      this.panels.unshift({
        name: "panel-0",
        step: "FirstStep",
        finite: false,
        data: [],
        outgoing: [
          {
            data: "btn-1-1",
            go: "panel-1",
            insertedAction: "onStartClickEvent",
            value: "Start",
            prior: 1,
          },
        ],
      });
    }
  }

  ngOnInit() {
    const stc = this.stepperComponent;

    this.stepperUpdateInterval = setInterval(() => {
      if (
        !this.tabInteractionUpdated &&
        !!stc.steps &&
        // @ts-ignore
        stc.steps._results &&
        // @ts-ignore
        stc.steps._results.length
      ) {
        for (let i = 0; i < this.getCurrentIdx(); i++) {
          // @ts-ignore
          stc.steps._results[i].interacted = true;
        }
        clearInterval(this.stepperUpdateInterval);
      }
    }, 100);
  }

  onInputChange() {
    this.saveInputValues();
  }

  initInputs() {
    const extInputs = this.extractInputsFromPanels();
    this.infoInputs = extInputs;
  }

  extractDataFromSavedInputs(localstorageData): Object {
    // siv for savedInputVals
    const siv = JSON.parse(localstorageData);

    Object.keys(siv).forEach(key => {
      if (siv[key]) {
        switch (key) {
          case "RECALL":
            if (siv[key].date) {
              siv[key].date = convertStringToDate(siv[key].date, true);
            }
            break;

          default:
            break;
        }
      }
    });

    return siv;
  }

  extractInputsFromPanels() {
    let callPanelInputValues = localStorage.getItem("callPanelInputValues");
    const savedInputVals =
      callPanelInputValues &&
      this.extractDataFromSavedInputs(callPanelInputValues);
    let res;
    if (!!savedInputVals) {
      res = savedInputVals;
    } else {
      res = this.panels.reduce((acc, cur) => {
        cur.data
          .filter(el => el.format === "input")
          .map(el => {
            // acc[el.data] = new FormControl("");
            switch (el.type) {
              case "datepicker":
                acc[el.data] = {
                  time: "",
                  date: "",
                };
                break;

              default:
                acc[el.data] = "";
                break;
            }
          });
        return acc;
      }, {});
    }

    return res;
  }

  extractDataFromInputs() {
    const resObj = {};
    const { infoInputs } = this;
    Object.keys(infoInputs).forEach(key => {
      if (infoInputs[key]) {
        let val = infoInputs[key];
        switch (key) {
          case "RECALL":
            if (val.time && val.date) {
              val = convertDateTimeToStr(val);
            } else {
              val = convertJsonToTime(val);
            }
            break;

          default:
            break;
        }

        resObj[key] = val;
      }
    });

    return resObj;
  }

  onStartClick() {}

  getStepIndeces() {
    return Object.values(
      this.panels.reduce((acc, cur, idx) => {
        if (acc[cur.step] === undefined) {
          acc[cur.step] = idx;
        }
        return acc;
      }, {}),
    );
  }

  shouldLabelBeDisplayed(idx) {
    return this.getStepIndeces().includes(idx);
  }

  setCurrentStepperIdx(goVal: string) {
    const idx: number =
      goVal === "panel-save"
        ? this.stepperComponent.steps.length - 1
        : parseInt(goVal.slice(-1));
    const curIdx = this.getCurrentIdx();
    for (let i = curIdx; i < idx; i++) {
      this.stepperComponent.next();
    }
    this.saveCurrentTabIdx();
    return true;
  }

  getCurrentIdx() {
    return this.stepperComponent.selectedIndex;
  }

  saveCurrentTabIdx() {
    setTimeout(() => {
      if (this.getCurrentIdx() !== this.panels.length - 1) {
        localStorage.setItem("currentTab", this.getCurrentIdx().toString());
      }
    }, 10);
  }

  saveInputValues() {
    localStorage.setItem(
      "callPanelInputValues",
      JSON.stringify(this.infoInputs),
    );
  }

  clearInputs() {
    clearObject(this.infoInputs);
  }

  getNextClient() {
    this.reset();
    this.onStartClickEvent.emit(true);
    this.setCurrentStepperIdx("panel-1");
  }

  reset() {
    const curIdx = this.getCurrentIdx();
    for (let i = curIdx; i > 0; i--) {
      this.stepperComponent.previous();
    }
    for (let i = 0; i < this.stepperComponent.steps.length; i++) {
      // @ts-ignore
      this.stepperComponent.steps._results[i].interacted = false;
    }
  }

  saveState(status) {
    const ref = localStorage.getItem("currentCallRef");
    this.micService
      .modifyEvent({
        st: status,
        ref,
        ...this.extractDataFromInputs(),
      })
      .subscribe(res => {
        localStorage.removeItem("currentCallRef");
        localStorage.removeItem("currentTab");
        localStorage.removeItem("callPanelInputValues");
        this.clearInputs();
        // this.extractInputsFromPanels();
      });
  }
}
