import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { AppInsightsService } from "../../shared/app-insights/app-insights.service";
import { FoodItem } from "../food.model";

@Component({
  selector: "app-food-list",
  templateUrl: "./food-list.component.html",
  styleUrls: ["./food-list.component.scss"],
})
export class FoodListComponent implements OnInit {
  constructor(private ai: AppInsightsService) {}

  @Input()
  food: FoodItem[];
  @Output()
  onEditSelected: EventEmitter<FoodItem> = new EventEmitter();
  @Output()
  onDeleteSelected: EventEmitter<FoodItem> = new EventEmitter();
  @Output()
  onAddToCart: EventEmitter<FoodItem> = new EventEmitter();
  @Output()
  onDeleteFromCart: EventEmitter<FoodItem> = new EventEmitter();

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.food.currentValue);
    this.dataSource = new MatTableDataSource(changes.food.currentValue);
  }

  displayedColumns: string[] = [
    "name",
    "price",
    "calories",
    "addItemToCart",
    "removeItemFromCart",
    "deleteItem",
    "editItem",
  ];
  dataSource: MatTableDataSource<FoodItem> = new MatTableDataSource([]);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addFood() {
    this.onEditSelected.emit({
      id: this.getNextId(),
      name: "Pad Krapao",
      amount: 1,
      code: "padk",
      date: new Date(),
      pictureUrl: "",
    });
  }

  getNextId(): number {
    return this.food.reduce((acc, f) => (acc = acc > f.id ? acc : f.id), 0) + 1;
  }

  selectFood(p: FoodItem) {
    this.ai.logEvent("FoodUI:FoodList:SelectFood", p);
    this.onEditSelected.emit(p);
  }

  deleteFood(p: FoodItem) {
    this.ai.logEvent("FoodUI:FoodList:DeleteFood", p);
    this.onDeleteSelected.emit(p);
  }

  addItemToCart(f: FoodItem) {}
}
