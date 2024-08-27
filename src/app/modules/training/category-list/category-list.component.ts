import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TrainingService } from 'src/app/modules/shared/services/training.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  defaultSrc: string = '../../../../../assets/img/default-image.jpg';
  categories: any[] | null = [];

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit(): void {
    this.trainingService.getCategories().subscribe({
      next: (res) => {
        const prefix = 'data:image;base64,';
        res.entities?.map((c) => {
          if (c.ImageData) {
            c.ImageData = prefix + c.ImageData;
            // c.ImageData = "../../../../../assets/img/example4.jpg";
          } else {
            c.ImageData = this.defaultSrc;
          }
        });
        this.categories = res.entities;
      },
    });
  }
}
