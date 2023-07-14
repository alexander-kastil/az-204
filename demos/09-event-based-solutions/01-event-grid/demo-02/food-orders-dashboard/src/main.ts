import { bootstrapApplication } from '@angular/platform-browser';
import { OrdersComponent } from './app/orders.component';

bootstrapApplication(OrdersComponent).catch((err) => console.error(err));
