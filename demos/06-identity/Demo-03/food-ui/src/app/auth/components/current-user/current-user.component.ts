import { Component } from '@angular/core';
import { MsalAuthFacade } from '../../state/auth.facade';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss'],
})
export class CurrentUserComponent {
  user = this.af.getUser();

  constructor(private af: MsalAuthFacade) {}
}
