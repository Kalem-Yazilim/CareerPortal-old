import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ContentDirective } from '../../shared/directives/content.directive';
import { ExamComponent } from '../content-components/exam/exam.component';
import { OverviewComponent } from '../content-components/overview/overview.component';
import { SlideshowComponent } from '../content-components/slideshow/slideshow.component';
import { SummaryComponent } from '../content-components/summary/summary.component';
import { VideoPlayerComponent } from '../content-components/video-player/video-player.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingService } from '../../shared/services/training.service';
import { Content } from '../../shared/interfaces/content.interface';
import { ContentStatus } from '../content-components/content.component';
import { DocumentComponent } from '../content-components/document/document.component';
import { ApiService } from '../../shared/services/api.service';
import { NotificationService } from '../../shared/services/notification.service';

enum ContentComponents {
  Overview = 0,
  Slideshow,
  Video,
  Exam,
  Summary,
  Document,
}

@Component({
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  @ViewChild(ContentDirective, { static: true }) contentHost!: ContentDirective;
  categoryId: string;
  courseId: string;

  contentContainerRef: ViewContainerRef | undefined;
  currentContentComponentRef: any;
  isContentLoading = true;
  course: any;
  examTime: number = 0;
  hasDocument: boolean = false;
  hasExam: boolean = false;

  contents: Content[] = [];
  queryParameters: any = {};

  document: any | null;

  constructor(
    private route: ActivatedRoute,
    private trainingService: TrainingService,
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {
    this.categoryId = route.snapshot.params['categoryId'];
    this.courseId = route.snapshot.params['courseId'];
  }

  ngOnInit(): void {
    this.contentContainerRef = this.contentHost.viewContainerRef;
    this.contentContainerRef.clear();
    this.fetch(true);
  }

  fetch(init: boolean) {
    this.trainingService.getTraining(+this.courseId).subscribe((res) => {
      this.course = res.entity;
      let contentArr: Content[] = [];
      this.hasExam =
        this.course.LibraryDefiniton &&
        this.course.LibraryDefiniton.LibraryTime;

      if (this.hasExam) {
        this.examTime = this.course.LibraryDefiniton.LibraryTime * 60;
      }

      this.course.EducationListExamParticipantMaterial.forEach(
        (material: any) => {
          if (material.Link) {
            let materialContent: Content = {
              type: 'video',
              id: material.Oid,
              isCompleted: material.IsCompleted,
              data: {
                ...material,
              },
            };

            contentArr.push(materialContent);
          }
        }
      );

      this.hasDocument = (
        this.course.EducationListExamParticipantMaterial as any[]
      ).some((m) => m.FileSystemStoreObject);

      if (this.hasDocument) {
        this.document = (
          this.course.EducationListExamParticipantMaterial as any[]
        ).find((e) => e.FileSystemStoreObject);
      }

      if (init) {
        this.loadContent(0);
      }

      if (this.course.EducationList?.EducationCatalog) {
        this.queryParameters = {
          selectedCatalog: this.course.EducationList.EducationCatalog.Oid,
        };
      }

      this.contents = [...contentArr];
    });
  }

  activeContentIndex = -1;

  destroyContent() {
    this.currentContentComponentRef?.destroy();
  }

  get examAvailable() {
    let status = this.contents.every((content) => content.isCompleted);
    return status;
  }

  exampleLoad() {
    // TODO:
    // this.currentContentComponentRef = this.contentContainerRef.createComponent<COMPONENT_TIPI>(YUKLENECEK_COMPONENT);
    // componentRef.instance.INPUT_ADI = INPUT;
    //ÖRNEK OUTPUT
    // const sub: Subscription =
    //   this.currentContentComponentRef!.instance.out.subscribe((event: any) => {
    //     console.log(event);
    //   });
  }

  loadContent(contentType: ContentComponents) {
    this.isContentLoading = true;
    switch (contentType) {
      case ContentComponents.Overview:
        this.currentContentComponentRef =
          this.createComponent(OverviewComponent);
        this.currentContentComponentRef.instance.data = this.course;
        break;
      case ContentComponents.Summary:
        this.currentContentComponentRef =
          this.createComponent(SummaryComponent);
        this.currentContentComponentRef.instance.data = {
          ...this.contents[this.activeContentIndex],
        };
        break;
      case ContentComponents.Exam:
        this.currentContentComponentRef = this.createComponent(ExamComponent);
        this.currentContentComponentRef.instance.data = {
          courseId: this.courseId,
          examTime: this.examTime,
          repeatCount: this.course.RepeatCount,
          libraryRepeatCount: this.course.LibraryDefiniton.RepeatCount,
          isPassedExam: this.course.IsSuccessfull,
        };
        break;
      case ContentComponents.Slideshow:
        this.currentContentComponentRef =
          this.createComponent(SlideshowComponent);
        this.currentContentComponentRef.instance.data = {
          ...this.contents[this.activeContentIndex],
        };
        break;
      case ContentComponents.Video:
        this.currentContentComponentRef =
          this.createComponent(VideoPlayerComponent);
        this.currentContentComponentRef.instance.data = {
          ...this.contents[this.activeContentIndex],
        };
        break;
      case ContentComponents.Document:
        this.currentContentComponentRef =
          this.createComponent(DocumentComponent);

        const index = (
          this.course.EducationListExamParticipantMaterial as any[]
        ).findIndex((m) => m.FileSystemStoreObject);
        if (this.hasDocument) {
          this.currentContentComponentRef.instance.data = {
            ...this.course.EducationListExamParticipantMaterial[index]
              .FileSystemStoreObject,
          };
        }
        break;
      default:
        break;
    }

    this.currentContentComponentRef!.instance.contentStatus.subscribe(
      (e: ContentStatus) => {
        if (
          e == 'finished' &&
          this.contents.length - 1 > this.activeContentIndex
        ) {
          debugger;
          if (this.contents[this.activeContentIndex + 1].type == 'video') {
            this.activeContentIndex++;
            this.loadContent(2);
          }
        }
        this.fetch(false);
      }
    );

    if (this.currentContentComponentRef!.instance.documentCompletionTimeout) {
      this.currentContentComponentRef!.instance.documentCompletionTimeout.subscribe(
        {
          next: () => {
            this.documentCompleted();
          },
        }
      );
    }

    this.currentContentComponentRef!.onDestroy(() => {
      this.currentContentComponentRef!.instance.contentStatus.unsubscribe();

      if (this.currentContentComponentRef!.instance.documentCompletionTimeout) {
        this.currentContentComponentRef!.instance.documentCompletionTimeout.unsubscribe();
      }
    });
  }

  documentCompleted() {
    if (this.document.IsCompleted) return;

    const postBody = {
      ...this.document,
      IsCompleted: true,
      FileSystemStoreObject: null,
    };

    this.apiService
      .put('EducationListExamParticipantMaterials/' + postBody.Oid, postBody)
      .subscribe({
        next: () => {
          this.document = {
            ...this.document,
            IsCompleted: true,
          };
          this.notificationService.show('İçeriği tamamladınız!', 'success');
        },
        error: () => {
          this.document = {
            ...this.document,
            IsCompleted: false,
          };
          this.notificationService.show(
            'Doküman tamamlanmasıda bir hata oluştu',
            'error'
          );
        },
      });
  }

  createComponent(comp: any) {
    this.contentContainerRef?.clear();
    return this.contentContainerRef!.createComponent<any>(comp);
  }

  dataChange() {
    this.currentContentComponentRef?.setInput('data', 123);
  }
}
