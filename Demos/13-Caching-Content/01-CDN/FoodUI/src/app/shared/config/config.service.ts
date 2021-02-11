import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  constructor(private client: HttpClient) {}

  api: string = "";

  init() {
    this.client
      .get("assets/apiconfig.json")
      .subscribe((val: { url: string }) => {
        this.api = val.url;
        console.log("url loaded", this.api);
      });
  }
}
