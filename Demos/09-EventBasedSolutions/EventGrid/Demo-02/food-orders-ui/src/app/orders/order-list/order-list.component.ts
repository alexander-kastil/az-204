import { Component, Input, OnInit } from '@angular/core';
import { CloudEvent } from '@azure/eventgrid';
import { FoodOrder } from '../order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  @Input() orders: CloudEvent<FoodOrder>[] = [];

  constructor() {}

  ngOnInit(): void {}
}
