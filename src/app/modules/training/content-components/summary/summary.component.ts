import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ContentComponent } from '../content.component';

@Component({
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent extends ContentComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
