import { Injectable } from '@angular/core';
import {
  EventMessage,
  EventType,
  InteractionStatus,
} from '@azure/msal-browser';
import { Observable, of } from 'rxjs';

// used when auth is turned off to avoid errorsx
@Injectable()
export class MsalBroadcastServiceMock {
  constructor() {
    this.msalSubject$ = of({
      eventType: EventType.LOGIN_SUCCESS,
      interactionType: null,
      payload: {},
      timestamp: 0,
      error: null,
    });
  }
  msalSubject$: Observable<EventMessage>;
  inProgress$: Observable<InteractionStatus> | null = null;
}
