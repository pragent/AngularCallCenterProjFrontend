import { Component, OnInit } from "@angular/core";
import { MicroservicesService } from "../../microservices/microservices.service";
import { McStore } from "../../microservices/stores/mc.store";
import { Router, ActivatedRoute } from "@angular/router";
import { UserStore } from "../../@core/stores/user.store";
import { map } from "rxjs/operators";

@Component({
  selector: "ngx-call-panel",
  templateUrl: "./call-panel.component.html",
  styleUrls: ["./call-panel.component.scss"],
})
export class CallPanelComponent implements OnInit {
  // FIXME: change type
  data: any;
  currentEventRef: string;
  currentEvtCode: string;
  currentTab: number;
  eventTemplate: any;
  faq: any;

  constructor(
    private micService: MicroservicesService,
    private micStore: McStore,
    private userStore: UserStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.currentEventRef = localStorage.getItem("currentCallRef");
    this.currentTab = parseInt(localStorage.getItem("currentTab")) || 0;

    if (this.currentEventRef) {
      console.log("REF ALREADY EXISTS");
      this.data = this.micService.getEventByRef(this.currentEventRef);

      this.data.subscribe(res => {
        this.currentEvtCode = res.evt;
        this.eventTemplate = this.micService.getEventTemplate(
          this.currentEvtCode,
        );

        this.faq = this.micService.getFAQ(this.currentEvtCode);
        // this.eventTemplate.subscribe(res => console.log("evt tpl: ", res));
        // this.faq.subscribe(res => console.log("faq: ", res));
      });
    } else {
      console.log("NO REF FOUND");
      this.getCurrentEvtCode().subscribe((evt: string) => {
        this.currentEvtCode = evt;
        this.eventTemplate = this.micService.getEventTemplate(
          this.currentEvtCode,
        );
        this.faq = this.micService.getFAQ(this.currentEvtCode);
        // this.eventTemplate.subscribe(res => console.log("evt tpl: ", res));
        // this.faq.subscribe(res => console.log("faq: ", res));
      });
    }
  }

  startCall() {
    const clientid = this.userStore.getUser().clientId;
    let reqres = this.micService.createCall(this.currentEvtCode, clientid);
    reqres.subscribe(res => {
      const ref = res[0].ref;
      localStorage.setItem("currentCallRef", ref);
      this.micService
        .callClient(ref, clientid)
        .subscribe(res => console.log("callClient :", res));
    });
  }

  getCurrentEvtCode() {
    // return this.micStore.getMenuItems().find(el => el.path === this.router.url)
    //   .evt;
    return this.route.paramMap.pipe(
      map(params => {
        //  @ts-ignore
        // console.log(params.get("evt"));
        //  @ts-ignore
        return params.get("evt");
      }),
    );
  }

  ngOnInit() {}
}
