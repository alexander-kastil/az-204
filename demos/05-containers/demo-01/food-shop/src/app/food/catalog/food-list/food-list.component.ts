import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CatalogItem } from '../../catalog-item.model';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-food-list',
    templateUrl: './food-list.component.html',
    styleUrls: ['./food-list.component.scss'],
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
        MatTooltipModule,
    ],
})
export class FoodListComponent implements OnChanges {
  @Input() food: CatalogItem[] | null = [];
  @Output() foodSelected: EventEmitter<CatalogItem> =
    new EventEmitter<CatalogItem>();
  @Output()
  foodDeleted: EventEmitter<CatalogItem> = new EventEmitter<CatalogItem>();
  @Output()
  foodAdding: EventEmitter<CatalogItem> = new EventEmitter<CatalogItem>();
  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'instock',
    'deleteItem',
    'editItem',
  ];
  dataSource = new MatTableDataSource([]);

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = new MatTableDataSource(changes['food'].currentValue);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectFood(p: CatalogItem) {
    this.foodSelected.emit(p);
  }

  deleteFood(item: CatalogItem) {
    this.foodDeleted.emit(item);
  }

  addFood() {
    this.foodAdding.emit(new CatalogItem());
  }
}
