import { Component, Inject, OnInit } from '@angular/core';
import {
  MsalGuardConfiguration,
  MsalService,
  MSAL_GUARD_CONFIG,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  InteractionType,
  PopupRequest,
  RedirectRequest,
} from '@azure/msal-browser';
import { environment } from '../../../../environments/environment';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [MatButtonModule],
})
export class LoginComponent implements OnInit {
  entryPic = '/assets/images/food.png';
  isIframe = false;

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService
  ) {}

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
  }

  login() {
    if (environment.authEnabled) {
      if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
        if (this.msalGuardConfig.authRequest) {
          this.authService
            .loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
            .subscribe((response: AuthenticationResult) => {
              this.authService.instance.setActiveAccount(response.account);
            });
        } else {
          this.authService
            .loginPopup()
            .subscribe((response: AuthenticationResult) => {
              this.authService.instance.setActiveAccount(response.account);
            });
        }
      } else {
        if (this.msalGuardConfig.authRequest) {
          this.authService.loginRedirect({
            ...this.msalGuardConfig.authRequest,
          } as RedirectRequest);
        } else {
          this.authService.loginRedirect();
        }
      }
    }
  }
}
