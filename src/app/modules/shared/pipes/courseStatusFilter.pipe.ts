import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courseStatusFilter'
})
export class CourseStatusFilter implements PipeTransform {

  constructor() { }

  transform(values: any[], categoryOid: number, ...args: unknown[]): any[] {
    switch (args[0]) {
      case 1:
        return values.filter(
          (v) =>
            v.IsSuccessfull &&
            v.EducationList.EducationCatalog.Oid == categoryOid
        );
      case 0:
        return values.filter(
          (v) =>
            !v.IsSuccessfull &&
            v.EducationList.EducationCatalog.Oid == categoryOid
        );
      default:
        return values.filter(
          (v) => v.EducationList.EducationCatalog.Oid == categoryOid
        );
    }
  }
}
