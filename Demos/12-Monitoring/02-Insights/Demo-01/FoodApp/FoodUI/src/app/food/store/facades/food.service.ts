import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { FoodState } from "../reducers/food.reducer";
import { getAllFood, getSelected } from "../selectors/food.selectors";
import { tap } from "rxjs/operators";
import { FoodItem } from "../../food.model";
import { SelectFood, LoadFood } from "../actions/food.actions";
import { AppInsightsService } from "src/app/shared/app-insights/app-insights.service";

@Injectable({
  providedIn: "root",
})
export class FoodFacade {
  constructor(
    private store: Store<FoodState>,
    private ai: AppInsightsService
  ) {}

  initFood() {
    this.store.dispatch(new LoadFood());
  }

  getFood() {
    return this.store
      .select(getAllFood)
      .pipe(tap((data) => console.log("data received from store", data)));
  }

  getSelected() {
    return this.store.select(getSelected);
  }

  selectFood(f: FoodItem) {
    this.store.dispatch(new SelectFood(f));
  }

  deleteFood(f: FoodItem) {
    console.log("deleting ", f);
    this.ai.logEvent("Deleting", f);
  }

  saveFood(f: FoodItem) {
    console.log("saving ", f);
    this.ai.logEvent("Saving", f);
  }

  mailFood(f: FoodItem) {
    console.log("saving ", f);
    this.ai.logEvent("Saving", f);
  }
}
