import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export function apimInterceptor(req: HttpRequest<unknown>,
    next: HttpHandlerFn) {
    var request = req.clone({
        headers: req.headers.set(
            'Ocp-Apim-Subscription-Key',
            environment.azure.apimSubscriptionKey
        )
    });
    return next(request);
};
