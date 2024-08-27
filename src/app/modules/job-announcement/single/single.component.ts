import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ODataServiceFactory } from 'angular-odata';
import { Observable } from 'rxjs';
import { PersonnelJobAnnouncement } from 'src/app/models/personnel-job-announcement.interface';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss'],
})
export class SingleComponent {
  loginStatus$: Observable<boolean>;
  entity: PersonnelJobAnnouncement;
  oid: any;
  constructor(
    private route: ActivatedRoute,
    private factory: ODataServiceFactory,
    public userService: UserService
  ) {
    this.oid = parseInt(this.route.snapshot.paramMap.get('oid') as string);
    if (isNaN(this.oid) || (this.oid && this.oid < 1)) alert('Hatalı link!');
    else {
      let entityFactory = this.factory.entitySet<PersonnelJobAnnouncement>(
        'PersonnelJobAnnouncements'
      );
      let entityService = entityFactory.entities();

      this.loginStatus$ = this.userService.loginStatus$;
      entityService
        .entity(this.oid)
        .fetchEntity()
        .subscribe((entity) => {
          console.log('entity: ', entity);
          if (entity) this.entity = entity;
          else alert('Kayıtbulunamadı!');
        });
    }
  }
}
