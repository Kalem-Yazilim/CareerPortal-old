import { Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { PersonnelCVFiles } from 'src/app/models/personnel-cvfiles.interface';
import { GridComponent } from 'src/app/modules/shared/components/grid/grid.component';
import { Column } from 'src/app/modules/shared/interfaces/column.interface';
import { RequestConfig } from 'src/app/modules/shared/interfaces/requestConfig.interface';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { BasePersonnelCvComponent } from '../base-personnel-cv/base-personnel-cv.component';

@Component({
  selector: 'app-personnel-cv-file',
  templateUrl: './personnel-cv-file.component.html',
  styleUrls: ['./personnel-cv-file.component.scss'],
})
export class PersonnelCvFileComponent
  extends BasePersonnelCvComponent
  implements OnChanges
{
  @ViewChild(GridComponent) grid: GridComponent;

  data: any;

  columns: Column[] = [
    /* {
      header: 'Oid',
      binding: 'Oid',
    }, */
    {
      header: 'Dosya Açıklaması',
      binding: 'File.FileName',
    }
  ];
  requestConfig: RequestConfig;

  constructor(private modalService: NgbModal, private api: ApiService) {
    super();
    this.fetch();
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

  fetch() {
    if (this.requestConfig && this.requestConfig.url)
      this.api
        .httpRequest(this.requestConfig.url, this.requestConfig.query)
        .pipe(
          map((res) => {
            res.entities?.map((f) => {
              const [fileName, fileType] = f.File.FileName.split('|');
              f.File.FileName = fileName;
              f.File.FileType = fileType;
            });
            return res;
          })
        )
        .subscribe({
          next: (response) => {
            if (response.entities) this.data = response.entities;
          },
        });
  }

  init(oid: number | null) {
    this.requestConfig = {
      url: '',
      columns: this.columns,
    };

    if (oid) {
      this.requestConfig.query = (q) => {
        q.expand({
          File: {},
        }),
          q.filter({
            PersonnelCv: { Oid: oid },
          });
      };

      this.requestConfig.url = 'PersonnelCvFiles';
    }
    this.fetch();
  }

  downloadFile(base64String: any, fileName: string) {
    const source = `data:application/txt;base64,${base64String}`;
    const link = document.createElement('a');
    link.href = source;
    link.download = fileName;
    link.click();
  }
  onClickDownloadFile(item: any) {
    this.api
      .httpRequest(`PersonnelCVFiles/${item.Oid}/GetFileData()`, () => {}, false)
      .subscribe({
        next: ({ entities }) => {
          let base64String = entities;
          this.downloadFile(base64String, item.File.FileName);
        },
      });
  }

  getPropertyValue(data: any, binding: string): string {
    if (binding.includes('.')) {
      let properies = binding.split('.');
      if (data[properies[0]] && data[properies[0]][properies[1]])
        return data[properies[0]][properies[1]];
    }
    return data[binding];
  }

  delete(oid: number) {
    if (oid)
      this.api.delete(`${this.requestConfig.url}/${oid}`).subscribe({
        next: (res) => {
          console.log(res);
          if (res) this.fetch();
        },
        error: (err) => {
          alert(err);
          console.error(err);
        },
      });
  }

  refresh(foo: boolean) {
    if (foo) this.fetch();
  }

  openModal(content: any, entity: any = null) {
    if (entity) this.updateEntity = entity;
    else this.updateEntity = null;
    this.modalService.open(content, { size: 'lg' });
  }
}
