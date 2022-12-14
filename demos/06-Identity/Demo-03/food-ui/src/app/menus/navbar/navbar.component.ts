import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MenuFacade } from '../../state/menu/menu.facade';
import { NavItem } from './nav-item.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private mf: MenuFacade, private http: HttpClient) {}

  menuItems = this.http.get<NavItem[]>('/assets/nav-items.json');

  toggleMenu() {
    this.mf.toggleMenuVisibility();
  }
}
