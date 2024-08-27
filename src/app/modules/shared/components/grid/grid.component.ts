import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestConfig } from '../../interfaces/requestConfig.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Input() requestConfig: RequestConfig;
  @Input() updatable: boolean = true;
  @Output() entity = new EventEmitter<any>();
  @Output() actionLink = new EventEmitter<any>();

  updateEntity(entity: any) {
    this.entity.emit(entity);
  }

  emitLink(oid: string) {
    this.actionLink.emit(oid);
  }

  data: any[];
  count: number;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    if (this.requestConfig && this.requestConfig.url)
      this.apiService
        .httpRequest(this.requestConfig.url, this.requestConfig.query)
        .subscribe({
          next: ({ entities, annots }) => {
            if (entities) this.data = entities;
            this.count = annots.count ? annots.count : 0;
          },
        });
  }

  getPropertyValue(data: any, binding: string, salary?: boolean): string {
    if (binding.includes('.')) {
      let properies = binding.split('.');
      if (data[properies[0]] && data[properies[0]][properies[1]])
        return data[properies[0]][properies[1]];
    }

    if (salary) {
      return this.formatNumber(data[binding]);
    }

    return data[binding];
  }

  formatNumber(num: number): string {
    const numString = num.toString();
    const digits = numString.split('');

    const formattedDigits = [];
    for (let i = digits.length - 1, j = 1; i >= 0; i--, j++) {
      formattedDigits.unshift(digits[i]);

      if (j % 3 === 0 && i !== 0) {
        formattedDigits.unshift('.');
      }
    }
    return formattedDigits.join('');
  }

  delete(oid: number) {
    if (oid)
      this.apiService.delete(`${this.requestConfig.url}/${oid}`).subscribe({
        next: (res) => {
          if (res) this.fetch();
        },
        error: (err) => {
          alert(err);
          console.error(err);
        },
      });
  }
}
