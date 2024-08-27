import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  inputs: ['config'],
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoughnutChartComponent implements OnInit {
  @Input() config!: Object;

  public doughnutChartLabels: string[] = [];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [] }],
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor() {}

  ngOnInit(): void {
    Object.entries(this.config).forEach((o: any) => {
      this.doughnutChartLabels.push(o[0]);
      this.doughnutChartData.datasets[0].data.push(o[1]);
    });
  }
}
