import { Component, OnInit } from "@angular/core";
import { FoodItem } from "../food.model";
import { FoodState } from "../store/reducers/food.reducer";
import { Store } from "@ngrx/store";
import { LoadFood, SelectFood } from "../store/actions/food.actions";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { getAllFood, getSelected } from "../store/selectors/food.selectors";
import { AppInsightsService } from "src/app/shared/app-insights/app-insights.service";
import { FoodFacade } from "../store/facades/food.service";

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
