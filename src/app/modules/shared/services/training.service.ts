import { EducationCatalog } from './../../../models/education-catalog';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map } from 'rxjs';
import { RequestConfig } from '../interfaces/requestConfig.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(private api: ApiService, private userService: UserService) {}

  sendAnswer(body: any): Observable<any> {
    return this.api.post(
      'EducationListExamParticipantDetails/SubmitAnswer',
      body
    );
  }

  endQuiz(id: string) {
    return this.api.get(`EducationLists/${id}/EndQuiz()`);
  }

  getCategories() {
    let reqConfig: RequestConfig = {
      url: 'EducationCatalogs',
      query: (q) => {},
      columns: [],
    };

    return this.api.httpRequest(reqConfig.url, reqConfig.query);
  }

  getCategoryByOid(Oid: string) {
    let reqConfig: RequestConfig = {
      url: `EducationCatalogs(${Oid})`,
      query: (q) => {},
      columns: [],
    };

    return this.api.httpRequest(reqConfig.url, reqConfig.query);
  }

  getCourses(): Observable<any> {
    /*     let requestConfig: RequestConfig = {
      url: 'EducationLists/GetListByUser()',
      query: (q) => {
        q.select();
        q.expand({
          EducationListExamParticipant: {
            expand: [
              'EducationListExamParticipantMaterial',
              'EducationListExamParticipantDetail',
            ],
          },
          EducationDefinition: {
            select: ['Name', 'EducationDesc', 'Active'],
          },
        });
      },
      columns: [],
    }; */

    let reqConfig: RequestConfig = {
      url: 'EducationListExamParticipants',
      query: (q) => {
        q.expand({
          EducationList: {
            expand: {
              EducationDefinition: {},
              EducationCatalog: {},
            },
          },
        });
        let username: string | null = this.userService.userName;
        q.filter(({ e }) =>
          e()
            .eq('PortalUser/UserName', username)
            .and(e().ne('EducationList', null))
            .and(e().eq('EducationList/EducationDefinition/Active', 'Active'))
        );
      },
      columns: [],
    };

    return this.api.httpRequest(reqConfig.url, reqConfig.query);
  }

  getTraining(id: number): Observable<any> {
    let requestConfig: RequestConfig = {
      url: 'EducationListExamParticipants',
      query: (q) => {
        q.expand({
          EducationList: {
            expand: ['EducationDefinition', 'EducationCatalog'],
          },
          EducationListExamParticipantMaterial: {
            expand: {
              EducationListExamParticipant: { select: 'Oid' },
              FileSystemStoreObject: {},
            },
          },
          EducationListExamParticipantDetail: {
            expand: {
              LibraryDefinitionItem: {},
            },
          },
          LibraryDefiniton: {},
        });
      },
      columns: [],
    };

    return this.api.getSingleReq(requestConfig.url, id, requestConfig.query);
  }

  getDocument(controlGuid: string) {
    const docUrl = `FileSystemStoreObjectBases/GetFile(controlGuid='${controlGuid}')`;
    return this.api.get(docUrl);
  }
  getTrainingTest(id: number): Observable<any> {
    // let requestConfig: RequestConfig = {
    //   url: 'EducationListExamParticipants',
    //   query: (q) => {
    //     q.expand({
    //       EducationListExamParticipantDetail: {
    //         expand: {
    //           LibraryDefinitionItem: {
    //             expand: ['LibraryDefinitionItemOption'],
    //           },
    //         },
    //       },
    //     });
    //   },
    //   columns: [],
    // };
    //return this.api.getSingleReq(requestConfig.url, id, requestConfig.query);

    let requestConfig: RequestConfig = {
      url: 'EducationListExamParticipantDetails',
      query: (q) => {
        q.expand({
          EducationListExamParticipant: {
            expand: ['EducationList'],
          },
          LibraryDefinitionItem: {
            expand: ['LibraryDefinitionItemOption'],
          },
          LibraryDefinitionItemOption: {},
        });
        q.filter(({ e }) => e().eq('EducationListExamParticipant/Oid', id));
      },
      columns: [],
    };
    return this.api.httpRequest(requestConfig.url, requestConfig.query);
  }

  putMaterial(req: any): Observable<any> {
    return this.api.put(
      'EducationListExamParticipantMaterials/' + req.Oid,
      req
    );
  }
}
