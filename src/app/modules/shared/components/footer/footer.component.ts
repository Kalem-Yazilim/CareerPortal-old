import { Component, OnInit } from '@angular/core';
import packageInfo from '../../../../../../package.json';
import {IConfigObject, ConfigService} from '../../services/config.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  version = packageInfo.version;
  configs: IConfigObject;

  constructor(public configService: ConfigService) { }

  ngOnInit(): void {
    this.configService.Config$.subscribe(
      (configs: IConfigObject) => {
        if (configs) {
          this.configs = configs;
        }
      }
    );
  }

}
