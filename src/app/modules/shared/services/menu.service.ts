import { Injectable } from '@angular/core';
import { MenuItem } from '../interfaces/menu-item.interface';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menuItems: MenuItem[] = [
    {
      key: 1,
      id: 'home',
      title: 'İlanlar',
      link: '',
      icon: 'list-columns',
    },
    {
      key: 2,
      id: 'resumes',
      title: 'Özgeçmişler',
      link: '/resumes',
      icon: 'file-earmark-person',
    },
    {
      key: 3,
      id: 'applications',
      title: 'Başvurular',
      link: '/applications',
      icon: 'table',
    },
    {
      key: 4,
      id: 'training',
      title: 'Eğitimler',
      link: '/training',
      icon: 'person-workspace',
    },
  ];

  constructor() {
  }

  getMenuItems() {
    return this.menuItems;
  }
}
