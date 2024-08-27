import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ContentComponent } from '../content.component';

@Component({
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideshowComponent extends ContentComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
