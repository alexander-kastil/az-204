import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

const comps = [
  LoginComponent,
  FooterComponent,
  NavbarComponent,
  SidebarComponent,
];

@NgModule({
  declarations: comps,
  exports: comps,
  imports: [CommonModule, MaterialModule, RouterModule],
})
export class CoreModule {}
