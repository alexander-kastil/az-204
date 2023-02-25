import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FoodItem } from "../../food-item.model";

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnChanges {
  @Input() food: FoodItem[] | null = [];
  @Output() foodSelected: EventEmitter<FoodItem> =
    new EventEmitter<FoodItem>();
  @Output()
  foodDeleted: EventEmitter<FoodItem> = new EventEmitter<FoodItem>();
  @Output()
  foodAdding: EventEmitter<FoodItem> = new EventEmitter<FoodItem>();
  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'instock',
    'deleteItem',
    'editItem',
  ];
  dataSource = new MatTableDataSource([]);

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = new MatTableDataSource(changes['food'].currentValue);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectFood(p: FoodItem) {
    this.foodSelected.emit(p);
  }

  deleteFood(item: FoodItem) {
    this.foodDeleted.emit(item);
  }

  addFood() {
    this.foodAdding.emit(new FoodItem());
  }
}
