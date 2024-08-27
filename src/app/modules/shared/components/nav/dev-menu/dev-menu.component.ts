import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuItem } from '../../../interfaces/menu-item.interface';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-dev-menu',
  templateUrl: './dev-menu.component.html',
  styleUrls: ['./dev-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevMenuComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    const homePage: MenuItem = {
      id: 'home',
      title: 'Ana sayfa',
      link: '',
      icon: 'house',
    };

    this.menuItems = [homePage, ...this.menuService.getMenuItems()];
  }
}
