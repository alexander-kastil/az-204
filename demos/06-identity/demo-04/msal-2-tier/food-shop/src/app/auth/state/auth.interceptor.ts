import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';
import { MsalAuthState } from './auth.reducer';
import { getToken } from './auth.selectors';

//TODO: Not used here
@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  store = inject(Store) as Store<MsalAuthState>;

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(getToken).pipe(
      first(),
      mergeMap((token) => {
        const authReq = !!token
          ? req.clone({
            setHeaders: { Authorization: 'Bearer ' + token },
          })
          : req;
        return next.handle(authReq);
      })
    );
  }
}
