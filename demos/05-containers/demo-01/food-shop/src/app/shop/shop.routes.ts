import { Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopContainerComponent } from './shop-container/shop-container.component';

export const shopRoutes: Routes = [
    { path: '', component: ShopContainerComponent },
    { path: 'checkout', component: CheckoutComponent },
];