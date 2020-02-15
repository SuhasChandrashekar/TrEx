import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tediff'
})
export class TediffPipe implements PipeTransform {
// using transform to filter the data wrt to entity type
  transform(value: any[], queryString: any): any {
    // return if value is null
    if (!value) return value;
    return value.filter((item) => item.entityType == queryString);
  }

}
