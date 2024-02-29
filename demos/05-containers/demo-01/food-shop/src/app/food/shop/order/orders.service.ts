import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AILoggerService } from 'src/app/logger/ai-logger.service';
import { environment } from '../../../../environments/environment';
import { OrderEventResponse } from './order-event-response';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  http = inject(HttpClient);
  logger = inject(AILoggerService);

  checkout(order: any) {
    this.logger.logEvent('checking out order', order);
    var url = `${environment.ordersApi}/orders/create`;
    this.logger.logEventObject('using url', url);
    return this.http.post<OrderEventResponse>(`${environment.ordersApi}/orders/create`, order);
  }
}
