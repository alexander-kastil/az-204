import { Component, Input, SimpleChanges, inject } from '@angular/core';

import { OrderEventResponse } from '../order/order-event-response';
import { MatCardModule } from '@angular/material/card';
import { AILoggerService } from 'src/app/shared/logger/ai-logger.service';

@Component({
    selector: 'app-checkout-response',
    imports: [MatCardModule],
    templateUrl: './checkout-response.component.html',
    styleUrls: ['./checkout-response.component.scss']
})
export class CheckoutResponseComponent {
  @Input() response: OrderEventResponse | null = null;
  logger = inject(AILoggerService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['response']) {
      this.logger.logEvent('checkout response', changes['response'].currentValue);
    }
  }
}
