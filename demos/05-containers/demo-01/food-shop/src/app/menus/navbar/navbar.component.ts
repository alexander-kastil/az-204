import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { SidenavFacade } from '../../state/sidenav/sidenav.facade';
import { NavItem } from './nav-item.model';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: true,
    imports: [
        MatToolbarModule,
        MatIconModule,
        NgFor,
        RouterLinkActive,
        RouterLink,
        AsyncPipe,
    ],
})
export class NavbarComponent {
  http = inject(HttpClient);
  mf = inject(SidenavFacade);
  menuItems = this.http.get<NavItem[]>('/assets/nav-items.json');

  toggleMenu() {
    this.mf.toggleMenuVisibility();
  }
}
