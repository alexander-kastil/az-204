import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderEventResponse } from '../order/order-event-response';
import { MatCardModule } from '@angular/material/card';
import { AILoggerService } from 'src/app/logger/ai-logger.service';

@Component({
  selector: 'app-checkout-response',
  standalone: true,
  imports: [CommonModule, MatCardModule],
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
