import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainingService } from 'src/app/modules/shared/services/training.service';

interface StatusFilter {
  title: string;
  active?: boolean;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.2s ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('.2s ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class CategoryComponent implements OnInit {
  categoryId: number;
  courses: any[] = [];

  statusFilters: StatusFilter[] = [
    { title: 'Devam Eden' },
    { title: 'Tamamlanan' },
    { title: 'Tümü', active: true },
  ];

  activeFilter!: number;

  constructor(private activatedRoute: ActivatedRoute, private trainingService: TrainingService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.categoryId = params['categoryId'];
      if (this.categoryId) {
        this.trainingService.getCourses().subscribe({
          next: res => {
            this.courses = res?.entities ?? [];
          }
        });
      }
    })
  }

  resetCatalog() { }

  clickStatusFilter(filter: StatusFilter) {
    this.statusFilters.forEach((f) => {
      f.active = false;
    });
    filter.active = true;
    this.activeFilter = this.statusFilters.indexOf(filter);
  }
}
