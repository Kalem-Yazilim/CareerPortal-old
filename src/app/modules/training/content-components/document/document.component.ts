import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContentComponent } from '../content.component';
import { TrainingService } from 'src/app/modules/shared/services/training.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent extends ContentComponent implements OnInit {
  docSrc: string;
  docUrl: string;

  @Output() documentCompletionTimeout = new EventEmitter();
  constructor(private trainingService: TrainingService) {
    super();
  }

  ngOnInit(): void {
    if (this.data && this.data.Oid) {
      this.trainingService.getDocument(this.data.ControlGuid).subscribe({
        next: (res) => {
          this.docSrc = res.value;
          const byteArray = new Uint8Array(
            atob(this.docSrc)
              .split('')
              .map((char) => char.charCodeAt(0))
          );
          const blob = new Blob([byteArray], { type: 'application/pdf' });
          this.docUrl = window.URL.createObjectURL(blob);

          setTimeout(() => {
            this.documentCompletionTimeout.emit();
          }, 2000);
        },
      });
    }
  }
}
