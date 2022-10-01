import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { MaterialModule } from '../material.module';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [OrderListComponent, OrdersComponent],
  exports: [OrdersComponent],
  imports: [CommonModule, MaterialModule],
})
export class OrdersModule {}
