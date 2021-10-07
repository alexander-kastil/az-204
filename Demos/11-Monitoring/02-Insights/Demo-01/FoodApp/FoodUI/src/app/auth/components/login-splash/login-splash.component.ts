import { Component, OnInit } from "@angular/core";
import { of } from "rxjs";
import { AuthFacade } from "../../store/facades/auth.facade";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-login-splash",
  templateUrl: "./login-splash.component.html",
  styleUrls: ["./login-splash.component.scss"],
})
export class LoginSplashComponent implements OnInit {
  constructor(private af: AuthFacade) {}

  entryPic = "/assets/images/burger.png";
  view = "entry";
  authEnabled$ = of(environment.authEnabled);

  ngOnInit(): void {}

  proceed() {}
}
