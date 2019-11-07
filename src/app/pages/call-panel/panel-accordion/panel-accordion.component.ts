import { Component, ViewChild, Input } from "@angular/core";

@Component({
  selector: "ngx-panel-accordion",
  templateUrl: "./panel-accordion.component.html",
  styleUrls: ["./panel-accordion.component.scss"],
})
export class PanelAccordionComponent {
  @ViewChild("item", { static: true }) accordion;

  @Input()
  items: any[];

  @Input()
  title: string;

  toggle() {
    this.accordion.toggle();
  }
}
