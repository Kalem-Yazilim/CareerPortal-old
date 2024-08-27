import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../shared/services/confirm.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  controlGuid: string | null = '';
  showError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private confirmService: ConfirmService
  ) {}

  ngOnInit(): void {
    this.controlGuid = this.route.snapshot.paramMap.get('data');
    this.confirmMail();
  }

  confirmMail() {
    if (this.controlGuid) {
      this.confirmService.confirmMail(this.controlGuid).subscribe({
        next: (res) => {
          console.log('onaylama tamamlandı');
          this.router.navigateByUrl('/auth/login');
        },
        error: (err) => {
          console.log('onaylama sırasında hata => ', err);
          this.showError = true;
        },
      });
    }
  }
}
