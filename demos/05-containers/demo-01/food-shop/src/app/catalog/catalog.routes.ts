import { Routes } from '@angular/router';
import { CatalogContainerComponent } from './catalog-container/catalog-container.component';
import { CatalogEditComponent } from './catalog-edit/catalog-edit.component';

export const catalogRoutes: Routes = [
    { path: '', component: CatalogContainerComponent },
    { path: ':id', component: CatalogEditComponent },
];