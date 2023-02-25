import { Component, OnInit } from '@angular/core';
import { FoodItem } from "../../food-item.model";
import { FoodEntityService } from '../../state/catalog/food-entity.service';

@Component({
  selector: 'app-food-container',
  templateUrl: './food-container.component.html',
  styleUrls: ['./food-container.component.scss'],
})
export class FoodContainerComponent implements OnInit {
  food = this.foodService.entities$;
  selected: FoodItem | null = null;

  constructor(private foodService: FoodEntityService) { }

  ngOnInit() {
    this.foodService.loaded$.subscribe((loaded) => {
      if (!loaded) {
        this.foodService.getAll();
      }
    });
  }

  addFood(item: FoodItem) {
    this.selected = item;
  }

  selectFood(f: FoodItem) {
    this.selected = { ...f };
  }

  deleteFood(f: FoodItem) {
    this.foodService.delete(f.id);
  }

  foodSaved(f: FoodItem) {
    if (f.id == 0) {
      this.foodService.add(f);
    } else {
      this.foodService.update(f);
    }
  }
}
