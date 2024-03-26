// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { MsalInterceptor, MSAL_INSTANCE, MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG, MsalService, MsalGuard, MsalBroadcastService } from '@azure/msal-angular';
// import { MSALInstanceFactory, MSALGuardConfigFactory, MSALInterceptorConfigFactory } from './state/auth.facade';

// export const msalAuthImports = [
//     {
//         provide: HTTP_INTERCEPTORS,
//         useClass: MsalInterceptor,
//         multi: true
//     },
//     {
//         provide: MSAL_INSTANCE,
//         useFactory: MSALInstanceFactory
//     },
//     {
//         provide: MSAL_GUARD_CONFIG,
//         useFactory: MSALGuardConfigFactory
//     },
//     {
//         provide: MSAL_INTERCEPTOR_CONFIG,
//         useFactory: MSALInterceptorConfigFactory
//     },
//     MsalService,
//     MsalGuard,
//     MsalBroadcastService
// ]