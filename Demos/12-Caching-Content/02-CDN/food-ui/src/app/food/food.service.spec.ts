import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import {
  foodAddedItem,
  foodAddItem,
  foodDeleteItem,
  foodLoadData,
  foodQueryItem,
} from './food.mocks';
import { FoodItem } from './food.model';
import { FoodService } from './food.service';
import { foodUpdateItem, foodUpdatedItem } from './food.mocks';

describe('Service - HttpTestingController', () => {
  let fs: FoodService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FoodService],
    });

    fs = TestBed.inject(FoodService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should return the initial load data', () => {
    fs.getFood().subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data.length).toBe(4);
      const firstFood = data.find((f) => f.id == 2);
      expect(firstFood).toEqual(foodQueryItem);
    });

    const url = `${environment.apiUrl}food`;
    const req = controller.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(foodLoadData);
    controller.verify();
  });

  it('should create a new food item', () => {
    fs.addFood(foodAddItem as FoodItem).subscribe((f) => {
      expect(f).toBeTruthy();
    });

    const url = `${environment.apiUrl}food`;
    const req = controller.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush(foodAddedItem);
  });

  it('should update a food item', () => {
    fs.updateFood(foodUpdateItem as FoodItem).subscribe((f) => {
      expect(f).toBeTruthy();
    });

    const url = `${environment.apiUrl}food/${foodUpdateItem.id}`;
    const req = controller.expectOne(url);
    expect(req.request.method).toEqual('PUT');
    req.flush(foodUpdatedItem);
  });

  it('should delete a food item', () => {
    // fs.deleteFood(foodDeleteItem.id as number).subscribe((f) => {
    //   expect(f).toEqual({});
    // });
    // const url = `${environment.apiUrl}food/${foodDeleteItem.id}`;
    // const req = controller.expectOne(url);
    // expect(req.request.method).toEqual('DELETE');
    // req.flush({});
  });
});
