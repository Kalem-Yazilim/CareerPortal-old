import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ContentComponent } from '../content.component';
import { TrainingService } from 'src/app/modules/shared/services/training.service';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { Router } from '@angular/router';

interface Question {
  question: string;
  options: any[];
  reqObj: any;
}

@Component({
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent extends ContentComponent implements OnInit {
  constructor(
    private trainingService: TrainingService,
    private notification: NotificationService,
    private router: Router
  ) {
    super();
  }
  questions: Question[] = [];
  showQuestions = false;
  selectedAnswers: any[] = [];
  currentIndex = 0;
  examTime: number = 0;
  availableCount: number;
  educationListOid: string;
  answersBody: any[] = [];
  isPassedExam: boolean = false;

  ngOnInit() {
    this.examTime = this.data.examTime;
    this.availableCount = this.data.libraryRepeatCount - this.data.repeatCount;
    this.isPassedExam = this.data.isPassedExam;
    this.trainingService
      .getTrainingTest(+this.data.courseId)
      .subscribe((res) => {
        let arr = res.entities;
        this.educationListOid =
          arr[0].EducationListExamParticipant.EducationList.Oid;
        arr.forEach((el: any) => {
          let qu: Question = {
            question:
              el.LibraryDefinitionItem.QuestionDesc ||
              el.LibraryDefinitionItem.QuestionName,
            options: [...el.LibraryDefinitionItem.LibraryDefinitionItemOption],
            reqObj: {
              Oid: el.Oid,
              EducationListExamParticipant: {
                Oid: el.EducationListExamParticipant.Oid,
              },
              LibraryDefinitionItem: {
                Oid: el.LibraryDefinitionItem.Oid,
              },
              LibraryDefinitionItemOption: {
                Oid: el.LibraryDefinitionItemOption
                  ? el.LibraryDefinitionItemOption.Oid
                  : null,
              },
            },
          };
          this.randomSort(qu);
          this.questions.push(qu);
        });

        this.selectedAnswers = Array(this.questions.length).fill(null);
      });
  }

  startExam() {
    this.currentIndex = 0;
    this.showQuestions = true;
    this.selectedAnswers = Array(this.questions.length).fill(null);
  }

  finalizeExam() {
    this.questions.forEach((el, i, array) => {
      this.answerQuestion(el, i, array.length - 1 == i);
    });
    const body = {
      Body: JSON.stringify(this.answersBody),
    };
    this.trainingService.sendAnswer(body).subscribe({
      next: (res) => {
        this.notification.show('Cevaplarınız başarıyla gönderildi!', 'success');
        this.trainingService.endQuiz(this.educationListOid).subscribe({
          next: (result) => {
            this.availableCount = this.availableCount - 1;
            if (result.value) {
              this.notification.show(
                result.value,
                'info',
                'bottom-right',
                'Sonuçunuz'
              );
            }
          },
        });
        // this.router.navigateByUrl(`training/${this.data.courseId}`);
        this.router.navigateByUrl('/training');
      },
      error: () => {
        this.notification.show('Test cevapları gönderilemedi!', 'warning');
      },
    });

    this.showQuestions = false;
  }

  goQuestion(index: number) {
    this.currentIndex = index;
  }

  previousQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    }
  }

  answerQuestion(question: Question, index: number, last: boolean) {
    let reqObj = question.reqObj;
    let selectedAnswer = this.selectedAnswers[index];
    if (selectedAnswer) {
      reqObj.LibraryDefinitionItemOption.Oid = selectedAnswer.Oid;
      this.answersBody.push(reqObj);
    }
  }

  get indices() {
    return Array(this.questions.length)
      .fill(0)
      .map((x, i) => i);
  }

  timeEnd() {
    this.finalizeExam();
  }

  randomSort(obj: any) {
    obj.options.forEach((element: any) => {
      element.order = Math.floor(Math.random() * obj.options.length * 4);
    });
    obj.options = (obj.options as any[]).sort((a, b) => a.order - b.order);
  }
}
