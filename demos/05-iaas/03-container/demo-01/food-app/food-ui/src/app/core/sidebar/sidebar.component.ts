import { Component, OnInit } from '@angular/core';
import { MenuFacade } from '../../state/menu/menu.facade';
import { FoodFacade } from '../../food/state/food.facade';
import { MsalAuthFacade } from 'src/app/auth/state/auth.facade';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  user = this.auth.getUser();

  constructor(
    public mf: MenuFacade,
    public ff: FoodFacade,
    public auth: MsalAuthFacade
  ) {}

  ngOnInit() {}

  addFood() {
    this.ff.addNewFood();
  }

  logout() {
    this.auth.logout();
  }
}
