import { Component, EventEmitter, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridComponent } from 'src/app/modules/shared/components/grid/grid.component';
import { Column } from 'src/app/modules/shared/interfaces/column.interface';
import {
  QueryType,
  RequestConfig,
} from 'src/app/modules/shared/interfaces/requestConfig.interface';
import { BasePersonnelCvComponent } from '../base-personnel-cv/base-personnel-cv.component';

@Component({
  selector: 'app-personnel-cv-education',
  templateUrl: './personnel-cv-education.component.html',
  styleUrls: ['./personnel-cv-education.component.scss'],
})
export class PersonnelCvEducationComponent
  extends BasePersonnelCvComponent
  implements OnChanges
{
  @ViewChild(GridComponent) grid: GridComponent;


  columns: Column[] = [
    {
      header: 'Okul - Fakülte',
      binding: 'Institue',
    },
    {
      header: 'Bölüm',
      binding: 'InstitueDepartment',
    },
    {
      header: 'Mezuniyet Yılı',
      binding: 'GraduationYear',
    },
    {
      header: 'Mezuniyet Oranı',
      binding: 'GruaduationRate',
    },
    {
      header: 'Mezuniyet Durumu',
      binding: 'EducationStatus',
      translate: true,
    },
  ];

  query: QueryType = (q) => {
    q.select([
      'Oid',
      'InstitueDepartment',
      'GraduationYear',
      'GruaduationRate',
    ]);
    // q.filter(({ e }: { e: any }) => e().eq('Oid', 143357));
  };

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
        })

      this.requestConfig.url = 'PersonnelCvEducations';
    }
  }

  refresh(foo: boolean) {
    if (foo){
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
