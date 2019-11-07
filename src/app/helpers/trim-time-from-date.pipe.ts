import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "trimTimeFromDate",
})
export class TrimTimeFromDatePipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    if (typeof value === "string") {
      let endIdx = value.indexOf("T");
      let res = value.slice(0, endIdx);
      return res;
    } else {
      return value;
    }
  }
}
