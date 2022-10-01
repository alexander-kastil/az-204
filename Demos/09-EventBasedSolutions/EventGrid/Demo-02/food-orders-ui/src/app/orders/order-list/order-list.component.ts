import { outputAst } from '@angular/compiler';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CloudEvent } from '@azure/eventgrid';
import { FoodOrder } from '../order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  @Input() events: CloudEvent<FoodOrder>[] = [];
  @Output() onStatusChanged: EventEmitter<CloudEvent<FoodOrder>> =
    new EventEmitter<CloudEvent<FoodOrder>>();

  constructor() {}

  ngOnInit(): void {}

  changeStatus(event: CloudEvent<FoodOrder>, status: string) {
    if (event.data) {
      event.data.address = 'delivered';
      this.onStatusChanged.emit(event);
    }
  }
}
