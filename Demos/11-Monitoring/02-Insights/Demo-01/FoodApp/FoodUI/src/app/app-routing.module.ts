import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { FoodContainerComponent } from "./food/food-container/food-container.component";
import { AboutComponent } from "./about/about.component";
import { ScanComponent } from "./scan/scan/scan.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "food", component: FoodContainerComponent },
  { path: "about", component: AboutComponent },
  { path: "scan", component: ScanComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
