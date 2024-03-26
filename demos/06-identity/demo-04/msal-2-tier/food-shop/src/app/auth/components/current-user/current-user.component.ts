import { Component, inject } from '@angular/core';
import { MsalAuthFacade } from '../../state/auth.facade';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss'],
  standalone: true,
  imports: [AsyncPipe],
})
export class CurrentUserComponent {
  auth = inject(MsalAuthFacade);
  user = this.auth.getUser();
}
