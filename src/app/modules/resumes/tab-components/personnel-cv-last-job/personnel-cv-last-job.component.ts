import { Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridComponent } from 'src/app/modules/shared/components/grid/grid.component';
import { Column } from 'src/app/modules/shared/interfaces/column.interface';
import { RequestConfig } from 'src/app/modules/shared/interfaces/requestConfig.interface';
import { BasePersonnelCvComponent } from '../base-personnel-cv/base-personnel-cv.component';
import { NewLastJobComponent } from './new-last-job/new-last-job.component';

@Component({
  selector: 'app-personnel-cv-last-job',
  templateUrl: './personnel-cv-last-job.component.html',
  styleUrls: ['./personnel-cv-last-job.component.scss'],
})
export class PersonnelCvLastJobComponent
  extends BasePersonnelCvComponent
  implements OnChanges
{
  @ViewChild(GridComponent) grid: GridComponent;

  columns: Column[] = [
    {
      binding: 'LastCompanyName',
      header: 'Şirket',
    },
    {
      binding: 'LastPosition',
      header: 'Pozisyon',
    },
    {
      binding: 'LastSalary',
      header: 'Maaş',
      type: 'salary',
    },
    {
      binding: 'LastCompanyStartDate',
      header: 'Başlangıç Tarihi',
      type: 'date',
    },
    {
      binding: 'LastCompanyEndDate',
      header: 'Bitiş Tarihi',
      type: 'date',
    },
  ];

  requestConfig: RequestConfig;

  constructor(private modalService: NgbModal) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['oid'] &&
      changes['oid'].firstChange &&
      changes['oid'].currentValue &&
      !isNaN(+changes['oid'].currentValue)
    ) {
      this.init(parseInt(changes['oid'].currentValue));
    } else this.init(null);
  }

  init(oid: number | null) {
    this.requestConfig = {
      url: '',
      columns: this.columns,
    };

    if (oid) {
      this.requestConfig.query = (q) =>
        q.filter({
          PersonnelCv: { Oid: oid },
        });

      this.requestConfig.url = 'PersonnelCvLastJobs';
    }
  }

  refresh(foo: boolean) {
    if (foo) {
      this.grid.fetch();
      this.addedEntity.emit();
    }
  }

  openModal(content: any, entity: any = null) {
    if (entity) this.updateEntity = entity;
    else this.updateEntity = null;
    this.modalService.open(content, { size: 'lg' });
  }
}
