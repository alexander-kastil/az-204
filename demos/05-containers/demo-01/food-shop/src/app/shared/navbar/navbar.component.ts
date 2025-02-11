import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidenavFacade } from '../../state/sidenav/sidenav.facade';
import { NavItem } from './nav-item.model';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    imports: [
        MatToolbarModule,
        MatIconModule,
        RouterLinkActive,
        RouterLink,
        AsyncPipe
    ]
})
export class NavbarComponent {
  http = inject(HttpClient);
  mf = inject(SidenavFacade);
  menuItems = this.http.get<NavItem[]>('/assets/nav-items.json');

  toggleMenu() {
    this.mf.toggleMenuVisibility();
  }
}
