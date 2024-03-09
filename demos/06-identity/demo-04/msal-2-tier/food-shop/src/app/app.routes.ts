import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    {
        path: 'shop',
        loadChildren: () => import('./shop/shop.routes').then((m) => m.shopRoutes),
    },
    {
        path: 'catalog',
        loadChildren: () => import('./catalog/catalog.routes').then((m) => m.catalogRoutes),
    }
];