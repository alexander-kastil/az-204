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
  @Output() onStatusChanged: EventEmitter<string> = new EventEmitter<string>();
  od: FoodOrder[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.od = changes['events'].currentValue.map(
      (o: CloudEvent<FoodOrder>) => o.data
    );
  }

  changeStatus(status: string) {
    this.onStatusChanged.emit(status);
  }
}
