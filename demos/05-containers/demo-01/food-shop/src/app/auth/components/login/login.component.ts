import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  InteractionType,
  PopupRequest,
  RedirectRequest,
} from '@azure/msal-browser';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [MatButtonModule],
})
export class LoginComponent implements OnInit {
  auth = inject(MsalService);
  entryPic = '/assets/images/food.png';
  isIframe = false;

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration) { }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
  }

  async login() {
    if (environment.authEnabled) {
      await this.auth.initialize();
      await this.auth.handleRedirectObservable();
      if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
        if (this.msalGuardConfig.authRequest) {
          this.auth
            .loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
            .subscribe((response: AuthenticationResult) => {
              this.auth.instance.setActiveAccount(response.account);
            });
        } else {
          this.auth
            .loginPopup()
            .subscribe((response: AuthenticationResult) => {
              this.auth.instance.setActiveAccount(response.account);
            });
        }
      } else {
        if (this.msalGuardConfig.authRequest) {
          this.auth.loginRedirect({
            ...this.msalGuardConfig.authRequest,
          } as RedirectRequest);
        } else {
          this.auth.loginRedirect();
        }
      }
    }
  }
}
