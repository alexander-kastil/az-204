import { Component, OnInit } from "@angular/core";
import { FoodFacade } from "../store/facades/food.facade";

@Component({
  selector: "app-food-container",
  templateUrl: "./food-container.component.html",
  styleUrls: ["./food-container.component.scss"],
})
export class FoodContainerComponent implements OnInit {
  constructor(public ff: FoodFacade) {}

  food$ = this.ff.getFood();
  selected$ = this.ff.getSelected();

  ngOnInit() {
    this.ff.initFood();
  }
}
