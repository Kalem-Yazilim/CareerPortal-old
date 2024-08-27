import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ContentComponent } from '../content.component';

@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent extends ContentComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
