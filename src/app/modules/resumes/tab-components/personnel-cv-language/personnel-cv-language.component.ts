import { Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridComponent } from 'src/app/modules/shared/components/grid/grid.component';
import { Column } from 'src/app/modules/shared/interfaces/column.interface';
import {
  QueryType,
  RequestConfig,
} from 'src/app/modules/shared/interfaces/requestConfig.interface';
import { BasePersonnelCvComponent } from '../base-personnel-cv/base-personnel-cv.component';

@Component({
  selector: 'app-personnel-cv-language',
  templateUrl: './personnel-cv-language.component.html',
  styleUrls: ['./personnel-cv-language.component.scss'],
})
export class PersonnelCvLanguageComponent
  extends BasePersonnelCvComponent
  implements OnChanges
{
  @ViewChild(GridComponent) grid: GridComponent;

  columns: Column[] = [
    {
      header: 'Dil Adı',
      binding: 'PersonnelLanguageDefinition.Name',
    },
    {
      header: 'Okuma Seviyesi',
      binding: 'ReadRate',
      translate: true,
    },
    {
      header: 'Yazma Seviyesi',
      binding: 'WriteRate',
      translate: true,
    },
    {
      header: 'Anlama Seviyesi',
      binding: 'UnderStandRate',
      translate: true,
    },
    {
      header: 'Konuşma Seviyesi',
      binding: 'TalkRate',
      translate: true,
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
      this.requestConfig.query = (q) => {
        q.filter({
          PersonnelCv: { Oid: oid },
        }),
          q.expand({ PersonnelLanguageDefinition: {} });
      };
      this.requestConfig.url = 'PersonnelCvLanguages';
    }
  }

  refresh(foo: boolean) {
    if (foo) {
      this.addedEntity.emit();
      this.grid.fetch();
    }
  }

  openModal(content: any, entity: any = null) {
    if (entity) this.updateEntity = entity;
    else this.updateEntity = null;
    this.modalService.open(content, { size: 'lg' });
  }
}
