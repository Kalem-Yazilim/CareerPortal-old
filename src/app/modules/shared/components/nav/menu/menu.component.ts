import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MenuItem } from '../../../interfaces/menu-item.interface';
import {ConfigService, IConfigObject} from '../../../services/config.service';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: '[app-menu]',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  env = {
    prod: environment.production,
  };

  constructor(private menuService: MenuService,
    private configService: ConfigService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.configService.Config$.subscribe(
      (configs: IConfigObject) => {
        if (configs?.allowed_nav_menu_keys?.length > 0) {
          this.menuItems = this.menuService.getMenuItems().filter(menu => menu.key != undefined && configs.allowed_nav_menu_keys.includes(menu.key));
          this.cdRef.detectChanges();
        } else {
          this.menuItems = this.menuService.getMenuItems();
          this.cdRef.detectChanges();
        }
      });
  }
}
