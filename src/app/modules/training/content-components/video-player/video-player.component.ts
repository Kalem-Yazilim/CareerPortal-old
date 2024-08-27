import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ContentComponent } from '../content.component';
import * as VimeoPlayer from '@vimeo/player';
import { TrainingService } from 'src/app/modules/shared/services/training.service';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';

@Component({
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerComponent
  extends ContentComponent
  implements OnInit, AfterViewInit
{
  videoId = 793006556;
  player: any;
  @ViewChild('playerContainer', { static: false }) playerContainer:
    | ElementRef
    | undefined;
  timeAllowed: { initial: number; current: number } = {
    initial: 0,
    current: 0,
  };
  videoDuration: number;
  materialData: {
    EducationListExamParticipant?: any;
    FileSystemStoreObject?: any;
    IsCompleted: boolean;
    LastPositon?: string | null;
    LineNumber: number;
    Link: string;
    Oid: number;
  };
  loading: boolean = true;
  callVideoCompleted = false;

  constructor(
    private changeDedector: ChangeDetectorRef,
    private trainingService: TrainingService,
    private notification: NotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.materialData = this.data.data;
    if (
      this.materialData.FileSystemStoreObject &&
      (this.materialData.FileSystemStoreObject.RealFileName === null ||
        this.materialData.FileSystemStoreObject.RealFileName === undefined)
    ) {
      delete this.materialData.FileSystemStoreObject.RealFileName;
    }
    if (this.materialData) {
      this.videoId = +this.materialData.Link;
      if (this.materialData.LastPositon && +this.materialData.LastPositon > 0)
        this.timeAllowed = {
          initial: +this.materialData.LastPositon,
          current: +this.materialData.LastPositon,
        };
    }
  }

  ngAfterContentChecked(): void {}

  ngAfterViewInit(): void {
    const options = {
      id: this.videoId,
      responsive: true,
    };
    this.player = new VimeoPlayer.default(
      this.playerContainer?.nativeElement,
      options
    );

    this.player.getDuration().then((duration: number) => {
      this.videoDuration = duration;
      if (this.timeAllowed.current > this.videoDuration) {
        this.timeAllowed.current = this.videoDuration;
      }

      this.player.ready().then(() => {
        if (this.timeAllowed.current > 15) {
          this.player.setCurrentTime(this.timeAllowed.current);
        }

        this.loading = false;
        this.changeDedector.detectChanges();
      });

      this.player.on('timeupdate', (data: any) => {
        // set video as completed if user watched it until last 7 seconds

        if (this.videoDuration - this.timeAllowed.current < 7) {
          this.putLastPosition(data.seconds, true);
        }

        let sec = data.seconds;
        if (
          sec > this.timeAllowed.current
          // && sec - this.timeAllowed.current < 4
        ) {
          this.timeAllowed.current = sec;
        }

        if (this.timeAllowed.current - this.timeAllowed.initial > 5) {
          if (
            this.videoDuration > data.seconds &&
            this.videoDuration - data.seconds < 10
          ) {
            this.putLastPosition(data.seconds, true);
          } else {
            this.putLastPosition(this.timeAllowed.current);
          }
          this.timeAllowed.initial = this.timeAllowed.current;
        }
      });

      this.player.on('seeked', (data: any) => {
        let seekTime = data.seconds;
        if (seekTime > this.timeAllowed.current) {
          this.player.pause();
          this.player.setCurrentTime(this.timeAllowed.current);
        }
      });
    });
  }

  putLastPosition(time: number, setComplete?: boolean) {
    let req = { ...this.materialData };

    if (!req.LastPositon) {
      req.LastPositon = '0';
    }

    if (!this.callVideoCompleted && setComplete && !req.IsCompleted) {
      this.callVideoCompleted = true;
      req.IsCompleted = true;
      req.LastPositon = (this.videoDuration - 1).toString();
      this.trainingService.putMaterial(req).subscribe({
        next: (res) => {
          this.materialData.IsCompleted = true;
          this.notification.show('İçeriği tamamladınız!', 'success');
          this.contentStatus.emit('finished');
        },
        error: (error) => {
          this.callVideoCompleted = false;
        },
      });
      return;
    }

    if (!setComplete && !req.IsCompleted && time > +req.LastPositon) {
      if (time > +req.LastPositon) req.LastPositon = time.toString();
      this.trainingService.putMaterial(req).subscribe({
        next: (res) => {
          this.contentStatus.emit('inprogress');
        },
        error: (error) => {
          console.log('error >> ', error);
        },
      });
      return;
    }
  }
}
