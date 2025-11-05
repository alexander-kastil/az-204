import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CatalogItem } from '../catalog-item.model';

@Component({
    selector: 'app-catalog-list',
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
        MatTooltipModule,
    ],
    templateUrl: './catalog-list.component.html',
    styleUrl: './catalog-list.component.scss'
})
export class CatalogListComponent {
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
    'inStock',
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
