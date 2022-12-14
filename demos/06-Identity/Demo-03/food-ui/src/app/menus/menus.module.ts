import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '../extensions/utils.module';
import { MsalAuthUtilModule } from '../auth/msal-auth-util.module';

const comps = [NavbarComponent, SidebarComponent];

@NgModule({
  declarations: comps,
  exports: comps,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    UtilsModule,
    MsalAuthUtilModule,
  ],
})
export class MenusModule {}
